import { expect, type Page } from '@playwright/test';

import { SAVED_STATE_KEY } from '../src/constants';
import type { State } from '../src/state/state';
import type { Position } from '../src/interface/port/CharacterMessageBox';

/*
  The game reads its saved state from localStorage once, on page load, and
  never writes it back. So setting it and reloading starts a fresh game from
  that state.
 */
export const loadState = async (page: Page, state: Partial<State>) => {
  if (page.url() === 'about:blank') {
    await page.goto('/');
  }

  await page.evaluate(
    ([key, value]) => window.localStorage.setItem(key, value),
    [SAVED_STATE_KEY, JSON.stringify(state)],
  );
  await page.reload();
};

export const building = (page: Page) => page.locator('[data-test=building]');

export const inputNumber = (page: Page) =>
  page.locator('[data-test=inputNumberInput]');

export const vendorMessageIncludes = (page: Page, text: string) =>
  expect(page.locator('[data-test=vendorMessageBox]')).toContainText(text);

export const characterMessageIncludes = (
  page: Page,
  text: string,
  position: Position,
) =>
  expect(
    page.locator(`[data-test=characterMessageBox${position}]`),
  ).toContainText(text);

export const clickMenu = (page: Page, option: string) =>
  page.locator('[data-test=menu]').getByText(option).first().click();

export const clickMenu2 = (page: Page, option: string) =>
  page.locator('[data-test=menu2]').getByText(option).first().click();

export const goldIs = (page: Page, amount: number) =>
  expect(page.locator('[data-test=left]')).toContainText(String(amount));

export const typeAndEnter = async (page: Page, text: string) => {
  await inputNumber(page).pressSequentially(text);
  await inputNumber(page).press('Enter');
};

/*
  Returns a function that restores the original Math.random, mirroring how
  cy.stub() was restored after each test.
 */
export const stubMathRandom = async (page: Page, value: number) => {
  await page.evaluate((v) => {
    const w = window as Window & { originalRandom?: () => number };
    w.originalRandom = Math.random;
    Math.random = () => v;
  }, value);

  return () =>
    page.evaluate(() => {
      const w = window as Window & { originalRandom?: () => number };
      if (w.originalRandom) {
        Math.random = w.originalRandom;
      }
    });
};
