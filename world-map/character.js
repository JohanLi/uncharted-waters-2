import Input from './input';
import Map from './map';
import PercentNextMove from './percent-next-move';

const directionToMetadata = {
  nw: {
    deltaX: -1,
    deltaY: -1,
    tilesetDirection: 'left',
    alternateDirections: ['w', 'n'],
  },
  n: {
    deltaX: 0,
    deltaY: -1,
    tilesetDirection: 'up',
    alternateDirections: ['ne', 'nw'],
  },
  ne: {
    deltaX: 1,
    deltaY: -1,
    tilesetDirection: 'right',
    alternateDirections: ['n', 'e'],
  },
  e: {
    deltaX: 1,
    deltaY: 0,
    tilesetDirection: 'right',
    alternateDirections: ['ne', 'se'],
  },
  se: {
    deltaX: 1,
    deltaY: 1,
    tilesetDirection: 'right',
    alternateDirections: ['e', 's'],
  },
  s: {
    deltaX: 0,
    deltaY: 1,
    tilesetDirection: 'down',
    alternateDirections: ['se', 'sw'],
  },
  sw: {
    deltaX: -1,
    deltaY: 1,
    tilesetDirection: 'left',
    alternateDirections: ['s', 'w'],
  },
  w: {
    deltaX: -1,
    deltaY: 0,
    tilesetDirection: 'left',
    alternateDirections: ['sw', 'nw'],
  },
};

const position = {
  x: 838,
  y: 358,
  toX: 838,
  toY: 358,
};

const tileset = {
  offset: 0,
  direction: 'up',
  frame: 0,
};

const isMoving = () => position.toX !== position.x || position.toY !== position.y;

export default {
  update: () => {
    if (PercentNextMove.percentNextMove !== 0) {
      return;
    }

    if (isMoving()) {
      position.x = position.toX;
      position.y = position.toY;

      if (position.x < 0) {
        position.x += 2160;
      }

      if (position.x >= 2160) {
        position.x -= 2160;
      }
    }

    tileset.frame = tileset.frame ? 0 : 1;

    const inputDirection = Input.get();
    const directionMetadata = directionToMetadata[inputDirection];

    if (!directionMetadata) {
      return;
    }

    tileset.direction = directionMetadata.tilesetDirection;

    const directionPossible = [inputDirection, ...directionMetadata.alternateDirections]
      .some((direction) => {
        const { deltaX, deltaY } = directionToMetadata[direction];

        position.toX = position.x + deltaX;
        position.toY = position.y + deltaY;

        return !Map.collisionAt({ x: position.toX, y: position.toY });
      });


    if (!directionPossible) {
      position.toX = position.x;
      position.toY = position.y;
    }
  },
  position,
  tileset,
};
