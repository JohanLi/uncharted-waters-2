import { getIsSummer, getSeaArea } from './seaUtils';
import { START_DATE } from '../constants';

// The world map is 2160x1080, divided into 30x15 areas where each area consists of 72x72 tiles
describe('getSeaArea', () => {
  test('zero-based numbering', () => {
    expect(getSeaArea({ x: 0, y: 0 })).toEqual(0);
  });

  test('second column, second row, outside Lisbon', () => {
    expect(getSeaArea({ x: 72, y: 0 })).toEqual(1);
    expect(getSeaArea({ x: 0, y: 72 })).toEqual(30);
    expect(getSeaArea({ x: 838, y: 358 })).toEqual(131);
  });

  test('a total of 450 areas exist', () => {
    expect(getSeaArea({ x: 2159, y: 1079 })).toEqual(449);
  });
});

describe('getIsSummer', () => {
  test('game starts in the summer', () => {
    expect(getIsSummer(START_DATE, 0)).toEqual(true);
  });

  test('winter begins in October', () => {
    const startDate = new Date(1523, 8, 30);
    expect(getIsSummer(startDate, 0)).toEqual(true);
    expect(getIsSummer(startDate, 1440)).toEqual(false);
  });

  test('summer starts in April', () => {
    const startDate = new Date(1524, 2, 31);
    expect(getIsSummer(startDate, 0)).toEqual(false);
    expect(getIsSummer(startDate, 1440)).toEqual(true);
  });
});
