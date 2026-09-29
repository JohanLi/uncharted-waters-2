import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  loadState,
  typeAndEnter,
  vendorMessageIncludes,
} from '../utils';

test.describe('Church', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(page, { portId: '2', buildingId: '11', gold: 1000 });

    await vendorMessageIncludes(page, 'Welcome to our church');
  });

  test('pray', async () => {
    await clickMenu(page, 'Pray');

    await vendorMessageIncludes(page, 'Let’s pray that God');

    await building(page).click();
  });

  test('donate', async () => {
    await clickMenu(page, 'Donate');

    await vendorMessageIncludes(page, 'How much can you give?');

    await typeAndEnter(page, '1000');

    await vendorMessageIncludes(page, 'Thank you for your generous donation');

    await building(page).click();

    await clickMenu(page, 'Donate');

    await vendorMessageIncludes(page, 'You have no gold.');

    await building(page).click();
  });

  test('exiting with message', async () => {
    await building(page).click({ button: 'right' });

    await vendorMessageIncludes(page, 'May God bless you in your travels!');

    await building(page).click();

    await expect(building(page)).not.toBeAttached();
  });
});
