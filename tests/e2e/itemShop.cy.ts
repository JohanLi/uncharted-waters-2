import {
  clickMenu,
  clickMenu2,
  goldIs,
  setState,
  vendorMessageIncludes,
} from '../utils';

describe('Item Shop', () => {
  it('greeting', () => {
    setState({ portId: '2', buildingId: '10', gold: 6000 });
    cy.visit('');

    vendorMessageIncludes('May I help you?');
  });

  it('buy', () => {
    clickMenu('Buy');

    vendorMessageIncludes('you’ll find something you like');

    clickMenu2('Telescope');

    vendorMessageIncludes('cost you 5000 gold');

    cy.get('[data-test=itemShopItemBox]')
      .should('include.text', 'Telescope')
      .should('include.text', 'Voyager’s Aid')
      .should('include.text', 'An optical instrument that will help you');

    cy.get('[data-test=confirmNo]').click();

    vendorMessageIncludes('you’ll find something you like');

    clickMenu2('Short Saber');

    cy.get('[data-test=itemShopItemBox]').should('include.text', 'AttackD');

    cy.get('[data-test=confirmYes]').click();

    goldIs(3000);

    vendorMessageIncludes('interested in anything else?');

    clickMenu2('Telescope');

    cy.get('[data-test=confirmYes]').click();

    vendorMessageIncludes('you don’t have enough gold');

    cy.get('[data-test=building]').click();

    clickMenu2('Rapier');

    cy.get('[data-test=confirmYes]').click();

    vendorMessageIncludes('May I help you?');

    clickMenu('Buy');

    vendorMessageIncludes('seems you have no gold');

    cy.get('[data-test=building]').click();
  });

  it('sell', () => {
    clickMenu('Sell');

    vendorMessageIncludes('like to sell?');

    clickMenu2('Short Saber');

    vendorMessageIncludes('I’ll take it for 1500 gold');

    cy.get('[data-test=itemShopItemBox]')
      .should('include.text', 'Short Saber')
      .should('include.text', 'Curved Sword')
      .should('include.text', 'slender sword used by cavalry');

    cy.get('[data-test=confirmNo]').click();

    vendorMessageIncludes('like to sell?');

    clickMenu2('Short Saber');

    cy.get('[data-test=confirmYes]').click();

    goldIs(1500);

    vendorMessageIncludes('else can you sell me?');

    clickMenu2('Rapier');

    cy.get('[data-test=confirmYes]').click();

    vendorMessageIncludes('May I help you?');

    clickMenu('Sell');

    vendorMessageIncludes('don’t have any items');

    cy.get('[data-test=building]').click();
  });

  it('exiting', () => {
    cy.get('[data-test=building]').rightclick();

    cy.get('[data-test=building]').should('not.exist');
  });

  it('no secret item at 8 am', () => {
    setState({
      portId: '11',
      buildingId: '10',
      gold: 1000000,
      timePassed: 480,
    });
    cy.reload();

    clickMenu('Buy');

    cy.get('[data-test=menu2]').should('not.include.text', 'Crusader Armor');
  });

  it('secret item at 2 am', () => {
    setState({
      portId: '11',
      buildingId: '10',
      gold: 1000000,
      timePassed: 1440 * 3 + 120,
    });
    cy.reload();

    clickMenu('Buy');

    clickMenu2('Crusader Armor');

    vendorMessageIncludes('cost you 600000 gold');

    cy.get('[data-test=itemShopItemBox]').should('include.text', 'Defense☆');
  });
});
