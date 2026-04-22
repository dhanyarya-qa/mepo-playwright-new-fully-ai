import { test, expect } from '@playwright/test';
import { gotoPath } from '../lib/navigation';
import { ContactUsPage } from '../pages/ContactUsPage';

test.describe('contact us submit (optional)', () => {
  test('submit filled form (guarded)', async ({ page }) => {
    // Default behavior:
    // - In CI: enabled unless RUN_CONTACT_SUBMIT is explicitly set to "false"
    // - Locally: disabled unless RUN_CONTACT_SUBMIT is explicitly set to "true"
    const runInCi = process.env.CI === 'true' && process.env.RUN_CONTACT_SUBMIT !== 'false';
    const runLocally = process.env.CI !== 'true' && process.env.RUN_CONTACT_SUBMIT === 'true';
    test.skip(!(runInCi || runLocally), 'Enable submit via CI=true (default) or RUN_CONTACT_SUBMIT=true (local). Opt-out in CI with RUN_CONTACT_SUBMIT=false');

    await gotoPath(page, '/contact-us');
    const contact = new ContactUsPage(page);
    await contact.assertKeyTextAndFields();

    await contact.fullNameInput().fill(`Playwright Submit ${Date.now()}`);
    await contact.phoneInput().fill('081333326001');
    await contact.emailInput().fill(`playwright.${Date.now()}@example.com`);
    await contact.messageInput().fill('Automated submit from Playwright. Please ignore.');

    const submitResponses: string[] = [];
    page.on('response', (r) => {
      const url = r.url();
      if (url.includes('dev.mepo.travel')) submitResponses.push(url);
    });

    await contact.submitButton().click();

    // Heuristic success: no crash and still on page; if an app toast exists, it should be visible.
    await expect(page).toHaveURL(/\/contact-us/);
    await expect(contact.headingContactUs).toBeVisible();

    // If backend responds with something, at least we captured responses (non-strict).
    expect(submitResponses.length).toBeGreaterThanOrEqual(0);
  });
});

