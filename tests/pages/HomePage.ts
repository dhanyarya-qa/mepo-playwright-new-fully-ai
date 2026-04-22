import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly heroHeading1: Locator;
  readonly heroHeading2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading1 = page.getByRole('heading', { name: 'Your Travel Simplified' });
    this.heroHeading2 = page.getByRole('heading', { name: 'Meet, Travel, Happy' });
  }

  async assertHeroTexts() {
    await expect(this.heroHeading1).toBeVisible();
    await expect(this.heroHeading2).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Get ready for more experience on your travel' })).toBeVisible();
  }

  ctaSeeDetails() {
    return this.page.getByRole('link', { name: 'See Details' });
  }

  whatsInsideAccordionButton(name: string) {
    return this.page.getByRole('button', { name });
  }

  backToTopButton() {
    return this.page.getByRole('button', { name: 'Back to top' });
  }
}

