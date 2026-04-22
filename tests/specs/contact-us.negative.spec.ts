import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('@regression contact us validation', () => {
  test.describe.configure({ retries: 1 });
  test('click submit with empty fields triggers required validation', async ({ page }) => {
    await gotoPath(page, '/contact-us');
    const contact = new ContactUsPage(page);
    await contact.assertKeyTextAndFields();

    await contact.submitButton().click();

    // Browser built-in constraint validation should mark required fields invalid.
    await expect(contact.fullNameInput()).toHaveJSProperty('validity.valueMissing', true);
    await expect(contact.phoneInput()).toHaveJSProperty('validity.valueMissing', true);
    await expect(contact.emailInput()).toHaveJSProperty('validity.valueMissing', true);
    await expect(contact.messageInput()).toHaveJSProperty('validity.valueMissing', true);
  });
});

