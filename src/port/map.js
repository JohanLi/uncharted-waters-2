import Assets from '../assets';
import state from '../state';

const setupCollision = () => {
  map.collisionCoordinates = {};
  map.collisionIndices = Assets.assets.ports.tilesetCollisionIndices[map.port.tileset];
};

const setupBuildings = () => {
  map.buildingCoordinates = {};
  map.buildings = {};

  Object.keys(map.port.buildings).forEach((key) => {
    const x = map.port.buildings[key].x * map.tilesize;
    // Uncharted Waters 2 treats the top of the character sprite as base, while this remake has not.
    // Will be addressed when refactoring the port code
    const y = (map.port.buildings[key].y + 1) * map.tilesize;

    map.buildings[key] = {
      x,
      y,
    };

    if (!map.buildingCoordinates[x]) {
      map.buildingCoordinates[x] = {};
    }

    map.buildingCoordinates[x][y] = key;
  });
};

const updateCollision = (tile, x, y) => {
  if (tile >= map.collisionIndices.leftmost) {
    if (!map.collisionCoordinates[x]) {
      map.collisionCoordinates[x] = {};
    }

    map.collisionCoordinates[x][y] = tile;
  }
};

const map = {
  setup: () => {
    map.port = Assets.assets.ports[state.portId];
    const portTilemapsFrom = (state.portId - 1) * 9216;
    const portTilemapsTo = state.portId * 9216;
    map.port.tiles = Assets.assets.portTilemaps.slice(portTilemapsFrom, portTilemapsTo);

    map.tilesize = 32;
    map.columns = 96;
    map.rows = 96;

    map.canvas = document.createElement('canvas');
    map.context = map.canvas.getContext('2d');
    map.canvas.width = map.columns * map.tilesize;
    map.canvas.height = map.rows * map.tilesize;

    setupCollision();
    setupBuildings();
    map.draw();
  },
  buildingAt: (position) => {
    return ((map.buildingCoordinates || {})[position.x] || {})[position.y];
  },
  outOfBoundsAt: (position) => {
    return Boolean(
      position.x < 0 || (position.x + 64) - map.tilesize >= map.canvas.width
      || position.y - 32 < 0 || position.y >= map.canvas.height,
    );
  },
  tileCollisionAt: (position) => {
    const collision = ((map.collisionCoordinates || {})[position.x] || {})[position.y];
    const collisionRight = ((map.collisionCoordinates || {})[(position.x + 64) - map.tilesize] || {})[position.y];

    if (collision) {
      const isLeftmost = collision >= map.collisionIndices.leftmost
        && collision < map.collisionIndices.rightmost;
      return !isLeftmost;
    }

    if (collisionRight) {
      const isRightmost = collisionRight >= map.collisionIndices.rightmost
        && collisionRight < map.collisionIndices.full;
      return !isRightmost;
    }

    return false;
  },
  draw: () => {
    map.port.tiles.forEach((tile, i) => {
      const targetX = (i % map.columns) * map.tilesize;
      const targetY = Math.floor(i / map.columns) * map.tilesize;

      map.context.drawImage(
        Assets.assets.tileset,
        tile * map.tilesize,
        map.port.tileset * map.tilesize,
        map.tilesize,
        map.tilesize,
        targetX,
        targetY,
        map.tilesize,
        map.tilesize,
      );

      updateCollision(tile, targetX, targetY);
    });
  },
};

export default map;
