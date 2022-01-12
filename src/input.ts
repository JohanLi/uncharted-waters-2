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

let pressedKeys: Wasd[] = [];

const isWasd = (key: string): key is Wasd => key in cardinalKeyMap;

const onKeydown = (e: KeyboardEvent) => {
  const pressedKey = e.key;

  if (!isWasd(pressedKey)) {
    return;
  }

  if (!pressedKeys.includes(pressedKey)) {
    pressedKeys.unshift(pressedKey);
  }
};

const onKeyup = (e: KeyboardEvent) => {
  const pressedKey = e.key;

  if (!isWasd(pressedKey)) {
    return;
  }

  pressedKeys = pressedKeys.filter((key) => key !== pressedKey);
};

const Input = {
  setup: () => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);
  },
  get: (options: { includeOrdinal: boolean }): Direction | '' => {
    if (!pressedKeys.length) {
      return '';
    }

    if (options.includeOrdinal && pressedKeys.length > 1) {
      const direction =
        ordinalKeyMap[pressedKeys[0]]?.[pressedKeys[1]] ||
        ordinalKeyMap[pressedKeys[1]]?.[pressedKeys[0]];

      if (direction) {
        return direction;
      }
    }

    return cardinalKeyMap[pressedKeys[0]];
  },
};

export default Input;
