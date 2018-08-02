import Assets from './assets';

const canvas = document.getElementById('camera');

let direction = '';
let cursorDirection = '';
let mousedownIntervals = [];
const cursors = [
  { direction: 'nw' },
  { direction: 'n' },
  { direction: 'ne' },
  { direction: 'e' },
  { direction: 'se' },
  { direction: 's' },
  { direction: 'sw' },
  { direction: 'w' },
];

const setup = () => {
  canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  cursorImages();
};

const cursorImages = () => {
  canvas.addEventListener('mousemove', setCursorDirection);
  document.addEventListener('mousedown', mouse);
  document.addEventListener('mouseup', mouse);
  const cursorCanvas = document.createElement('canvas');
  const cursorContext = cursorCanvas.getContext('2d');
  cursorCanvas.width = 48;
  cursorCanvas.height = 48;
  cursorContext.scale(2, 2);
  cursorContext.imageSmoothingEnabled = false;

  cursors.forEach((cursor, i) => {
    cursorContext.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    cursorContext.drawImage(Assets.assets.cursors, i * 24, 0, 24, 24, 0, 0, 24, 24);
    cursor.img = cursorCanvas.toDataURL();
  });
};

const setCursorDirection = (e) => {
  const octant = octantRelativeNw(e);
  cursorDirection = cursors[octant].direction;
  canvas.style.cursor = `url(${cursors[octant].img}) 24 24, auto`;
};

const octantRelativeNw = (e) => {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;

  const mouseXRelativeCenter = mouseX - (canvas.width / 2);
  const mouseYRelativeCenter = -(mouseY - (canvas.height / 2));
  const radiansFromCenterWithNegative = Math.atan2(mouseYRelativeCenter, mouseXRelativeCenter);

  const twoPi = 2 * Math.PI;
  const radiansFromNw = (twoPi - radiansFromCenterWithNegative + Math.PI - (Math.PI / 8)) % twoPi;
  return Math.floor(radiansFromNw / (Math.PI / 4));
};

const mouse = (e) => {
  if (leftClick(e)) {
    e.preventDefault();

    if (e.type === 'mousedown') {
      direction = cursorDirection;
      mousedownIntervals.push(window.setInterval(() => {
        direction = cursorDirection;
      }, 20));
    }

    if (e.type === 'mouseup') {
      mousedownIntervals.forEach(interval => window.clearInterval(interval));
      mousedownIntervals = [];
    }
  }
};

const leftClick = e => e.button === 0;

export default {
  setup,
  get: () => direction,
};
