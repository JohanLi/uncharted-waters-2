import { START_POSITION_X, START_POSITION_Y } from '../constants';

type CargoType = 'water' | 'food' | 'lumber' | 'shot';

interface Cargo {
  type: CargoType;
  quantity: number;
}

export interface Ship {
  id: number;
  crew: number;
  cargo: Cargo[];
}

export interface Fleet {
  position: {
    x: number;
    y: number;
  };
  ships: Ship[];
}

export const fleets: Fleet[] = [
  {
    position: {
      x: START_POSITION_X,
      y: START_POSITION_Y,
    },
    ships: [
      {
        id: 1,
        crew: 10,
        cargo: [
          {
            type: 'water',
            quantity: 40,
          },
          {
            type: 'food',
            quantity: 40,
          },
        ],
      },
    ],
  },
  {
    position: {
      x: START_POSITION_X - 2,
      y: START_POSITION_Y - 8,
    },
    ships: [
      {
        id: 2,
        crew: 5,
        cargo: [],
      },
    ],
  },
  {
    position: {
      x: START_POSITION_X,
      y: START_POSITION_Y + 4,
    },
    ships: [
      {
        id: 1,
        crew: 10,
        cargo: [],
      },
    ],
  },
];
