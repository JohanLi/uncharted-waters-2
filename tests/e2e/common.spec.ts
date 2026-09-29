import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  inputNumber,
  loadState,
  typeAndEnter,
  vendorMessageIncludes,
} from '../utils';

test.describe('Common UI', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.describe('InputNumber', () => {
    const gold = 1000;

    test.beforeAll(async () => {
      await loadState(page, { portId: '2', buildingId: '11', gold });

      await clickMenu(page, 'Donate');
    });

    test('allows numbers and clears on click', async () => {
      await inputNumber(page).pressSequentially('1');
      await expect(inputNumber(page)).toHaveValue('1');

      await inputNumber(page).click();
      await expect(inputNumber(page)).toHaveValue('');
    });

    test('does not allow non-numbers', async () => {
      await inputNumber(page).pressSequentially('abc');
      await expect(inputNumber(page)).toHaveValue('');
    });

    test('disregards zero', async () => {
      await inputNumber(page).pressSequentially('0');
      await expect(inputNumber(page)).toHaveValue('');
    });

    test('caps the value', async () => {
      await inputNumber(page).pressSequentially('2000');
      await expect(inputNumber(page)).toHaveValue(String(gold));

      await inputNumber(page).click();
    });

    test('doesn’t submit an empty value', async () => {
      await inputNumber(page).press('Enter');

      await page.locator('[data-test=inputNumberButton]').click();

      await vendorMessageIncludes(page, 'How much can you give?');
    });

    test('submits on enter or through the button', async () => {
      await typeAndEnter(page, '1');

      await expect(inputNumber(page)).not.toBeAttached();

      await building(page).click();

      await clickMenu(page, 'Donate');

      await inputNumber(page).pressSequentially('1');

      await page.locator('[data-test=inputNumberButton]').click();

      await expect(inputNumber(page)).not.toBeAttached();

      await building(page).click();
    });

    test('exits on right-click or escape', async () => {
      await clickMenu(page, 'Donate');

      await expect(inputNumber(page)).toBeAttached();
      await building(page).click({ button: 'right' });
      await expect(inputNumber(page)).not.toBeAttached();

      await clickMenu(page, 'Donate');

      await expect(inputNumber(page)).toBeAttached();
      await page.locator('#game').dispatchEvent('keydown', { key: 'Escape' });
      await expect(inputNumber(page)).not.toBeAttached();
    });
  });
});
