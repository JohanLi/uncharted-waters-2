import Assets from './assets';
import Character from './character';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 640 + 32;
canvas.height = 400 + 16 + 32;

export default {
  draw: () => {
    const { worldMap } = Assets.assets;
    const tilesetOffset = Math.floor(window.performance.now() / 250) % 31;

    const yStart = Character.position.y + 1 - (canvas.height / 16 / 2);
    const xStart = Character.position.x + 1 - (canvas.width / 16 / 2);

    for (let y = 0; y < canvas.height / 16; y += 1) {
      for (let x = 0; x < canvas.width / 16; x += 1) {
        const tile = worldMap.tiles[(yStart + y) * 2160 + xStart + x];
        context.drawImage(
          worldMap.tileset,
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
  collisionAt: (position) => {
    const { tiles } = Assets.assets.worldMap;

    const tilesToCheck = [
      tiles[position.y * 2160 + position.x],
      tiles[position.y * 2160 + position.x + 1],
      tiles[(position.y + 1) * 2160 + position.x],
      tiles[(position.y + 1) * 2160 + position.x + 1]
    ];

    return tilesToCheck.some((tile) => tile >= 50);
  },
};
