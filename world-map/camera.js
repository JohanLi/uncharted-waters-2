import Map from './map';
import Assets from './assets';
import Character from './character';
import PercentNextMove from './percent-next-move';

const canvas = document.getElementById('camera');
const context = canvas.getContext('2d');

context.imageSmoothingEnabled = false;

let map;

export default {
  update: () => {
    if (!map || PercentNextMove.percentNextMove === 0) {
      map = Map.draw();
    }

    context.drawImage(
      map,
      16 + Math.floor((Character.position.toX - Character.position.x) * 16 * PercentNextMove.percentNextMove),
      16 + Math.floor((Character.position.toY - Character.position.y) * 16 * PercentNextMove.percentNextMove) + (16 / 2),
      640,
      400,
      0,
      0,
      640 * 2,
      400 * 2,
    );

    const directionToOffset = {
      up: 0,
      right: 2,
      down: 4,
      left: 6,
    };

    context.drawImage(
      Assets.assets.worldMap.tilesetShips,
      (directionToOffset[Character.tileset.direction] + Character.tileset.frame) * 32,
      0,
      32,
      32,
      (1280 / 2) - (64 / 2),
      (800 / 2) - (64 / 2),
      32 * 2,
      32 * 2,
    );
  },
};
