import getShipSpeed from './shipSpeed';

jest.mock('../data/shipData', () => ({
  shipData: {
    '1': {
      name: 'Slow ship to prevent hitting the speed cap',
      tacking: 100,
      power: 20,
      minimumCrew: 5,
      capacity: 100,
      sailType: 1,
    },
    '2': {
      name: 'Ship affected by tacking in headwind',
      tacking: 90,
      power: 20,
      minimumCrew: 5,
      capacity: 100,
      sailType: 2,
    },
    '19': {
      name: 'Ship with oars',
      tacking: 100,
      power: 20,
      minimumCrew: 5,
      capacity: 100,
      sailType: 1,
    },
  },
  shipWindFactorMap: {
    1: [10, 8, 6, 4, 2],
    2: [10, 10, 10, 10, 10], // for the tacking test, ensuring that shipWindFactor won’t be a factor
  },
}));

const captain = { navLvl: 1, seamanship: 80 };

describe('getShipSpeed', () => {
  test('higher the faster the wind speed', () => {
    const byWindSpeed = (speed: number) =>
      getShipSpeed({ id: '1', cargo: [], crew: 5 }, captain, 0, {
        direction: 0,
        speed,
      });

    expect(byWindSpeed(0)).toEqual(0);
    expect(byWindSpeed(2)).toBeGreaterThan(byWindSpeed(1));
    expect(byWindSpeed(7)).toBeGreaterThan(byWindSpeed(4));
  });

  test('ships with oars have a minimum "wind speed" of 3', () => {
    const byWindSpeed = (speed: number) =>
      getShipSpeed({ id: '19', cargo: [], crew: 5 }, captain, 0, {
        direction: 0,
        speed,
      });

    expect(byWindSpeed(0)).toEqual(byWindSpeed(1));
    expect(byWindSpeed(1)).toEqual(byWindSpeed(3));
    expect(byWindSpeed(4)).toBeGreaterThan(byWindSpeed(3));
  });

  test('depends on wind direction relative to heading', () => {
    const byWindDirection = (direction: number) =>
      getShipSpeed({ id: '1', cargo: [], crew: 5 }, captain, 3, {
        direction,
        speed: 3,
      });

    expect(byWindDirection(3)).toBeGreaterThan(byWindDirection(4));
    expect(byWindDirection(4)).toBeGreaterThan(byWindDirection(5));
    expect(byWindDirection(5)).toBeGreaterThan(byWindDirection(6));
    expect(byWindDirection(6)).toBeGreaterThan(byWindDirection(7));
  });

  test('depends on having enough navigation crew', () => {
    const byCrew = (crew: number) =>
      getShipSpeed({ id: '1', cargo: [], crew }, captain, 0, {
        direction: 0,
        speed: 3,
      });

    expect(byCrew(0)).toEqual(0);
    expect(byCrew(2)).toBeGreaterThan(byCrew(1));
  });

  test('exceeding minimum navigation crew provides no boost', () => {
    const byCrew = (crew: number) =>
      getShipSpeed({ id: '1', cargo: [], crew }, captain, 0, {
        direction: 0,
        speed: 3,
      });

    expect(byCrew(10)).toEqual(byCrew(5));
  });

  test('load starts affecting speed when above 30%', () => {
    const byCargo = (total: number) =>
      getShipSpeed(
        { id: '1', cargo: [{ type: 'water', quantity: total }], crew: 5 },
        captain,
        0,
        { direction: 0, speed: 3 },
      );

    expect(byCargo(0)).toEqual(byCargo(25));
    expect(byCargo(26)).toBeLessThan(byCargo(25));
    expect(byCargo(95)).toBeLessThan(byCargo(80));
  });

  test('is increased by the captain’s Navigation Level', () => {
    const byNavLvl = (navLvl: number) =>
      getShipSpeed(
        { id: '1', cargo: [], crew: 5 },
        { navLvl, seamanship: 80 },
        0,
        { direction: 0, speed: 3 },
      );

    expect(byNavLvl(2)).toBeGreaterThan(byNavLvl(1));
    expect(byNavLvl(20)).toBeGreaterThan(byNavLvl(5));
  });

  test('is affected by the captain’s Seamanship', () => {
    const bySeamanship = (seamanship: number) =>
      getShipSpeed(
        { id: '1', cargo: [], crew: 5 },
        { navLvl: 1, seamanship },
        0,
        { direction: 0, speed: 3 },
      );

    expect(bySeamanship(100)).toBeGreaterThan(bySeamanship(80));
  });

  test('ship’s tacking rating is used when sailing with a side headwind or headwind', () => {
    const byWindDirection = (direction: number) =>
      getShipSpeed({ id: '2', cargo: [], crew: 5 }, captain, 0, {
        direction,
        speed: 3,
      });

    expect(byWindDirection(2)).toEqual(byWindDirection(0));
    expect(byWindDirection(1)).toBeGreaterThan(byWindDirection(3));
    expect(byWindDirection(0)).toBeGreaterThan(byWindDirection(4));
  });

  test('is capped at 40', () => {
    const fast = getShipSpeed(
      { id: '1', cargo: [], crew: 5 },
      { navLvl: 90, seamanship: 100 },
      0,
      { direction: 0, speed: 7 },
    );

    expect(fast).toEqual(40);
  });

  test('is capped at 40', () => {
    const fast = getShipSpeed(
      { id: '1', cargo: [], crew: 5 },
      { navLvl: 90, seamanship: 100 },
      0,
      { direction: 0, speed: 7 },
    );

    expect(fast).toEqual(40);
  });
});

// TODO create an integration test to check against a set of real values
