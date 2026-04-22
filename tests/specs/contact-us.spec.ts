import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { ContactUsPage } from '../pages/ContactUsPage';
import { makeContactFormData } from '../data/factory';

test.describe('@regression contact us', () => {
  test.describe.configure({ retries: 1 });
  test('required fields exist and can be filled', async ({ page }) => {
    await gotoPath(page, '/contact-us');
    const contact = new ContactUsPage(page);
    await contact.assertKeyTextAndFields();

    const data = makeContactFormData();
    await contact.fullNameInput().fill(data.fullName);
    await contact.phoneInput().fill(data.phoneNumber);
    await contact.emailInput().fill(data.email);
    await contact.messageInput().fill(data.message);

    await expect(contact.fullNameInput()).toHaveValue(data.fullName);
    await expect(contact.emailInput()).toHaveValue(data.email);
  });
});

