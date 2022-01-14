import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../types';
import getShipSpeed from './shipSpeed';
import { sailors } from './fleets';
import state, { Velocity } from '../state/state';
import { directionMap } from '../input';
import updateInterface from '../state/updateInterface';
import { getXWrapAround } from './worldUtils';

const createWorldPlayer = (
  position: Position,
  startFrame: number,
  startDirection: CardinalDirection,
) => {
  let { x, y } = position;

  let xTo = x;
  let yTo = y;

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
    move: (direction: Direction, shouldAnimate = true) => {
      const {
        xDelta,
        yDelta,
        frameOffset: newFrameOffset,
      } = directionToChanges[direction];
      frameOffset = newFrameOffset;
      xTo = x + xDelta;
      yTo = y + yDelta;

      if (shouldAnimate) {
        animate();
      }
    },
    undoMove: () => {
      xTo = x;
      yTo = y;
    },
    update: () => {
      x = xTo;
      y = yTo;
    },
    position: (percentNextMove = 0) => ({
      x: getXWrapAround(x + (xTo - x) * percentNextMove),
      y: y + (yTo - y) * percentNextMove,
    }),
    destination: () => ({
      x: xTo,
      y: yTo,
    }),
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

      speed = heading
        ? getShipSpeed(
            state.fleets[1].ships[0],
            sailors[1],
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
