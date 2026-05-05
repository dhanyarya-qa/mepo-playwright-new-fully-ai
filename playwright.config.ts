import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const baseURL = process.env.BASE_URL ?? 'https://dev.mepo.travel';

const mobileSamsungS26Ultra = {
  name: 'Samsung S26 Ultra (simulated)',
  userAgent:
    'Mozilla/5.0 (Linux; Android 15; Samsung Galaxy S26 Ultra) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
  viewport: { width: 412, height: 915 },
  deviceScaleFactor: 3.5,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'chromium' as const
};

const mobileIPhone17ProMax = {
  name: 'iPhone 17 Pro Max (simulated)',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'webkit' as const
};

const mobilePixel10Pro = {
  name: 'Google Pixel 10 Pro (simulated)',
  userAgent:
    'Mozilla/5.0 (Linux; Android 15; Pixel 10 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
  viewport: { width: 412, height: 892 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'chromium' as const
};

const tabletSamsungS10FE = {
  name: 'Samsung Tab S10 FE (simulated)',
  userAgent:
    'Mozilla/5.0 (Linux; Android 15; SAMSUNG SM-X520) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
  viewport: { width: 800, height: 1280 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'chromium' as const
};

const tabletIPadGen11 = {
  name: 'iPad Gen 11 (simulated)',
  userAgent:
    'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  viewport: { width: 820, height: 1180 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  defaultBrowserType: 'webkit' as const
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 3 : undefined,
  reporter: [['html', { open: 'never' }], ['list'], ['json', { outputFile: 'test-results/report.json' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    viewport: { width: 1280, height: 720 },
    locale: 'id-ID',
    colorScheme: 'light'
  },
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      // User requested strict visual validation.
      maxDiffPixelRatio: 0
    }
  },
  projects: [
    // Desktop matrix
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'] }
    },
    // Device matrix (requested simulated devices)
    {
      name: 'samsung-s26-ultra',
      use: { ...mobileSamsungS26Ultra }
    },
    {
      name: 'iphone-17-pro-max',
      use: { ...mobileIPhone17ProMax }
    },
    {
      name: 'pixel-10-pro',
      use: { ...mobilePixel10Pro }
    },
    {
      name: 'samsung-tab-s10-fe',
      use: { ...tabletSamsungS10FE }
    },
    {
      name: 'ipad-gen-11',
      use: { ...tabletIPadGen11 }
    }
  ]
});

