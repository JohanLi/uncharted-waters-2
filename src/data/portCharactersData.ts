import type { Position } from '../types';

const portCharacterType = [
  'PLAYER',
  'WOMAN',
  'MAN',
  'MERCHANT',
  'DOG',
  'GUARD',
  'BEGGAR',
] as const;
type PortCharacterType = typeof portCharacterType[number];

interface PortCharacterData {
  type: PortCharacterType;
  spawn: {
    buildingId: string;
    offset: Position;
    condition?: () => boolean;
  };
  isStationary?: boolean;
}

export const portPlayerData: PortCharacterData = {
  type: 'PLAYER',
  spawn: {
    buildingId: '4',
    offset: {
      x: 0,
      y: 1,
    },
  },
};

export const portNpcData: PortCharacterData[] = [
  {
    type: 'WOMAN',
    spawn: {
      buildingId: '1',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    type: 'WOMAN',
    spawn: {
      buildingId: '3',
      offset: {
        x: 0,
        y: 0,
      },
    },
  },
  {
    type: 'MAN',
    spawn: {
      buildingId: '2',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    type: 'MAN',
    spawn: {
      buildingId: '5',
      offset: {
        x: -2,
        y: 1,
      },
    },
  },
  {
    type: 'MERCHANT',
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
    type: 'DOG',
    spawn: {
      buildingId: '2',
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
  {
    type: 'GUARD',
    spawn: {
      buildingId: '4',
      offset: {
        x: -2,
        y: 2,
      },
    },
    isStationary: true,
  },
  {
    type: 'GUARD',
    spawn: {
      buildingId: '4',
      offset: {
        x: 0,
        y: 3,
      },
    },
    isStationary: true,
  },
  {
    type: 'GUARD',
    spawn: {
      buildingId: '4',
      offset: {
        x: 2,
        y: 2,
      },
    },
    isStationary: true,
  },
  {
    type: 'BEGGAR',
    spawn: {
      buildingId: '5',
      offset: {
        x: 2,
        y: 1,
      },
    },
    isStationary: true,
  },
];

const FRAMES_PER_CHARACTER = 8;
const FRAMES_PER_STATIONARY_CHARACTER = 2;
const STATIONARY_FROM_I = 3;

export const getStartFrame = (type: PortCharacterType) => {
  const i = portCharacterType.indexOf(type);

  if (i === -1) {
    throw Error('portCharacterType not found');
  }

  if (i <= STATIONARY_FROM_I) {
    return i * FRAMES_PER_CHARACTER;
  }

  return (
    STATIONARY_FROM_I * FRAMES_PER_CHARACTER +
    (i - STATIONARY_FROM_I) * FRAMES_PER_STATIONARY_CHARACTER
  );
};
