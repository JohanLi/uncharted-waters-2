export default class Input {

  constructor() {
    this.gameElement = document.getElementById('app');
    this.direction = '';
    this.lastMoveTime = {};

    this.setupKeyboard();
    this.setupMouse();
  }

  setupKeyboard() {
    this.pressedKeys = {};
    this.keyMap = {
      87: 'up',
      68: 'right',
      83: 'down',
      65: 'left'
    };

    document.addEventListener('keydown', this.keyboard.bind(this));
    document.addEventListener('keyup', this.keyboard.bind(this));
  }

  setupMouse() {
    this.mouseLeft = 1;
    this.mouseSensitivity = 5;
    this.mouseLastPosition = {};

    this.gameElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    document.addEventListener('mousemove', this.setCursorDirection.bind(this));
    document.addEventListener('mousedown', this.mouse.bind(this));
    document.addEventListener('mouseup', this.mouse.bind(this));
  }

  keyboard(e) {
    const key = this.keyMap[e.keyCode];

    if (!key) {
      return;
    }

    e.preventDefault();

    if (e.type === 'keydown') {
      this.pressedKeys[key] = true;
      this.pressedKeys.last = key;
    }

    if (e.type === 'keyup') {
      this.pressedKeys[key] = false;
    }

    if (this.pressedKeys[this.pressedKeys.last]) {
      this.direction = this.pressedKeys.last;
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
      y: e.clientY
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
      this.gameElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.gameElement.classList.add(`cursor-${this.cursorDirection}`);
      this.lastCursorDirection = this.cursorDirection;
    }
  }

  hideCursor() {
    if (this.lastCursorDirection) {
      this.gameElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.lastCursorDirection = '';
    }
  }

  mouse(e) {
    if (e.which === this.mouseLeft) {
      e.preventDefault();

      if (e.type === 'mousedown') {
        this.mouseSetDirection();
        this.mousedownInterval = setInterval(this.mouseSetDirection.bind(this), 20);
      }

      if (e.type === 'mouseup') {
        this.direction = '';
        clearInterval(this.mousedownInterval);
      }
    }
  }

  mouseSetDirection() {
    this.direction = this.cursorDirection;
  }

  throttleMovement(milliseconds) {
    if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds) { return true; }

    this.lastMoveTime[milliseconds] = window.performance.now();
    return false;
  }

}
