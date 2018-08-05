import Assets from '../assets';
import state from '../state';

export default class Map {
  constructor() {
    this.port = Assets.assets.ports[state.portId];
    const portTilemapsFrom = (state.portId - 1) * 9216;
    const portTilemapsTo = state.portId * 9216;
    this.port.tiles = Assets.assets.portTilemaps.slice(portTilemapsFrom, portTilemapsTo);

    this.tilesize = 32;
    this.columns = 96;
    this.rows = 96;

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.columns * this.tilesize;
    this.canvas.height = this.rows * this.tilesize;

    this.setupCollision();
    this.setupBuildings();
    this.draw();
  }

  buildingAt(position) {
    return ((this.buildingCoordinates || {})[position.x] || {})[position.y];
  }

  outOfBoundsAt(position) {
    return Boolean(
      position.x < 0 || (position.x + 64) - this.tilesize >= this.canvas.width
      || position.y - 32 < 0 || position.y >= this.canvas.height,
    );
  }

  tileCollisionAt(position) {
    const collision = ((this.collisionCoordinates || {})[position.x] || {})[position.y];
    const collisionRight = ((this.collisionCoordinates || {})[(position.x + 64) - this.tilesize] || {})[position.y];

    if (collision) {
      const isLeftmost = collision >= this.collisionIndices.leftmost
        && collision < this.collisionIndices.rightmost;
      return !isLeftmost;
    }

    if (collisionRight) {
      const isRightmost = collisionRight >= this.collisionIndices.rightmost
        && collisionRight < this.collisionIndices.full;
      return !isRightmost;
    }

    return false;
  }

  setupCollision() {
    this.collisionCoordinates = {};
    this.collisionIndices = Assets.assets.ports.tilesetCollisionIndices[this.port.tileset];
  }

  setupBuildings() {
    this.buildingCoordinates = {};
    this.buildings = {};

    Object.keys(this.port.buildings).forEach((key) => {
      const x = this.port.buildings[key].x * this.tilesize;
      // Uncharted Waters 2 treats the top of the character sprite as base, while this remake has not.
      // Will be addressed when refactoring the port code
      const y = (this.port.buildings[key].y + 1) * this.tilesize;

      this.buildings[key] = {
        x,
        y,
      };

      if (!this.buildingCoordinates[x]) {
        this.buildingCoordinates[x] = {};
      }

      this.buildingCoordinates[x][y] = key;
    });
  }

  draw() {
    this.port.tiles.forEach((tile, i) => {
      const targetX = (i % this.columns) * this.tilesize;
      const targetY = Math.floor(i / this.columns) * this.tilesize;

      this.context.drawImage(
        Assets.assets.tileset,
        tile * this.tilesize,
        this.port.tileset * this.tilesize,
        this.tilesize,
        this.tilesize,
        targetX,
        targetY,
        this.tilesize,
        this.tilesize,
      );

      this.updateCollision(tile, targetX, targetY);
    });
  }

  updateCollision(tile, x, y) {
    if (tile >= this.collisionIndices.leftmost) {
      if (!this.collisionCoordinates[x]) {
        this.collisionCoordinates[x] = {};
      }

      this.collisionCoordinates[x][y] = tile;
    }
  }
}
