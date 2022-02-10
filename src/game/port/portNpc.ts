import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../../types';
import { sample, directions, random } from '../../utils';

const createPortNpc = (
  startPosition: Position,
  startFrame: number,
  startDirection: CardinalDirection,
  isStationary: boolean,
) => {
  let position = startPosition;
  let destination: Position | undefined;

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
    move: (collisionAt: (position: Position) => boolean) => {
      animate();

      if (isStationary) {
        return;
      }

      const direction = randomDirection();

      const {
        xDelta,
        yDelta,
        frameOffset: newFrameOffset,
      } = directionToChanges[direction];
      frameOffset = newFrameOffset;

      destination = {
        x: position.x + xDelta,
        y: position.y + yDelta,
      };

      if (!collisionAt(destination)) {
        currentDirection = direction;
        directionWasCollision = false;
      } else {
        destination = undefined;
        directionWasCollision = true;
      }
    },
    update: () => {
      if (destination) {
        position = destination;
      }
    },
    position: (percentNextMove = 0) => {
      if (!destination) {
        return position;
      }

      return {
        x: position.x + (destination.x - position.x) * percentNextMove,
        y: position.y + (destination.y - position.y) * percentNextMove,
      };
    },
    destination: () => destination,
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
    isStationary,
  };
};

export type PortNpc = ReturnType<typeof createPortNpc>;

export default createPortNpc;
