import { getPortData, portAdjacentAt } from './portUtils';
import { regularPorts, SUPPLY_PORT_BUILDINGS } from '../../data/portData';

jest.mock('../../data/portData', () => ({
  regularPorts: [
    {
      name: 'Lisbon',
      x: 840,
      y: 358,
      buildings: {
        '1': {
          x: 41,
          y: 59,
        },
      },
    },
    {
      name: 'Nagasaki',
      x: 1676,
      y: 402,
      buildings: {
        '1': {
          x: 41,
          y: 61,
        },
      },
    },
  ],
  supplyPorts: [
    {
      name: 'Hekla',
      x: 784,
      y: 210,
    },
    {
      name: 'Forel',
      x: 660,
      y: 190,
    },
  ],
}));

describe('portUtils', () => {
  test('accessing a port that doesn’t exist', () => {
    expect(() => {
      getPortData('5');
    }).toThrow();

    expect(() => {
      getPortData('100');
    }).toThrow();
  });

  test('regular port data', () => {
    let { id, name, isSupplyPort, tilemap } = getPortData('1');
    expect(id).toEqual('1');
    expect(name).toEqual('Lisbon');
    expect(isSupplyPort).toEqual(false);
    expect(tilemap).toEqual(0);

    ({ id, name, isSupplyPort, tilemap } = getPortData('2'));
    expect(id).toEqual('2');
    expect(name).toEqual('Nagasaki');
    expect(isSupplyPort).toEqual(false);
    expect(tilemap).toEqual(1);
  });

  test('supply port data', () => {
    let { id, name, isSupplyPort } = getPortData('3');
    expect(id).toEqual('3');
    expect(name).toEqual('Hekla');
    expect(isSupplyPort).toEqual(true);

    ({ id, name, isSupplyPort } = getPortData('4'));
    expect(id).toEqual('4');
    expect(name).toEqual('Forel');
    expect(isSupplyPort).toEqual(true);
  });

  test('supply ports only have the Harbor as their sole building', () => {
    let { buildings } = getPortData('3');
    expect(buildings).toEqual(SUPPLY_PORT_BUILDINGS);

    ({ buildings } = getPortData('4'));
    expect(buildings).toEqual(SUPPLY_PORT_BUILDINGS);
  });

  test('supply ports share the same tilemap index', () => {
    let { tilemap } = getPortData('3');
    expect(tilemap).toEqual(regularPorts.length);

    ({ tilemap } = getPortData('4'));
    expect(tilemap).toEqual(regularPorts.length);
  });

  test('must be within [2, 1] or [1, 2] of a port to dock', () => {
    expect(portAdjacentAt({ x: 10, y: 10 })).toEqual(null);

    expect(portAdjacentAt({ x: 1674, y: 402 })).toEqual('2');
    expect(portAdjacentAt({ x: 1674, y: 401 })).toEqual('2');
    expect(portAdjacentAt({ x: 1674, y: 400.9 })).toEqual(null);
    expect(portAdjacentAt({ x: 1674, y: 403 })).toEqual('2');
    expect(portAdjacentAt({ x: 1674, y: 403.1 })).toEqual(null);
    expect(portAdjacentAt({ x: 1673.9, y: 402 })).toEqual(null);

    expect(portAdjacentAt({ x: 784, y: 208 })).toEqual('3');
    expect(portAdjacentAt({ x: 785, y: 208 })).toEqual('3');
    expect(portAdjacentAt({ x: 785.1, y: 208 })).toEqual(null);
    expect(portAdjacentAt({ x: 783, y: 208 })).toEqual('3');
    expect(portAdjacentAt({ x: 782.9, y: 208 })).toEqual(null);
  });
});
