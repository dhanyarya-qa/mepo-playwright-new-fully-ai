import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly headingOurProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingOurProducts = page.getByRole('heading', { name: 'Our Products', exact: true }).first();
  }

  async assertKeyText() {
    await expect(this.headingOurProducts).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Offer from Mepo Partner' })).toBeVisible();
  }

  seeMoreButton() {
    return this.page.getByRole('button', { name: 'See More' });
  }
}

