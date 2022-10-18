// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1700,
  viewportHeight: 1000,
  screenshotsFolder: 'tests/screenshots',
  video: false,
  fixturesFolder: false,
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/**/*.cy.ts',
    supportFile: false,
  },
});
