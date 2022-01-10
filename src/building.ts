import { ports } from './port/metadata';

const createBuilding = (portId: number) => ({
  get: (id: number): { x: number; y: number } => {
    const port = ports[portId];
    return port.buildings[id];
  },
  at: (position: { x: number; y: number }): number => {
    const port = ports[portId];

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
