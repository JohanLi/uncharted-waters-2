import {
  CardinalDirection,
  Direction,
  directionToChanges,
  Position,
} from '../types';

const createPortPlayer = (
  position: Position,
  startFrame: number,
  startDirection: CardinalDirection,
) => {
  let { x, y } = position;

  let xTo = x;
  let yTo = y;

  let { frameOffset } = directionToChanges[startDirection];
  let frameAlternate = 0;

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
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
  };
};

export type PortPlayer = ReturnType<typeof createPortPlayer>;

export default createPortPlayer;
