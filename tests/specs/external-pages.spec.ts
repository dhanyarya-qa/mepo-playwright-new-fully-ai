import { test, expect } from '@playwright/test';

test.describe('external pages content validation', () => {
  test('App Store page contains app name', async ({ page }) => {
    await page.goto('https://apps.apple.com/id/app/mepo/id6504633379', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/apps\.apple\.com/i);
    await expect(page.locator('body')).toContainText(/Mepo/i);
  });

  test('Google Play page contains app name or package id', async ({ page }) => {
    await page.goto('https://play.google.com/store/apps/details?id=com.mepo.travel', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/play\.google\.com/i);
    // Google Play sometimes shows consent/region UI; accept either app name or package id in body.
    await expect(page.locator('body')).toContainText(/Mepo|com\.mepo\.travel/i);
  });

  test('Instagram page loads (or shows login wall) and mentions Instagram', async ({ page }) => {
    await page.goto('https://www.instagram.com/mepoindonesia/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/instagram\.com/i);
    await expect(page.locator('body')).toContainText(/Instagram|mepoindonesia/i);
  });

  test('TikTok page loads (or shows gate) and mentions TikTok', async ({ page }) => {
    await page.goto('https://www.tiktok.com/@mepoindonesia', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/tiktok\.com/i);
    await expect(page.locator('body')).toContainText(/TikTok|mepoindonesia/i);
  });

  test('LinkedIn company page loads (or shows gate) and mentions LinkedIn', async ({ page }) => {
    await page.goto('https://www.linkedin.com/company/mepo-travel/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/linkedin\.com/i);
    await expect(page.locator('body')).toContainText(/LinkedIn|mepo/i);
  });
});

