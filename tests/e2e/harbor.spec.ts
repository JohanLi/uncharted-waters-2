import { test, expect, type Page } from '@playwright/test';

import {
  building,
  characterMessageIncludes,
  clickMenu,
  goldIs,
  loadState,
  typeAndEnter,
  vendorMessageIncludes,
} from '../utils';

const harborWithShip = (crew: number, water: number, food: number) => ({
  portId: '2',
  buildingId: '4',
  fleets: {
    1: {
      position: undefined,
      ships: [
        {
          id: '22',
          name: 'Test ship',
          crew,
          cargo: [
            { type: 'water' as const, quantity: water },
            { type: 'food' as const, quantity: food },
          ],
          durability: 51,
        },
      ],
    },
  },
});

test.describe('Harbor', () => {
  test.describe.configure({ mode: 'serial' });

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('greeting', async () => {
    await loadState(page, { ...harborWithShip(30, 100, 100), gold: 1000 });

    await vendorMessageIncludes(page, 'Ahoy there, matey');
  });

  test('supply', async () => {
    await clickMenu(page, 'Supply');

    const harborSupply = page.locator('[data-test=harborSupply]');

    await expect(harborSupply).toContainText('Test ship');
    await harborSupply.getByText('100').first().click();

    await typeAndEnter(page, '50');

    await expect(harborSupply).toContainText('150');
    await harborSupply.getByText('100').first().click();

    await typeAndEnter(page, '20');

    await expect(harborSupply).toContainText('120');

    await goldIs(page, 600);

    await building(page).click({ button: 'right' });
  });

  test('exiting', async () => {
    await building(page).click({ button: 'right' });

    await expect(building(page)).not.toBeAttached();
  });

  test.describe('sail', () => {
    test('cannot if no ship', async () => {
      await loadState(page, {
        portId: '2',
        buildingId: '4',
        fleets: { '1': { position: undefined, ships: [] } },
      });

      await clickMenu(page, 'Sail');

      await vendorMessageIncludes(page, 'Ahoy there, matey');
    });

    test('cannot if no crew assigned', async () => {
      await loadState(page, harborWithShip(0, 10, 10));

      await clickMenu(page, 'Sail');

      await characterMessageIncludes(page, 'We won’t get anywhere', 2);

      await building(page).click();

      await vendorMessageIncludes(page, 'Ahoy there, matey');
    });

    test('cannot if no provisions', async () => {
      await loadState(page, harborWithShip(10, 0, 10));

      await clickMenu(page, 'Sail');

      await characterMessageIncludes(page, 'leave with no provisions', 2);

      await building(page).click();

      await vendorMessageIncludes(page, 'Ahoy there, matey');
    });

    test('low on provisions', async () => {
      await loadState(page, harborWithShip(10, 1, 10));

      await clickMenu(page, 'Sail');

      await characterMessageIncludes(page, 'Shall we cast off anyway', 2);

      await page.locator('[data-test=confirmYes]').click();

      await expect(building(page)).not.toBeAttached();
    });

    test('ample provisions', async () => {
      await loadState(page, harborWithShip(10, 20, 10));

      await clickMenu(page, 'Sail');

      await characterMessageIncludes(page, 'We can sail for 10 days', 2);

      await page.locator('[data-test=confirmYes]').click();

      await expect(building(page)).not.toBeAttached();
    });

    test('show a provision summary', async () => {
      await loadState(page, harborWithShip(44, 55, 66));

      await clickMenu(page, 'Sail');

      const harborSummary = page.locator('[data-test=harborSummary]');
      await expect(harborSummary).toContainText('44');
      await expect(harborSummary).toContainText('55');
      await expect(harborSummary).toContainText('66');
    });
  });
});
