import {
  clickMenu,
  clickMenu2,
  goldIs,
  setState,
  vendorMessageIncludes,
} from '../utils';

describe('Buildings', () => {
  context('Lodge', () => {
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

  context('Church', () => {
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

  context('Harbor', () => {
    it('greeting', () => {
      setState({ portId: '2', buildingId: '4', gold: 1000 });
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

    it('sail', () => {
      clickMenu('Sail');

      cy.get('[data-test=building]').should('not.exist');
    });
  });

  context('Shipyard', () => {
    const boughtShipName = 'Test Balsa';

    it('greeting', () => {
      setState({ portId: '2', buildingId: '3', gold: 2000 });
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

  context('Bank', () => {
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
});
