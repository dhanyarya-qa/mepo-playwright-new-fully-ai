import { expect, type Locator, type Page } from '@playwright/test';

export class TermsPage {
  readonly page: Page;
  readonly headingTerms: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingTerms = page.getByRole('heading', { name: 'Terms & Conditions', exact: true }).first();
  }

  async assertKeyText() {
    await expect(this.headingTerms).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
    await expect(this.page.getByText('Privacy Policy Text (Indonesian)')).toBeVisible();
    await expect(this.page.getByText('Privacy Policy Text (English)')).toBeVisible();
  }
}

