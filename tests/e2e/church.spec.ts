import { clickMenu, setState, vendorMessageIncludes } from '../utils';

describe('Church', () => {
  it('greeting', () => {
    setState({ portId: '2', buildingId: '11', gold: 1000 });
    cy.visit('');

    vendorMessageIncludes('Welcome to our church');
  });

  it('pray', () => {
    clickMenu('Pray');

    vendorMessageIncludes('Let’s pray that God');

    cy.get('[data-test=building]').click();
  });

  it('donate', () => {
    clickMenu('Donate');

    vendorMessageIncludes('How much can you give?');

    cy.get('[data-test=inputNumberInput]').type('1000{enter}');

    vendorMessageIncludes('Thank you for your generous donation');

    cy.get('[data-test=building]').click();

    clickMenu('Donate');

    vendorMessageIncludes('You have no gold.');

    cy.get('[data-test=building]').click();
  });

  it('exiting with message', () => {
    cy.get('[data-test=building]').rightclick();

    vendorMessageIncludes('May God bless you in your travels!');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=building]').should('not.exist');
  });
});
