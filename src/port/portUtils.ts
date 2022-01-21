import {
  RegularPort,
  SupplyPortBase,
  BuildingLocations,
  regularPorts,
  supplyPorts,
  SUPPLY_PORT_BUILDINGS,
  SUPPLY_PORT_TILESET,
} from './metadata/portMetadata';
import { Position } from '../types';

export type PortMetadata = (
  | (RegularPort & { isSupplyPort: false })
  | (SupplyPortBase & {
      buildings: BuildingLocations;
      tileset: 3;
      isSupplyPort: true;
    })
) & { id: number; tilemap: number };

export const getPortMetadata = (id: number): PortMetadata => {
  if (id > regularPorts.length + supplyPorts.length) {
    throw Error('Port does not exist!');
  }

  const isSupplyPort = id > regularPorts.length;

  if (!isSupplyPort) {
    return {
      ...regularPorts[id - 1],
      id,
      isSupplyPort,
      tilemap: id - 1,
    };
  }

  return {
    ...supplyPorts[id - 1 - regularPorts.length],
    buildings: SUPPLY_PORT_BUILDINGS,
    tileset: SUPPLY_PORT_TILESET,
    id,
    isSupplyPort,
    tilemap: regularPorts.length,
  };
};

const portCoordinates = regularPorts
  .map(({ x, y }) => ({ x, y }))
  .concat(supplyPorts.map(({ x, y }) => ({ x, y })));

export const portAdjacentAt = ({ x, y }: Position) =>
  portCoordinates.findIndex((portCoordinate) => {
    const deltaX = Math.abs(portCoordinate.x - x);
    const deltaY = Math.abs(portCoordinate.y - y);

    if (deltaX > 2 || deltaY > 2) {
      return false;
    }

    return deltaX + deltaY <= 3;
  }) + 1;
