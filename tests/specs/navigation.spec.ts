import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { Header } from '../pages/Header';

test.describe('navigation', () => {
  test('drawer links navigate to correct routes', async ({ page }) => {
    await gotoPath(page, '/');
    const header = new Header(page);

    await header.clickNav('About');
    await expect(page).toHaveURL(/\/about$/);

    await header.clickNav('Products');
    await expect(page).toHaveURL(/\/products$/);

    await header.clickNav('Activities');
    await expect(page).toHaveURL(/\/activities$/);

    await header.clickNav('Contact Us');
    await expect(page).toHaveURL(/\/contact-us$/);

    await header.clickNav('Home');
    await expect(page).toHaveURL(/\/$/);
  });
});

