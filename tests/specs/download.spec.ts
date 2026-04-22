import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { Header } from '../pages/Header';

test.describe('download menu', () => {
  test('download dropdown opens App Store and Play Store in new tabs', async ({ page }) => {
    await gotoPath(page, '/');
    const header = new Header(page);
    await header.openDownloadMenu();

    const expandedMenu = page.getByRole('button', { name: 'Download', exact: true });
    await expect(expandedMenu).toHaveAttribute('aria-expanded', /true/i);

    const appStorePopup = page.waitForEvent('popup');
    await page.locator('a[href*="apps.apple.com"]').first().click({ force: true });
    const appStore = await appStorePopup;
    await expect(appStore).toHaveURL(/apps\.apple\.com/i);
    await appStore.waitForLoadState('domcontentloaded');
    await expect(appStore.locator('body')).toContainText(/Mepo/i);
    await appStore.close();

    // Re-open the dropdown for Play Store.
    await header.openDownloadMenu();

    const playStorePopup = page.waitForEvent('popup');
    const playLink = page.locator('a[href*="play.google.com"]').first();
    await playLink.click({ force: true });
    const playStore = await playStorePopup;
    await expect(playStore).toHaveURL(/play\.google\.com/i);
    await playStore.waitForLoadState('domcontentloaded');
    await expect(playStore.locator('body')).toContainText(/Mepo|com\.mepo\.travel/i);
    await playStore.close();
  });
});

