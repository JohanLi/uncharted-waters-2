import { START_PORT_ID, START_TIME_PASSED } from '../constants';
import { CargoType, fleets, Fleets } from '../world/fleets';
import type { Port } from '../port/port';
import type { World } from '../world/world';

export type Stage = 'world' | 'port' | 'building';

export type Velocity = {
  direction: number;
  speed: number;
};

export type ProvisionsType = {
  [key in CargoType]: number;
};

export interface State {
  portId: number;
  buildingId: number;
  timePassed: number;
  world: World;
  fleets: Fleets;
  seaArea: number | undefined;
  wind: Velocity;
  current: Velocity;
  playerFleet: Velocity;
  port: Port;
  dayAtSea: number;
  gold: number;
}

const state = {
  portId: START_PORT_ID,
  buildingId: 0,
  timePassed: START_TIME_PASSED,
  fleets,
  dayAtSea: 0,
  gold: 2000,
} as State;

export default state;
