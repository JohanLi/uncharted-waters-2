import { SAVED_STATE_KEY, State } from '../src/state/state';

export const setState = (state: Partial<State>) =>
  window.localStorage.setItem(SAVED_STATE_KEY, JSON.stringify(state));

export const vendorMessageIncludes = (text: string) =>
  cy.get('[data-test=vendorMessageBox]').should('include.text', text);

export const clickMenu = (option: string) =>
  cy.get('[data-test=menu]').contains(option).click();
export const clickMenu2 = (option: string) =>
  cy.get('[data-test=menu2]').contains(option).click();

export const goldIs = (amount: number) =>
  cy.get('[data-test=left]').should('include.text', String(amount));
