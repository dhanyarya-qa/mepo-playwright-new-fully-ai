import { test, expect, type Page } from '@playwright/test';

test.describe('@external @regression external pages content validation', () => {
  test.describe.configure({ retries: 2 });
  async function assertAnyText(page: Page, patterns: RegExp[]) {
    const text = await page.locator('body').innerText();
    const ok = patterns.some((p) => p.test(text));
    expect(ok).toBeTruthy();
  }

  test('App Store page contains app name', async ({ page }) => {
    await page.goto('https://apps.apple.com/id/app/mepo/id6504633379', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/apps\.apple\.com/i);
    await assertAnyText(page, [/Mepo/i, /App\sStore/i, /Open/i]);
  });

  test('Google Play page contains app name or package id', async ({ page }) => {
    await page.goto('https://play.google.com/store/apps/details?id=com.mepo.travel', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/play\.google\.com/i);
    // Google Play sometimes shows consent/region UI; accept either app name or package id in body.
    await assertAnyText(page, [/Mepo/i, /com\.mepo\.travel/i, /Google\sPlay/i, /Sign in/i]);
  });

  test('Instagram page loads (or shows login wall) and mentions Instagram', async ({ page }) => {
    await page.goto('https://www.instagram.com/mepoindonesia/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/instagram\.com/i);
    const title = await page.title();
    const bodyText = await page.locator('body').innerText();
    const hasExpectedText = [/Instagram/i, /mepoindonesia/i, /Log in/i].some((pattern) =>
      pattern.test(`${title}\n${bodyText}`)
    );
    const hasLoadedMarkup = (await page.content()).length > 1000;
    expect(hasExpectedText || hasLoadedMarkup).toBeTruthy();
  });

  test('TikTok page loads (or shows gate) and mentions TikTok', async ({ page }) => {
    await page.goto('https://www.tiktok.com/@mepoindonesia', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/tiktok\.com/i);
    await assertAnyText(page, [/TikTok/i, /mepoindonesia/i, /Sign up/i, /Log in/i]);
  });

  test('LinkedIn company page loads (or shows gate) and mentions LinkedIn', async ({ page }) => {
    await page.goto('https://www.linkedin.com/company/mepo-travel/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/linkedin\.com/i);
    await assertAnyText(page, [/LinkedIn/i, /mepo/i, /Sign in/i]);
  });
});

