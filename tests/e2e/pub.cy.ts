import {
  characterMessageIncludes,
  clickMenu,
  goldIs,
  setState,
  vendorMessageIncludes,
} from '../utils';

describe('Pub', () => {
  it('greeting', () => {
    setState({
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
    cy.visit('');

    vendorMessageIncludes('Hey sailor, you’ll like our wine');
  });

  it('recruit crew', () => {
    clickMenu('Recruit Crew');

    characterMessageIncludes('Shall we recruit some men', 2);

    cy.get('[data-test=confirmNo]').click();

    clickMenu('Recruit Crew');

    cy.get('[data-test=confirmYes]').click();

    characterMessageIncludes('tough sailors want to join', 2);

    cy.get('[data-test=building]').click();

    characterMessageIncludes('30 men, at the cost of 1200', 2);

    cy.get('[data-test=building]').click();

    goldIs(800);

    clickMenu('Recruit Crew');

    characterMessageIncludes('We have enough men in our crew', 2);

    cy.get('[data-test=building]').click();
  });

  it('exiting', () => {
    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=building]').should('not.exist');
  });
});
