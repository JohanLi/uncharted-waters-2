import { getHeadingWindDelta, getXWrapAround } from './worldUtils';

describe('getDirectionDelta', () => {
  test('tailwind', () => {
    expect(getHeadingWindDelta(0, 0)).toEqual(0);
    expect(getHeadingWindDelta(6, 6)).toEqual(0);
  });

  test('side tailwind', () => {
    expect(getHeadingWindDelta(0, 1)).toEqual(1);
    expect(getHeadingWindDelta(0, 7)).toEqual(1);
  });

  test('crosswind', () => {
    expect(getHeadingWindDelta(1, 3)).toEqual(2);
    expect(getHeadingWindDelta(1, 7)).toEqual(2);
  });

  test('side headwind', () => {
    expect(getHeadingWindDelta(6, 1)).toEqual(3);
    expect(getHeadingWindDelta(6, 3)).toEqual(3);
  });

  test('headwind', () => {
    expect(getHeadingWindDelta(5, 1)).toEqual(4);
    expect(getHeadingWindDelta(2, 6)).toEqual(4);
  });
});

describe('getXWrapAround', () => {
  test('X wraps around to the end of the world map after reaching the eastern boundary', () => {
    expect(getXWrapAround(2159)).toEqual(2159);
    expect(getXWrapAround(0)).toEqual(0);
    expect(getXWrapAround(-1)).toEqual(2159);
  });

  test('X wraps around to the start of the world map after reaching the western boundary', () => {
    expect(getXWrapAround(2160)).toEqual(0);
    expect(getXWrapAround(2161)).toEqual(1);
    expect(getXWrapAround(-1)).toEqual(2159);
  });
});
