import Assets from './assets';

const cursors = {
  'nw': {},
  'n': {},
  'ne': {},
  'e': {},
  'se': {},
  's': {},
  'sw': {},
  'w': {},
};

let camera;

export default {
  setup: () => {
    camera = document.getElementById('camera');

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
  },
  update: (directionOrIndex) => {
    let direction = directionOrIndex;

    if (typeof directionOrIndex === 'number') {
      direction = Object.keys(cursors)[direction];
    }

    camera.style.cursor = `url(${cursors[direction].img}) 24 24, auto`;
    return direction;
  },
  reset: () => {
    camera.style.removeProperty('cursor');
  },
  cursors,
}
