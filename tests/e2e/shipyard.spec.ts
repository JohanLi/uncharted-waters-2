import {
  clickMenu,
  clickMenu2,
  goldIs,
  setState,
  vendorMessageIncludes,
} from '../utils';

describe('Shipyard', () => {
  const boughtShipName = 'Test Balsa';

  it('greeting', () => {
    setState({
      portId: '2',
      buildingId: '3',
      gold: 2000,
      fleets: {
        '1': {
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

    vendorMessageIncludes('What brings you to this shipyard?');
  });

  it('used ship', () => {
    cy.window().then((win) => {
      cy.stub(win.Math, 'random').returns(0);
    });

    clickMenu('Used Ship');

    clickMenu2('Balsa');

    vendorMessageIncludes('100 years ago!');

    cy.get('[data-test=building]').click();

    vendorMessageIncludes('1200 gold pieces');

    cy.get('[data-test=confirmNo]').click();

    clickMenu2('Balsa');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=confirmYes]').click();

    cy.get('[data-test=inputNameInput]').type(boughtShipName).type('{enter}');

    goldIs(800);

    clickMenu2('Balsa');

    cy.get('[data-test=building]').click();

    cy.get('[data-test=confirmYes]').click();

    vendorMessageIncludes('don’t have enough gold');

    cy.get('[data-test=building]').click().rightclick();
  });

  it('repair', () => {
    clickMenu('Repair');

    vendorMessageIncludes('already in tiptop shape');

    cy.get('[data-test=building]').click();
  });

  it('sell', () => {
    clickMenu('Sell');

    clickMenu2(boughtShipName);

    cy.get('[data-test=confirmNo]').click();

    clickMenu2(boughtShipName);

    cy.get('[data-test=confirmYes]').click();

    goldIs(1400);

    vendorMessageIncludes('only have the flag ship');

    cy.get('[data-test=building]').click();
  });

  it('exiting', () => {
    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=building]').should('not.exist');
  });
});
