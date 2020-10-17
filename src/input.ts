import { Direction } from './types';

type Wasd = 'w' | 'a' | 's' | 'd';

type PressedKeys = {
  [key in Wasd]: boolean;
};

type KeyMap = {
  [key in Wasd]: Direction;
};

class Input {
  public direction: Direction | '' = '';
  private pressedKeys: PressedKeys = {
    w: false,
    d: false,
    s: false,
    a: false,
  };
  private keyMap: KeyMap = {
    w: 'n',
    d: 'e',
    s: 's',
    a: 'w',
  };

  constructor() {
    document.addEventListener('keydown', this.keyboard.bind(this));
    document.addEventListener('keyup', this.keyboard.bind(this));
  }

  private isWasd(key: string): key is Wasd {
    return key in this.keyMap;
  }

  private keyboard(e: KeyboardEvent) {
    const pressedKey = e.key;

    if(!this.isWasd(pressedKey)) {
      return;
    }

    e.preventDefault();

    if (e.type === 'keydown') {
      this.pressedKeys[pressedKey] = true;
    }

    if (e.type === 'keyup') {
      this.pressedKeys[pressedKey] = false;
    }

    if (this.pressedKeys[pressedKey]) {
      this.direction = this.keyMap[pressedKey];
    } else if (this.pressedKeys.w) {
      this.direction = 'n';
    } else if (this.pressedKeys.d) {
      this.direction = 'e';
    } else if (this.pressedKeys.s) {
      this.direction = 's';
    } else if (this.pressedKeys.a) {
      this.direction = 'w';
    } else {
      this.direction = '';
    }
  }
}

export default new Input();
