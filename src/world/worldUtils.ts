import { Ship } from './fleets';

export const getHeadingWindDelta = (d1: number, d2: number) => {
  const delta = Math.abs(d1 - d2);

  if (delta > 4) {
    return 8 - delta;
  }

  return delta;
};

export const hasOars = (ship: Ship) => ship.id >= 19;

export const getXWrapAround = (x: number) => {
  if (x < 0) {
    return x + 2160;
  }

  if (x >= 2160) {
    return x - 2160;
  }

  return x;
};

export const getFromTo = (x1: number, x2: number) => {
  const fromTo = x2 - x1;

  if (fromTo > 2160 / 2) {
    return fromTo - 2160;
  }

  if (-fromTo > 2160 / 2) {
    return fromTo + 2160;
  }

  return fromTo;
};
