export interface Position {
  x: number;
  y: number;
}

export type Direction = CardinalDirection | OrdinalDirection;

export type CardinalDirection = 'n' | 'e' | 's' | 'w';

export type OrdinalDirection = 'ne' | 'se' | 'sw'  | 'nw';

interface Changes {
  xDelta: number;
  yDelta: number;
  frameOffset: number;
}

export const directionToChanges: { [key in Direction]: Changes } = {
  n: {
    xDelta: 0,
    yDelta: -1,
    frameOffset: 0,
  },
  e: {
    xDelta: 1,
    yDelta: 0,
    frameOffset: 2,
  },
  s: {
    xDelta: 0,
    yDelta: 1,
    frameOffset: 4,
  },
  w: {
    xDelta: -1,
    yDelta: 0,
    frameOffset: 6,
  },
  ne: {
    xDelta: 1,
    yDelta: -1,
    frameOffset: 2,
  },
  se: {
    xDelta: 1,
    yDelta: 1,
    frameOffset: 2,
  },
  sw: {
    xDelta: -1,
    yDelta: 1,
    frameOffset: 6,
  },
  nw: {
    xDelta: -1,
    yDelta: -1,
    frameOffset: 6,
  },
};
