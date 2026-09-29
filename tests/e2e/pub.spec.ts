import { test, expect, type Page } from '@playwright/test';

import {
  building,
  characterMessageIncludes,
  clickMenu,
  goldIs,
  loadState,
  vendorMessageIncludes,
} from '../utils';

test.describe('Pub', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(page, {
      portId: '2',
      buildingId: '2',
      gold: 2000,
      fleets: {
        '1': {
          position: undefined,
          ships: [
            {
              id: '22',
              name: 'Test ship',
              crew: 0,
              cargo: [],
              durability: 51,
            },
          ],
        },
      },
      mates: [
        {
          sailorId: '1',
          role: 0,
        },
      ],
    });

    await vendorMessageIncludes(page, 'Hey sailor, you’ll like our wine');
  });

  test('recruit crew', async () => {
    await clickMenu(page, 'Recruit Crew');

    await characterMessageIncludes(page, 'Shall we recruit some men', 2);

    await page.locator('[data-test=confirmNo]').click();

    await clickMenu(page, 'Recruit Crew');

    await page.locator('[data-test=confirmYes]').click();

    await characterMessageIncludes(page, 'tough sailors want to join', 2);

    await building(page).click();

    await characterMessageIncludes(page, '30 men, at the cost of 1200', 2);

    await building(page).click();

    await goldIs(page, 800);

    await clickMenu(page, 'Recruit Crew');

    await characterMessageIncludes(page, 'We have enough men in our crew', 2);

    await building(page).click();
  });

  test('exiting', async () => {
    await building(page).click({ button: 'right' });

    await expect(building(page)).not.toBeAttached();
  });
});
