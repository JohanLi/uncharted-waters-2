interface Building {
  name: string;
  options: string[];
}

// eslint-disable-next-line import/prefer-default-export
export const buildings: { [key: string]: Building } = {
  '1': {
    name: 'Market',
    options: ['Buy Goods', 'Sell Goods', 'Invest', 'Market Rate'],
  },
  '2': {
    name: 'Pub',
    options: [
      'Recruit Crew',
      'Dismiss Crew',
      'Treat',
      'Meet',
      'Waitress',
      'Gamble',
    ],
  },
  '3': {
    name: 'Shipyard',
    options: ['New Ship', 'Used Ship', 'Repair', 'Sell', 'Remodel', 'Invest'],
  },
  '4': {
    name: 'Harbor',
    options: ['Sail', 'Supply', 'Moor'],
  },
  '5': {
    name: 'Lodge',
    options: ['Check In', 'Gossip', 'Port Info'],
  },
  '6': {
    name: 'Palace',
    options: ['Meet Ruler', 'Defect', 'Gold', 'Ship'],
  },
  '7': {
    name: 'Guild',
    options: ['Job Assignment', 'Country Info'],
  },
  '8': {
    name: 'Misc',
    options: [],
  },
  '9': {
    name: 'Bank',
    options: ['Deposit', 'Withdraw', 'Borrow', 'Repay'],
  },
  '10': {
    name: 'Item Shop',
    options: ['Buy', 'Sell'],
  },
  '11': {
    name: 'Church',
    options: ['Pray', 'Donate'],
  },
  '12': {
    name: 'Fortune Teller',
    options: ['Life', 'Career', 'Love', 'Mates'],
  },
};
