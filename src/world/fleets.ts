import type { Position } from '../types';
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
        id: 1,
        crew: 10,
        cargo: [
          {
            type: 'water',
            quantity: 20,
          },
          {
            type: 'food',
            quantity: 20,
          },
        ],
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
        id: 19,
        crew: 5,
        cargo: [],
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
        id: 1,
        crew: 10,
        cargo: [],
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
