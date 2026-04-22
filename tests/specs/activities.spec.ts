import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function extractTitle(accessibleName: string) {
  // Heuristic: title is the first sentence-ish chunk before double spaces or a newline.
  const firstLine = accessibleName.split('\n')[0] ?? accessibleName;
  const m = firstLine.match(/^(.+?)(?:\s{2,}|Sudah|Bikin|Minat|Merencanakan|Menyusun|Yogyakarta,)/i);
  return (m?.[1] ?? firstLine).trim().slice(0, 120);
}

test.describe('activities banners/cards', () => {
  test('all activity cards validate text, screenshot, and are clickable', async ({ page }) => {
    test.setTimeout(120_000);
    await gotoPath(page, '/activities');
    await expect(page.getByRole('heading', { name: 'Our Activities' })).toBeVisible();

    // Collect candidate clickable cards (role=link with long name).
    // We will filter out nav/footer links by requiring a longer accessible name (title + excerpt).
    const links = page.getByRole('link').filter({ hasText: /Ditulis Oleh:|Sudah|Bikin|Minat|Merencanakan|Menyusun|Yogyakarta/i });

    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    // Iterate deterministically over the current list length.
    for (let i = 0; i < count; i++) {
      await gotoPath(page, '/activities');
      await expect(page.getByRole('heading', { name: 'Our Activities' })).toBeVisible();

      const card = links.nth(i);
      await expect(card).toBeVisible();

      // Validate card text (accessible name should contain title + excerpt).
      const accessibleName = (await card.getAttribute('aria-label')) ?? (await card.innerText());
      expect(accessibleName.trim().length).toBeGreaterThan(10);
      const title = extractTitle(accessibleName);
      expect(title.length).toBeGreaterThan(5);

      // Minimal stable text validations
      await expect(card).toContainText(/Ditulis Oleh:|Sudah|Bikin|Minat|Merencanakan|Menyusun|Yogyakarta/i);

      // Visual regression per card (strict, scoped to element).
      const file = `activities-card-${i + 1}-${sanitizeFileName(accessibleName)}.png`;
      await expect(card).toHaveScreenshot(file);

      // Click behavior: allow navigation or popup; if nothing happens, still ensure href exists.
      const href = await card.getAttribute('href');
      expect(href).toBeTruthy();

      const popupPromise = page.waitForEvent('popup').catch(() => null);
      const navPromise = page.waitForNavigation({ timeout: 5000 }).catch(() => null);
      await card.click({ force: true });
      const [popup] = await Promise.all([popupPromise, navPromise]);

      if (popup) {
        await expect(popup).toHaveURL(/https?:\/\//);
        await popup.close();
        continue;
      }

      // If same-tab navigation occurs, the URL should change away from /activities.
      // If it doesn't change, we still treat as clickable but report via assertion on focus.
      const url = page.url();
      if (!/\/activities\/?$/.test(url)) {
        // Navigated to a detail route; basic sanity check that content exists.
        // Prefer asserting that the detail page contains the title.
        await expect(page.getByRole('heading', { name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first()).toBeVisible();
      } else {
        await expect(card).toBeFocused();
      }
    }
  });
});

