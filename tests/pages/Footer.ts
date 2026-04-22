import { expect, type Locator, type Page } from '@playwright/test';

export class Footer {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByRole('contentinfo');
  }

  link(name: string | RegExp): Locator {
    return this.root.getByRole('link', { name });
  }

  heading(name: string | RegExp): Locator {
    return this.root.getByRole('heading', { name });
  }

  async assertCommonFooterText() {
    await expect(this.heading('Pages')).toBeVisible();
    await expect(this.heading('Legal')).toBeVisible();
    await expect(this.heading('Contact').first()).toBeVisible();
    await expect(this.heading('Social Media')).toBeVisible();
  }
}

