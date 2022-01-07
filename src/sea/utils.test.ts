import { getSeaArea } from './utils';

test('getSeaArea', () => {
  expect(getSeaArea({ x: 0, y: 0 })).toEqual(1);
  expect(getSeaArea({ x: 72, y: 0 })).toEqual(2);
  expect(getSeaArea({ x: 0, y: 72 })).toEqual(31);
  expect(getSeaArea({ x: 150, y: 150 })).toEqual(63);
  expect(getSeaArea({ x: 2159, y: 1079 })).toEqual(450);
});
