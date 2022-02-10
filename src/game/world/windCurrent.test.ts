import { mocked } from 'jest-mock';

import { getSeaArea, getWind, getIsSummer, getCurrent } from './windCurrent';
import { random } from '../../utils';
import { START_DATE } from '../../constants';

jest.mock('../../utils', () => ({
  random: jest.fn(),
}));

// The world map is 2160x1080, divided into 30x15 areas, where each area consists of 72x72 tiles
describe('getSeaArea', () => {
  test('uses zero-based numbering', () => {
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

  test('winter starts in October', () => {
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

jest.mock('../../assets', () => ({
  data: () => ({
    0: 0,
    450: 1,
    900: 7,
    1350: 7,
    2249: 4,
    2699: 6,
  }),
}));

describe('getWind', () => {
  test('direction and speed depends on summer or winter', () => {
    mocked(random).mockReturnValue(0);

    expect(getWind(0, true)).toEqual({ direction: 0, speed: 1 });
    expect(getWind(0, false)).toEqual({ direction: 7, speed: 7 });
  });

  test('base speed has a 0.5 chance to be incremented by 1', () => {
    mocked(random).mockReturnValue(0);
    expect(getWind(0, true)).toEqual({ direction: 0, speed: 1 });

    mocked(random).mockReturnValue(1);
    expect(getWind(0, true)).toEqual({ direction: 0, speed: 2 });
  });

  test('wind speed is capped at 7', () => {
    mocked(random).mockReturnValue(1);
    expect(getWind(0, false)).toEqual({ direction: 7, speed: 7 });
  });

  test('direction can alternate between 3, with the middle direction having a 0.8 chance', () => {
    mocked(random).mockReturnValueOnce(80).mockReturnValueOnce(0);

    expect(getWind(0, true)).toEqual({ direction: 0, speed: 1 });

    mocked(random).mockReturnValueOnce(81).mockReturnValueOnce(0);

    expect(getWind(0, true)).toEqual({ direction: 1, speed: 1 });

    mocked(random).mockReturnValueOnce(91).mockReturnValueOnce(0);

    expect(getWind(0, true)).toEqual({ direction: 7, speed: 1 });

    mocked(random).mockReturnValueOnce(90).mockReturnValueOnce(0);

    expect(getWind(0, false)).toEqual({ direction: 0, speed: 7 });
  });
});

test('getCurrent', () => {
  expect(getCurrent(449)).toEqual({ direction: 4, speed: 6 });
});
