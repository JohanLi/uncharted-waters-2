import { getDirectionDelta, getShipSpeed } from './shipSpeed';

describe('getDirectionDelta', () => {
  test('tailwind', () => {
    expect(getDirectionDelta(0, 0)).toEqual(0);
    expect(getDirectionDelta(6, 6)).toEqual(0);
  });

  test('side tailwind', () => {
    expect(getDirectionDelta(0, 1)).toEqual(1);
    expect(getDirectionDelta(0, 7)).toEqual(1);
  });

  test('crosswind', () => {
    expect(getDirectionDelta(1, 3)).toEqual(2);
    expect(getDirectionDelta(1, 7)).toEqual(2);
  });

  test('side headwind', () => {
    expect(getDirectionDelta(6, 1)).toEqual(3);
    expect(getDirectionDelta(6, 3)).toEqual(3);
  });

  test('headwind', () => {
    expect(getDirectionDelta(5, 1)).toEqual(4);
    expect(getDirectionDelta(2, 6)).toEqual(4);
  });
});

// take care to ensure the speed cap is not exceeded, as the tests will become unreliable
describe('getShipSpeed', () => {
  test('higher the faster the wind speed', () => {
    const byWindSpeed = (speed: number) => getShipSpeed(
      { id: 11, cargo: [], crew: 45 },
      { navLvl: 1, seamanship: 100 },
      0,
      { direction: 0, speed },
    );

    expect(byWindSpeed(0)).toEqual(0);
    expect(byWindSpeed(2)).toBeGreaterThan(byWindSpeed(1));
    expect(byWindSpeed(7)).toBeGreaterThan(byWindSpeed(4));
  });

  test('ships with oars have a minimum "wind speed" of 3', () => {
    const byWindSpeed = (speed: number) => getShipSpeed(
      { id: 19, cargo: [], crew: 5 },
      { navLvl: 1, seamanship: 100 },
      0,
      { direction: 0, speed },
    );

    expect(byWindSpeed(0)).toEqual(byWindSpeed(1));
    expect(byWindSpeed(1)).toEqual(byWindSpeed(3));
    expect(byWindSpeed(4)).toBeGreaterThan(byWindSpeed(3));
  });

  test('depends on wind direction relative to heading', () => {
    const byWindDirection = (direction: number) => getShipSpeed(
      { id: 11, cargo: [], crew: 45 },
      { navLvl: 1, seamanship: 100 },
      3,
      { direction, speed: 2 },
    );

    expect(byWindDirection(3)).toBeGreaterThan(byWindDirection(5));
    expect(byWindDirection(5)).toBeGreaterThan(byWindDirection(7));
  });

  test('depends on having enough navigation crew', () => {
    const byCrew = (crew: number) => getShipSpeed(
      { id: 11, cargo: [], crew },
      { navLvl: 1, seamanship: 100 },
      0,
      { direction: 0, speed: 3 },
    );

    expect(byCrew(0)).toEqual(0);
    expect(byCrew(30)).toBeGreaterThan(byCrew(15));
  });

  test('no benefit to exceeding minimum navigation crew', () => {
    const byCrew = (crew: number) => getShipSpeed(
      { id: 11, cargo: [], crew },
      { navLvl: 1, seamanship: 100 },
      0,
      { direction: 0, speed: 3 },
    );

    expect(byCrew(45)).toEqual(byCrew(100));
  });

  test('load starts affecting speed when above 30%', () => {
    const byCargo = (total: number) => getShipSpeed(
      { id: 11, cargo: [{ type: 'water', quantity: total }], crew: 45 },
      { navLvl: 1, seamanship: 100 },
      0,
      { direction: 0, speed: 3 },
    );

    expect(byCargo(0)).toEqual(byCargo(195));
    expect(byCargo(196)).toBeLessThan(byCargo(195));
    expect(byCargo(755)).toBeLessThan(byCargo(700));
  });

  test('increased by the captain’s Navigation Level', () => {
    const byNavLvl = (navLvl: number) => getShipSpeed(
      { id: 11, cargo: [], crew: 45 },
      { navLvl, seamanship: 100 },
      0,
      { direction: 0, speed: 3 },
    );

    expect(byNavLvl(2)).toBeGreaterThan(byNavLvl(1));
    expect(byNavLvl(20)).toBeGreaterThan(byNavLvl(5));
  });

  test('is affected by the captain’s Seamanship', () => {
    const bySeamanship = (seamanship: number) => getShipSpeed(
      { id: 6, cargo: [], crew: 10 },
      { navLvl: 1, seamanship },
      0,
      { direction: 0, speed: 2 },
    );

    expect(bySeamanship(100)).toBeGreaterThan(bySeamanship(80));
  });

  test('ship’s tacking rating is used when sailing with a headwind', () => {
    const fastShipByWindDirection = (direction: number) => getShipSpeed(
      { id: 6, cargo: [], crew: 10 },
      { navLvl: 80, seamanship: 100 },
      0,
      { direction, speed: 7 },
    );

    expect(fastShipByWindDirection(2)).toEqual(fastShipByWindDirection(0));
    expect(fastShipByWindDirection(0)).toBeGreaterThan(fastShipByWindDirection(4));
    expect(fastShipByWindDirection(1)).toBeGreaterThan(fastShipByWindDirection(3));
  });

  test('is capped at 40', () => {
    const fast = getShipSpeed(
      { id: 19, cargo: [], crew: 5 },
      { navLvl: 80, seamanship: 100 },
      0,
      { direction: 0, speed: 7 },
    );

    expect(fast).toEqual(40);
  });
});
