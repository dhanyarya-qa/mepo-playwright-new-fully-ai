import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';

test.describe('@visual @regression visual banners (strict)', () => {
  test.describe.configure({ retries: 2 });
  test('home hero banner', async ({ page }) => {
    await gotoPath(page, '/');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('home-hero.png', {
      fullPage: false,
      // Mask images to reduce nondeterministic diffs (CDN/image rendering).
      mask: [page.locator('img')]
    });
  });

  test('about banner/hero', async ({ page }) => {
    await gotoPath(page, '/about');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('about-hero.png', { fullPage: false, mask: [page.locator('img')] });
  });

  test('products banner/hero', async ({ page }) => {
    await gotoPath(page, '/products');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('products-hero.png', { fullPage: false, mask: [page.locator('img')] });
  });

  test('activities banner/hero', async ({ page }) => {
    await gotoPath(page, '/activities');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('activities-hero.png', { fullPage: false, mask: [page.locator('img')] });
  });

  test('terms banner/hero', async ({ page }) => {
    await gotoPath(page, '/term-conditions');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('terms-hero.png', { fullPage: false, mask: [page.locator('img')] });
  });

  test('contact-us banner/hero', async ({ page }) => {
    await gotoPath(page, '/contact-us');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(page).toHaveScreenshot('contact-us-hero.png', { fullPage: false, mask: [page.locator('img')] });
  });
});

