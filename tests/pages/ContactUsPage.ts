import { expect, type Locator, type Page } from '@playwright/test';

export class ContactUsPage {
  readonly page: Page;
  readonly headingContactUs: Locator;
  readonly headingGetInTouch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingContactUs = page.getByRole('heading', { name: 'Contact Us' });
    this.headingGetInTouch = page.getByRole('heading', { name: 'Get in Touch' });
  }

  fullNameInput() {
    return this.page.getByRole('textbox', { name: 'Full Name' });
  }

  phoneInput() {
    return this.page.getByRole('textbox', { name: 'Phone Number' });
  }

  emailInput() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  messageInput() {
    return this.page.getByRole('textbox', { name: 'Your Message' });
  }

  submitButton() {
    // There are two "Submit" buttons in snapshot; pick the first visible one.
    return this.page.getByRole('button', { name: 'Submit' }).first();
  }

  async assertKeyTextAndFields() {
    await expect(this.headingContactUs).toBeVisible();
    await expect(this.headingGetInTouch).toBeVisible();
    await expect(this.fullNameInput()).toBeVisible();
    await expect(this.phoneInput()).toBeVisible();
    await expect(this.emailInput()).toBeVisible();
    await expect(this.messageInput()).toBeVisible();
    await expect(this.submitButton()).toBeVisible();
  }
}

