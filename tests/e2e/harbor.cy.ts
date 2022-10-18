import {
  characterMessageIncludes,
  clickMenu,
  goldIs,
  setState,
  vendorMessageIncludes,
} from '../utils';

describe('Harbor', () => {
  it('greeting', () => {
    setState({
      portId: '2',
      buildingId: '4',
      gold: 1000,
      fleets: {
        1: {
          position: undefined,
          ships: [
            {
              id: '22',
              name: 'Test ship',
              crew: 30,
              cargo: [
                {
                  type: 'water',
                  quantity: 100,
                },
                {
                  type: 'food',
                  quantity: 100,
                },
              ],
              durability: 51,
            },
          ],
        },
      },
    });
    cy.visit('');

    vendorMessageIncludes('Ahoy there, matey');
  });

  it('supply', () => {
    clickMenu('Supply');

    cy.get('[data-test=harborSupply]')
      .should('include.text', 'Test ship')
      .contains('100')
      .first()
      .click();

    cy.get('[data-test=inputNumberInput]').type('50{enter}');

    cy.get('[data-test=harborSupply]')
      .should('include.text', '150')
      .contains('100')
      .first()
      .click();

    cy.get('[data-test=inputNumberInput]').type('20{enter}');

    cy.get('[data-test=harborSupply]').should('include.text', '120');

    goldIs(600);

    cy.get('[data-test=building]').rightclick();
  });

  it('exiting', () => {
    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=building]').should('not.exist');
  });

  context('sail', () => {
    it('cannot if no ship', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: { '1': { position: undefined, ships: [] } },
      });
      cy.reload();

      clickMenu('Sail');

      vendorMessageIncludes('Ahoy there, matey');
    });

    it('cannot if no crew assigned', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: {
          1: {
            position: undefined,
            ships: [
              {
                id: '22',
                name: 'Test ship',
                crew: 0,
                cargo: [
                  {
                    type: 'water',
                    quantity: 10,
                  },
                  {
                    type: 'food',
                    quantity: 10,
                  },
                ],
                durability: 51,
              },
            ],
          },
        },
      });
      cy.reload();

      clickMenu('Sail');

      characterMessageIncludes('We won’t get anywhere', 2);

      cy.get('[data-test=building]').click();

      vendorMessageIncludes('Ahoy there, matey');
    });

    it('cannot if no provisions', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: {
          1: {
            position: undefined,
            ships: [
              {
                id: '22',
                name: 'Test ship',
                crew: 10,
                cargo: [
                  {
                    type: 'water',
                    quantity: 0,
                  },
                  {
                    type: 'food',
                    quantity: 10,
                  },
                ],
                durability: 51,
              },
            ],
          },
        },
      });
      cy.reload();

      clickMenu('Sail');

      characterMessageIncludes('leave with no provisions', 2);

      cy.get('[data-test=building]').click();

      vendorMessageIncludes('Ahoy there, matey');
    });

    it('low on provisions', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: {
          1: {
            position: undefined,
            ships: [
              {
                id: '22',
                name: 'Test ship',
                crew: 10,
                cargo: [
                  {
                    type: 'water',
                    quantity: 1,
                  },
                  {
                    type: 'food',
                    quantity: 10,
                  },
                ],
                durability: 51,
              },
            ],
          },
        },
      });
      cy.reload();

      clickMenu('Sail');

      characterMessageIncludes('Shall we cast off anyway', 2);

      cy.get('[data-test=confirmYes]').click();

      cy.get('[data-test=building]').should('not.exist');
    });

    it('ample provisions', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: {
          1: {
            position: undefined,
            ships: [
              {
                id: '22',
                name: 'Test ship',
                crew: 10,
                cargo: [
                  {
                    type: 'water',
                    quantity: 20,
                  },
                  {
                    type: 'food',
                    quantity: 10,
                  },
                ],
                durability: 51,
              },
            ],
          },
        },
      });
      cy.reload();

      clickMenu('Sail');

      characterMessageIncludes('We can sail for 10 days', 2);

      cy.get('[data-test=confirmYes]').click();

      cy.get('[data-test=building]').should('not.exist');
    });

    it('show a provision summary', () => {
      setState({
        portId: '2',
        buildingId: '4',
        fleets: {
          1: {
            position: undefined,
            ships: [
              {
                id: '22',
                name: 'Test ship',
                crew: 44,
                cargo: [
                  {
                    type: 'water',
                    quantity: 55,
                  },
                  {
                    type: 'food',
                    quantity: 66,
                  },
                ],
                durability: 51,
              },
            ],
          },
        },
      });
      cy.reload();

      clickMenu('Sail');

      cy.get('[data-test=harborSummary]').should('include.text', '44');
      cy.get('[data-test=harborSummary]').should('include.text', '55');
      cy.get('[data-test=harborSummary]').should('include.text', '66');
    });
  });
});
