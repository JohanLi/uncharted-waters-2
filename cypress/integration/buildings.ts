import { setState } from '../utils';

describe('Buildings', () => {
  it('Lodge', () => {
    setState({ portId: '2', buildingId: '5' });
    cy.visit('http://localhost:8080');

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'You must be tired.',
    );

    cy.get('[data-test=menu]').contains('Check In').click();

    cy.get('[data-test=left]')
      .should('include.text', 'May 18 1522')
      .should('include.text', '8:00 AM');

    cy.get('[data-test=building]').should('not.exist');
  });

  it('Church', () => {
    setState({ portId: '2', buildingId: '11', gold: 1000 });
    cy.visit('http://localhost:8080');

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

    cy.get('[data-test=inputNumeric]').type('1000').submit();

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

    cy.get('[data-test=building]').should('not.exist');
  });

  it('Harbor', () => {
    setState({ portId: '2', buildingId: '4' });
    cy.visit('http://localhost:8080');

    cy.get('[data-test=vendorMessageBox]').should(
      'include.text',
      'Ahoy there, matey',
    );

    cy.get('[data-test=menu]').contains('Supply').click();

    cy.get('[data-test=harborSupply]')
      .should('include.text', 'Test ship')
      .contains('100')
      .first()
      .click();

    cy.get('[data-test=inputNumeric]').type('50').submit();

    cy.get('[data-test=harborSupply]')
      .should('include.text', '150')
      .contains('100')
      .first()
      .click();

    cy.get('[data-test=inputNumeric]').type('1000').submit();

    cy.get('[data-test=harborSupply]').should('include.text', '270');

    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=menu]').contains('Sail').click();

    cy.get('[data-test=building]').should('not.exist');
  });
});