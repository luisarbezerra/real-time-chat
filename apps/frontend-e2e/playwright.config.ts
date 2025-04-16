import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },

  /* Automatically start the servers before running tests */
  webServer: [
    {
      command: 'pnpm nx serve backend --port=3334',
      url: 'http://localhost:3334',
      reuseExistingServer: false,
      timeout: 120000, // 2 minutes
    },
    {
      command: 'pnpm nx serve frontend',
      url: 'http://localhost:4200',
      reuseExistingServer: false,
      timeout: 120000, // 2 minutes
    },
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
