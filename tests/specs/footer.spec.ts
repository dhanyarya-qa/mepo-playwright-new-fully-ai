import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { Footer } from '../pages/Footer';

test.describe('footer', () => {
  test('common footer links exist', async ({ page }) => {
    await gotoPath(page, '/');
    const footer = new Footer(page);
    await footer.assertCommonFooterText();

    await expect(footer.link('Home')).toBeVisible();
    await expect(footer.link('About')).toBeVisible();
    await expect(footer.link('Products')).toBeVisible();
    await expect(footer.link('Activities')).toBeVisible();
    await expect(footer.link('Terms & Conditions')).toBeVisible();

    await expect(footer.link(/Whatsapp \+62 813-3332-6001/)).toHaveAttribute('href', /api\.whatsapp\.com|wa\.me|whatsapp/i);
    await expect(footer.link(/Email social@mepo\.travel/)).toHaveAttribute('href', /mailto:/i);
  });
});

