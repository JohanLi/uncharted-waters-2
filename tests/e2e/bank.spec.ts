import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  loadState,
  typeAndEnter,
  vendorMessageIncludes,
} from '../utils';

test.describe('Bank', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(page, { portId: '2', buildingId: '9', gold: 1000 });

    await vendorMessageIncludes(page, 'Marco Polo Bank');
  });

  test('deposit', async () => {
    await clickMenu(page, 'Deposit');

    await vendorMessageIncludes(page, 'don’t have any gold in your account');

    await building(page).click();

    await typeAndEnter(page, '1000');

    await vendorMessageIncludes(page, 'deposit 1000 gold pieces');

    await building(page).click();

    await vendorMessageIncludes(page, 'Now you have 1000 gold');

    await building(page).click();

    await clickMenu(page, 'Deposit');

    await vendorMessageIncludes(page, 'don’t have any gold to deposit');

    await building(page).click();
  });

  test('withdraw', async () => {
    await clickMenu(page, 'Withdraw');

    await vendorMessageIncludes(page, 'Now you have 1000 gold');

    await building(page).click();

    await typeAndEnter(page, '1000');

    await vendorMessageIncludes(page, 'Here is 1000 gold');

    await building(page).click();

    await vendorMessageIncludes(page, 'Now you have 0 gold');

    await building(page).click();

    await clickMenu(page, 'Withdraw');

    await vendorMessageIncludes(page, 'don’t have any gold in your account');

    await building(page).click();
  });

  test('borrow', async () => {
    await clickMenu(page, 'Borrow');

    await vendorMessageIncludes(page, 'credit line is 1000 gold');

    await building(page).click();

    await typeAndEnter(page, '1000');

    await vendorMessageIncludes(page, 'lend you 1000 gold');

    await building(page).click();

    await vendorMessageIncludes(page, 'invest our loan wisely');

    await building(page).click();

    await clickMenu(page, 'Borrow');

    await vendorMessageIncludes(page, 'no way we can give you a loan');

    await building(page).click();
  });

  test('repay', async () => {
    await clickMenu(page, 'Repay');

    await vendorMessageIncludes(page, 'debt is 1000 gold');

    await building(page).click();

    await typeAndEnter(page, '1000');

    await vendorMessageIncludes(page, 'Thank you for your payment');

    await building(page).click();

    await vendorMessageIncludes(page, 'takes care of your debt!');

    await building(page).click();

    await clickMenu(page, 'Repay');

    await vendorMessageIncludes(page, 'don’t owe us any money');

    await building(page).click();
  });

  test('exiting with message', async () => {
    await building(page).click({ button: 'right' });

    await vendorMessageIncludes(page, 'Thank you for choosing Marco Polo Bank');

    await building(page).click();

    await expect(building(page)).not.toBeAttached();
  });
});
