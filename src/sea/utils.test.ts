import { getSeaArea } from './utils';

test('getSeaArea', () => {
  expect(getSeaArea({ x: 0, y: 0 })).toEqual(0);
  expect(getSeaArea({ x: 72, y: 0 })).toEqual(1);
  expect(getSeaArea({ x: 0, y: 72 })).toEqual(30);
  expect(getSeaArea({ x: 150, y: 150 })).toEqual(62);
  expect(getSeaArea({ x: 2159, y: 1079 })).toEqual(449);
});
