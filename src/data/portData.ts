import { MarketId, RegionId } from './portExtraData';
import { IndustryId } from './portShipyardData';
import { ItemId } from './itemData';
import { Position } from '../types';

export interface RegularPort {
  name: string;
  position: Position;
  economy: number;
  industry: number;
  allegiances: number[];
  regionId: RegionId;
  itemShop?: {
    regular: ItemId[];
    secret?: ItemId;
  };
  marketId: MarketId;
  industryId: IndustryId;
  buildings: BuildingLocations;
  tileset: number;
}

export interface BuildingLocations {
  [key: string]: Position;
}

export const regularPorts: RegularPort[] = [
  {
    name: 'Lisbon',
    position: {
      x: 840,
      y: 358,
    },
    economy: 780,
    industry: 770,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['21', '25', '4'],
    },
    marketId: '1',
    industryId: '1',
    buildings: {
      '1': {
        x: 41,
        y: 59,
      },
      '2': {
        x: 54,
        y: 34,
      },
      '3': {
        x: 79,
        y: 64,
      },
      '4': {
        x: 54,
        y: 67,
      },
      '5': {
        x: 36,
        y: 46,
      },
      '6': {
        x: 48,
        y: 7,
      },
      '7': {
        x: 38,
        y: 35,
      },
      '8': {
        x: 69,
        y: 49,
      },
      '9': {
        x: 31,
        y: 59,
      },
      '10': {
        x: 14,
        y: 47,
      },
      '11': {
        x: 12,
        y: 62,
      },
    },
    tileset: 0,
  },
  {
    name: 'Seville',
    position: {
      x: 862,
      y: 372,
    },
    economy: 770,
    industry: 810,
    allegiances: [0, 100, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['25', '7', '4'],
      secret: '14',
    },
    marketId: '1',
    industryId: '1',
    buildings: {
      '1': {
        x: 65,
        y: 56,
      },
      '2': {
        x: 17,
        y: 57,
      },
      '3': {
        x: 72,
        y: 67,
      },
      '4': {
        x: 42,
        y: 67,
      },
      '5': {
        x: 27,
        y: 57,
      },
      '6': {
        x: 48,
        y: 8,
      },
      '7': {
        x: 41,
        y: 57,
      },
      '8': {
        x: 83,
        y: 8,
      },
      '9': {
        x: 25,
        y: 43,
      },
      '10': {
        x: 12,
        y: 43,
      },
      '11': {
        x: 60,
        y: 43,
      },
      '12': {
        x: 79,
        y: 56,
      },
    },
    tileset: 0,
  },
  {
    name: 'Istanbul',
    position: {
      x: 1072,
      y: 344,
    },
    economy: 810,
    industry: 720,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['25', '17', '21'],
      secret: '8',
    },
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 63,
        y: 46,
      },
      '2': {
        x: 60,
        y: 58,
      },
      '3': {
        x: 64,
        y: 69,
      },
      '4': {
        x: 75,
        y: 52,
      },
      '5': {
        x: 44,
        y: 70,
      },
      '6': {
        x: 32,
        y: 15,
      },
      '7': {
        x: 46,
        y: 46,
      },
      '8': {
        x: 11,
        y: 46,
      },
      '9': {
        x: 12,
        y: 58,
      },
      '10': {
        x: 14,
        y: 70,
      },
      '11': {
        x: 28,
        y: 66,
      },
      '12': {
        x: 31,
        y: 49,
      },
    },
    tileset: 2,
  },
  {
    name: 'Barcelona',
    position: {
      x: 914,
      y: 342,
    },
    economy: 590,
    industry: 540,
    allegiances: [0, 100, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['1', '17', '43'],
    },
    marketId: '1',
    industryId: '1',
    buildings: {
      '1': {
        x: 56,
        y: 49,
      },
      '2': {
        x: 34,
        y: 38,
      },
      '3': {
        x: 39,
        y: 61,
      },
      '4': {
        x: 68,
        y: 58,
      },
      '5': {
        x: 16,
        y: 26,
      },
      '7': {
        x: 19,
        y: 38,
      },
      '8': {
        x: 60,
        y: 30,
      },
      '9': {
        x: 34,
        y: 51,
      },
      '10': {
        x: 37,
        y: 26,
      },
      '11': {
        x: 16,
        y: 13,
      },
    },
    tileset: 0,
  },
  {
    name: 'Algiers',
    position: {
      x: 920,
      y: 376,
    },
    economy: 160,
    industry: 180,
    allegiances: [0, 0, 20, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['10', '44'],
    },
    marketId: '4',
    industryId: '6',
    buildings: {
      '1': {
        x: 50,
        y: 86,
      },
      '2': {
        x: 69,
        y: 77,
      },
      '3': {
        x: 27,
        y: 69,
      },
      '4': {
        x: 41,
        y: 74,
      },
      '5': {
        x: 21,
        y: 89,
      },
      '7': {
        x: 38,
        y: 86,
      },
      '10': {
        x: 15,
        y: 77,
      },
      '12': {
        x: 71,
        y: 89,
      },
    },
    tileset: 2,
  },
  {
    name: 'Tunis',
    position: {
      x: 962,
      y: 372,
    },
    economy: 130,
    industry: 160,
    allegiances: [0, 0, 15, 0, 0, 0],
    regionId: '1',
    marketId: '4',
    industryId: '6',
    buildings: {
      '1': {
        x: 36,
        y: 89,
      },
      '2': {
        x: 16,
        y: 88,
      },
      '3': {
        x: 23,
        y: 70,
      },
      '4': {
        x: 29,
        y: 79,
      },
      '5': {
        x: 7,
        y: 73,
      },
      '7': {
        x: 52,
        y: 89,
      },
    },
    tileset: 2,
  },
  {
    name: 'Valencia',
    position: {
      x: 898,
      y: 356,
    },
    economy: 320,
    industry: 300,
    allegiances: [0, 100, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['44', '2'],
    },
    marketId: '1',
    industryId: '1',
    buildings: {
      '1': {
        x: 47,
        y: 18,
      },
      '2': {
        x: 35,
        y: 27,
      },
      '3': {
        x: 56,
        y: 46,
      },
      '4': {
        x: 64,
        y: 23,
      },
      '5': {
        x: 36,
        y: 54,
      },
      '7': {
        x: 38,
        y: 39,
      },
      '9': {
        x: 15,
        y: 32,
      },
      '10': {
        x: 53,
        y: 62,
      },
      '11': {
        x: 16,
        y: 63,
      },
      '12': {
        x: 17,
        y: 7,
      },
    },
    tileset: 0,
  },
  {
    name: 'Marseille',
    position: {
      x: 932,
      y: 326,
    },
    economy: 350,
    industry: 290,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['5', '63'],
      secret: '6',
    },
    marketId: '3',
    industryId: '4',
    buildings: {
      '1': {
        x: 73,
        y: 51,
      },
      '2': {
        x: 71,
        y: 37,
      },
      '3': {
        x: 66,
        y: 63,
      },
      '4': {
        x: 58,
        y: 64,
      },
      '5': {
        x: 51,
        y: 51,
      },
      '7': {
        x: 87,
        y: 37,
      },
      '9': {
        x: 37,
        y: 51,
      },
      '10': {
        x: 55,
        y: 20,
      },
      '11': {
        x: 18,
        y: 22,
      },
      '12': {
        x: 38,
        y: 39,
      },
    },
    tileset: 0,
  },
  {
    name: 'Genoa',
    position: {
      x: 950,
      y: 320,
    },
    economy: 750,
    industry: 760,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['10', '21', '59'],
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 43,
        y: 57,
      },
      '2': {
        x: 72,
        y: 51,
      },
      '3': {
        x: 56,
        y: 68,
      },
      '4': {
        x: 35,
        y: 68,
      },
      '5': {
        x: 58,
        y: 57,
      },
      '6': {
        x: 48,
        y: 9,
      },
      '7': {
        x: 31,
        y: 42,
      },
      '9': {
        x: 66,
        y: 42,
      },
      '10': {
        x: 25,
        y: 52,
      },
      '11': {
        x: 85,
        y: 47,
      },
      '12': {
        x: 8,
        y: 47,
      },
    },
    tileset: 0,
  },
  {
    name: 'Pisa',
    position: {
      x: 960,
      y: 328,
    },
    economy: 620,
    industry: 540,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['4', '63', '11'],
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 58,
        y: 43,
      },
      '2': {
        x: 56,
        y: 56,
      },
      '3': {
        x: 38,
        y: 64,
      },
      '4': {
        x: 35,
        y: 39,
      },
      '5': {
        x: 79,
        y: 66,
      },
      '7': {
        x: 58,
        y: 14,
      },
      '8': {
        x: 56,
        y: 70,
      },
      '9': {
        x: 56,
        y: 30,
      },
      '10': {
        x: 92,
        y: 64,
      },
      '11': {
        x: 76,
        y: 39,
      },
      '12': {
        x: 83,
        y: 78,
      },
    },
    tileset: 0,
  },
  {
    name: 'Naples',
    position: {
      x: 980,
      y: 348,
    },
    economy: 630,
    industry: 640,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['5', '17', '42'],
      secret: '76',
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 44,
        y: 63,
      },
      '2': {
        x: 47,
        y: 23,
      },
      '3': {
        x: 38,
        y: 74,
      },
      '4': {
        x: 31,
        y: 63,
      },
      '5': {
        x: 51,
        y: 51,
      },
      '7': {
        x: 30,
        y: 22,
      },
      '8': {
        x: 76,
        y: 22,
      },
      '9': {
        x: 30,
        y: 51,
      },
      '10': {
        x: 86,
        y: 63,
      },
      '11': {
        x: 62,
        y: 77,
      },
    },
    tileset: 0,
  },
  {
    name: 'Syracuse',
    position: {
      x: 990,
      y: 376,
    },
    economy: 240,
    industry: 220,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['2', '44'],
      secret: '40',
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 40,
        y: 35,
      },
      '2': {
        x: 29,
        y: 18,
      },
      '3': {
        x: 42,
        y: 65,
      },
      '4': {
        x: 48,
        y: 40,
      },
      '5': {
        x: 39,
        y: 54,
      },
      '7': {
        x: 33,
        y: 70,
      },
      '10': {
        x: 39,
        y: 19,
      },
      '11': {
        x: 16,
        y: 29,
      },
      '12': {
        x: 11,
        y: 78,
      },
    },
    tileset: 0,
  },
  {
    name: 'Palma',
    position: {
      x: 916,
      y: 358,
    },
    economy: 290,
    industry: 285,
    allegiances: [0, 98, 0, 0, 0, 0],
    regionId: '1',
    marketId: '3',
    industryId: '1',
    buildings: {
      '1': {
        x: 53,
        y: 20,
      },
      '2': {
        x: 27,
        y: 13,
      },
      '3': {
        x: 42,
        y: 41,
      },
      '4': {
        x: 58,
        y: 32,
      },
      '5': {
        x: 27,
        y: 26,
      },
      '7': {
        x: 29,
        y: 40,
      },
      '8': {
        x: 62,
        y: 8,
      },
      '12': {
        x: 70,
        y: 27,
      },
    },
    tileset: 0,
  },
  {
    name: 'Venice',
    position: {
      x: 978,
      y: 318,
    },
    economy: 740,
    industry: 730,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['18', '22', '5'],
      secret: '69',
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 75,
        y: 28,
      },
      '2': {
        x: 58,
        y: 30,
      },
      '3': {
        x: 80,
        y: 57,
      },
      '4': {
        x: 78,
        y: 40,
      },
      '5': {
        x: 43,
        y: 38,
      },
      '7': {
        x: 45,
        y: 25,
      },
      '8': {
        x: 19,
        y: 90,
      },
      '9': {
        x: 66,
        y: 74,
      },
      '10': {
        x: 39,
        y: 55,
      },
      '11': {
        x: 62,
        y: 49,
      },
      '12': {
        x: 44,
        y: 79,
      },
    },
    tileset: 0,
  },
  {
    name: 'Ragusa',
    position: {
      x: 1008,
      y: 338,
    },
    economy: 150,
    industry: 140,
    allegiances: [0, 0, 0, 0, 100, 0],
    regionId: '1',
    itemShop: {
      regular: ['21', '1'],
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 54,
        y: 50,
      },
      '2': {
        x: 50,
        y: 39,
      },
      '3': {
        x: 41,
        y: 60,
      },
      '4': {
        x: 60,
        y: 71,
      },
      '5': {
        x: 70,
        y: 38,
      },
      '7': {
        x: 33,
        y: 49,
      },
      '10': {
        x: 72,
        y: 59,
      },
      '11': {
        x: 58,
        y: 24,
      },
    },
    tileset: 0,
  },
  {
    name: 'Candia',
    position: {
      x: 1050,
      y: 386,
    },
    economy: 180,
    industry: 160,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '1',
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 25,
        y: 74,
      },
      '2': {
        x: 40,
        y: 70,
      },
      '3': {
        x: 77,
        y: 57,
      },
      '4': {
        x: 46,
        y: 58,
      },
      '5': {
        x: 55,
        y: 70,
      },
      '7': {
        x: 76,
        y: 77,
      },
      '11': {
        x: 51,
        y: 89,
      },
    },
    tileset: 0,
  },
  {
    name: 'Athens',
    position: {
      x: 1044,
      y: 366,
    },
    economy: 640,
    industry: 540,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['16', '44', '56'],
      secret: '23',
    },
    marketId: '3',
    industryId: '5',
    buildings: {
      '1': {
        x: 41,
        y: 26,
      },
      '2': {
        x: 65,
        y: 35,
      },
      '3': {
        x: 67,
        y: 46,
      },
      '4': {
        x: 52,
        y: 46,
      },
      '5': {
        x: 19,
        y: 18,
      },
      '7': {
        x: 17,
        y: 39,
      },
      '9': {
        x: 61,
        y: 21,
      },
      '10': {
        x: 39,
        y: 12,
      },
      '11': {
        x: 80,
        y: 21,
      },
      '12': {
        x: 81,
        y: 31,
      },
    },
    tileset: 0,
  },
  {
    name: 'Salonika',
    position: {
      x: 1036,
      y: 344,
    },
    economy: 110,
    industry: 120,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['10'],
      secret: '36',
    },
    marketId: '5',
    industryId: '5',
    buildings: {
      '1': {
        x: 75,
        y: 50,
      },
      '2': {
        x: 67,
        y: 19,
      },
      '3': {
        x: 36,
        y: 45,
      },
      '4': {
        x: 51,
        y: 50,
      },
      '5': {
        x: 71,
        y: 34,
      },
      '7': {
        x: 46,
        y: 34,
      },
      '10': {
        x: 45,
        y: 21,
      },
    },
    tileset: 0,
  },
  {
    name: 'Alexandria',
    position: {
      x: 1078,
      y: 416,
    },
    economy: 720,
    industry: 700,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['19', '22', '42'],
      secret: '8',
    },
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 80,
        y: 64,
      },
      '2': {
        x: 55,
        y: 89,
      },
      '3': {
        x: 25,
        y: 64,
      },
      '4': {
        x: 69,
        y: 59,
      },
      '5': {
        x: 83,
        y: 77,
      },
      '7': {
        x: 70,
        y: 89,
      },
      '8': {
        x: 25,
        y: 81,
      },
      '9': {
        x: 83,
        y: 89,
      },
      '10': {
        x: 9,
        y: 83,
      },
      '11': {
        x: 10,
        y: 70,
      },
      '12': {
        x: 41,
        y: 85,
      },
    },
    tileset: 2,
  },
  {
    name: 'Jaffa',
    position: {
      x: 1110,
      y: 410,
    },
    economy: 140,
    industry: 150,
    allegiances: [0, 0, 95, 0, 0, 0],
    regionId: '1',
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 85,
        y: 77,
      },
      '2': {
        x: 90,
        y: 50,
      },
      '3': {
        x: 75,
        y: 75,
      },
      '4': {
        x: 81,
        y: 55,
      },
      '5': {
        x: 89,
        y: 65,
      },
      '7': {
        x: 89,
        y: 89,
      },
      '12': {
        x: 74,
        y: 89,
      },
    },
    tileset: 2,
  },
  {
    name: 'Beirut',
    position: {
      x: 1112,
      y: 402,
    },
    economy: 270,
    industry: 250,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['7', '43'],
    },
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 71,
        y: 48,
      },
      '2': {
        x: 54,
        y: 48,
      },
      '3': {
        x: 51,
        y: 33,
      },
      '4': {
        x: 69,
        y: 35,
      },
      '5': {
        x: 70,
        y: 61,
      },
      '7': {
        x: 82,
        y: 89,
      },
      '9': {
        x: 86,
        y: 76,
      },
      '10': {
        x: 85,
        y: 63,
      },
      '11': {
        x: 86,
        y: 50,
      },
      '12': {
        x: 68,
        y: 75,
      },
    },
    tileset: 2,
  },
  {
    name: 'Nicosia',
    position: {
      x: 1098,
      y: 386,
    },
    economy: 150,
    industry: 160,
    allegiances: [0, 0, 98, 0, 0, 0],
    regionId: '1',
    marketId: '3',
    industryId: '6',
    buildings: {
      '1': {
        x: 57,
        y: 83,
      },
      '2': {
        x: 83,
        y: 86,
      },
      '3': {
        x: 68,
        y: 70,
      },
      '4': {
        x: 52,
        y: 70,
      },
      '5': {
        x: 40,
        y: 81,
      },
      '7': {
        x: 75,
        y: 86,
      },
    },
    tileset: 2,
  },
  {
    name: 'Tripoli',
    position: {
      x: 978,
      y: 406,
    },
    economy: 420,
    industry: 400,
    allegiances: [0, 0, 90, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['7', '17', '25'],
      secret: '38',
    },
    marketId: '4',
    industryId: '6',
    buildings: {
      '1': {
        x: 64,
        y: 82,
      },
      '2': {
        x: 51,
        y: 81,
      },
      '3': {
        x: 42,
        y: 71,
      },
      '4': {
        x: 61,
        y: 71,
      },
      '5': {
        x: 24,
        y: 87,
      },
      '7': {
        x: 49,
        y: 91,
      },
      '10': {
        x: 10,
        y: 90,
      },
      '11': {
        x: 82,
        y: 88,
      },
    },
    tileset: 2,
  },
  {
    name: 'Kaffa',
    position: {
      x: 1106,
      y: 316,
    },
    economy: 340,
    industry: 350,
    allegiances: [0, 0, 35, 0, 0, 0],
    regionId: '1',
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 61,
        y: 49,
      },
      '2': {
        x: 15,
        y: 54,
      },
      '3': {
        x: 54,
        y: 61,
      },
      '4': {
        x: 35,
        y: 64,
      },
      '5': {
        x: 35,
        y: 48,
      },
      '7': {
        x: 75,
        y: 65,
      },
      '11': {
        x: 46,
        y: 34,
      },
      '12': {
        x: 18,
        y: 38,
      },
    },
    tileset: 0,
  },
  {
    name: 'Azov',
    position: {
      x: 1130,
      y: 302,
    },
    economy: 110,
    industry: 115,
    allegiances: [0, 0, 20, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['1'],
      secret: '37',
    },
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 62,
        y: 46,
      },
      '2': {
        x: 63,
        y: 77,
      },
      '3': {
        x: 45,
        y: 81,
      },
      '4': {
        x: 38,
        y: 62,
      },
      '5': {
        x: 83,
        y: 46,
      },
      '7': {
        x: 55,
        y: 63,
      },
      '9': {
        x: 59,
        y: 30,
      },
      '10': {
        x: 57,
        y: 14,
      },
      '12': {
        x: 87,
        y: 34,
      },
    },
    tileset: 0,
  },
  {
    name: 'Trebizond',
    position: {
      x: 1138,
      y: 344,
    },
    economy: 360,
    industry: 370,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['16', '59'],
    },
    marketId: '5',
    industryId: '6',
    buildings: {
      '1': {
        x: 51,
        y: 72,
      },
      '2': {
        x: 67,
        y: 86,
      },
      '3': {
        x: 67,
        y: 61,
      },
      '4': {
        x: 51,
        y: 59,
      },
      '5': {
        x: 85,
        y: 87,
      },
      '7': {
        x: 29,
        y: 73,
      },
      '10': {
        x: 82,
        y: 73,
      },
      '11': {
        x: 10,
        y: 78,
      },
      '12': {
        x: 34,
        y: 86,
      },
    },
    tileset: 2,
  },
  {
    name: 'Ceuta',
    position: {
      x: 864,
      y: 384,
    },
    economy: 85,
    industry: 90,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '1',
    marketId: '4',
    industryId: '1',
    buildings: {
      '1': {
        x: 49,
        y: 63,
      },
      '2': {
        x: 26,
        y: 69,
      },
      '3': {
        x: 58,
        y: 43,
      },
      '4': {
        x: 33,
        y: 46,
      },
      '5': {
        x: 70,
        y: 65,
      },
      '7': {
        x: 11,
        y: 66,
      },
    },
    tileset: 0,
  },
  {
    name: 'Bordeaux',
    position: {
      x: 890,
      y: 314,
    },
    economy: 600,
    industry: 580,
    allegiances: [0, 0, 0, 80, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['2', '43', '4'],
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 34,
        y: 76,
      },
      '2': {
        x: 40,
        y: 89,
      },
      '3': {
        x: 50,
        y: 65,
      },
      '4': {
        x: 26,
        y: 64,
      },
      '5': {
        x: 33,
        y: 89,
      },
      '7': {
        x: 17,
        y: 74,
      },
      '8': {
        x: 21,
        y: 88,
      },
      '9': {
        x: 57,
        y: 82,
      },
      '10': {
        x: 64,
        y: 85,
      },
      '11': {
        x: 3,
        y: 73,
      },
    },
    tileset: 1,
  },
  {
    name: 'Nantes',
    position: {
      x: 886,
      y: 296,
    },
    economy: 560,
    industry: 570,
    allegiances: [0, 0, 0, 80, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['5', '18', '63'],
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 49,
        y: 40,
      },
      '2': {
        x: 53,
        y: 12,
      },
      '3': {
        x: 38,
        y: 43,
      },
      '4': {
        x: 69,
        y: 44,
      },
      '5': {
        x: 49,
        y: 26,
      },
      '7': {
        x: 37,
        y: 26,
      },
      '10': {
        x: 74,
        y: 29,
      },
      '11': {
        x: 69,
        y: 17,
      },
      '12': {
        x: 21,
        y: 34,
      },
    },
    tileset: 1,
  },
  {
    name: 'London',
    position: {
      x: 900,
      y: 262,
    },
    economy: 720,
    industry: 740,
    allegiances: [0, 0, 0, 100, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['10', '25', '59'],
      secret: '22',
    },
    marketId: '2',
    industryId: '2',
    buildings: {
      '1': {
        x: 50,
        y: 70,
      },
      '2': {
        x: 43,
        y: 83,
      },
      '3': {
        x: 56,
        y: 46,
      },
      '4': {
        x: 58,
        y: 62,
      },
      '5': {
        x: 33,
        y: 70,
      },
      '6': {
        x: 32,
        y: 16,
      },
      '7': {
        x: 41,
        y: 43,
      },
      '9': {
        x: 19,
        y: 70,
      },
      '10': {
        x: 8,
        y: 42,
      },
      '11': {
        x: 22,
        y: 45,
      },
      '12': {
        x: 33,
        y: 83,
      },
    },
    tileset: 1,
  },
  {
    name: 'Bristol',
    position: {
      x: 880,
      y: 264,
    },
    economy: 320,
    industry: 380,
    allegiances: [0, 0, 0, 100, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['11', '17'],
      secret: '15',
    },
    marketId: '2',
    industryId: '2',
    buildings: {
      '1': {
        x: 40,
        y: 76,
      },
      '2': {
        x: 69,
        y: 54,
      },
      '3': {
        x: 70,
        y: 41,
      },
      '4': {
        x: 46,
        y: 64,
      },
      '5': {
        x: 57,
        y: 77,
      },
      '7': {
        x: 39,
        y: 89,
      },
      '10': {
        x: 85,
        y: 70,
      },
      '11': {
        x: 71,
        y: 70,
      },
    },
    tileset: 1,
  },
  {
    name: 'Dublin',
    position: {
      x: 856,
      y: 252,
    },
    economy: 370,
    industry: 350,
    allegiances: [0, 0, 0, 93, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['1', '11'],
      secret: '15',
    },
    marketId: '2',
    industryId: '2',
    buildings: {
      '1': {
        x: 28,
        y: 70,
      },
      '2': {
        x: 15,
        y: 36,
      },
      '3': {
        x: 29,
        y: 41,
      },
      '4': {
        x: 33,
        y: 56,
      },
      '5': {
        x: 5,
        y: 84,
      },
      '7': {
        x: 23,
        y: 82,
      },
      '10': {
        x: 32,
        y: 29,
      },
      '11': {
        x: 16,
        y: 57,
      },
      '12': {
        x: 35,
        y: 82,
      },
    },
    tileset: 1,
  },
  {
    name: 'Antwerp',
    position: {
      x: 934,
      y: 258,
    },
    economy: 660,
    industry: 670,
    allegiances: [0, 0, 0, 0, 0, 100],
    regionId: '1',
    itemShop: {
      regular: ['3', '42', '53'],
      secret: '41',
    },
    marketId: '2',
    industryId: '3',
    buildings: {
      '1': {
        x: 34,
        y: 85,
      },
      '2': {
        x: 19,
        y: 71,
      },
      '3': {
        x: 46,
        y: 65,
      },
      '4': {
        x: 23,
        y: 58,
      },
      '5': {
        x: 29,
        y: 71,
      },
      '7': {
        x: 19,
        y: 85,
      },
      '8': {
        x: 6,
        y: 85,
      },
      '9': {
        x: 42,
        y: 84,
      },
      '10': {
        x: 4,
        y: 71,
      },
      '11': {
        x: 71,
        y: 91,
      },
      '12': {
        x: 58,
        y: 84,
      },
    },
    tileset: 1,
  },
  {
    name: 'Amsterdam',
    position: {
      x: 936,
      y: 248,
    },
    economy: 700,
    industry: 730,
    allegiances: [0, 0, 0, 0, 0, 100],
    regionId: '1',
    itemShop: {
      regular: ['25', '22', '23'],
      secret: '24',
    },
    marketId: '2',
    industryId: '3',
    buildings: {
      '1': {
        x: 47,
        y: 67,
      },
      '2': {
        x: 33,
        y: 59,
      },
      '3': {
        x: 64,
        y: 70,
      },
      '4': {
        x: 35,
        y: 71,
      },
      '5': {
        x: 51,
        y: 43,
      },
      '6': {
        x: 56,
        y: 14,
      },
      '7': {
        x: 47,
        y: 55,
      },
      '8': {
        x: 63,
        y: 43,
      },
      '9': {
        x: 37,
        y: 43,
      },
      '10': {
        x: 80,
        y: 59,
      },
      '11': {
        x: 79,
        y: 45,
      },
    },
    tileset: 1,
  },
  {
    name: 'Copenhagen',
    position: {
      x: 974,
      y: 230,
    },
    economy: 530,
    industry: 510,
    allegiances: [0, 0, 0, 0, 0, 98],
    regionId: '1',
    itemShop: {
      regular: ['18', '19', '20'],
      secret: '79',
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 34,
        y: 31,
      },
      '2': {
        x: 16,
        y: 45,
      },
      '3': {
        x: 49,
        y: 49,
      },
      '4': {
        x: 46,
        y: 31,
      },
      '5': {
        x: 15,
        y: 31,
      },
      '7': {
        x: 21,
        y: 16,
      },
      '8': {
        x: 32,
        y: 16,
      },
      '9': {
        x: 32,
        y: 45,
      },
      '10': {
        x: 34,
        y: 60,
      },
      '11': {
        x: 33,
        y: 77,
      },
      '12': {
        x: 16,
        y: 59,
      },
    },
    tileset: 1,
  },
  {
    name: 'Hamburg',
    position: {
      x: 960,
      y: 244,
    },
    economy: 600,
    industry: 620,
    allegiances: [0, 0, 0, 0, 0, 95],
    regionId: '1',
    itemShop: {
      regular: ['21', '17', '56'],
    },
    marketId: '2',
    industryId: '3',
    buildings: {
      '1': {
        x: 61,
        y: 34,
      },
      '2': {
        x: 49,
        y: 20,
      },
      '3': {
        x: 71,
        y: 48,
      },
      '4': {
        x: 49,
        y: 44,
      },
      '5': {
        x: 62,
        y: 20,
      },
      '7': {
        x: 49,
        y: 34,
      },
      '8': {
        x: 83,
        y: 40,
      },
      '9': {
        x: 27,
        y: 34,
      },
      '10': {
        x: 85,
        y: 26,
      },
      '11': {
        x: 30,
        y: 19,
      },
    },
    tileset: 1,
  },
  {
    name: 'Oslo',
    position: {
      x: 962,
      y: 190,
    },
    economy: 190,
    industry: 185,
    allegiances: [0, 0, 0, 80, 0, 0],
    regionId: '1',
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 69,
        y: 54,
      },
      '2': {
        x: 81,
        y: 66,
      },
      '3': {
        x: 68,
        y: 66,
      },
      '4': {
        x: 60,
        y: 51,
      },
      '5': {
        x: 87,
        y: 80,
      },
      '7': {
        x: 71,
        y: 78,
      },
    },
    tileset: 1,
  },
  {
    name: 'Stockholm',
    position: {
      x: 1014,
      y: 196,
    },
    economy: 480,
    industry: 470,
    allegiances: [0, 0, 0, 85, 0, 0],
    regionId: '1',
    itemShop: {
      regular: ['1', '2'],
      secret: '14',
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 55,
        y: 44,
      },
      '2': {
        x: 54,
        y: 30,
      },
      '3': {
        x: 64,
        y: 32,
      },
      '4': {
        x: 45,
        y: 57,
      },
      '5': {
        x: 53,
        y: 80,
      },
      '7': {
        x: 36,
        y: 88,
      },
      '9': {
        x: 57,
        y: 16,
      },
      '10': {
        x: 61,
        y: 86,
      },
      '11': {
        x: 36,
        y: 73,
      },
      '12': {
        x: 68,
        y: 18,
      },
    },
    tileset: 1,
  },
  {
    name: 'Lubeck',
    position: {
      x: 964,
      y: 242,
    },
    economy: 320,
    industry: 300,
    allegiances: [0, 0, 0, 0, 0, 85],
    regionId: '1',
    itemShop: {
      regular: ['16', '3', '6'],
      secret: '13',
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 32,
        y: 35,
      },
      '2': {
        x: 45,
        y: 29,
      },
      '3': {
        x: 47,
        y: 42,
      },
      '4': {
        x: 37,
        y: 46,
      },
      '5': {
        x: 45,
        y: 15,
      },
      '7': {
        x: 30,
        y: 21,
      },
      '9': {
        x: 14,
        y: 35,
      },
      '10': {
        x: 28,
        y: 7,
      },
      '11': {
        x: 11,
        y: 21,
      },
    },
    tileset: 1,
  },
  {
    name: 'Danzig',
    position: {
      x: 1008,
      y: 240,
    },
    economy: 370,
    industry: 280,
    allegiances: [0, 0, 0, 0, 0, 90],
    regionId: '1',
    itemShop: {
      regular: ['17', '54'],
      secret: '39',
    },
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 27,
        y: 64,
      },
      '2': {
        x: 15,
        y: 64,
      },
      '3': {
        x: 52,
        y: 59,
      },
      '4': {
        x: 22,
        y: 51,
      },
      '5': {
        x: 32,
        y: 89,
      },
      '7': {
        x: 11,
        y: 88,
      },
      '9': {
        x: 11,
        y: 76,
      },
      '10': {
        x: 47,
        y: 89,
      },
      '11': {
        x: 47,
        y: 75,
      },
      '12': {
        x: 28,
        y: 76,
      },
    },
    tileset: 1,
  },
  {
    name: 'Riga',
    position: {
      x: 1042,
      y: 218,
    },
    economy: 150,
    industry: 160,
    allegiances: [0, 0, 0, 0, 0, 85],
    regionId: '1',
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 63,
        y: 74,
      },
      '2': {
        x: 33,
        y: 74,
      },
      '3': {
        x: 34,
        y: 61,
      },
      '4': {
        x: 58,
        y: 61,
      },
      '5': {
        x: 51,
        y: 74,
      },
      '7': {
        x: 31,
        y: 88,
      },
      '11': {
        x: 65,
        y: 89,
      },
      '12': {
        x: 51,
        y: 88,
      },
    },
    tileset: 1,
  },
  {
    name: 'Bergen',
    position: {
      x: 930,
      y: 192,
    },
    economy: 145,
    industry: 150,
    allegiances: [0, 0, 0, 0, 0, 80],
    regionId: '1',
    marketId: '2',
    industryId: '4',
    buildings: {
      '1': {
        x: 86,
        y: 64,
      },
      '2': {
        x: 87,
        y: 89,
      },
      '3': {
        x: 62,
        y: 53,
      },
      '4': {
        x: 60,
        y: 65,
      },
      '5': {
        x: 79,
        y: 77,
      },
      '7': {
        x: 73,
        y: 89,
      },
      '12': {
        x: 71,
        y: 64,
      },
    },
    tileset: 1,
  },
  {
    name: 'Caracas',
    position: {
      x: 464,
      y: 588,
    },
    economy: 220,
    industry: 210,
    allegiances: [0, 95, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['44', '18'],
    },
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 40,
        y: 76,
      },
      '2': {
        x: 66,
        y: 71,
      },
      '3': {
        x: 40,
        y: 65,
      },
      '4': {
        x: 53,
        y: 63,
      },
      '5': {
        x: 58,
        y: 73,
      },
      '7': {
        x: 31,
        y: 78,
      },
      '9': {
        x: 57,
        y: 83,
      },
      '10': {
        x: 67,
        y: 83,
      },
    },
    tileset: 3,
  },
  {
    name: 'Cartegena',
    position: {
      x: 412,
      y: 592,
    },
    economy: 190,
    industry: 130,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['44', '3'],
    },
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 65,
        y: 35,
      },
      '2': {
        x: 82,
        y: 49,
      },
      '3': {
        x: 64,
        y: 58,
      },
      '4': {
        x: 63,
        y: 46,
      },
      '5': {
        x: 89,
        y: 61,
      },
      '7': {
        x: 90,
        y: 47,
      },
      '10': {
        x: 81,
        y: 71,
      },
      '11': {
        x: 65,
        y: 70,
      },
      '12': {
        x: 83,
        y: 35,
      },
    },
    tileset: 3,
  },
  {
    name: 'Havana',
    position: {
      x: 376,
      y: 502,
    },
    economy: 210,
    industry: 220,
    allegiances: [0, 93, 0, 0, 0, 0],
    regionId: '2',
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 43,
        y: 89,
      },
      '2': {
        x: 55,
        y: 84,
      },
      '3': {
        x: 34,
        y: 75,
      },
      '4': {
        x: 49,
        y: 75,
      },
      '5': {
        x: 27,
        y: 83,
      },
      '7': {
        x: 70,
        y: 87,
      },
      '9': {
        x: 18,
        y: 85,
      },
      '12': {
        x: 78,
        y: 85,
      },
    },
    tileset: 3,
  },
  {
    name: 'Margarita',
    position: {
      x: 482,
      y: 584,
    },
    economy: 40,
    industry: 45,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['1'],
      secret: '67',
    },
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 52,
        y: 47,
      },
      '2': {
        x: 60,
        y: 49,
      },
      '3': {
        x: 63,
        y: 37,
      },
      '4': {
        x: 41,
        y: 37,
      },
      '5': {
        x: 74,
        y: 40,
      },
      '7': {
        x: 54,
        y: 59,
      },
      '10': {
        x: 75,
        y: 52,
      },
      '11': {
        x: 39,
        y: 51,
      },
    },
    tileset: 3,
  },
  {
    name: 'Panama',
    position: {
      x: 388,
      y: 600,
    },
    economy: 160,
    industry: 190,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['44', '69'],
    },
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 39,
        y: 19,
      },
      '2': {
        x: 8,
        y: 23,
      },
      '3': {
        x: 38,
        y: 31,
      },
      '4': {
        x: 52,
        y: 23,
      },
      '5': {
        x: 11,
        y: 39,
      },
      '7': {
        x: 31,
        y: 17,
      },
      '9': {
        x: 24,
        y: 31,
      },
      '10': {
        x: 51,
        y: 7,
      },
    },
    tileset: 3,
  },
  {
    name: 'Porto Velho',
    position: {
      x: 386,
      y: 596,
    },
    economy: 60,
    industry: 75,
    allegiances: [0, 95, 0, 0, 0, 0],
    regionId: '2',
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 32,
        y: 83,
      },
      '2': {
        x: 79,
        y: 75,
      },
      '3': {
        x: 32,
        y: 69,
      },
      '4': {
        x: 51,
        y: 67,
      },
      '5': {
        x: 66,
        y: 81,
      },
      '7': {
        x: 47,
        y: 88,
      },
      '12': {
        x: 78,
        y: 89,
      },
    },
    tileset: 3,
  },
  {
    name: 'Santo Domingo',
    position: {
      x: 454,
      y: 540,
    },
    economy: 150,
    industry: 160,
    allegiances: [0, 98, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['43', '42'],
    },
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 49,
        y: 72,
      },
      '2': {
        x: 72,
        y: 60,
      },
      '3': {
        x: 71,
        y: 73,
      },
      '4': {
        x: 60,
        y: 73,
      },
      '5': {
        x: 60,
        y: 31,
      },
      '7': {
        x: 47,
        y: 62,
      },
      '9': {
        x: 57,
        y: 61,
      },
      '10': {
        x: 54,
        y: 47,
      },
      '11': {
        x: 40,
        y: 54,
      },
      '12': {
        x: 22,
        y: 24,
      },
    },
    tileset: 3,
  },
  {
    name: 'Veracruz',
    position: {
      x: 296,
      y: 532,
    },
    economy: 80,
    industry: 75,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 45,
        y: 28,
      },
      '2': {
        x: 55,
        y: 40,
      },
      '3': {
        x: 66,
        y: 28,
      },
      '4': {
        x: 55,
        y: 28,
      },
      '5': {
        x: 49,
        y: 51,
      },
      '7': {
        x: 43,
        y: 40,
      },
      '11': {
        x: 64,
        y: 43,
      },
    },
    tileset: 3,
  },
  {
    name: 'Jamaica',
    position: {
      x: 408,
      y: 542,
    },
    economy: 60,
    industry: 80,
    allegiances: [0, 90, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['61'],
    },
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 58,
        y: 71,
      },
      '2': {
        x: 51,
        y: 44,
      },
      '3': {
        x: 77,
        y: 67,
      },
      '4': {
        x: 68,
        y: 71,
      },
      '5': {
        x: 61,
        y: 44,
      },
      '7': {
        x: 58,
        y: 58,
      },
      '9': {
        x: 84,
        y: 55,
      },
      '10': {
        x: 38,
        y: 45,
      },
      '11': {
        x: 72,
        y: 55,
      },
      '12': {
        x: 54,
        y: 32,
      },
    },
    tileset: 3,
  },
  {
    name: 'Guatemala',
    position: {
      x: 328,
      y: 564,
    },
    economy: 70,
    industry: 65,
    allegiances: [0, 97, 0, 0, 0, 0],
    regionId: '2',
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 62,
        y: 51,
      },
      '2': {
        x: 63,
        y: 40,
      },
      '3': {
        x: 61,
        y: 63,
      },
      '4': {
        x: 50,
        y: 53,
      },
      '5': {
        x: 46,
        y: 53,
      },
      '7': {
        x: 48,
        y: 41,
      },
      '11': {
        x: 38,
        y: 23,
      },
      '12': {
        x: 59,
        y: 16,
      },
    },
    tileset: 3,
  },
  {
    name: 'Pernambuco',
    position: {
      x: 624,
      y: 722,
    },
    economy: 215,
    industry: 240,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['1', '20'],
      secret: '75',
    },
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 51,
        y: 54,
      },
      '2': {
        x: 70,
        y: 58,
      },
      '3': {
        x: 74,
        y: 72,
      },
      '4': {
        x: 59,
        y: 65,
      },
      '5': {
        x: 22,
        y: 87,
      },
      '7': {
        x: 26,
        y: 43,
      },
      '9': {
        x: 63,
        y: 49,
      },
      '10': {
        x: 39,
        y: 81,
      },
      '11': {
        x: 22,
        y: 75,
      },
    },
    tileset: 3,
  },
  {
    name: 'Rio de Janeiro',
    position: {
      x: 594,
      y: 824,
    },
    economy: 45,
    industry: 50,
    allegiances: [90, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['56'],
      secret: '66',
    },
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 42,
        y: 61,
      },
      '2': {
        x: 41,
        y: 48,
      },
      '3': {
        x: 56,
        y: 73,
      },
      '4': {
        x: 42,
        y: 73,
      },
      '5': {
        x: 58,
        y: 48,
      },
      '7': {
        x: 59,
        y: 61,
      },
      '10': {
        x: 30,
        y: 49,
      },
      '11': {
        x: 49,
        y: 31,
      },
      '12': {
        x: 71,
        y: 48,
      },
    },
    tileset: 3,
  },
  {
    name: 'Maracaibo',
    position: {
      x: 434,
      y: 590,
    },
    economy: 120,
    industry: 105,
    allegiances: [0, 95, 0, 0, 0, 0],
    regionId: '2',
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 51,
        y: 45,
      },
      '2': {
        x: 39,
        y: 49,
      },
      '3': {
        x: 58,
        y: 55,
      },
      '4': {
        x: 57,
        y: 43,
      },
      '5': {
        x: 32,
        y: 36,
      },
      '7': {
        x: 44,
        y: 36,
      },
      '12': {
        x: 31,
        y: 49,
      },
    },
    tileset: 3,
  },
  {
    name: 'Santiago',
    position: {
      x: 412,
      y: 526,
    },
    economy: 80,
    industry: 105,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    itemShop: {
      regular: ['44'],
    },
    marketId: '7',
    industryId: '11',
    buildings: {
      '1': {
        x: 48,
        y: 54,
      },
      '2': {
        x: 37,
        y: 41,
      },
      '3': {
        x: 61,
        y: 68,
      },
      '4': {
        x: 48,
        y: 66,
      },
      '5': {
        x: 36,
        y: 55,
      },
      '7': {
        x: 51,
        y: 41,
      },
      '10': {
        x: 61,
        y: 40,
      },
      '11': {
        x: 61,
        y: 55,
      },
      '12': {
        x: 73,
        y: 36,
      },
    },
    tileset: 3,
  },
  {
    name: 'Cayenne',
    position: {
      x: 556,
      y: 642,
    },
    economy: 70,
    industry: 65,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '2',
    marketId: '8',
    industryId: '11',
    buildings: {
      '1': {
        x: 44,
        y: 32,
      },
      '2': {
        x: 30,
        y: 32,
      },
      '3': {
        x: 55,
        y: 45,
      },
      '4': {
        x: 55,
        y: 32,
      },
      '5': {
        x: 35,
        y: 21,
      },
      '7': {
        x: 43,
        y: 45,
      },
    },
    tileset: 3,
  },
  {
    name: 'Madeira',
    position: {
      x: 794,
      y: 402,
    },
    economy: 240,
    industry: 230,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 39,
        y: 50,
      },
      '2': {
        x: 39,
        y: 60,
      },
      '3': {
        x: 27,
        y: 64,
      },
      '4': {
        x: 24,
        y: 53,
      },
      '5': {
        x: 48,
        y: 48,
      },
      '7': {
        x: 50,
        y: 58,
      },
      '11': {
        x: 60,
        y: 70,
      },
      '12': {
        x: 46,
        y: 36,
      },
    },
    tileset: 3,
  },
  {
    name: 'Santa Cruz',
    position: {
      x: 794,
      y: 438,
    },
    economy: 90,
    industry: 80,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 42,
        y: 68,
      },
      '2': {
        x: 54,
        y: 61,
      },
      '3': {
        x: 62,
        y: 68,
      },
      '4': {
        x: 30,
        y: 68,
      },
      '5': {
        x: 41,
        y: 56,
      },
      '7': {
        x: 30,
        y: 56,
      },
      '11': {
        x: 58,
        y: 43,
      },
      '12': {
        x: 37,
        y: 40,
      },
    },
    tileset: 3,
  },
  {
    name: 'San Jorge',
    position: {
      x: 882,
      y: 596,
    },
    economy: 210,
    industry: 190,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '3',
    itemShop: {
      regular: ['1', '25'],
      secret: '70',
    },
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 47,
        y: 43,
      },
      '2': {
        x: 33,
        y: 38,
      },
      '3': {
        x: 54,
        y: 73,
      },
      '4': {
        x: 44,
        y: 73,
      },
      '5': {
        x: 58,
        y: 54,
      },
      '7': {
        x: 67,
        y: 54,
      },
      '9': {
        x: 68,
        y: 37,
      },
      '10': {
        x: 40,
        y: 52,
      },
      '11': {
        x: 56,
        y: 37,
      },
    },
    tileset: 3,
  },
  {
    name: 'Bissau',
    position: {
      x: 796,
      y: 546,
    },
    economy: 85,
    industry: 100,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 49,
        y: 52,
      },
      '2': {
        x: 32,
        y: 52,
      },
      '3': {
        x: 47,
        y: 65,
      },
      '4': {
        x: 36,
        y: 65,
      },
      '5': {
        x: 61,
        y: 52,
      },
      '7': {
        x: 39,
        y: 40,
      },
      '12': {
        x: 50,
        y: 40,
      },
    },
    tileset: 3,
  },
  {
    name: 'Luanda',
    position: {
      x: 974,
      y: 704,
    },
    economy: 90,
    industry: 75,
    allegiances: [96, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 62,
        y: 42,
      },
      '2': {
        x: 87,
        y: 53,
      },
      '3': {
        x: 86,
        y: 37,
      },
      '4': {
        x: 75,
        y: 42,
      },
      '5': {
        x: 63,
        y: 54,
      },
      '7': {
        x: 75,
        y: 54,
      },
      '11': {
        x: 74,
        y: 70,
      },
      '12': {
        x: 57,
        y: 67,
      },
    },
    tileset: 3,
  },
  {
    name: 'Argin',
    position: {
      x: 790,
      y: 494,
    },
    economy: 200,
    industry: 185,
    allegiances: [100, 0, 0, 0, 0, 0],
    regionId: '3',
    itemShop: {
      regular: ['42', '54'],
    },
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 53,
        y: 42,
      },
      '2': {
        x: 65,
        y: 44,
      },
      '3': {
        x: 54,
        y: 73,
      },
      '4': {
        x: 44,
        y: 73,
      },
      '5': {
        x: 58,
        y: 52,
      },
      '7': {
        x: 31,
        y: 52,
      },
      '9': {
        x: 44,
        y: 53,
      },
      '10': {
        x: 31,
        y: 40,
      },
      '11': {
        x: 40,
        y: 41,
      },
    },
    tileset: 3,
  },
  {
    name: 'Bathurst',
    position: {
      x: 792,
      y: 538,
    },
    economy: 75,
    industry: 60,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 37,
        y: 64,
      },
      '2': {
        x: 42,
        y: 74,
      },
      '3': {
        x: 39,
        y: 85,
      },
      '4': {
        x: 32,
        y: 74,
      },
      '5': {
        x: 52,
        y: 64,
      },
      '7': {
        x: 57,
        y: 74,
      },
      '12': {
        x: 69,
        y: 74,
      },
    },
    tileset: 3,
  },
  {
    name: 'Timbuktu',
    position: {
      x: 874,
      y: 530,
    },
    economy: 430,
    industry: 35,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '3',
    itemShop: {
      regular: ['65', '66', '62'],
      secret: '77',
    },
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 77,
        y: 61,
      },
      '2': {
        x: 51,
        y: 50,
      },
      '3': {
        x: 61,
        y: 69,
      },
      '4': {
        x: 73,
        y: 69,
      },
      '5': {
        x: 47,
        y: 62,
      },
      '7': {
        x: 87,
        y: 60,
      },
      '8': {
        x: 67,
        y: 10,
      },
      '10': {
        x: 89,
        y: 87,
      },
      '12': {
        x: 29,
        y: 70,
      },
    },
    tileset: 3,
  },
  {
    name: 'Abidjan',
    position: {
      x: 868,
      y: 594,
    },
    economy: 90,
    industry: 75,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '3',
    marketId: '6',
    industryId: '8',
    buildings: {
      '1': {
        x: 32,
        y: 60,
      },
      '2': {
        x: 18,
        y: 60,
      },
      '3': {
        x: 43,
        y: 68,
      },
      '4': {
        x: 53,
        y: 68,
      },
      '5': {
        x: 53,
        y: 44,
      },
      '7': {
        x: 33,
        y: 50,
      },
      '12': {
        x: 63,
        y: 8,
      },
    },
    tileset: 3,
  },
  {
    name: 'Sofala',
    position: {
      x: 1108,
      y: 762,
    },
    economy: 390,
    industry: 400,
    allegiances: [85, 0, 0, 0, 0, 0],
    regionId: '4',
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 34,
        y: 48,
      },
      '2': {
        x: 46,
        y: 48,
      },
      '3': {
        x: 57,
        y: 36,
      },
      '4': {
        x: 60,
        y: 48,
      },
      '5': {
        x: 32,
        y: 36,
      },
      '7': {
        x: 44,
        y: 36,
      },
      '11': {
        x: 54,
        y: 64,
      },
      '12': {
        x: 39,
        y: 24,
      },
    },
    tileset: 3,
  },
  {
    name: 'Malindi',
    position: {
      x: 1138,
      y: 662,
    },
    economy: 370,
    industry: 360,
    allegiances: [95, 0, 0, 0, 0, 0],
    regionId: '4',
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 51,
        y: 57,
      },
      '2': {
        x: 63,
        y: 45,
      },
      '3': {
        x: 69,
        y: 57,
      },
      '4': {
        x: 59,
        y: 57,
      },
      '5': {
        x: 81,
        y: 48,
      },
      '7': {
        x: 48,
        y: 45,
      },
      '12': {
        x: 73,
        y: 32,
      },
    },
    tileset: 3,
  },
  {
    name: 'Mogadishu',
    position: {
      x: 1174,
      y: 614,
    },
    economy: 90,
    industry: 70,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '4',
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 55,
        y: 61,
      },
      '2': {
        x: 64,
        y: 62,
      },
      '3': {
        x: 43,
        y: 73,
      },
      '4': {
        x: 56,
        y: 73,
      },
      '5': {
        x: 46,
        y: 63,
      },
      '7': {
        x: 77,
        y: 66,
      },
    },
    tileset: 3,
  },
  {
    name: 'Mombasa',
    position: {
      x: 1134,
      y: 670,
    },
    economy: 380,
    industry: 390,
    allegiances: [90, 0, 0, 0, 0, 0],
    regionId: '4',
    itemShop: {
      regular: ['68', '51', '53'],
      secret: '55',
    },
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 50,
        y: 48,
      },
      '2': {
        x: 23,
        y: 48,
      },
      '3': {
        x: 55,
        y: 37,
      },
      '4': {
        x: 58,
        y: 48,
      },
      '5': {
        x: 46,
        y: 60,
      },
      '7': {
        x: 24,
        y: 60,
      },
      '9': {
        x: 36,
        y: 34,
      },
      '10': {
        x: 23,
        y: 33,
      },
      '11': {
        x: 33,
        y: 60,
      },
      '12': {
        x: 35,
        y: 46,
      },
    },
    tileset: 3,
  },
  {
    name: 'Mozambique',
    position: {
      x: 1140,
      y: 734,
    },
    economy: 180,
    industry: 160,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '4',
    itemShop: {
      regular: ['42', '66'],
      secret: '64',
    },
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 59,
        y: 45,
      },
      '2': {
        x: 38,
        y: 53,
      },
      '3': {
        x: 76,
        y: 40,
      },
      '4': {
        x: 68,
        y: 40,
      },
      '5': {
        x: 58,
        y: 32,
      },
      '7': {
        x: 29,
        y: 53,
      },
      '9': {
        x: 55,
        y: 59,
      },
      '10': {
        x: 22,
        y: 34,
      },
      '11': {
        x: 36,
        y: 34,
      },
    },
    tileset: 3,
  },
  {
    name: 'Quelimane',
    position: {
      x: 1120,
      y: 748,
    },
    economy: 60,
    industry: 60,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '4',
    marketId: '9',
    industryId: '8',
    buildings: {
      '1': {
        x: 51,
        y: 48,
      },
      '2': {
        x: 52,
        y: 61,
      },
      '3': {
        x: 43,
        y: 73,
      },
      '4': {
        x: 56,
        y: 73,
      },
      '5': {
        x: 39,
        y: 60,
      },
      '7': {
        x: 65,
        y: 61,
      },
      '12': {
        x: 74,
        y: 61,
      },
    },
    tileset: 3,
  },
  {
    name: 'Aden',
    position: {
      x: 1178,
      y: 540,
    },
    economy: 210,
    industry: 260,
    allegiances: [90, 0, 0, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 60,
        y: 56,
      },
      '2': {
        x: 54,
        y: 43,
      },
      '3': {
        x: 49,
        y: 69,
      },
      '4': {
        x: 59,
        y: 69,
      },
      '5': {
        x: 46,
        y: 56,
      },
      '7': {
        x: 35,
        y: 56,
      },
      '9': {
        x: 78,
        y: 56,
      },
    },
    tileset: 2,
  },
  {
    name: 'Hormuz',
    position: {
      x: 1240,
      y: 450,
    },
    economy: 100,
    industry: 90,
    allegiances: [95, 0, 0, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 84,
        y: 65,
      },
      '2': {
        x: 67,
        y: 53,
      },
      '3': {
        x: 52,
        y: 63,
      },
      '4': {
        x: 63,
        y: 66,
      },
      '5': {
        x: 83,
        y: 53,
      },
      '7': {
        x: 89,
        y: 78,
      },
      '11': {
        x: 50,
        y: 34,
      },
      '12': {
        x: 58,
        y: 50,
      },
    },
    tileset: 2,
  },
  {
    name: 'Massawa',
    position: {
      x: 1146,
      y: 528,
    },
    economy: 90,
    industry: 85,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '5',
    itemShop: {
      regular: ['68'],
    },
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 49,
        y: 51,
      },
      '2': {
        x: 36,
        y: 51,
      },
      '3': {
        x: 61,
        y: 38,
      },
      '4': {
        x: 61,
        y: 51,
      },
      '5': {
        x: 26,
        y: 51,
      },
      '7': {
        x: 38,
        y: 74,
      },
      '8': {
        x: 10,
        y: 86,
      },
      '10': {
        x: 40,
        y: 63,
      },
      '11': {
        x: 44,
        y: 38,
      },
      '12': {
        x: 49,
        y: 63,
      },
    },
    tileset: 2,
  },
  {
    name: 'Cairo',
    position: {
      x: 1096,
      y: 428,
    },
    economy: 510,
    industry: 480,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '5',
    itemShop: {
      regular: ['8', '58', '18'],
    },
    marketId: '10',
    industryId: '6',
    buildings: {
      '1': {
        x: 39,
        y: 38,
      },
      '2': {
        x: 40,
        y: 26,
      },
      '3': {
        x: 56,
        y: 50,
      },
      '4': {
        x: 55,
        y: 38,
      },
      '5': {
        x: 31,
        y: 26,
      },
      '7': {
        x: 25,
        y: 50,
      },
      '8': {
        x: 19,
        y: 10,
      },
      '9': {
        x: 38,
        y: 50,
      },
      '10': {
        x: 22,
        y: 38,
      },
      '11': {
        x: 6,
        y: 37,
      },
      '12': {
        x: 8,
        y: 50,
      },
    },
    tileset: 2,
  },
  {
    name: 'Basra',
    position: {
      x: 1190,
      y: 426,
    },
    economy: 480,
    industry: 500,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 45,
        y: 51,
      },
      '2': {
        x: 49,
        y: 63,
      },
      '3': {
        x: 60,
        y: 63,
      },
      '4': {
        x: 60,
        y: 51,
      },
      '5': {
        x: 32,
        y: 51,
      },
      '7': {
        x: 36,
        y: 63,
      },
      '11': {
        x: 44,
        y: 38,
      },
      '12': {
        x: 25,
        y: 63,
      },
    },
    tileset: 2,
  },
  {
    name: 'Mecca',
    position: {
      x: 1136,
      y: 488,
    },
    economy: 500,
    industry: 80,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '5',
    itemShop: {
      regular: ['26', '58', '23'],
    },
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 48,
        y: 60,
      },
      '2': {
        x: 37,
        y: 48,
      },
      '3': {
        x: 29,
        y: 60,
      },
      '4': {
        x: 37,
        y: 60,
      },
      '5': {
        x: 64,
        y: 60,
      },
      '7': {
        x: 49,
        y: 48,
      },
      '8': {
        x: 42,
        y: 37,
      },
      '9': {
        x: 62,
        y: 48,
      },
      '10': {
        x: 73,
        y: 48,
      },
      '11': {
        x: 56,
        y: 78,
      },
      '12': {
        x: 82,
        y: 60,
      },
    },
    tileset: 2,
  },
  {
    name: 'Quatar',
    position: {
      x: 1216,
      y: 458,
    },
    economy: 130,
    industry: 160,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 50,
        y: 58,
      },
      '2': {
        x: 50,
        y: 69,
      },
      '3': {
        x: 60,
        y: 69,
      },
      '4': {
        x: 60,
        y: 58,
      },
      '5': {
        x: 42,
        y: 69,
      },
      '7': {
        x: 38,
        y: 58,
      },
      '11': {
        x: 26,
        y: 58,
      },
    },
    tileset: 2,
  },
  {
    name: 'Shiraz',
    position: {
      x: 1222,
      y: 450,
    },
    economy: 70,
    industry: 80,
    allegiances: [0, 0, 100, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 61,
        y: 53,
      },
      '2': {
        x: 71,
        y: 53,
      },
      '3': {
        x: 39,
        y: 53,
      },
      '4': {
        x: 48,
        y: 53,
      },
      '5': {
        x: 48,
        y: 41,
      },
      '7': {
        x: 39,
        y: 41,
      },
      '9': {
        x: 60,
        y: 65,
      },
      '11': {
        x: 78,
        y: 74,
      },
      '12': {
        x: 64,
        y: 41,
      },
    },
    tileset: 2,
  },
  {
    name: 'Muscat',
    position: {
      x: 1252,
      y: 464,
    },
    economy: 180,
    industry: 230,
    allegiances: [0, 0, 95, 0, 0, 0],
    regionId: '5',
    marketId: '10',
    industryId: '7',
    buildings: {
      '1': {
        x: 42,
        y: 50,
      },
      '2': {
        x: 52,
        y: 37,
      },
      '3': {
        x: 60,
        y: 63,
      },
      '4': {
        x: 60,
        y: 51,
      },
      '5': {
        x: 36,
        y: 74,
      },
      '7': {
        x: 24,
        y: 50,
      },
      '11': {
        x: 36,
        y: 36,
      },
      '12': {
        x: 18,
        y: 74,
      },
    },
    tileset: 2,
  },
  {
    name: 'Diu',
    position: {
      x: 1296,
      y: 458,
    },
    economy: 75,
    industry: 80,
    allegiances: [87, 0, 0, 0, 0, 0],
    regionId: '6',
    marketId: '11',
    industryId: '7',
    buildings: {
      '1': {
        x: 48,
        y: 53,
      },
      '2': {
        x: 57,
        y: 53,
      },
      '3': {
        x: 30,
        y: 45,
      },
      '4': {
        x: 39,
        y: 53,
      },
      '5': {
        x: 48,
        y: 41,
      },
      '7': {
        x: 39,
        y: 41,
      },
    },
    tileset: 6,
  },
  {
    name: 'Cochin',
    position: {
      x: 1352,
      y: 562,
    },
    economy: 130,
    industry: 120,
    allegiances: [90, 0, 0, 0, 0, 0],
    regionId: '6',
    marketId: '11',
    industryId: '7',
    buildings: {
      '1': {
        x: 42,
        y: 56,
      },
      '2': {
        x: 58,
        y: 54,
      },
      '3': {
        x: 24,
        y: 45,
      },
      '4': {
        x: 29,
        y: 56,
      },
      '5': {
        x: 37,
        y: 45,
      },
      '7': {
        x: 49,
        y: 68,
      },
      '9': {
        x: 71,
        y: 56,
      },
      '11': {
        x: 53,
        y: 34,
      },
      '12': {
        x: 36,
        y: 33,
      },
    },
    tileset: 6,
  },
  {
    name: 'Ceylon',
    position: {
      x: 1380,
      y: 576,
    },
    economy: 180,
    industry: 210,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '6',
    itemShop: {
      regular: ['57', '16'],
    },
    marketId: '11',
    industryId: '7',
    buildings: {
      '1': {
        x: 50,
        y: 60,
      },
      '2': {
        x: 60,
        y: 60,
      },
      '3': {
        x: 31,
        y: 71,
      },
      '4': {
        x: 36,
        y: 60,
      },
      '5': {
        x: 68,
        y: 49,
      },
      '7': {
        x: 70,
        y: 60,
      },
      '9': {
        x: 88,
        y: 60,
      },
      '10': {
        x: 49,
        y: 46,
      },
      '11': {
        x: 37,
        y: 46,
      },
      '12': {
        x: 85,
        y: 49,
      },
    },
    tileset: 6,
  },
  {
    name: 'Amboa',
    position: {
      x: 1654,
      y: 652,
    },
    economy: 50,
    industry: 50,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 64,
        y: 66,
      },
      '2': {
        x: 76,
        y: 57,
      },
      '3': {
        x: 38,
        y: 66,
      },
      '4': {
        x: 50,
        y: 66,
      },
      '5': {
        x: 39,
        y: 36,
      },
      '7': {
        x: 65,
        y: 52,
      },
      '12': {
        x: 50,
        y: 52,
      },
    },
    tileset: 3,
  },
  {
    name: 'Goa',
    position: {
      x: 1342,
      y: 536,
    },
    economy: 540,
    industry: 560,
    allegiances: [85, 0, 0, 0, 0, 0],
    regionId: '6',
    itemShop: {
      regular: ['43', '2', '55'],
    },
    marketId: '11',
    industryId: '7',
    buildings: {
      '1': {
        x: 48,
        y: 58,
      },
      '2': {
        x: 67,
        y: 58,
      },
      '3': {
        x: 58,
        y: 68,
      },
      '4': {
        x: 58,
        y: 58,
      },
      '5': {
        x: 39,
        y: 41,
      },
      '7': {
        x: 43,
        y: 41,
      },
      '8': {
        x: 53,
        y: 10,
      },
      '9': {
        x: 41,
        y: 30,
      },
      '10': {
        x: 61,
        y: 41,
      },
      '11': {
        x: 70,
        y: 28,
      },
    },
    tileset: 6,
  },
  {
    name: 'Malacca',
    position: {
      x: 1506,
      y: 606,
    },
    economy: 90,
    industry: 95,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 51,
        y: 51,
      },
      '2': {
        x: 64,
        y: 41,
      },
      '3': {
        x: 38,
        y: 69,
      },
      '4': {
        x: 49,
        y: 69,
      },
      '5': {
        x: 69,
        y: 51,
      },
      '7': {
        x: 60,
        y: 51,
      },
      '12': {
        x: 40,
        y: 51,
      },
    },
    tileset: 3,
  },
  {
    name: 'Ternate',
    position: {
      x: 1654,
      y: 622,
    },
    economy: 80,
    industry: 85,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 51,
        y: 56,
      },
      '2': {
        x: 55,
        y: 44,
      },
      '3': {
        x: 43,
        y: 68,
      },
      '4': {
        x: 55,
        y: 68,
      },
      '5': {
        x: 62,
        y: 56,
      },
      '7': {
        x: 37,
        y: 56,
      },
      '12': {
        x: 42,
        y: 44,
      },
    },
    tileset: 3,
  },
  {
    name: 'Banda',
    position: {
      x: 1668,
      y: 660,
    },
    economy: 45,
    industry: 40,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 43,
        y: 64,
      },
      '2': {
        x: 64,
        y: 52,
      },
      '3': {
        x: 70,
        y: 69,
      },
      '4': {
        x: 61,
        y: 69,
      },
      '5': {
        x: 52,
        y: 52,
      },
      '7': {
        x: 40,
        y: 52,
      },
      '12': {
        x: 43,
        y: 37,
      },
    },
    tileset: 3,
  },
  {
    name: 'Dili',
    position: {
      x: 1654,
      y: 684,
    },
    economy: 40,
    industry: 45,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 51,
        y: 52,
      },
      '2': {
        x: 35,
        y: 40,
      },
      '3': {
        x: 45,
        y: 42,
      },
      '4': {
        x: 58,
        y: 45,
      },
      '5': {
        x: 39,
        y: 52,
      },
      '7': {
        x: 67,
        y: 45,
      },
    },
    tileset: 3,
  },
  {
    name: 'Pasei',
    position: {
      x: 1480,
      y: 604,
    },
    economy: 35,
    industry: 40,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 62,
        y: 54,
      },
      '2': {
        x: 39,
        y: 40,
      },
      '3': {
        x: 43,
        y: 54,
      },
      '4': {
        x: 49,
        y: 54,
      },
      '5': {
        x: 61,
        y: 40,
      },
      '7': {
        x: 48,
        y: 40,
      },
    },
    tileset: 3,
  },
  {
    name: 'Sunda',
    position: {
      x: 1540,
      y: 666,
    },
    economy: 40,
    industry: 55,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 51,
        y: 62,
      },
      '2': {
        x: 45,
        y: 42,
      },
      '3': {
        x: 72,
        y: 41,
      },
      '4': {
        x: 56,
        y: 44,
      },
      '5': {
        x: 34,
        y: 58,
      },
      '7': {
        x: 59,
        y: 62,
      },
      '12': {
        x: 34,
        y: 42,
      },
    },
    tileset: 3,
  },
  {
    name: 'Calicut',
    position: {
      x: 1348,
      y: 552,
    },
    economy: 530,
    industry: 560,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '6',
    itemShop: {
      regular: ['57', '42', '7'],
      secret: '78',
    },
    marketId: '11',
    industryId: '7',
    buildings: {
      '1': {
        x: 59,
        y: 45,
      },
      '2': {
        x: 41,
        y: 45,
      },
      '3': {
        x: 18,
        y: 37,
      },
      '4': {
        x: 31,
        y: 45,
      },
      '5': {
        x: 72,
        y: 45,
      },
      '7': {
        x: 69,
        y: 32,
      },
      '8': {
        x: 64,
        y: 10,
      },
      '9': {
        x: 57,
        y: 32,
      },
      '10': {
        x: 87,
        y: 88,
      },
      '11': {
        x: 74,
        y: 60,
      },
    },
    tileset: 6,
  },
  {
    name: 'Bankao',
    position: {
      x: 1530,
      y: 628,
    },
    economy: 50,
    industry: 45,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '7',
    marketId: '12',
    industryId: '7',
    buildings: {
      '1': {
        x: 46,
        y: 44,
      },
      '2': {
        x: 24,
        y: 48,
      },
      '3': {
        x: 56,
        y: 54,
      },
      '4': {
        x: 56,
        y: 44,
      },
      '5': {
        x: 34,
        y: 70,
      },
      '7': {
        x: 35,
        y: 44,
      },
      '12': {
        x: 21,
        y: 72,
      },
    },
    tileset: 3,
  },
  {
    name: 'Zeiton',
    position: {
      x: 1614,
      y: 454,
    },
    economy: 520,
    industry: 570,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['26', '44', '43'],
      secret: '12',
    },
    marketId: '13',
    industryId: '9',
    buildings: {
      '1': {
        x: 45,
        y: 69,
      },
      '2': {
        x: 30,
        y: 70,
      },
      '3': {
        x: 53,
        y: 73,
      },
      '4': {
        x: 43,
        y: 80,
      },
      '5': {
        x: 28,
        y: 52,
      },
      '7': {
        x: 45,
        y: 52,
      },
      '9': {
        x: 62,
        y: 52,
      },
      '10': {
        x: 6,
        y: 52,
      },
      '11': {
        x: 36,
        y: 38,
      },
      '12': {
        x: 15,
        y: 52,
      },
    },
    tileset: 4,
  },
  {
    name: 'Macao',
    position: {
      x: 1582,
      y: 474,
    },
    economy: 480,
    industry: 490,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['58', '57', '52'],
      secret: '61',
    },
    marketId: '13',
    industryId: '9',
    buildings: {
      '1': {
        x: 38,
        y: 28,
      },
      '2': {
        x: 50,
        y: 40,
      },
      '3': {
        x: 56,
        y: 28,
      },
      '4': {
        x: 50,
        y: 28,
      },
      '5': {
        x: 38,
        y: 42,
      },
      '7': {
        x: 59,
        y: 40,
      },
      '9': {
        x: 52,
        y: 51,
      },
      '10': {
        x: 44,
        y: 64,
      },
      '11': {
        x: 33,
        y: 54,
      },
      '12': {
        x: 64,
        y: 51,
      },
    },
    tileset: 4,
  },
  {
    name: 'Hanoi',
    position: {
      x: 1532,
      y: 482,
    },
    economy: 300,
    industry: 340,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['51', '27'],
    },
    marketId: '13',
    industryId: '7',
    buildings: {
      '1': {
        x: 82,
        y: 75,
      },
      '2': {
        x: 87,
        y: 61,
      },
      '3': {
        x: 90,
        y: 75,
      },
      '4': {
        x: 73,
        y: 75,
      },
      '5': {
        x: 62,
        y: 54,
      },
      '7': {
        x: 85,
        y: 46,
      },
      '10': {
        x: 70,
        y: 40,
      },
    },
    tileset: 4,
  },
  {
    name: 'Changan',
    position: {
      x: 1560,
      y: 388,
    },
    economy: 580,
    industry: 280,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['58', '51', '52'],
      secret: '12',
    },
    marketId: '13',
    industryId: '9',
    buildings: {
      '1': {
        x: 72,
        y: 35,
      },
      '2': {
        x: 34,
        y: 35,
      },
      '3': {
        x: 91,
        y: 21,
      },
      '4': {
        x: 81,
        y: 21,
      },
      '5': {
        x: 51,
        y: 46,
      },
      '7': {
        x: 62,
        y: 46,
      },
      '8': {
        x: 47,
        y: 15,
      },
      '9': {
        x: 45,
        y: 35,
      },
      '10': {
        x: 20,
        y: 35,
      },
      '12': {
        x: 70,
        y: 46,
      },
    },
    tileset: 4,
  },
  {
    name: 'Sakai',
    position: {
      x: 1716,
      y: 390,
    },
    economy: 420,
    industry: 410,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['61', '26', '9'],
      secret: '74',
    },
    marketId: '13',
    industryId: '10',
    buildings: {
      '1': {
        x: 32,
        y: 71,
      },
      '2': {
        x: 58,
        y: 71,
      },
      '3': {
        x: 25,
        y: 80,
      },
      '4': {
        x: 22,
        y: 71,
      },
      '5': {
        x: 46,
        y: 71,
      },
      '7': {
        x: 67,
        y: 71,
      },
      '8': {
        x: 67,
        y: 90,
      },
      '9': {
        x: 78,
        y: 71,
      },
      '10': {
        x: 41,
        y: 81,
      },
    },
    tileset: 5,
  },
  {
    name: 'Nagasaki',
    position: {
      x: 1676,
      y: 402,
    },
    economy: 210,
    industry: 220,
    allegiances: [0, 0, 0, 0, 0, 0],
    regionId: '8',
    itemShop: {
      regular: ['26', '9', '53'],
    },
    marketId: '13',
    industryId: '10',
    buildings: {
      '1': {
        x: 41,
        y: 61,
      },
      '2': {
        x: 53,
        y: 61,
      },
      '3': {
        x: 90,
        y: 74,
      },
      '4': {
        x: 53,
        y: 69,
      },
      '5': {
        x: 55,
        y: 35,
      },
      '7': {
        x: 62,
        y: 61,
      },
      '8': {
        x: 48,
        y: 8,
      },
      '10': {
        x: 55,
        y: 49,
      },
    },
    tileset: 5,
  },
];

