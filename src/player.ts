import { CardinalDirection, Direction, directionToChanges } from './types';
import getShipSpeed from './world/shipSpeed';
import { sailors } from './world/fleets';
import gameState, { Velocity } from './gameState';
import { directionMap } from './input';
import updateInterface from './interface/updateInterface';

const createPlayer = (
  x: number,
  y: number,
  startFrame: number,
  startDirection: CardinalDirection,
) => {
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
      x: x + (xTo - x) * percentNextMove,
      y: y + (yTo - y) * percentNextMove,
    }),
    destination: () => ({
      x: xTo,
      y: yTo,
    }),
    setHeading: (newHeading: Direction) => {
      if (newHeading === heading) {
        return;
      }

      heading = newHeading;

      updateInterface.playerFleetDirection(directionMap[heading]);
    },
    heading: () => heading,
    updateSpeed: () => {
      if (heading === lastHeading && windUnchanged(gameState.wind)) {
        return;
      }

      speed = heading
        ? getShipSpeed(
            gameState.fleets[1].ships[0],
            sailors[1],
            directionMap[heading],
            gameState.wind,
          )
        : 0;

      lastHeading = heading;
      lastWind = gameState.wind;
      updateInterface.playerFleetSpeed(speed);
    },
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
  };
};

export type Player = ReturnType<typeof createPlayer>;

export default createPlayer;
