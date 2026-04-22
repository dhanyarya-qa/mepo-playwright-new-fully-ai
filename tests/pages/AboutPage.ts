import { expect, type Locator, type Page } from '@playwright/test';

export class AboutPage {
  readonly page: Page;
  readonly headingAbout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingAbout = page.getByRole('heading', { name: 'About', exact: true }).first();
  }

  async assertKeyText() {
    await expect(this.headingAbout).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Our Vision' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Our Mission' })).toBeVisible();
    await expect(this.page.getByText(/platform digital all-in-one/i)).toBeVisible();
  }
}

