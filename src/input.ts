import { Direction } from './types';

type Wasd = 'w' | 'a' | 's' | 'd';

type PressedKeys = {
  [key in Wasd]: boolean;
};

type KeyMap = {
  [key in Wasd]: Direction;
};

let direction: Direction | '' = '';

const pressedKeys: PressedKeys = {
  w: false,
  d: false,
  s: false,
  a: false,
};

const keyMap: KeyMap = {
  w: 'n',
  d: 'e',
  s: 's',
  a: 'w',
};

const isWasd = (key: string): key is Wasd => {
  return key in keyMap;
}

const keyboard = (e: KeyboardEvent) => {
  const pressedKey = e.key;

  if(!isWasd(pressedKey)) {
    return;
  }

  e.preventDefault();

  if (e.type === 'keydown') {
    pressedKeys[pressedKey] = true;
  }

  if (e.type === 'keyup') {
    pressedKeys[pressedKey] = false;
  }

  if (pressedKeys[pressedKey]) {
    direction = keyMap[pressedKey];
  } else if (pressedKeys.w) {
    direction = 'n';
  } else if (pressedKeys.d) {
    direction = 'e';
  } else if (pressedKeys.s) {
    direction = 's';
  } else if (pressedKeys.a) {
    direction = 'w';
  } else {
    direction = '';
  }
}

document.addEventListener('keydown', keyboard);
document.addEventListener('keyup', keyboard);

const getInput = () => direction;

export default getInput;
