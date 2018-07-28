import Assets from './assets';
import Character from './character';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 640 + 32;
canvas.height = 400 + 16 + 32;

const tiles = (x, y) => {
  if (x < 0) {
    x += 2160;
  }

  if (x >= 2160) {
    x -= 2160;
  }

  return Assets.assets.worldMap.tiles[y * 2160 + x] || 0;
};

export default {
  draw: () => {
    const { worldMap } = Assets.assets;
    const tilesetOffset = Math.floor(window.performance.now() / 250) % 31;

    const yStart = Character.position.y + 1 - (canvas.height / 16 / 2);
    const xStart = Character.position.x + 1 - (canvas.width / 16 / 2);

    for (let y = 0; y < canvas.height / 16; y += 1) {
      for (let x = 0; x < canvas.width / 16; x += 1) {
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

    return tilesToCheck.some((tile) => tile >= 50);
  },
};
