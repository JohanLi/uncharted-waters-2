import { ports } from '../port/metadata';

export const portAdjacentAt = (position: { x: number; y: number }) => {
  const { x, y } = position;

  return Object.keys(ports).find((portId) => {
    const deltaX = Math.abs(ports[portId].x - x);
    const deltaY = Math.abs(ports[portId].y - y);

    return deltaX + deltaY <= 3 && deltaX < 3 && deltaY < 3;
  });
};
