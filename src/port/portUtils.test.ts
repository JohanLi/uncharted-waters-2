import { getPortMetadata } from './portUtils';
import { regularPorts, SUPPLY_PORT_BUILDINGS } from './portMetadata';

jest.mock('./portMetadata', () => ({
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
  test('regular port metadata', () => {
    let { id, name, isSupplyPort, tilemap } = getPortMetadata(1);
    expect(id).toEqual(1);
    expect(name).toEqual('Lisbon');
    expect(isSupplyPort).toEqual(false);
    expect(tilemap).toEqual(0);

    ({ id, name, isSupplyPort, tilemap } = getPortMetadata(2));
    expect(id).toEqual(2);
    expect(name).toEqual('Nagasaki');
    expect(isSupplyPort).toEqual(false);
    expect(tilemap).toEqual(1);
  });

  test('supply port metadata', () => {
    let { id, name, isSupplyPort } = getPortMetadata(3);
    expect(id).toEqual(3);
    expect(name).toEqual('Hekla');
    expect(isSupplyPort).toEqual(true);

    ({ id, name, isSupplyPort } = getPortMetadata(4));
    expect(id).toEqual(4);
    expect(name).toEqual('Forel');
    expect(isSupplyPort).toEqual(true);
  });

  test('supply ports only have the Harbor as their sole building', () => {
    let { buildings } = getPortMetadata(3);
    expect(buildings).toEqual(SUPPLY_PORT_BUILDINGS);

    ({ buildings } = getPortMetadata(4));
    expect(buildings).toEqual(SUPPLY_PORT_BUILDINGS);
  });

  test('supply ports share the same tilemap index', () => {
    let { tilemap } = getPortMetadata(3);
    expect(tilemap).toEqual(regularPorts.length);

    ({ tilemap } = getPortMetadata(4));
    expect(tilemap).toEqual(regularPorts.length);
  });
});
