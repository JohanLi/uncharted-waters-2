export interface Position {
  x: number;
  y: number;
}

export type Direction = 'n' | 'e' | 's' | 'w';

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
};
