import EventListener from '../event-listener';
import Cursors from '../cursors';

export default class Input {
  constructor() {
    this.direction = '';
    this.canvasElement = document.getElementById('camera');
    this.lastMoveTime = {};
    this.pressedKeys = {
      up: false,
      right: false,
      down: false,
      left: false,
    };
    this.keyMap = {
      w: 'n',
      d: 'e',
      s: 's',
      a: 'w',
    };
    this.mouseLeft = 1;
    this.mouseSensitivity = 5;
    this.mouseLastPosition = {
      x: 0,
      y: 0,
    };
    this.mousedownIntervals = [];

    this.setupKeyboard();
    this.setupMouse();
  }

  setupKeyboard() {
    EventListener.add('keydown', this.keyboard.bind(this));
    EventListener.add('keyup', this.keyboard.bind(this));
  }

  setupMouse() {
    this.disableRightClick();

    EventListener.add('mousemove', this.setCursorDirection.bind(this));
    EventListener.add('mousedown', this.mouse.bind(this));
    EventListener.add('mouseup', this.mouse.bind(this));
  }

  preventDefault(e) {
    e.preventDefault();
  }

  disableRightClick() {
    EventListener.add('contextmenu', this.preventDefault, this.canvasElement);
  }

  keyboard(e) {
    const pressedKey = this.keyMap[e.key];

    if (!pressedKey) {
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
      this.direction = pressedKey;
    } else if (this.pressedKeys.n) {
      this.direction = 'n';
    } else if (this.pressedKeys.e) {
      this.direction = 'e';
    } else if (this.pressedKeys.s) {
      this.direction = 's';
    } else if (this.pressedKeys.w) {
      this.direction = 'w';
    } else {
      this.direction = '';
    }

    Cursors.reset();
  }

  setCursorDirection(e) {
    if (this.throttleMovement(20)) {
      return;
    }

    const xDifference = e.clientX - this.mouseLastPosition.x;
    const yDifference = e.clientY - this.mouseLastPosition.y;

    this.mouseLastPosition = {
      x: e.clientX,
      y: e.clientY,
    };

    if (Math.abs(xDifference) < this.mouseSensitivity
      && Math.abs(yDifference) < this.mouseSensitivity) {
      return;
    }

    if (Math.abs(xDifference) >= Math.abs(yDifference)) {
      if (xDifference > 0) {
        this.cursorDirection = 'e';
      }
      if (xDifference < 0) {
        this.cursorDirection = 'w';
      }
    } else {
      if (yDifference > 0) {
        this.cursorDirection = 's';
      }
      if (yDifference < 0) {
        this.cursorDirection = 'n';
      }
    }

    Cursors.update(this.cursorDirection);
  }

  mouse(e) {
    if (e.which === this.mouseLeft) {
      e.preventDefault();

      if (e.type === 'mousedown') {
        this.direction = this.cursorDirection;
        this.mousedownIntervals.push(window.setInterval(() => this.direction = this.cursorDirection, 20));
      }

      if (e.type === 'mouseup') {
        this.direction = '';
        this.mousedownIntervals.forEach((interval) => window.clearInterval(interval));
        this.mousedownIntervals = [];
      }
    }
  }

  throttleMovement(milliseconds) {
    if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds) {
      return true;
    }

    this.lastMoveTime[milliseconds] = window.performance.now();
    return false;
  }
}
