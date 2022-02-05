interface Tilesets {
  [key: number]: {
    collisionIndices: CollisionIndices;
  };
}

export interface CollisionIndices {
  right: number;
  left: number;
  either: number;
}

export const tilesets: Tilesets = {
  0: {
    collisionIndices: {
      right: 29,
      left: 34,
      either: 40,
    },
  },
  1: {
    collisionIndices: {
      right: 21,
      left: 26,
      either: 31,
    },
  },
  2: {
    collisionIndices: {
      right: 20,
      left: 25,
      either: 30,
    },
  },
  3: {
    collisionIndices: {
      right: 22,
      left: 26,
      either: 31,
    },
  },
  4: {
    collisionIndices: {
      right: 37,
      left: 42,
      either: 48,
    },
  },
  5: {
    collisionIndices: {
      right: 32,
      left: 37,
      either: 46,
    },
  },
  6: {
    collisionIndices: {
      right: 21,
      left: 22,
      either: 27,
    },
  },
};

// used for the Sphere of Influence at the Palace
export const regions = {
  '1': 'Europe',
  '2': 'New World',
  '3': 'West Africa',
  '4': 'East Africa',
  '5': 'Middle East',
  '6': 'India',
  '7': 'Southeast Asia',
  '8': 'Far East',
};

export const markets = {
  '1': 'Iberia',
  '2': 'Northern Europe',
  '3': 'The Mediterranean',
  '4': 'North Africa',
  '5': 'Ottoman Empire',
  '6': 'West Africa',
  '7': 'Central America',
  '8': 'South America',
  '9': 'East Africa',
  '10': 'Middle East',
  '11': 'India',
  '12': 'Southeast Asia',
  '13': 'Far East',
};

export type RegionId = keyof typeof regions;
export type MarketId = keyof typeof markets;
