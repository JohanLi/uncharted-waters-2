import { Ship } from './fleets';
import { Position } from '../types';
import { PortPlayer } from '../port/portPlayer';
import { PortNpc } from '../port/portNpc';

export const getHeadingWindDelta = (d1: number, d2: number) => {
  const delta = Math.abs(d1 - d2);

  if (delta > 4) {
    return 8 - delta;
  }

  return delta;
};

export const hasOars = (ship: Ship) => ship.id >= 19;

export const getXWrapAround = (x: number) => {
  if (x < 0) {
    return x + 2160;
  }

  if (x >= 2160) {
    return x - 2160;
  }

  return x;
};

export const getFromToAccountingForWrapAround = (x1: number, x2: number) => {
  const fromTo = x2 - x1;

  if (fromTo > 2160 / 2) {
    return fromTo - 2160;
  }

  if (-fromTo > 2160 / 2) {
    return fromTo + 2160;
  }

  return fromTo;
};

export const TILE_SIZE = 32;

export const drawCharacter = (
  context: CanvasRenderingContext2D,
  spritesheet: HTMLCanvasElement,
  character: PortPlayer | PortNpc,
  camera: Position,
  percentNextMove: number,
) => {
  const { x, y } = character.position(percentNextMove);

  context.drawImage(
    spritesheet,
    character.frame() * character.width * TILE_SIZE,
    0,
    character.width * TILE_SIZE,
    character.height * TILE_SIZE,
    // port characters do not need the wraparound check
    Math.floor(getFromToAccountingForWrapAround(camera.x, x) * TILE_SIZE),
    Math.floor((y - camera.y) * TILE_SIZE),
    character.width * TILE_SIZE,
    character.height * TILE_SIZE,
  );
};
