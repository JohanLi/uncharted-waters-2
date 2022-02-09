import { setState } from '../utils';

describe('Church', () => {
  beforeEach(() => {
    setState({ portId: '2', buildingId: '11', gold: 1000 });
    cy.visit('http://localhost:8080');
  });

  it('greeting', () => {
    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'Welcome to our church.',
    );

    cy.get('[data-test=menu]').contains('Pray').click();

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'Let’s pray that God will protect you.',
    );

    cy.get('[data-test=building]').click();

    cy.get('[data-test=menu]').contains('Donate').click();

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'How much can you give?',
    );

    cy.get('[data-test=inputNumeric]').type('1000');

    cy.get('[data-test=building]').get('form').submit();

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'Thank you for your generous donation.',
    );

    cy.get('[data-test=building]').click();

    cy.get('[data-test=menu]').contains('Donate').click();

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'You have no gold.',
    );

    cy.get('[data-test=building]').click().rightclick();

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'May God bless you in your travels!',
    );

    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=vendorMessageBox]').should('not.exist');
  });
});
