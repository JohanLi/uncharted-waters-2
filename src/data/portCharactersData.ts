import type { Position } from '../types';

interface PortCharacterData {
  id: number;
  spawn: {
    buildingId: string;
    offset: Position;
  };
  isStationary?: boolean;
}

const portCharactersData: PortCharacterData[] = [
  {
    id: 1,
    spawn: {
      buildingId: '4',
      offset: {
        x: 0,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      buildingId: '1',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      buildingId: '3',
      offset: {
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 3,
    spawn: {
      buildingId: '2',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 3,
    spawn: {
      buildingId: '5',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 4,
    spawn: {
      buildingId: '1',
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
  {
    id: 5,
    spawn: {
      buildingId: '5',
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
  {
    id: 6,
    spawn: {
      buildingId: '2',
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
];

export default portCharactersData;