export interface SupplyPortBase {
  name: string;
  position: Position;
}

export const supplyPorts: SupplyPortBase[] = [
  {
    name: 'Hekla',
    position: {
      x: 784,
      y: 210,
    },
  },
  {
    name: 'Narvik',
    position: {
      x: 998,
      y: 114,
    },
  },
  {
    name: 'Cape Town',
    position: {
      x: 1006,
      y: 860,
    },
  },
  {
    name: 'Belgrade',
    position: {
      x: 1012,
      y: 312,
    },
  },
  {
    name: 'Tamatave',
    position: {
      x: 1192,
      y: 758,
    },
  },
  {
    name: 'Dikson',
    position: {
      x: 1386,
      y: 60,
    },
  },
  {
    name: 'Lushun',
    position: {
      x: 1632,
      y: 360,
    },
  },
  {
    name: 'Leveque',
    position: {
      x: 1652,
      y: 716,
    },
  },
  {
    name: 'Mindanao',
    position: {
      x: 1656,
      y: 578,
    },
  },
  {
    name: 'Tiksi',
    position: {
      x: 1676,
      y: 78,
    },
  },
  {
    name: 'Ezo',
    position: {
      x: 1740,
      y: 334,
    },
  },
  {
    name: 'Geelong',
    position: {
      x: 1748,
      y: 884,
    },
  },
  {
    name: 'Guam',
    position: {
      x: 1758,
      y: 538,
    },
  },
  {
    name: 'Moresby',
    position: {
      x: 1770,
      y: 686,
    },
  },
  {
    name: 'Korf',
    position: {
      x: 1880,
      y: 200,
    },
  },
  {
    name: 'Wanganui',
    position: {
      x: 1930,
      y: 900,
    },
  },
  {
    name: 'Suva',
    position: {
      x: 1960,
      y: 738,
    },
  },
  {
    name: 'Nome',
    position: {
      x: 2062,
      y: 156,
    },
  },
  {
    name: 'Naalehu',
    position: {
      x: 2120,
      y: 498,
    },
  },
  {
    name: 'Tahiti',
    position: {
      x: 2134,
      y: 732,
    },
  },
  {
    name: 'Juneau',
    position: {
      x: 70,
      y: 228,
    },
  },
  {
    name: 'Coppermine',
    position: {
      x: 152,
      y: 122,
    },
  },
  {
    name: 'Santa Barbara',
    position: {
      x: 174,
      y: 448,
    },
  },
  {
    name: 'Churchill',
    position: {
      x: 330,
      y: 242,
    },
  },
  {
    name: 'Callao',
    position: {
      x: 394,
      y: 724,
    },
  },
  {
    name: 'Valparaiso',
    position: {
      x: 424,
      y: 892,
    },
  },
  {
    name: 'Mollendo',
    position: {
      x: 430,
      y: 778,
    },
  },
  {
    name: 'Cape Cod',
    position: {
      x: 466,
      y: 372,
    },
  },
  {
    name: 'Montevideo',
    position: {
      x: 516,
      y: 906,
    },
  },
  {
    name: 'Forel',
    position: {
      x: 660,
      y: 190,
    },
  },
];

export const SUPPLY_PORT_BUILDINGS = {
  4: {
    x: 62,
    y: 54,
  },
};

export const SUPPLY_PORT_TILESET = 3;
