import { CardinalDirection, Direction, OrdinalDirection } from './types';

type Wasd = 'w' | 'a' | 's' | 'd';

const cardinalKeyMap: { [key in Wasd]: CardinalDirection } = {
  w: 'n',
  d: 'e',
  s: 's',
  a: 'w',
};

const ordinalKeyMap: {
  [key: string]: {
    [key: string]: OrdinalDirection;
  };
} = {
  w: {
    d: 'ne',
    a: 'nw',
  },
  s: {
    d: 'se',
    a: 'sw',
  },
};

export const directionMap: { [key in Direction | '']: number } = {
  n: 0,
  ne: 1,
  e: 2,
  se: 3,
  s: 4,
  sw: 5,
  w: 6,
  nw: 7,
  '': 8,
};

const isWasd = (key: string): key is Wasd => key in cardinalKeyMap;

let pressedWasd: Wasd[] = [];

let pressedE = false;

const onKeydown = (e: KeyboardEvent) => {
  const pressedKey = e.key.toLowerCase();

  if (isWasd(pressedKey)) {
    if (!pressedWasd.includes(pressedKey)) {
      pressedWasd.unshift(pressedKey);
    }
  }
};

const onKeyup = (e: KeyboardEvent) => {
  const pressedKey = e.key.toLowerCase();

  if (isWasd(pressedKey)) {
    pressedWasd = pressedWasd.filter((key) => key !== pressedKey);
  }

  if (pressedKey === 'e') {
    pressedE = true;
  }
};

const Input = {
  setup: () => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);
  },
  getDirection: (options: { includeOrdinal: boolean }): Direction | '' => {
    if (!pressedWasd.length) {
      return '';
    }

    if (options.includeOrdinal && pressedWasd.length > 1) {
      const direction =
        ordinalKeyMap[pressedWasd[0]]?.[pressedWasd[1]] ||
        ordinalKeyMap[pressedWasd[1]]?.[pressedWasd[0]];

      if (direction) {
        return direction;
      }
    }

    return cardinalKeyMap[pressedWasd[0]];
  },
  getPressedE: () => {
    if (pressedE) {
      pressedE = false;
      return true;
    }

    return false;
  },
  reset: () => {
    pressedWasd = [];
    pressedE = false;
  },
};

export default Input;
