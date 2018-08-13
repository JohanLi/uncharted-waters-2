import Assets from '../assets';
import Data from './data';
import State from '../state';

const map = {
  setup: () => {
    map.tilesize = 16;
    map.columns = 96;
    map.rows = 96;
    map.scale = 2;

    const { portId } = State;
    const port = Data.ports[portId];

    map.tilemap = Assets.assets.port.tilemaps.slice(
      portId * 9216 - 9216,
      portId * 9216,
    );

    map.tilesets = Assets.assets.port.tilesets;
    map.tileset = port.tileset;
    map.buildings = port.buildings;
    map.collisionIndices = Data.tilesets[map.tileset].collisionIndices;

    map.canvas = {};
  },
  get: () => {
    const timeOfDay = State.timeOfDay();

    if (!map.canvas[timeOfDay]) {
      map.canvas[timeOfDay] = draw(timeOfDay);
    }

    return map.canvas[timeOfDay];
  },
  buildingAt: position => Object.keys(map.buildings).find((id) => {
    const { x, y } = map.buildings[id];
    return position.x === x && position.y === y;
  }),
  outOfBoundsAt: (position) => {
    const { x, y } = position;
    return (x < 0 || x + 1 >= map.columns) || (y < 0 || y + 1 >= map.rows);
  },
  collisionAt: (position) => {
    const offsetsToCheck = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    return offsetsToCheck.some(({ x, y }, i) => {
      const tile = tiles(position.x + x, position.y + y);

      if (tile >= map.collisionIndices.either) {
        return true;
      }

      if (i === 0) {
        return tile >= map.collisionIndices.left;
      }

      return tile >= map.collisionIndices.right && tile < map.collisionIndices.left;
    });
  },
};

const tiles = (x, y) => map.tilemap[y * map.columns + x];

const draw = (timeOfDay) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  canvas.width = map.columns * map.tilesize * 2;
  canvas.height = map.rows * map.tilesize * 2;

  ctx.imageSmoothingEnabled = false;
  ctx.scale(map.scale, map.scale);

  for (let x = 0; x < map.columns; x += 1) {
    for (let y = 0; y < map.rows; y += 1) {
      ctx.drawImage(
        map.tilesets,
        tiles(x, y) * map.tilesize,
        tilesetOffset(timeOfDay) * map.tilesize,
        map.tilesize,
        map.tilesize,
        x * map.tilesize,
        y * map.tilesize,
        map.tilesize,
        map.tilesize,
      );
    }
  }

  return canvas;
};

const timesOfDay = ['dawn', 'day', 'dusk', 'night'];
const tilesetOffset = timeOfDay => map.tileset * timesOfDay.length + timesOfDay.indexOf(timeOfDay);

export default map;
