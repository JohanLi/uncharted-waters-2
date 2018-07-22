import input from './input';
import collision from './collision';

const directionToMetadata = {
  'nw': {
    deltaX: -1,
    deltaY: -1,
    tilesetDirection: 'left',
    alternateDirections: ['w', 'n'],
  },
  'n': {
    deltaX: 0,
    deltaY: -1,
    tilesetDirection: 'up',
    alternateDirections: ['ne', 'nw'],
  },
  'ne': {
    deltaX: 1,
    deltaY: -1,
    tilesetDirection: 'right',
    alternateDirections: ['n', 'e'],
  },
  'e': {
    deltaX: 1,
    deltaY: 0,
    tilesetDirection: 'right',
    alternateDirections: ['ne', 'se'],
  },
  'se': {
    deltaX: 1,
    deltaY: 1,
    tilesetDirection: 'right',
    alternateDirections: ['e', 's'],
  },
  's': {
    deltaX: 0,
    deltaY: 1,
    tilesetDirection: 'down',
    alternateDirections: ['se', 'sw'],
  },
  'sw': {
    deltaX: -1,
    deltaY: 1,
    tilesetDirection: 'left',
    alternateDirections: ['s', 'w'],
  },
  'w': {
    deltaX: -1,
    deltaY: 0,
    tilesetDirection: 'left',
    alternateDirections: ['sw', 'nw'],
  },
};

const character = {
  update: (percentNextMove, tiles) => {
    if (percentNextMove !== 0) {
      return;
    }

    if (character.isMoving()) {
      character.position.x = character.position.toX;
      character.position.y = character.position.toY;

      if (character.position.x < 0) {
        character.position.x = 2160 + character.position.x;
      }

      if (character.position.x > 2160) {
        character.position.x = character.position.x - 2160;
      }
    }

    character.tileset.frame = character.tileset.frame ? 0 : 1;

    const inputDirection = input();
    const directionMetadata = directionToMetadata[inputDirection];

    if (!directionMetadata) {
      return;
    }

    character.tileset.direction = directionMetadata.tilesetDirection;

    const noCollision = [inputDirection, ...directionMetadata.alternateDirections].some((direction) => {
      const directionMetadata = directionToMetadata[direction];

      character.position.toX = character.position.x + directionMetadata.deltaX;
      character.position.toY = character.position.y + directionMetadata.deltaY;

      if (!collision(tiles, { x: character.position.toX, y: character.position.toY })) {
        return true;
      }
    });

    if (!noCollision) {
      character.position.toX = character.position.x;
      character.position.toY = character.position.y;
    }
  },
  isMoving: () => character.position.toX !== character.position.x || character.position.toY !== character.position.y,
  tileset: {
    offset: 0,
    direction: 'up',
    frame: 0,
  },
  position: {
    x: 838,
    y: 358,
    toX: 838,
    toY: 358,
  },
};

export default character;
