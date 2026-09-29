import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  clickMenu2,
  goldIs,
  loadState,
  vendorMessageIncludes,
} from '../utils';

test.describe('Item Shop', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  const itemBox = () => page.locator('[data-test=itemShopItemBox]');

  test('greeting', async () => {
    await loadState(page, { portId: '2', buildingId: '10', gold: 6000 });

    await vendorMessageIncludes(page, 'May I help you?');
  });

  test('buy', async () => {
    await clickMenu(page, 'Buy');

    await vendorMessageIncludes(page, 'you’ll find something you like');

    await clickMenu2(page, 'Telescope');

    await vendorMessageIncludes(page, 'cost you 5000 gold');

    await expect(itemBox()).toContainText('Telescope');
    await expect(itemBox()).toContainText('Voyager’s Aid');
    await expect(itemBox()).toContainText(
      'An optical instrument that will help you',
    );

    await page.locator('[data-test=confirmNo]').click();

    await vendorMessageIncludes(page, 'you’ll find something you like');

    await clickMenu2(page, 'Short Saber');

    await expect(itemBox()).toContainText('AttackD');

    await page.locator('[data-test=confirmYes]').click();

    await goldIs(page, 3000);

    await vendorMessageIncludes(page, 'interested in anything else?');

    await clickMenu2(page, 'Telescope');

    await page.locator('[data-test=confirmYes]').click();

    await vendorMessageIncludes(page, 'you don’t have enough gold');

    await building(page).click();

    await clickMenu2(page, 'Rapier');

    await page.locator('[data-test=confirmYes]').click();

    await vendorMessageIncludes(page, 'May I help you?');

    await clickMenu(page, 'Buy');

    await vendorMessageIncludes(page, 'seems you have no gold');

    await building(page).click();
  });

  test('sell', async () => {
    await clickMenu(page, 'Sell');

    await vendorMessageIncludes(page, 'like to sell?');

    await clickMenu2(page, 'Short Saber');

    await vendorMessageIncludes(page, 'I’ll take it for 1500 gold');

    await expect(itemBox()).toContainText('Short Saber');
    await expect(itemBox()).toContainText('Curved Sword');
    await expect(itemBox()).toContainText('slender sword used by cavalry');

    await page.locator('[data-test=confirmNo]').click();

    await vendorMessageIncludes(page, 'like to sell?');

    await clickMenu2(page, 'Short Saber');

    await page.locator('[data-test=confirmYes]').click();

    await goldIs(page, 1500);

    await vendorMessageIncludes(page, 'else can you sell me?');

    await clickMenu2(page, 'Rapier');

    await page.locator('[data-test=confirmYes]').click();

    await vendorMessageIncludes(page, 'May I help you?');

    await clickMenu(page, 'Sell');

    await vendorMessageIncludes(page, 'don’t have any items');

    await building(page).click();
  });

  test('exiting', async () => {
    await building(page).click({ button: 'right' });

    await expect(building(page)).not.toBeAttached();
  });

  test('no secret item at 8 am', async () => {
    await loadState(page, {
      portId: '11',
      buildingId: '10',
      gold: 1000000,
      timePassed: 480,
    });

    await clickMenu(page, 'Buy');

    await expect(page.locator('[data-test=menu2]')).not.toContainText(
      'Crusader Armor',
    );
  });

  test('secret item at 2 am', async () => {
    await loadState(page, {
      portId: '11',
      buildingId: '10',
      gold: 1000000,
      timePassed: 1440 * 3 + 120,
    });

    await clickMenu(page, 'Buy');

    await clickMenu2(page, 'Crusader Armor');

    await vendorMessageIncludes(page, 'cost you 600000 gold');

    await expect(itemBox()).toContainText('Defense☆');
  });
});
