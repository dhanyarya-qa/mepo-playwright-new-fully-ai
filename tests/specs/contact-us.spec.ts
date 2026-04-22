import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('contact us', () => {
  test('required fields exist and can be filled', async ({ page }) => {
    await gotoPath(page, '/contact-us');
    const contact = new ContactUsPage(page);
    await contact.assertKeyTextAndFields();

    await contact.fullNameInput().fill('Playwright Test User');
    await contact.phoneInput().fill('081333326001');
    await contact.emailInput().fill('test@example.com');
    await contact.messageInput().fill('Hello from Playwright automation.');

    await expect(contact.fullNameInput()).toHaveValue(/Playwright Test User/);
    await expect(contact.emailInput()).toHaveValue(/test@example\.com/);
  });
});

