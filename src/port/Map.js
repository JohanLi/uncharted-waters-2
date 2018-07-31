import assets from '../assets';
import state from '../state';

export default class Map {
  constructor() {
    this.port = assets.ports.ports[state.portId];
    this.port.tiles = assets.portTilemaps.slice(state.portId * 9216, (state.portId + 1) * 9216);

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
    this.collisionIndices = assets.ports.tilesets[this.port.tileset].collisionIndices;
  }

  setupBuildings() {
    this.buildingCoordinates = {};
    this.buildings = {};
    this.buildingIndices = assets.ports.tilesets[this.port.tileset].buildingIndices;
  }

  draw() {
    const tileset = assets[`tileset${this.port.tileset}`];

    this.port.tiles.forEach((tile, i) => {
      const targetX = (i % this.columns) * this.tilesize;
      const targetY = Math.floor(i / this.columns) * this.tilesize;

      this.context.drawImage(
        tileset,
        tile * this.tilesize, 0,
        this.tilesize, this.tilesize,
        targetX, targetY,
        this.tilesize, this.tilesize,
      );

      this.updateCollision(tile, targetX, targetY);
      this.updateBuilding(tile, targetX, targetY);
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

  updateBuilding(tile, x, y) {
    Object.keys(this.buildingIndices).forEach((key) => {
      if (this.buildingIndices[key] === tile) {
        delete this.buildingIndices[key];

        const entranceX = x - 64;
        const entranceY = y + 32;

        this.buildings[key] = {
          x: entranceX,
          y: entranceY,
        };

        if (!this.buildingCoordinates[entranceX]) {
          this.buildingCoordinates[entranceX] = {};
        }

        this.buildingCoordinates[entranceX][entranceY] = key;
      }
    });
  }
}
