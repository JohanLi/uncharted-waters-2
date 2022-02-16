import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../../types';
import getShipSpeed from './shipSpeed';
import state, { Velocity } from '../../state/state';
import { directionMap } from '../../input';
import updateInterface from '../../state/updateInterface';
import { calculateDestination } from './worldUtils';
import { getXWrapAround } from './sharedUtils';
import sailorData from '../../data/sailorData';

const createWorldPlayer = (
  startPosition: Position,
  startFrame: number,
  startDirection: CardinalDirection,
) => {
  let position = startPosition;
  let destination: Position | undefined;

  let { frameOffset } = directionToChanges[startDirection];
  let frameAlternate = 0;

  let heading: Direction | '' = '';
  let speed = 0;

  let lastHeading: Direction | '' = '';
  let lastWind: Velocity = {
    direction: 0,
    speed: 0,
  };

  updateInterface.playerFleetDirection(directionMap[heading]);

  const windUnchanged = (wind: Velocity) =>
    wind.direction === lastWind.direction && wind.speed === lastWind.speed;

  const animate = () => {
    frameAlternate = frameAlternate === 0 ? 1 : 0;
  };

  return {
    move: (
      direction: Direction,
      collisionAt: (position: Position) => boolean,
    ) => {
      animate();

      const {
        xDelta,
        yDelta,
        frameOffset: newFrameOffset,
      } = directionToChanges[direction];
      frameOffset = newFrameOffset;

      const isDiagonal = Math.abs(xDelta) > 0 && Math.abs(yDelta) > 0;
      const multiplier = speed / 40 / (isDiagonal ? Math.SQRT2 : 1);

      if (!isDiagonal) {
        destination = calculateDestination(
          position,
          xDelta,
          yDelta,
          multiplier,
          collisionAt,
        );

        return;
      }

      const firstDestination = calculateDestination(
        position,
        xDelta,
        0,
        multiplier,
        collisionAt,
      );

      destination = calculateDestination(
        firstDestination,
        0,
        yDelta,
        multiplier,
        collisionAt,
      );
    },
    update: () => {
      if (destination) {
        position = {
          x: getXWrapAround(destination.x),
          y: destination.y,
        };
      }
    },
    position: (percentNextMove = 0) => {
      if (!destination) {
        return position;
      }

      return {
        x: getXWrapAround(
          position.x + (destination.x - position.x) * percentNextMove,
        ),
        y: position.y + (destination.y - position.y) * percentNextMove,
      };
    },
    destination: () => destination,
    setHeading: (newHeading: Direction | '') => {
      if (newHeading === heading) {
        return;
      }

      heading = newHeading;

      updateInterface.playerFleetDirection(directionMap[heading]);
    },
    heading: () => heading,
    updateSpeed: () => {
      if (heading === lastHeading && windUnchanged(state.wind)) {
        return;
      }

      const ship = state.fleets[1].ships[0];
      const {
        navigationLevel,
        stats: { seamanship },
      } = sailorData[ship.sailorId];

      speed = heading
        ? getShipSpeed(
            ship,
            { navigationLevel, seamanship },
            directionMap[heading],
            state.wind,
          )
        : 0;

      lastHeading = heading;
      lastWind = state.wind;
      updateInterface.playerFleetSpeed(speed);
    },
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
  };
};

export type WorldPlayer = ReturnType<typeof createWorldPlayer>;

export default createWorldPlayer;
