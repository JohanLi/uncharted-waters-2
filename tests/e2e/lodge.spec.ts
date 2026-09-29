import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  loadState,
  vendorMessageIncludes,
} from '../utils';

test.describe('Lodge', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(page, { portId: '2', buildingId: '5' });

    await vendorMessageIncludes(page, 'You must be tired.');
  });

  test('check in', async () => {
    await clickMenu(page, 'Check In');

    const left = page.locator('[data-test=left]');
    await expect(left).toContainText('May 18 1522');
    await expect(left).toContainText('8:00 AM');

    await expect(building(page)).not.toBeAttached();
  });
});
