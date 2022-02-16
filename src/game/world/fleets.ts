import type { Position } from '../../types';

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
  sailorId: string;
}

interface Fleet {
  position: Position | undefined;
  ships: Ship[];
}

export interface Fleets {
  [key: string]: Fleet;
}

export const fleets: Fleets = {
  '1': {
    position: undefined,
    ships: [],
  },
};
