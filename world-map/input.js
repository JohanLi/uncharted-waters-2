import Assets from './assets';

const canvas = document.getElementById('camera');

let direction = '';
let cursorDirection = '';
let mousedownIntervals = [];
let cursors = {};

const setup = () => {
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  setupCursors();
  setupCursorImages();
};

const setupCursors = () => {
  const xHalf = 1280 / 2;
  const xEighth = 1280 / 4 / 2;
  const yHalf = 800 / 2;
  const yEighth = 800 / 4 / 2;

  cursors = {
    'nw': {
      boundingRectangle: {
        x: 0,
        x2: xHalf - xEighth,
        y: 0,
        y2: yHalf - yEighth,
      },
    },
    'n': {
      boundingRectangle: {
        x: xHalf - xEighth,
        x2: xHalf + xEighth,
        y: 0,
        y2: yHalf - yEighth,
      }
    },
    'ne': {
      boundingRectangle: {
        x: xHalf + xEighth,
        x2: 1280,
        y: 0,
        y2: yHalf - yEighth,
      }
    },
    'e': {
      boundingRectangle: {
        x: xHalf + xEighth,
        x2: 1280,
        y: yHalf - yEighth,
        y2: yHalf + yEighth,
      }
    },
    'se': {
      boundingRectangle: {
        x: xHalf + xEighth,
        x2: 1280,
        y: yHalf + yEighth,
        y2: 800,
      }
    },
    's': {
      boundingRectangle: {
        x: xHalf - xEighth,
        x2: xHalf + xEighth,
        y: yHalf + yEighth,
        y2: 800,
      }
    },
    'sw': {
      boundingRectangle: {
        x: 0,
        x2: xHalf - xEighth,
        y: yHalf + yEighth,
        y2: 800,
      }
    },
    'w': {
      boundingRectangle: {
        x: 0,
        x2: xHalf - xEighth,
        y: yHalf - yEighth,
        y2: yHalf + yEighth,
      }
    },
    'wheel': {
      boundingRectangle: {
        x: xHalf - xEighth,
        x2: xHalf + xEighth,
        y: yHalf - yEighth,
        y2: yHalf + yEighth,
      }
    },
  };
};

const setupCursorImages = () => {
  canvas.addEventListener('mousemove', setCursorDirection);
  document.addEventListener('mousedown', mouse);
  document.addEventListener('mouseup', mouse);
  const cursorCanvas = document.createElement('canvas');
  const cursorContext = cursorCanvas.getContext('2d');
  cursorCanvas.width = 48;
  cursorCanvas.height = 48;
  cursorContext.scale(2, 2);
  cursorContext.imageSmoothingEnabled = false;

  Object.keys(cursors).forEach((direction, i) => {
    cursorContext.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    cursorContext.drawImage(Assets.assets.cursors, i * 24, 0, 24, 24, 0, 0, 24, 24);
    cursors[direction].img = cursorCanvas.toDataURL();
  });
};

const setCursorDirection = (e) => {
  const {x, y} = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;

  cursorDirection = 'wheel';

  Object.keys(cursors).some((direction) => {
    const {x, x2, y, y2} = cursors[direction].boundingRectangle;

    if (mouseX >= x && mouseX <= x2 && mouseY >= y && mouseY <= y2) {
      cursorDirection = direction;
      return true;
    }
  });


  canvas.style.cursor = `url(${cursors[cursorDirection].img}) 24 24, auto`;
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

export default {
  setup,
  get: () => direction,
};
