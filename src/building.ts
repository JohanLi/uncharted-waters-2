import type { Position } from './types';
import { getPortData } from './port/portUtils';

const createBuilding = (portId: number) => ({
  get: (id: string): Position => {
    const port = getPortData(portId);
    return port.buildings[id];
  },
  at: (position: Position): string | null => {
    const port = getPortData(portId);

    return (
      Object.keys(port.buildings).find((id) => {
        const { x, y } = port.buildings[Number(id)];

        return position.x === x && position.y === y;
      }) || null
    );
  },
});

export type Building = ReturnType<typeof createBuilding>;

export default createBuilding;
