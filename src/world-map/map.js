import Assets from '../assets';
import Character from './character';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = (640 + 32) * 2;
canvas.height = (400 + 16 + 32) * 2;

context.imageSmoothingEnabled = false;
context.scale(2, 2);

const tiles = (x, y) => {
  let adjustedX = x;

  if (x < 0) {
    adjustedX += 2160;
  }

  if (x >= 2160) {
    adjustedX -= 2160;
  }

  return Assets.assets.worldMap.tiles[y * 2160 + adjustedX] || 0;
};

export default {
  draw: () => {
    const tilesetOffset = Math.floor(window.performance.now() / 250) % 31;

    let yStart = Character.position.y + 1 - (canvas.height / 32 / 2);
    const xStart = Character.position.x + 1 - (canvas.width / 32 / 2);

    if (yStart < 0) {
      yStart = 0;
    }

    if (yStart >= 1080 - canvas.height / 32) {
      yStart = 1080 - canvas.height / 32;
    }

    for (let y = 0; y < canvas.height / 32; y += 1) {
      for (let x = 0; x < canvas.width / 32; x += 1) {
        const tile = tiles(xStart + x, yStart + y);
        context.drawImage(
          Assets.assets.worldMap.tileset,
          tile * 16,
          tilesetOffset * 16,
          16,
          16,
          x * 16,
          y * 16,
          16,
          16,
        );
      }
    }

    return canvas;
  },
  collisionAt: ({ x, y }) => {
    const tilesToCheck = [
      tiles(x, y),
      tiles(x + 1, y),
      tiles(x, y + 1),
      tiles(x + 1, y + 1),
    ];

    return tilesToCheck.some(tile => tile >= 50);
  },
  portAdjacentAt: () => {
    const x = Character.position.x;
    const y = Character.position.y;

    const ports = Assets.assets.ports;

    return Object.keys(ports).find((portId) => {
      const deltaX = Math.abs(ports[portId].x - x);
      const deltaY = Math.abs(ports[portId].y - y);

      return deltaX + deltaY <= 3 && deltaX < 3 && deltaY < 3;
    });
  },
};
