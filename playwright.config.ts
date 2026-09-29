import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

// the game needs a wide viewport, and device presets would override a top-level one
const viewport = { width: 1700, height: 1000 };

export default defineConfig({
  testDir: 'tests/e2e',
  outputDir: 'tests/results',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'], viewport } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], viewport } },
  ],
  // tests run against the production build, like the deployed site
  webServer: {
    command: `pnpm build && pnpm preview --port ${PORT} --strictPort`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
