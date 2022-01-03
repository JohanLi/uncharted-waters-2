import { Direction, directionToChanges } from './types';
import { store } from './interface/store';
import { dock } from './interface/gameSlice';

const createPlayer = (x: number, y: number, startFrame: number) => {
  let xTo = x;
  let yTo = y;

  let frameOffset = 0;
  let frameAlternate = 0;

  const animate = () => {
    frameAlternate = frameAlternate === 0 ? 1 : 0;
  }

  // TODO needs refactoring. Listener should also be removed when on land
  document.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'e') {
      store.dispatch(dock({ x, y }));
    }
  });
  
  return {
    move: (direction: Direction, shouldAnimate = true) => {
      const { xDelta, yDelta, frameOffset: newFrameOffset } = directionToChanges[direction];
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
    position: (percentNextMove = 0) => {
      return {
        x: x + ((xTo - x) * percentNextMove),
        y: y + ((yTo - y) * percentNextMove),
      };
    },
    destination: () => ({
      x: xTo,
      y: yTo,
    }),
    frame: () => startFrame + frameOffset + frameAlternate,
    width: 2,
    height: 2,
  };
}

export type Player = ReturnType<typeof createPlayer>;

export default createPlayer;
