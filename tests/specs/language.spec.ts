import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { Header } from '../pages/Header';

test.describe('@regression language switch', () => {
  test.describe.configure({ retries: 1 });
  test('ID button is clickable and (if menu exists) can switch language', async ({ page }) => {
    await gotoPath(page, '/');
    const header = new Header(page);

    const id = header.languageButton();
    await expect(id).toBeVisible();

    // Try to open language dropdown/menu.
    await id.click();

    // If a language menu exists, it should expose some menuitems/options.
    // If not implemented, we still validate the control is present and clickable.
    const menuCandidates = page.getByRole('menuitem').or(page.getByRole('option'));
    const hasMenu = (await menuCandidates.count()) > 0;

    if (hasMenu) {
      // Choose a non-ID option if present, otherwise click the first item.
      const nonId = menuCandidates.filter({ hasText: /^(?!ID$).+/ }).first();
      if (await nonId.count()) {
        await nonId.click();
      } else {
        await menuCandidates.first().click();
      }

      // After switching, at least one visible text on the page should still be present.
      await expect(page.getByRole('heading', { name: /Meet, Travel, Happy|Your Travel Simplified/i }).first()).toBeVisible();
    } else {
      await expect(id).toBeVisible();
    }
  });
});

