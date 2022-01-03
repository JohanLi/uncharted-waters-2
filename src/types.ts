export interface Position {
  x: number;
  y: number;
}

export type Direction = CardinalDirection | OrdinalDirection;

export type CardinalDirection = 'n' | 'e' | 's' | 'w';

export type OrdinalDirection = 'ne' | 'se' | 'sw'  | 'nw';

type DirectionToChanges = {
  [key in Direction]: {
    xDelta: number;
    yDelta: number;
    frameOffset: number;
  }
}

export const directionToChanges: DirectionToChanges = {
  n: {
    xDelta: 0,
    yDelta: -1,
    frameOffset: -4,
  },
  e: {
    xDelta: 1,
    yDelta: 0,
    frameOffset: -2,
  },

  s: {
    xDelta: 0,
    yDelta: 1,
    frameOffset: 0,
  },
  w: {
    xDelta: -1,
    yDelta: 0,
    frameOffset: 2,
  },
  ne: {
    xDelta: 1,
    yDelta: -1,
    frameOffset: -2,
  },
  se: {
    xDelta: 1,
    yDelta: 1,
    frameOffset: -2,
  },
  sw: {
    xDelta: -1,
    yDelta: 1,
    frameOffset: 2,
  },
  nw: {
    xDelta: -1,
    yDelta: -1,
    frameOffset: 2,
  },
};
