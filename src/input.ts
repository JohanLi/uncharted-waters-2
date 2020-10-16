import { direction } from './types';

type wasd = 'w' | 'a' | 's' | 'd';

interface Input {
  direction: direction | '';
  pressedKeys: {
    [key in wasd]: boolean;
  };
  keyMap: {
    [key in wasd]: direction;
  };
  setup: () => void;
}

const input = <Input>{
  direction: '',
  pressedKeys: {
    w: false,
    d: false,
    s: false,
    a: false,
  },
  keyMap: {
    w: 'n',
    d: 'e',
    s: 's',
    a: 'w',
  },
  setup: () => {
    document.addEventListener('keydown', keyboard);
    document.addEventListener('keyup', keyboard);
  },
};

const isWasd = (key: string): key is wasd => key in input.keyMap;

const keyboard = (e: KeyboardEvent) => {
  const pressedKey = e.key;

  if(!isWasd(pressedKey)) {
    return;
  }

  e.preventDefault();

  if (e.type === 'keydown') {
    input.pressedKeys[pressedKey] = true;
  }

  if (e.type === 'keyup') {
    input.pressedKeys[pressedKey] = false;
  }

  if (input.pressedKeys[pressedKey]) {
    input.direction = input.keyMap[pressedKey];
  } else if (input.pressedKeys.w) {
    input.direction = 'n';
  } else if (input.pressedKeys.d) {
    input.direction = 'e';
  } else if (input.pressedKeys.s) {
    input.direction = 's';
  } else if (input.pressedKeys.a) {
    input.direction = 'w';
  } else {
    input.direction = '';
  }
};

export default input;
