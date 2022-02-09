import { clickMenu, setState, vendorMessageIncludes } from '../utils';

describe.only('Common UI', () => {
  context('InputNumber', () => {
    const gold = 1000;

    before(() => {
      setState({ portId: '2', buildingId: '11', gold });
      cy.visit('');

      clickMenu('Donate');
    });

    it('allows numbers and clears on click', () => {
      cy.get('[data-test=inputNumberInput]')
        .type('1')
        .should('have.value', '1')
        .click()
        .should('have.value', '');
    });

    it('does not allow non-numbers', () => {
      cy.get('[data-test=inputNumberInput]')
        .type('abc')
        .should('have.value', '');
    });

    it('disregards zero', () => {
      cy.get('[data-test=inputNumberInput]').type('0').should('have.value', '');
    });

    it('caps the value', () => {
      cy.get('[data-test=inputNumberInput]')
        .type('2000')
        .should('have.value', String(gold))
        .click();
    });

    it('doesn’t submit an empty value', () => {
      cy.get('[data-test=inputNumberInput]').type('{enter}');

      cy.get('[data-test=inputNumberButton]').click();

      vendorMessageIncludes('How much can you give?');
    });

    it('submits on enter or through the button', () => {
      cy.get('[data-test=inputNumberInput]').type('1{enter}');

      cy.get('[data-test=inputNumberInput]').should('not.exist');

      cy.get('[data-test=building]').click();

      clickMenu('Donate');

      cy.get('[data-test=inputNumberInput]').type('1');

      cy.get('[data-test=inputNumberButton]').click();

      cy.get('[data-test=inputNumberInput]').should('not.exist');

      cy.get('[data-test=building]').click();
    });

    it('exits on right-click or escape', () => {
      clickMenu('Donate');

      cy.get('[data-test=inputNumberInput]').should('exist');
      cy.get('[data-test=building]').rightclick();
      cy.get('[data-test=inputNumberInput]').should('not.exist');

      clickMenu('Donate');

      cy.get('[data-test=inputNumberInput]').should('exist');
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[data-test=inputNumberInput]').should('not.exist');
    });
  });
});
