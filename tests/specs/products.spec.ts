import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('@regression products', () => {
  test.describe.configure({ retries: 1 });
  test('see more button is visible and clickable', async ({ page }) => {
    await gotoPath(page, '/products');
    const products = new ProductsPage(page);
    await products.assertKeyText();

    const btn = products.seeMoreButton();
    await btn.scrollIntoViewIfNeeded();
    await expect(btn).toBeVisible();
    await btn.click();
    // The UI may hide the button after expanding; only assert that the page still looks valid.
    await expect(page.getByRole('heading', { name: /Explore our Products via App/i })).toBeVisible();
  });
});

