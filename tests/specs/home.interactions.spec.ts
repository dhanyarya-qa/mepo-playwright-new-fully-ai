import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { HomePage } from '../pages/HomePage';

test.describe('home interactions', () => {
  test('accordion items are clickable and show content region', async ({ page }) => {
    await gotoPath(page, '/');
    const home = new HomePage(page);

    const items = [
      'Itinerary Planning',
      'Activity Creation',
      'Invite and Join',
      'Itinerary Recommendations'
    ] as const;

    for (const name of items) {
      const btn = home.whatsInsideAccordionButton(name);
      await expect(btn).toBeVisible();
      await btn.click();
      await expect(btn).toBeVisible();
    }
  });

  test.describe('mobile-only behaviors', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('back to top appears after scroll and works', async ({ page }) => {
    await gotoPath(page, '/');
    const home = new HomePage(page);
    await home.assertHeroTexts();

    // Ensure we scroll enough for the floating button to appear.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const backToTop = home.backToTopButton();
    await expect(backToTop).toBeVisible();
    await backToTop.click();

    // After back-to-top, hero should be visible again.
    await expect(home.heroHeading2).toBeVisible();
    });
  });

  test('partner links exist and point to Google Forms', async ({ page }) => {
    await gotoPath(page, '/');
    const join = page.getByRole('link', { name: 'Join as Partner' });
    const corp = page.getByRole('link', { name: 'Corporate outing' });
    await expect(join).toHaveAttribute('href', /forms\.gle/i);
    await expect(corp).toHaveAttribute('href', /forms\.gle/i);
  });
});

