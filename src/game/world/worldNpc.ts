import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../../types';
import { sample, directions, random } from '../../utils';

const createWorldNpc = (
  position: Position,
  startFrame: number,
  startDirection: CardinalDirection,
  isStationary: boolean,
) => {
  let { x, y } = position;

  let xTo = x;
  let yTo = y;

  let frameOffset = isStationary
    ? 0
    : directionToChanges[startDirection].frameOffset;
  let frameAlternate = 0;

  const getMovesToSkip = () => random(2, 6);

  let movesToSkip = getMovesToSkip();
  let movesSkipped = 0;

  let currentDirection: Direction = 's';
  let directionWasCollision = false;

  const randomDirection = () => {
    const sameDirection = Math.random();

    if (!directionWasCollision && sameDirection < 0.75) {
      return currentDirection;
    }

    return sample(directions);
  };

  const animate = () => {
    frameAlternate = frameAlternate === 0 ? 1 : 0;
  };

  return {
    shouldMove: () => {
      if (movesSkipped === movesToSkip) {
        movesToSkip = getMovesToSkip();
        movesSkipped = 0;
        return true;
      }

      movesSkipped += 1;
      return false;
    },
    move: () => {
      if (!isStationary) {
        const direction = randomDirection();

        const {
          xDelta,
          yDelta,
          frameOffset: newFrameOffset,
        } = directionToChanges[direction];
        frameOffset = newFrameOffset;
        xTo = x + xDelta;
        yTo = y + yDelta;

        currentDirection = direction;
        directionWasCollision = false;
      }

      animate();
    },
    undoMove: () => {
      xTo = x;
      yTo = y;

      directionWasCollision = true;
    },
    update: () => {
      x = xTo;
      y = yTo;
    },
    position: (percentNextMove = 0) => ({
      x: x + (xTo - x) * percentNextMove,
      y: y + (yTo - y) * percentNextMove,
    }),
    destination: () => ({
      x: xTo,
      y: yTo,
    }),
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
    isStationary,
  };
};

export type WorldNpc = ReturnType<typeof createWorldNpc>;

export default createWorldNpc;
