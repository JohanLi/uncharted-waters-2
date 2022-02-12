import { clickMenu, setState, vendorMessageIncludes } from '../utils';

describe('Lodge', () => {
  it('greeting', () => {
    setState({ portId: '2', buildingId: '5' });
    cy.visit('');

    vendorMessageIncludes('You must be tired.');
  });

  it('check in', () => {
    clickMenu('Check In');

    cy.get('[data-test=left]')
      .should('include.text', 'May 18 1522')
      .should('include.text', '8:00 AM');

    cy.get('[data-test=building]').should('not.exist');
  });
});
