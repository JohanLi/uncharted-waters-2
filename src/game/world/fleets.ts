import type { Position } from '../../types';
import { START_POSITION_X, START_POSITION_Y } from '../../constants';

export const provisions = ['water', 'food', 'lumber', 'shot'] as const;
export type Provisions = typeof provisions[number];

interface Cargo {
  type: Provisions; // will be both Provisions and Goods
  quantity: number;
}

export interface Ship {
  id: string;
  name: string;
  crew: number;
  cargo: Cargo[];
  durability: number;
}

interface Fleet {
  position: Position | undefined;
  ships: Ship[];
}

export interface Fleets {
  [key: string]: Fleet;
}

export const fleets: Fleets = {
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
  2: {
    position: {
      x: START_POSITION_X - 2,
      y: START_POSITION_Y - 8,
    },
    ships: [
      {
        id: '19',
        name: '',
        crew: 5,
        cargo: [],
        durability: 1,
      },
    ],
  },
  3: {
    position: {
      x: START_POSITION_X,
      y: START_POSITION_Y + 4,
    },
    ships: [
      {
        id: '1',
        name: '',
        crew: 10,
        cargo: [],
        durability: 1,
      },
    ],
  },
};

export interface Sailors {
  [key: string]: {
    navLvl: number;
    seamanship: number;
  };
}

export const sailors: Sailors = {
  1: {
    navLvl: 1,
    seamanship: 75,
  },
};
