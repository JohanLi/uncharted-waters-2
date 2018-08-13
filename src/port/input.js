import EventListener from '../event-listener';
import Cursors from '../cursors';

const setupKeyboard = () => {
  EventListener.add('keydown', keyboard);
  EventListener.add('keyup', keyboard);
};

const setupMouse = () => {
  disableRightClick();

  EventListener.add('mousemove', setCursorDirection);
  EventListener.add('mousedown', mouse);
  EventListener.add('mouseup', mouse);
};

const disableRightClick = () => {
  EventListener.add('contextmenu', preventDefault, input.canvasElement);
};

const preventDefault = (e) => {
  e.preventDefault();
};

const keyboard = (e) => {
  const pressedKey = input.keyMap[e.key];

  if (!pressedKey) {
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
    input.direction = pressedKey;
  } else if (input.pressedKeys.n) {
    input.direction = 'n';
  } else if (input.pressedKeys.e) {
    input.direction = 'e';
  } else if (input.pressedKeys.s) {
    input.direction = 's';
  } else if (input.pressedKeys.w) {
    input.direction = 'w';
  } else {
    input.direction = '';
  }

  Cursors.reset();
};

const setCursorDirection = (e) => {
  if (throttleMovement(20)) {
    return;
  }

  const xDifference = e.clientX - input.mouseLastPosition.x;
  const yDifference = e.clientY - input.mouseLastPosition.y;

  input.mouseLastPosition = {
    x: e.clientX,
    y: e.clientY,
  };

  if (Math.abs(xDifference) < input.mouseSensitivity
    && Math.abs(yDifference) < input.mouseSensitivity) {
    return;
  }

  if (Math.abs(xDifference) >= Math.abs(yDifference)) {
    if (xDifference > 0) {
      input.cursorDirection = 'e';
    }
    if (xDifference < 0) {
      input.cursorDirection = 'w';
    }
  } else {
    if (yDifference > 0) {
      input.cursorDirection = 's';
    }
    if (yDifference < 0) {
      input.cursorDirection = 'n';
    }
  }

  Cursors.update(input.cursorDirection);
};

const mouse = (e) => {
  if (e.which === input.mouseLeft) {
    e.preventDefault();

    if (e.type === 'mousedown') {
      input.direction = input.cursorDirection;
      input.mousedownIntervals.push(
        window.setInterval(() => {
          input.direction = input.cursorDirection;
        }, 20),
      );
    }

    if (e.type === 'mouseup') {
      input.direction = '';
      input.mousedownIntervals.forEach(interval => window.clearInterval(interval));
      input.mousedownIntervals = [];
    }
  }
};

const throttleMovement = (milliseconds) => {
  if (window.performance.now() - input.lastMoveTime[milliseconds] < milliseconds) {
    return true;
  }

  input.lastMoveTime[milliseconds] = window.performance.now();
  return false;
};

const input = {
  setup: () => {
    input.direction = '';
    input.canvasElement = document.getElementById('camera');
    input.lastMoveTime = {};
    input.pressedKeys = {
      up: false,
      right: false,
      down: false,
      left: false,
    };
    input.keyMap = {
      w: 'n',
      d: 'e',
      s: 's',
      a: 'w',
    };
    input.mouseLeft = 1;
    input.mouseSensitivity = 5;
    input.mouseLastPosition = {
      x: 0,
      y: 0,
    };
    input.mousedownIntervals = [];

    setupKeyboard();
    setupMouse();
  },
};

export default input;
