import { test, expect, type Page } from '@playwright/test';

import {
  building,
  clickMenu,
  clickMenu2,
  goldIs,
  loadState,
  stubMathRandom,
  vendorMessageIncludes,
} from '../utils';

const shipyardState = (mates: { sailorId: string; role: number | null }[]) => ({
  portId: '2',
  buildingId: '3',
  gold: 2000,
  fleets: {
    '1': {
      position: undefined,
      ships: [
        {
          id: '22',
          name: 'Test ship',
          crew: 30,
          cargo: [],
          durability: 51,
        },
      ],
    },
  },
  mates,
});

test.describe('Shipyard', () => {
  test.describe.configure({ mode: 'serial' });

  const boughtShipName = 'Test Balsa';

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(
      page,
      shipyardState([
        { sailorId: '1', role: 0 },
        { sailorId: '32', role: null },
      ]),
    );

    await vendorMessageIncludes(page, 'What brings you to this shipyard?');
  });

  test('used ship', async () => {
    const restoreMathRandom = await stubMathRandom(page, 0);

    await clickMenu(page, 'Used Ship');

    await clickMenu2(page, 'Balsa');

    await vendorMessageIncludes(page, '100 years ago!');

    await building(page).click();

    await vendorMessageIncludes(page, '1200 gold pieces');

    await page.locator('[data-test=confirmNo]').click();

    await clickMenu2(page, 'Balsa');

    await building(page).click();

    await page.locator('[data-test=confirmYes]').click();

    const inputName = page.locator('[data-test=inputNameInput]');
    await inputName.pressSequentially(boughtShipName);
    await inputName.press('Enter');

    await goldIs(page, 800);

    await clickMenu2(page, 'Balsa');

    await building(page).click();

    await page.locator('[data-test=confirmYes]').click();

    await vendorMessageIncludes(page, 'don’t have enough gold');

    await building(page).click();
    await building(page).click({ button: 'right' });

    await restoreMathRandom();
  });

  test('repair', async () => {
    await clickMenu(page, 'Repair');

    await vendorMessageIncludes(page, 'already in tiptop shape');

    await building(page).click();
  });

  test('sell', async () => {
    await clickMenu(page, 'Sell');

    await clickMenu2(page, boughtShipName);

    await page.locator('[data-test=confirmNo]').click();

    await clickMenu2(page, boughtShipName);

    await page.locator('[data-test=confirmYes]').click();

    await goldIs(page, 1400);

    await vendorMessageIncludes(page, 'only have the flag ship');

    await building(page).click();
  });

  test('exiting', async () => {
    await building(page).click({ button: 'right' });

    await expect(building(page)).not.toBeAttached();
  });

  test('cannot buy used ship if no available sailors', async () => {
    await loadState(page, shipyardState([{ sailorId: '1', role: 0 }]));

    await stubMathRandom(page, 0);

    await clickMenu(page, 'Used Ship');

    await clickMenu2(page, 'Balsa');

    await building(page).click();

    await page.locator('[data-test=confirmYes]').click();

    await vendorMessageIncludes(
      page,
      'don’t have a sailor available to captain',
    );
  });
});
