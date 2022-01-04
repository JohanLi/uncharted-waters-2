import { ports } from '../port/metadata';
import { Position } from '../types';
import createBuilding from '../building';

export const portAdjacentAt = (position: { x: number; y: number }) => {
  const { x, y } = position;

  return Number(Object.keys(ports).find((portId) => {
    const deltaX = Math.abs(ports[portId].x - x);
    const deltaY = Math.abs(ports[portId].y - y);

    return deltaX + deltaY <= 3 && deltaX < 3 && deltaY < 3;
  }));
};

export interface SeaCharacterData {
  i: number;
  x: number;
  y: number;
}

export interface PortCharacterData {
  i: number;
  x: number;
  y: number;
}

export const getSpawnPortCharactersData = (portId: number): PortCharacterData[] => {
  const building = createBuilding(portId);

  const portCharacterData: PortCharacterData[] = [];

  for (let i = 0; i < 8; i += 1) {
    const { spawn } = portCharacterMetadata[i];
    const { x, y } = building.get(spawn.building);

    portCharacterData.push({
      i,
      x: x + spawn.offset.x,
      y: y + spawn.offset.y,
    });
  }

  // TODO special case where guards blockade the port

  return portCharacterData;
}

interface PortCharacterMetadata {
  startFrame: number;
  spawn: {
    building: number;
    offset: Position;
  };
  isImmobile: boolean;
}

export const portCharacterMetadata: PortCharacterMetadata[] = [
  {
    startFrame: 4,
    spawn: {
      building: 4,
      offset: {
        x: 0,
        y: 1,
      },
    },
    isImmobile: false,
  },
  {
    startFrame: 12,
    spawn: {
      building: 1,
      offset: {
        x: -2,
        y: 1,
      },
    },
    isImmobile: false,
  },
  {
    startFrame: 12,
    spawn: {
      building: 3,
      offset: {
        x: 0,
        y: 0,
      },
    },
    isImmobile: false,
  },
  {
    startFrame: 20,
    spawn: {
      building: 2,
      offset: {
        x: -2,
        y: 1,
      },
    },
    isImmobile: false,
  },
  {
    startFrame: 20,
    spawn: {
      building: 5,
      offset: {
        x: -2,
        y: 1,
      },
    },
    isImmobile: false,
  },
  {
    startFrame: 24,
    spawn: {
      building: 1,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isImmobile: true,
  },
  {
    startFrame: 26,
    spawn: {
      building: 5,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isImmobile: true,
  },
  {
    startFrame: 28,
    spawn: {
      building: 2,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isImmobile: true,
  },
];
