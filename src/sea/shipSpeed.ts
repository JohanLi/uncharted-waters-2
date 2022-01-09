import { Ship } from './fleets';
import { shipMetadata, shipWindFactorMap } from './shipMetadata';
import { Velocity } from '../gameState';

export const getDirectionDelta = (d1: number, d2: number) => {
  const delta = Math.abs(d1 - d2);

  if (delta > 4) {
    return 8 - delta;
  }

  return delta;
}

const hasOars = (ship: Ship) => ship.id >= 19;

/*
  In contrast to the original game, we do not round down during each step of the calculation.

  An oversight in the game is that your ship will continue moving faster as the headwind gets stronger.
  Consider imposing a heavier penalty sailing into the wind, if the gameplay doesn’t get tedious.

  It’s also worth looking into requiring higher captain stats to handle end-game ships so mid-tier ships have their
  uses outside exploration.
 */
export const getShipSpeed = (ship: Ship, captain: { navLvl: number; seamanship: number }, heading: number, wind: Velocity) => {
  const { power, tacking, sailType, minimumCrew, capacity } = shipMetadata[ship.id];
  const directionDelta = getDirectionDelta(heading, wind.direction);
  const shipWindFactor = shipWindFactorMap[sailType][directionDelta];

  // TODO if wind speed = 0 as a mechanic is introduced, ships with oars should count as having 2 wind speed
  const windSpeed = hasOars(ship) ? Math.max(3, wind.speed) : wind.speed;

  const propulsionFactor = power * shipWindFactor * windSpeed / 150;

  const { crew } = ship;

  // in the absence of game features, we’ll assume the entire crew is assigned to navigation
  const navCrew = crew;
  const navigationCrewFactor = Math.min(1, navCrew / minimumCrew);

  const capacityUsed = ship.cargo.reduce((total, { quantity }) => total + quantity, 0) + crew;
  const cargoFactor = Math.min(1.5, 1.8 - capacityUsed / capacity);

  const navigationLevelFactor = (10 + captain.navLvl) / 10;

  const isHeadwindOrSideHeadWind = directionDelta >= 3;
  const tackingFactor = isHeadwindOrSideHeadWind ? (tacking / 100) : 1;

  const baseSpeed = Math.min(30, propulsionFactor * navigationCrewFactor * cargoFactor * navigationLevelFactor);

  return baseSpeed * tackingFactor * captain.seamanship / 75;
}