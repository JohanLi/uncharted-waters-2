import state from './state';
import { shipData } from '../data/shipData';

export const getPlayerFleet = () => state.fleets['1'].ships;

export const getPlayerFleetShip = (shipNumber: number) =>
  state.fleets['1'].ships[shipNumber];

export const getAvailableSpace = (shipNumber: number) => {
  const ship = state.fleets['1'].ships[shipNumber];
  const { capacity, minimumCrew } = shipData[ship.id];

  const cargo = ship.cargo.reduce((p, c) => p + c.quantity, 0);
  const availableSpace = capacity - minimumCrew;

  return availableSpace - cargo;
};

export const getLoadPercent = (shipNumber: number) => {
  const ship = state.fleets['1'].ships[shipNumber];
  const { capacity, minimumCrew } = shipData[ship.id];

  const cargo = ship.cargo.reduce((p, c) => p + c.quantity, 0);

  return ((cargo + minimumCrew) / capacity) * 100;
};

export const hasCrewAssigned = () =>
  state.fleets['1'].ships.every((ship) => ship.crew > 0);

export const getDaysProvisionsWillLast = () => {
  let totalCrew = 0;
  let totalWater = 0;
  let totalFood = 0;

  getPlayerFleet().forEach((ship) => {
    totalCrew += ship.crew;
    totalWater +=
      ship.cargo.find((items) => items.type === 'water')?.quantity || 0;
    totalFood +=
      ship.cargo.find((items) => items.type === 'food')?.quantity || 0;
  });

  return Math.floor(
    Math.min(totalWater / totalCrew, totalFood / totalCrew) * 10,
  );
};
