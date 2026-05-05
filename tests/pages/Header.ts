import { expect, type Locator, type Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly nav: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = page.getByRole('navigation');
  }

  menuButton(): Locator {
    return this.page.getByRole('button', { name: 'Menu' });
  }

  async openDrawerIfPresent() {
    const btn = this.menuButton();
    if (await btn.count()) {
      await expect(btn).toBeVisible();
      await btn.click();
    }
  }

  navLink(name: 'Home' | 'About' | 'Products' | 'Activities' | 'Contact Us') {
    return this.nav.getByRole('link', { name, exact: true });
  }

  navButton(name: 'Contact Us' | 'Download' | 'ID') {
    return this.page.getByRole('button', { name, exact: true });
  }

  languageButton() {
    return this.navButton('ID');
  }

  async clickNav(name: 'Home' | 'About' | 'Products' | 'Activities' | 'Contact Us') {
    // Mobile: open drawer first.
    await this.openDrawerIfPresent();

    const menuBtn = this.menuButton();
    if (await menuBtn.count()) {
      const linkInDrawer = this.page.getByRole('link', { name, exact: true }).first();
      await expect(linkInDrawer).toBeVisible();
      await linkInDrawer.click();
      return;
    }

    const linkInNav = this.navLink(name).first();
    await expect(linkInNav).toBeVisible();
    await linkInNav.click();
  }

  async openDownloadMenu() {
    await this.openDrawerIfPresent();
    const download = this.navButton('Download');
    await expect(download).toBeVisible();
    await download.click();
  }
}

