import { clickMenu, setState, vendorMessageIncludes } from '../utils';

describe('Bank', () => {
  it('greeting', () => {
    setState({ portId: '2', buildingId: '9', gold: 1000 });
    cy.visit('');

    vendorMessageIncludes('Marco Polo Bank');
  });

  it('deposit', () => {
    clickMenu('Deposit');

    vendorMessageIncludes('don’t have any gold in your account');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=inputNumberInput]').type('1000{enter}');

    vendorMessageIncludes('deposit 1000 gold pieces');

    cy.get('[data-test=building]').click();

    vendorMessageIncludes('Now you have 1000 gold');

    cy.get('[data-test=building]').click();

    clickMenu('Deposit');

    vendorMessageIncludes('don’t have any gold to deposit');

    cy.get('[data-test=building]').click();
  });

  it('withdraw', () => {
    clickMenu('Withdraw');

    vendorMessageIncludes('Now you have 1000 gold');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=inputNumberInput]').type('1000{enter}');

    vendorMessageIncludes('Here is 1000 gold');

    cy.get('[data-test=building]').click();

    vendorMessageIncludes('Now you have 0 gold');

    cy.get('[data-test=building]').click();

    clickMenu('Withdraw');

    vendorMessageIncludes('don’t have any gold in your account');

    cy.get('[data-test=building]').click();
  });

  it('borrow', () => {
    clickMenu('Borrow');

    vendorMessageIncludes('credit line is 1000 gold');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=inputNumberInput]').type('1000{enter}');

    vendorMessageIncludes('lend you 1000 gold');

    cy.get('[data-test=building]').click();

    vendorMessageIncludes('invest our loan wisely');

    cy.get('[data-test=building]').click();

    clickMenu('Borrow');

    vendorMessageIncludes('no way we can give you a loan');

    cy.get('[data-test=building]').click();
  });

  it('repay', () => {
    clickMenu('Repay');

    vendorMessageIncludes('debt is 1000 gold');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=inputNumberInput]').type('1000{enter}');

    vendorMessageIncludes('Thank you for your payment');

    cy.get('[data-test=building]').click();

    vendorMessageIncludes('takes care of your debt!');

    cy.get('[data-test=building]').click();

    clickMenu('Repay');

    vendorMessageIncludes('don’t owe us any money');

    cy.get('[data-test=building]').click();
  });

  it('exiting with message', () => {
    cy.get('[data-test=building]').rightclick();

    vendorMessageIncludes('Thank you for choosing Marco Polo Bank');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=building]').should('not.exist');
  });
});
