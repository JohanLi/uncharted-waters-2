import { sample } from '../helpers';

const directionToMetadata = {
  n: {
    deltaX: 0,
    deltaY: -1,
    frameOffset: -4,
  },
  e: {
    deltaX: 1,
    deltaY: 0,
    frameOffset: -2,
  },
  s: {
    deltaX: 0,
    deltaY: 1,
    frameOffset: 0,
  },
  w: {
    deltaX: -1,
    deltaY: 0,
    frameOffset: 2,
  },
};

export default (options) => {
  let { x, y } = options;
  const { startFrame, isPlayer, isImmobile } = options;

  let toX = x;
  let toY = y;
  let frameAlternate = 0;
  const width = 2;
  const height = 2;

  const animate = () => {
    frameAlternate = frameAlternate === 0 ? 1 : 0;
  };

  let currentDirection = 's';
  let directionWasCollision = false;
  let movesToSkip;
  let movesSkipped;

  const throttleMovement = () => {
    if (!movesToSkip || movesSkipped === movesToSkip) {
      movesToSkip = Math.floor(Math.random() * (6 - 2)) + 2;
      movesSkipped = 0;
      return false;
    }

    movesSkipped += 1;
    return true;
  };

  return {
    move(direction, shouldAnimate = true) {
      if (!directionToMetadata[direction]) {
        return false;
      }

      const { deltaX, deltaY } = directionToMetadata[direction];
      toX = x + deltaX;
      toY = y + deltaY;

      currentDirection = direction;
      directionWasCollision = false;

      if (shouldAnimate) {
        animate();
      }

      return true;
    },
    undoMove() {
      toX = x;
      toY = y;

      directionWasCollision = true;
    },
    update() {
      if (isImmobile && !throttleMovement()) {
        animate();
      } else {
        x = toX;
        y = toY;
      }
    },
    randomDirection() {
      if (throttleMovement()) {
        return '';
      }

      const sameDirection = Math.random();

      if (!directionWasCollision && sameDirection < 0.75) {
        return currentDirection;
      }

      return sample(Object.keys(directionToMetadata));
    },
    position(percentNextMove = 0) {
      return {
        x: x + ((toX - x) * percentNextMove),
        y: y + ((toY - y) * percentNextMove),
      };
    },
    destination() {
      return {
        x: toX,
        y: toY,
      };
    },
    frame() {
      return startFrame + directionToMetadata[currentDirection].frameOffset + frameAlternate;
    },
    x,
    y,
    isPlayer,
    isImmobile,
    width,
    height,
  };
};
