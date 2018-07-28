const canvas = document.getElementById('camera');

let direction = '';
let cursorDirection = '';
let mousedownIntervals = [];

const disableRightClick = () => {
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
};

const cursorBoundingRectangles = {
  'nw': {
    x: 0,
    x2: 1280 / 2 - 1280 / 4 / 2,
    y: 0,
    y2: 800 / 2 - 800 / 4 / 2,
  },
  'n': {
    x: 1280 / 2 - 1280 / 4 / 2,
    x2: 1280 / 2 + 1280 / 4 / 2,
    y: 0,
    y2: 800 / 2 - 800 / 4 / 2,
  },
  'ne': {
    x: 1280 / 2 + 1280 / 4 / 2,
    x2: 1280,
    y: 0,
    y2: 800 / 2 - 800 / 4 / 2,
  },
  'e': {
    x: 1280 / 2 + 1280 / 4 / 2,
    x2: 1280,
    y: 800 / 2 - 800 / 4 / 2,
    y2: 800 / 2 + 800 / 4 / 2,
  },
  'se': {
    x: 1280 / 2 + 1280 / 4 / 2,
    x2: 1280,
    y: 800 / 2 + 800 / 4 / 2,
    y2: 800,
  },
  's': {
    x: 1280 / 2 - 1280 / 4 / 2,
    x2: 1280 / 2 + 1280 / 4 / 2,
    y: 800 / 2 + 800 / 4 / 2,
    y2: 800,
  },
  'sw': {
    x: 0,
    x2: 1280 / 2 - 1280 / 4 / 2,
    y: 800 / 2 + 800 / 4 / 2,
    y2: 800,
  },
  'w': {
    x: 0,
    x2: 1280 / 2 - 1280 / 4 / 2,
    y: 800 / 2 - 800 / 4 / 2,
    y2: 800 / 2 + 800 / 4 / 2,
  },
};

const setCursorDirection = (e) => {
  const {x, y} = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;

  cursorDirection = 'wheel';

  Object.keys(cursorBoundingRectangles).some((direction) => {
    const {x, x2, y, y2} = cursorBoundingRectangles[direction];

    if (mouseX >= x && mouseX <= x2 && mouseY >= y && mouseY <= y2) {
      cursorDirection = direction;
      return true;
    }
  });

  canvas.style.cursor = `url('/assets/cursor/${cursorDirection}.png') 24 24, auto`;
};

const leftClick = (e) => e.button === 0;

const mouse = (e) => {
  if (leftClick(e)) {
    e.preventDefault();

    if (e.type === 'mousedown') {
      direction = cursorDirection;
      mousedownIntervals.push(window.setInterval(() => direction = cursorDirection, 20));
    }

    if (e.type === 'mouseup') {
      mousedownIntervals.forEach((interval) => window.clearInterval(interval));
      mousedownIntervals = [];
    }
  }
};

disableRightClick();

canvas.addEventListener('mousemove', setCursorDirection);
document.addEventListener('mousedown', mouse);
document.addEventListener('mouseup', mouse);

export default {
  get: () => direction,
};
