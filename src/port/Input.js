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
      w: 'up',
      d: 'right',
      s: 'down',
      a: 'left',
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
    document.addEventListener('keydown', this.keyboard.bind(this));
    document.addEventListener('keyup', this.keyboard.bind(this));
  }

  setupMouse() {
    this.disableRightClick();

    document.addEventListener('mousemove', this.setCursorDirection.bind(this));
    document.addEventListener('mousedown', this.mouse.bind(this));
    document.addEventListener('mouseup', this.mouse.bind(this));
  }

  disableRightClick() {
    this.canvasElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
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
    } else if (this.pressedKeys.up) {
      this.direction = 'up';
    } else if (this.pressedKeys.right) {
      this.direction = 'right';
    } else if (this.pressedKeys.down) {
      this.direction = 'down';
    } else if (this.pressedKeys.left) {
      this.direction = 'left';
    } else {
      this.direction = '';
    }

    this.hideCursor();
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
        this.cursorDirection = 'right';
      }
      if (xDifference < 0) {
        this.cursorDirection = 'left';
      }
    } else {
      if (yDifference > 0) {
        this.cursorDirection = 'down';
      }
      if (yDifference < 0) {
        this.cursorDirection = 'up';
      }
    }

    this.updateCursor();
  }

  updateCursor() {
    if (this.lastCursorDirection !== this.cursorDirection) {
      this.canvasElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.canvasElement.classList.add(`cursor-${this.cursorDirection}`);
      this.lastCursorDirection = this.cursorDirection;
    }
  }

  hideCursor() {
    if (this.lastCursorDirection) {
      this.canvasElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.lastCursorDirection = '';
    }
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
