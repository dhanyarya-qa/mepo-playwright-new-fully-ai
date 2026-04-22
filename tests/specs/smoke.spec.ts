import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ActivitiesPage } from '../pages/ActivitiesPage';
import { TermsPage } from '../pages/TermsPage';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('@smoke @regression smoke', () => {
  test.describe.configure({ retries: 1 });
  test('home renders hero headings', async ({ page }) => {
    await gotoPath(page, '/');
    const home = new HomePage(page);
    await home.assertHeroTexts();
  });

  test('about page renders key sections', async ({ page }) => {
    await gotoPath(page, '/about');
    const about = new AboutPage(page);
    await about.assertKeyText();
  });

  test('products page renders', async ({ page }) => {
    await gotoPath(page, '/products');
    const products = new ProductsPage(page);
    await products.assertKeyText();
  });

  test('activities page renders', async ({ page }) => {
    await gotoPath(page, '/activities');
    const activities = new ActivitiesPage(page);
    await activities.assertKeyText();
  });

  test('terms page renders privacy policy', async ({ page }) => {
    await gotoPath(page, '/term-conditions');
    const terms = new TermsPage(page);
    await terms.assertKeyText();
  });

  test('contact us page renders form fields', async ({ page }) => {
    await gotoPath(page, '/contact-us');
    const contact = new ContactUsPage(page);
    await contact.assertKeyTextAndFields();
    await expect(page.getByRole('heading', { name: 'Contact Information' })).toBeVisible();
  });
});

