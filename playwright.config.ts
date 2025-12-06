import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig, devices } from '@playwright/test';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  timeout: 60000,
  retries: 1,
  reporter: [["line"], ["allure-playwright"]],
  workers: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  }, 
  projects: [
    // Setup project
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'src/playwright/.auth/user.json',
      },
      // dependencies: ['setup'],
    },

    /* {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'src/playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    }, */
  ],
};

export default config;
