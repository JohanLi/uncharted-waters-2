import type { Position } from '../../types';

interface PortCharacterMetadata {
  id: number;
  spawn: {
    building: number;
    offset: Position;
  };
  isStationary?: boolean;
}

const portCharactersMetadata: PortCharacterMetadata[] = [
  {
    id: 1,
    spawn: {
      building: 4,
      offset: {
        x: 0,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      building: 1,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 2,
    spawn: {
      building: 3,
      offset: {
        x: 0,
        y: 0,
      },
    },
  },
  {
    id: 3,
    spawn: {
      building: 2,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 3,
    spawn: {
      building: 5,
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    id: 4,
    spawn: {
      building: 1,
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
      building: 5,
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
      building: 2,
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
];

export default portCharactersMetadata;
