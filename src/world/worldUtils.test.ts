import { getHeadingWindDelta } from './worldUtils';

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
