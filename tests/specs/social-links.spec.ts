import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';

test.describe('social links', () => {
  test('footer social icons have href and can open in new tab', async ({ page }) => {
    await gotoPath(page, '/');

    // Social icons are anonymous links; validate by href domain rather than accessible name.
    const instagram = page.locator('a[href*="instagram.com"]').first();
    await expect(instagram).toHaveAttribute('href', /instagram\.com/i);

    const popupPromise = page.waitForEvent('popup');
    await instagram.click({ force: true });
    const popup = await popupPromise;
    await expect(popup).toHaveURL(/instagram\.com/i);
    await popup.waitForLoadState('domcontentloaded');
    await expect(popup.locator('body')).toContainText(/Instagram|mepoindonesia/i);
    await popup.close();

    await expect(page.locator('a[href*="tiktok.com"]').first()).toHaveAttribute('href', /tiktok\.com/i);
    await expect(page.locator('a[href*="linkedin.com"]').first()).toHaveAttribute('href', /linkedin\.com/i);
  });
});

