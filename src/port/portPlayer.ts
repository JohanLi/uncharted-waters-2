import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../types';
import { enterBuilding } from '../state/actionsPort';

interface AlternativeDestination {
  direction: Direction;
  step1: Position;
  step2: Position;
}

const alternativeDestinations = (direction: Direction, position: Position) => {
  if (direction === 'n' || direction === 's') {
    const secondStepY = direction === 'n' ? position.y - 1 : position.y + 1;

    return (i: number): AlternativeDestination[] => [
      {
        direction: 'e',
        step1: {
          x: position.x + i,
          y: position.y,
        },
        step2: {
          x: position.x + i,
          y: secondStepY,
        },
      },
      {
        direction: 'w',
        step1: {
          x: position.x - i,
          y: position.y,
        },
        step2: {
          x: position.x - i,
          y: secondStepY,
        },
      },
    ];
  }

  if (direction === 'e' || direction === 'w') {
    const secondStepX = direction === 'e' ? position.x + 1 : position.x - 1;

    return (i: number): AlternativeDestination[] => [
      {
        direction: 'n',
        step1: {
          x: position.x,
          y: position.y - i,
        },
        step2: {
          x: secondStepX,
          y: position.y - i,
        },
      },
      {
        direction: 's',
        step1: {
          x: position.x,
          y: position.y + i,
        },
        step2: {
          x: secondStepX,
          y: position.y + i,
        },
      },
    ];
  }

  return () => [];
};

const alternativeDirection = (
  direction: Direction,
  position: Position,
  collisionAt: (position: Position) => boolean,
): Direction | '' => {
  let firstDirectionPossible = true;
  let secondDirectionPossible = true;

  for (let i = 1; i <= 19; i += 1) {
    const destinations = alternativeDestinations(direction, position)(i);

    if (firstDirectionPossible) {
      if (collisionAt(destinations[0].step1)) {
        firstDirectionPossible = false;
      } else if (!collisionAt(destinations[0].step2)) {
        return destinations[0].direction;
      }
    }

    if (secondDirectionPossible) {
      if (collisionAt(destinations[1].step1)) {
        secondDirectionPossible = false;
      } else if (!collisionAt(destinations[1].step2)) {
        return destinations[1].direction;
      }
    }
  }

  return '';
};

const createPortPlayer = (
  startPosition: Position,
  startFrame: number,
  startDirection: CardinalDirection,
) => {
  let position = startPosition;
  let destination: Position | undefined;

  let { frameOffset } = directionToChanges[startDirection];
  let frameAlternate = 0;

  let buildingId = 0;

  const animate = () => {
    frameAlternate = frameAlternate === 0 ? 1 : 0;
  };

  return {
    move: (
      direction: Direction,
      collisionAt: (position: Position) => boolean,
    ) => {
      animate();

      // TODO xDelta and yDelta should instead be a Position object
      let {
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
        return;
      }

      const newDirection = alternativeDirection(
        direction,
        position,
        collisionAt,
      );

      if (newDirection) {
        ({
          xDelta,
          yDelta,
          frameOffset: newFrameOffset,
        } = directionToChanges[newDirection]);
        frameOffset = newFrameOffset;

        destination = {
          x: position.x + xDelta,
          y: position.y + yDelta,
        };
      } else {
        destination = undefined;
      }
    },
    willEnterBuilding: (buildingAt: (position: Position) => number) => {
      if (!destination) {
        return false;
      }

      buildingId = buildingAt(destination);

      return !!buildingId;
    },
    // TODO exit animation isn’t visible — PercentNextMove should not advance when in buildings
    enteredBuilding: () => {
      if (!buildingId) {
        return false;
      }

      enterBuilding(buildingId);
      buildingId = 0;

      animate();

      const {
        xDelta,
        yDelta,
        frameOffset: newFrameOffset,
      } = directionToChanges.s;
      frameOffset = newFrameOffset;

      destination = {
        x: position.x + xDelta,
        y: position.y + yDelta,
      };

      return true;
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
  };
};

export type PortPlayer = ReturnType<typeof createPortPlayer>;

export default createPortPlayer;
