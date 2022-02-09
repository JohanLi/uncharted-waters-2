import { setState } from '../utils';

describe('Buildings', () => {
  context('Lodge', () => {
    it('greeting', () => {
      setState({ portId: '2', buildingId: '5' });
      cy.visit('');

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'You must be tired.',
      );
    });

    it('check in and wake up at 8 am the next day outside', () => {
      cy.get('[data-test=menu]').contains('Check In').click();

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

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Welcome to our church.',
      );
    });

    it('pray', () => {
      cy.get('[data-test=menu]').contains('Pray').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Let’s pray that God will protect you.',
      );

      cy.get('[data-test=building]').click();
    });

    it('donate', () => {
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

      cy.get('[data-test=building]').click();
    });

    it('exiting with message', () => {
      cy.get('[data-test=building]').rightclick();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'May God bless you in your travels!',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=building]').should('not.exist');
    });
  });

  context('Harbor', () => {
    it('greeting', () => {
      setState({ portId: '2', buildingId: '4' });
      cy.visit('');

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Ahoy there, matey',
      );
    });

    it('supply', () => {
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

      cy.get('[data-test=inputNumeric]').type('20').submit();

      cy.get('[data-test=harborSupply]').should('include.text', '120');

      cy.get('[data-test=building]').rightclick();
    });

    it('sail', () => {
      cy.get('[data-test=menu]').contains('Sail').click();

      cy.get('[data-test=building]').should('not.exist');
    });
  });

  context('Shipyard', () => {
    it('greeting', () => {
      setState({ portId: '2', buildingId: '3', gold: 2000 });
      cy.visit('');

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'What brings you to this shipyard?',
      );
    });

    it('used ship', () => {
      cy.window().then((win) => {
        cy.stub(win.Math, 'random').returns(0);
      });

      cy.get('[data-test=menu]').contains('Used Ship').click();

      cy.get('[data-test=menu2]').contains('Balsa').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        '100 years ago!',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        '1200 gold pieces',
      );

      cy.get('[data-test=confirmNo]').click();

      cy.get('[data-test=menu]').contains('Used Ship').click();

      cy.get('[data-test=menu2]').contains('Balsa').click();

      cy.get('[data-test=building]').click();

      cy.get('[data-test=confirmYes]').click();

      cy.get('[data-test=shipNameInput]').type('Test Balsa').submit();

      cy.get('[data-test=left]').should('include.text', '800');

      cy.get('[data-test=menu]').contains('Used Ship').click();

      cy.get('[data-test=menu2]').contains('Balsa').click();

      cy.get('[data-test=building]').click();

      cy.get('[data-test=confirmYes]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'don’t have enough gold',
      );

      cy.get('[data-test=building]').click();
    });

    it('repair', () => {
      cy.get('[data-test=menu]').contains('Repair').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'already in tiptop shape',
      );

      cy.get('[data-test=building]').click();
    });

    it('sell', () => {
      cy.get('[data-test=menu]').contains('Sell').click();

      cy.get('[data-test=menu2]').contains('Test Balsa').click();

      cy.get('[data-test=confirmNo]').click();

      cy.get('[data-test=menu]').contains('Sell').click();

      cy.get('[data-test=menu2]').contains('Test Balsa').click();

      cy.get('[data-test=confirmYes]').click();

      cy.get('[data-test=left]').should('include.text', '1400');

      cy.get('[data-test=menu]').contains('Sell').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'only have the flag ship',
      );

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

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Marco Polo Bank',
      );
    });

    it('deposit', () => {
      cy.get('[data-test=menu]').contains('Deposit').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'don’t have any gold in your account',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=inputNumeric]').type('1000').submit();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'deposit 1000 gold pieces',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Now you have 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=menu]').contains('Deposit').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'don’t have any gold to deposit',
      );

      cy.get('[data-test=building]').click();
    });

    it('withdraw', () => {
      cy.get('[data-test=menu]').contains('Withdraw').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Now you have 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=inputNumeric]').type('1000').submit();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Here is 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Now you have 0 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=menu]').contains('Withdraw').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'don’t have any gold in your account',
      );

      cy.get('[data-test=building]').click();
    });

    it('borrow', () => {
      cy.get('[data-test=menu]').contains('Borrow').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'credit line is 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=inputNumeric]').type('1000').submit();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'lend you 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'invest our loan wisely',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=menu]').contains('Borrow').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'no way we can give you a loan',
      );

      cy.get('[data-test=building]').click();
    });

    it('repay', () => {
      cy.get('[data-test=menu]').contains('Repay').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'debt is 1000 gold',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=inputNumeric]').type('1000').submit();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Thank you for your payment',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'takes care of your debt!',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=menu]').contains('Repay').click();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'don’t owe us any money',
      );

      cy.get('[data-test=building]').click();
    });

    it('exiting with message', () => {
      cy.get('[data-test=building]').rightclick();

      cy.get('[data-test=vendorMessageBox]').should(
        'include.text',
        'Thank you for choosing Marco Polo Bank',
      );

      cy.get('[data-test=building]').click();

      cy.get('[data-test=building]').should('not.exist');
    });
  });
});
