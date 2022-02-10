import {
  RegularPort,
  SupplyPortBase,
  BuildingLocations,
  regularPorts,
  supplyPorts,
  SUPPLY_PORT_BUILDINGS,
  SUPPLY_PORT_TILESET,
} from '../../data/portData';
import { Position } from '../../types';
import { markets } from '../../data/portExtraData';

export type PortData = (
  | (RegularPort & { isSupplyPort: false })
  | (SupplyPortBase & {
      buildings: BuildingLocations;
      tileset: 3;
      isSupplyPort: true;
    })
) & { id: string; tilemap: number };

export const getPortData = (id: string): PortData => {
  const number = Number(id) - 1;

  if (number >= regularPorts.length + supplyPorts.length) {
    throw Error('Port does not exist!');
  }

  const isSupplyPort = number >= regularPorts.length;

  if (!isSupplyPort) {
    return {
      ...regularPorts[number],
      id,
      isSupplyPort,
      tilemap: number,
    };
  }

  return {
    ...supplyPorts[number - regularPorts.length],
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

export const portAdjacentAt = ({ x, y }: Position) => {
  const i = portCoordinates.findIndex((portCoordinate) => {
    const deltaX = Math.abs(portCoordinate.x - x);
    const deltaY = Math.abs(portCoordinate.y - y);

    if (deltaX > 2 || deltaY > 2) {
      return false;
    }

    return deltaX + deltaY <= 3;
  });

  if (i === -1) {
    return null;
  }

  return String(i + 1);
};

export const getRegionOrIfSupplyPort = (portId: string) => {
  const port = getPortData(portId);

  if (!port.isSupplyPort) {
    const { marketId } = port;
    return markets[marketId];
  }

  return 'Supply port';
};
