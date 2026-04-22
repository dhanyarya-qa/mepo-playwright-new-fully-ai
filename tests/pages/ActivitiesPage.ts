import { expect, type Locator, type Page } from '@playwright/test';

export class ActivitiesPage {
  readonly page: Page;
  readonly headingOurActivities: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headingOurActivities = page.getByRole('heading', { name: 'Our Activities' });
  }

  async assertKeyText() {
    await expect(this.headingOurActivities).toBeVisible();
  }

  /**
   * The list items are exposed as role=link with a long accessible name
   * that typically includes title + excerpt. This grabs all clickable cards.
   */
  articleCardLinks(): Locator {
    // Exclude navigation/footer links by scoping to main content area heuristically.
    // If the site later adds a <main>, we can scope further.
    return this.page
      .getByRole('link')
      .filter({ hasText: /Ditulis Oleh:|Ditulis Oleh/i })
      .or(this.page.getByRole('link').filter({ hasText: /Itinerary|Tips|Desa|Innova|Liburan/i }));
  }

  // Fallback: take first N links from the page that look like cards.
  candidateCardLinks(): Locator {
    return this.page.getByRole('link').filter({ hasText: /Ditulis Oleh:|Sudah|Bikin|Minat|Merencanakan|Menyusun|Yogyakarta/i });
  }
}

