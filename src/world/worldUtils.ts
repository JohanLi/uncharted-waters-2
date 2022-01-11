import { Ship } from './fleets';

export const getHeadingWindDelta = (d1: number, d2: number) => {
  const delta = Math.abs(d1 - d2);

  if (delta > 4) {
    return 8 - delta;
  }

  return delta;
};

export const hasOars = (ship: Ship) => ship.id >= 19;
