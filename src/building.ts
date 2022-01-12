import type { Position } from './types'
import { getPortMetadata } from './port/portUtils'

const createBuilding = (portId: number) => ({
  get: (id: number): Position => {
    const port = getPortMetadata(portId);
    return port.buildings[id];
  },
  at: (position: Position): number => {
    const port = getPortMetadata(portId);

    return Number(
      Object.keys(port.buildings).find((id) => {
        const { x, y } = port.buildings[Number(id)];

        return position.x === x && position.y === y;
      }),
    );
  },
});

export type Building = ReturnType<typeof createBuilding>;

export default createBuilding;
