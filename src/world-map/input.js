import Camera from './camera';
import EventListener from '../event-listener';
import State from '../state';
import Map from './map';
import Cursors from '../cursors';

let canvas;
let direction = '';
let cursorDirection = '';
let mousedownIntervals = [];

const preventDefault = e => e.preventDefault();

const goAshore = (e) => {
  if (e.key === 'e') {
    const portId = Map.portAdjacentAt();

    if (portId) {
      State.goAshore(portId);
    }
  }
};

const setCursorDirection = (e) => {
  const directionIndex = octantRelativeNw(e);
  cursorDirection = Cursors.update(directionIndex);
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
  setup: () => {
    canvas = Camera.canvas;

    EventListener.add('contextmenu', preventDefault, canvas);

    EventListener.add('mousemove', setCursorDirection, canvas);
    EventListener.add('mousedown', mouse);
    EventListener.add('mouseup', mouse);

    EventListener.add('keyup', goAshore);
  },
  get: () => direction,
};
