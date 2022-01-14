import { WORLD_MAP_COLUMNS } from '../constants';
import type { WorldPlayer } from './worldPlayer';
import type { PortPlayer } from '../port/portPlayer';
import type { Map } from '../map';
import type { Position } from '../types';
import type { PortNpc } from '../port/portNpc';

export const getXWrapAround = (x: number) => {
  if (x < 0) {
    return x + WORLD_MAP_COLUMNS;
  }

  if (x >= WORLD_MAP_COLUMNS) {
    return x - WORLD_MAP_COLUMNS;
  }

  return x;
};

export const getCameraPosition = (
  player: WorldPlayer | PortPlayer,
  camera: { width: number; height: number },
  map: Map,
  percentNextMove: number,
  xWrapAround: boolean,
): Position => {
  const { x, y } = player.position(percentNextMove);

  const cameraCenterX = x + player.width / 2;
  const cameraCenterY = y + player.height / 2;

  let positionX;

  if (xWrapAround) {
    positionX = getXWrapAround(cameraCenterX - camera.width / 2);
  } else {
    positionX = Math.max(cameraCenterX - camera.width / 2, 0);
    positionX = Math.min(positionX, map.tilemapColumns - camera.width);
  }

  let positionY = Math.max(cameraCenterY - camera.height / 2, 0);
  positionY = Math.min(positionY, map.tilemapRows - camera.height);

  return {
    x: positionX,
    y: positionY,
  };
};

export const getFromToAccountingForWrapAround = (x1: number, x2: number) => {
  const fromTo = x2 - x1;

  if (fromTo > WORLD_MAP_COLUMNS / 2) {
    return fromTo - WORLD_MAP_COLUMNS;
  }

  if (-fromTo > WORLD_MAP_COLUMNS / 2) {
    return fromTo + WORLD_MAP_COLUMNS;
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
