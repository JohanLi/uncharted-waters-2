import assets from "../assets";
import state from "../state";

import { IBuildings, IPort, ICollisionIndices, IBuildingIndices, IAssets, IPosition, ICharacter } from "../types";

export default class Map {
  public canvas: HTMLCanvasElement;
  public buildings: IBuildings;
  private port: IPort;
  private tilesize: number = 32;
  private columns: number = 96;
  private rows: number = 96;
  private context: CanvasRenderingContext2D;
  private collisionIndices: ICollisionIndices;
  private buildingIndices: IBuildingIndices;
  private collisionCoordinates: {[key: number]: {[key: number]: number}};
  private buildingCoordinates: {[key: number]: {[key: number]: string}};

  constructor() {
    this.port = assets.ports.ports[state.portId];

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.columns * this.tilesize;
    this.canvas.height = this.rows * this.tilesize;

    this.setupCollision();
    this.setupBuildings();
    this.draw();
  }

  public buildingAt(position: IPosition): string {
    return ((this.buildingCoordinates || {})[position.x] || {})[position.y];
  }

  public outOfBoundsAt(position: IPosition) {
    return Boolean(
      position.x < 0 || (position.x + 64) - this.tilesize >= this.canvas.width
      || position.y - 32 < 0 || position.y >= this.canvas.height,
    );
  }

  public tileCollisionAt(position: IPosition) {
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

  private setupCollision() {
    this.collisionCoordinates = {};
    this.collisionIndices = assets.ports.tilesets[this.port.tileset].collisionIndices;
  }

  private setupBuildings() {
    this.buildingCoordinates = {};
    this.buildings = {};
    this.buildingIndices = assets.ports.tilesets[this.port.tileset].buildingIndices;
  }

  private draw() {
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

  private updateCollision(tile: number, x: number, y: number) {
    if (tile >= this.collisionIndices.leftmost) {
      if (!this.collisionCoordinates[x]) {
        this.collisionCoordinates[x] = {};
      }

      this.collisionCoordinates[x][y] = tile;
    }
  }

  private updateBuilding(tile: number, x: number, y: number) {
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
