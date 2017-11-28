export interface IMap {
  canvas: HTMLCanvasElement;
  buildings: IBuildings;
  buildingAt(position: IPosition): string;
  outOfBoundsAt(position: IPosition): boolean;
  tileCollisionAt(position: IPosition): boolean;
}

export interface IPosition {
  x: number;
  y: number;
}

export interface ICharacter {
  x: number;
  y: number;
  visualX: number;
  visualY: number;
  frame: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  isImmobile: boolean;
  interpolatePosition(percentNextMove: number): void;
  move(direction: string): void;
  undoMove(): void;
  setFrame(direction: string): void;
  randomMovementThrottle(): boolean;
  animate(): void;
  randomDirection(): Direction;
}

export interface ICharacterData {
  frame: number;
  spawn: {
    building: string;
    offset: IPosition;
  };
  isImmobile: boolean;
}

export interface IInput {
  direction: Direction;
}

export interface IBuildings {
  [key: string]: IPosition;
}

export interface IAssets {
  [key: string]: any;
}

export interface ICharacters {
  characters: ICharacter[];
  player: ICharacter;
  update(): void;
}

export interface IPort {
  name: string;
  economy: number;
  industry: number;
  tileset: number;
  tiles: number[];
}

export interface ICollisionIndices {
  leftmost: number;
  rightmost: number;
  full: number;
}

export interface IBuildingIndices {
  [key: string]: number;
}

export interface ICamera {
  update(): void;
  draw(): void;
}

export type Direction = "up" | "down" | "right" | "left" | "";

export interface IAlternativeDestinations {
  direction: Direction;
  step1: IPosition;
  step2: IPosition;
}

export interface IPressedKeys {
  up: boolean;
  right: boolean;
  down: boolean;
  left: boolean;
}
