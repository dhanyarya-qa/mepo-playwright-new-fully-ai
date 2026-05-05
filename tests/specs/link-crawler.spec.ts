import { test, expect } from '@playwright/test';

test.describe('@regression link crawler', () => {
  test.describe.configure({ retries: 1 });

  test('all internal links return 2xx/3xx', async ({ page, request, baseURL }) => {
    await page.goto(baseURL!, { waitUntil: 'domcontentloaded' });

    const hrefs = await page.locator('a[href]').evaluateAll((els) =>
      els.map((el) => (el as HTMLAnchorElement).getAttribute('href') || '')
    );

    const internal = [...new Set(hrefs)]
      .filter((href) => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
      .filter((href) => href.startsWith('/') || href.startsWith('https://dev.mepo.travel'));

    for (const href of internal) {
      const url = href.startsWith('http') ? href : `${baseURL}${href}`;
      const response = await request.get(url, { failOnStatusCode: false });
      expect([200, 201, 202, 204, 301, 302, 307, 308]).toContain(response.status());
    }
  });
});

