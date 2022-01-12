import { store } from './interface/store';
import {
  START_DATE,
  START_PORT_ID,
  START_POSITION_X,
  START_POSITION_Y,
  START_TIME_PASSED,
} from './constants';
import { dockAction, nextDayAtSea, update } from './interface/interfaceSlice';
import { sample } from './utils';
import { ports } from './port/metadata';
import { fleets, Fleets } from './world/fleets';
import {
  getWind,
  getSeaArea,
  getCurrent,
  getIsSummer,
} from './world/windCurrent';
import type { Port } from './port/port';
import type { World } from './world/world';
import Sound from './sound';
import updateInterface from './interface/updateInterface';

export type Stage = 'world' | 'port' | 'building';

export type Velocity = {
  direction: number;
  speed: number;
};

export interface GameState {
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
}

const gameState = {
  portId: START_PORT_ID,
  buildingId: 0,
  timePassed: START_TIME_PASSED,
  fleets,
} as GameState;

const dispatchUpdate = () => {
  store.dispatch(
    update({
      portId: gameState.portId,
      buildingId: gameState.buildingId,
      timePassed: gameState.timePassed,
    }),
  );
};

export const getStage = (): Stage => {
  if (!gameState.portId) {
    return 'world';
  }

  if (gameState.buildingId) {
    return 'building';
  }

  return 'port';
};

export const getTimeOfDay = () => gameState.timePassed % 1440;

export const isDay = () => {
  const timeOfDay = getTimeOfDay();

  return timeOfDay >= 240 && timeOfDay < 1200;
};

export const shouldUpdateWorldStatus = () => gameState.timePassed % 240 === 0;

export const updateWorldStatus = () => {
  const seaArea = getSeaArea(
    gameState.world.characters().getPlayer().position(),
  );

  const wind = getWind(seaArea, getIsSummer(START_DATE, gameState.timePassed));
  const current = getCurrent(seaArea);

  gameState.wind = wind;
  gameState.current = current;

  updateInterface.indicators({ wind, current });
};

export const enterBuilding = (buildingId: number) => {
  gameState.buildingId = buildingId;

  dispatchUpdate();
};

export const exitBuilding = () => {
  gameState.timePassed += sample([40, 60, 80]);
  gameState.buildingId = 0;

  if (isDay()) {
    gameState.port.characters().spawnNpcs();
  } else {
    gameState.port.characters().despawnNpcs();
  }

  gameState.port.characters().getPlayer().move('s');

  dispatchUpdate();
};

export const worldTimeTick = () => {
  gameState.timePassed += 20;

  if (shouldUpdateWorldStatus()) {
    updateWorldStatus();
  }

  if (getTimeOfDay() === 0) {
    store.dispatch(nextDayAtSea({ timePassed: gameState.timePassed }));
  }
};

const portAdjacentAt = (x: number, y: number) =>
  Number(
    Object.keys(ports).find((portId) => {
      const deltaX = Math.abs(ports[portId].x - x);
      const deltaY = Math.abs(ports[portId].y - y);

      return deltaX + deltaY <= 3 && deltaX < 3 && deltaY < 3;
    }),
  );

export const dock = (e: KeyboardEvent) => {
  if (e.key !== 'e') {
    return;
  }

  const { x, y } = gameState.world.characters().getPlayer().position();

  const portId = portAdjacentAt(x, y);

  if (!portId) {
    return; // TODO show message
  }

  // TODO NPC fleet positions need to be saved as well
  const playerFleet = gameState.fleets[1];

  if (playerFleet.position) {
    playerFleet.position.x = x;
    playerFleet.position.y = y;
  }

  gameState.port.reset(portId);
  gameState.portId = portId;

  Sound.play('port');

  store.dispatch(dockAction());
  dispatchUpdate();

  document.removeEventListener('keyup', dock);
};

export const setSail = () => {
  gameState.portId = 0;
  gameState.buildingId = 0;

  Sound.play('world');

  updateWorldStatus();

  dispatchUpdate();

  document.addEventListener('keyup', dock);
};

const positionAdjacentToPort = (portId: number) => {
  if (portId === 1) {
    return { x: START_POSITION_X, y: START_POSITION_Y };
  }

  throw Error('Method is not implemented for ports other than Lisbon');
};

/*
  While fleets under normal circumstances always have a position even when
  docked, there are two exceptions:
    - The player at the start of the game
    - NPC sailors who have respawned
 */
export const setDockedFleetPositions = () => {
  const playerFleet = gameState.fleets[1];

  if (!playerFleet.position) {
    playerFleet.position = positionAdjacentToPort(gameState.portId);
  }
};

export default gameState;
