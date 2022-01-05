import { PortCharacters } from './port/portCharacters';
import { SeaCharacters } from './sea/seaCharacters';
import { store } from './interface/store';
import { START_PORT_ID, START_POSITION_X, START_POSITION_Y, START_TIME_PASSED } from './constants';
import { nextDayAtSea, update } from './interface/interfaceSlice';
import { sample } from './utils';
import { ports } from './port/metadata';

export type Stage = 'port' | 'building' | 'sea';

export interface GameState {
  stage: Stage;
  portId: number;
  buildingId: number;
  portCharacters: PortCharacters;
  seaCharacters: SeaCharacters;
  timePassed: number;
  seaPlayerPosition: {
    x: number;
    y: number;
  };
}

export const gameState = {
  stage: 'port',
  portId: START_PORT_ID,
  buildingId: 0,
  timePassed: START_TIME_PASSED,
  seaPlayerPosition: {
    x: START_POSITION_X,
    y: START_POSITION_Y,
  },
} as GameState;

export const getTimeOfDay = () => gameState.timePassed % 1440;

export const getIsNight = () => {
  const timeOfDay = getTimeOfDay();

  return timeOfDay >= 1200 || timeOfDay < 240;
}

export const enterBuilding = (buildingId: number) => {
  gameState.stage = 'building';
  gameState.buildingId = buildingId;

  dispatchUpdate();
}

export const exitBuilding = () => {
  gameState.timePassed += sample([40, 60, 80]);

  gameState.stage = 'port';
  gameState.buildingId = 0;

  dispatchUpdate();

  gameState.portCharacters.daySpawnNightDespawnNpcs();
}

export const seaTimeTick = () => {
  gameState.timePassed += 20;

  if (getTimeOfDay() === 0) {
    store.dispatch(nextDayAtSea({ timePassed: gameState.timePassed }));
  }
}

export const setSail = () => {
  gameState.stage = 'sea';
  gameState.portId = 0;
  gameState.buildingId = 0;

  dispatchUpdate();

  document.addEventListener('keyup', dock);
}

const portAdjacentAt = (x: number, y: number) => Number(Object.keys(ports).find((portId) => {
  const deltaX = Math.abs(ports[portId].x - x);
  const deltaY = Math.abs(ports[portId].y - y);

  return deltaX + deltaY <= 3 && deltaX < 3 && deltaY < 3;
}));

export const dock = (e: KeyboardEvent) => {
  if (e.key !== 'e') {
    return;
  }

  const { x, y } = gameState.seaCharacters.getPlayer().position()

  const portId = portAdjacentAt(x, y);

  if (!portId) {
    return; // TODO show message
  }

  gameState.seaPlayerPosition.x = x;
  gameState.seaPlayerPosition.y = y;
  gameState.stage = 'port';
  gameState.portId = portId;

  dispatchUpdate();

  document.removeEventListener('keyup', dock);
}

const dispatchUpdate = () => {
  store.dispatch(update({
    portId: gameState.portId,
    buildingId: gameState.buildingId,
    timePassed: gameState.timePassed,
  }));
}

export default gameState;
