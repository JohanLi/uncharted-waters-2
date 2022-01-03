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

let pressedKeys: Wasd[] = [];

const isWasd = (key: string): key is Wasd => {
  return key in cardinalKeyMap;
}

const keyboard = (e: KeyboardEvent) => {
  const pressedKey = e.key;

  if(!isWasd(pressedKey)) {
    return;
  }

  e.preventDefault();

  if (e.type === 'keydown') {
    if (!pressedKeys.includes(pressedKey)) {
      pressedKeys.unshift(pressedKey);
    }
  }

  if (e.type === 'keyup') {
    pressedKeys = pressedKeys.filter((key) => key !== pressedKey);
  }
}

document.addEventListener('keydown', keyboard);
document.addEventListener('keyup', keyboard);

const getInput = (options: { includeOrdinal: boolean }): Direction | '' => {
  if (!pressedKeys.length) {
    return '';
  }

  if (options.includeOrdinal && pressedKeys.length > 1) {
    const direction = ordinalKeyMap[pressedKeys[0]]?.[pressedKeys[1]] || ordinalKeyMap[pressedKeys[1]]?.[pressedKeys[0]];

    if (direction) {
      return direction;
    }
  }

  return cardinalKeyMap[pressedKeys[0]];
};

export default getInput;
