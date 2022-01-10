import { PortCharacters } from './port/portCharacters';
import { SeaCharacters } from './sea/seaCharacters';
import { store } from './interface/store';
import { START_DATE, START_PORT_ID, START_TIME_PASSED } from './constants';
import {
  dockAction,
  nextDayAtSea,
  update,
  updateSeaIndicators,
} from './interface/interfaceSlice';
import { sample } from './utils';
import { ports } from './port/metadata';
import { fleets, Fleet } from './sea/fleets';
import {
  getWind,
  getSeaArea,
  getCurrent,
  getIsSummer,
} from './sea/windCurrent';

export type Stage = 'port' | 'building' | 'sea';

export type Velocity = {
  direction: number;
  speed: number;
};

export interface GameState {
  stage: Stage;
  portId: number;
  buildingId: number;
  portCharacters: PortCharacters;
  seaCharacters: SeaCharacters;
  timePassed: number;
  fleets: Fleet[];
  seaArea: number | undefined;
  wind: Velocity;
  current: Velocity;
}

const gameState = {
  stage: 'port',
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

export const getTimeOfDay = () => gameState.timePassed % 1440;

export const getIsNight = () => {
  const timeOfDay = getTimeOfDay();

  return timeOfDay >= 1200 || timeOfDay < 240;
};

export const shouldCheckSeaArea = () => gameState.timePassed % 240 === 0;

export const enterBuilding = (buildingId: number) => {
  gameState.stage = 'building';
  gameState.buildingId = buildingId;

  dispatchUpdate();
};

export const exitBuilding = () => {
  gameState.timePassed += sample([40, 60, 80]);

  gameState.stage = 'port';
  gameState.buildingId = 0;

  dispatchUpdate();

  gameState.portCharacters.daySpawnNightDespawnNpcs();
};

export const seaTimeTick = () => {
  gameState.timePassed += 20;

  /*
   TODO
    WindCurrent is not immediately set after setting sail
   */
  if (shouldCheckSeaArea()) {
    const seaArea = getSeaArea(gameState.seaCharacters.getPlayer().position());

    const wind = getWind(
      seaArea,
      getIsSummer(START_DATE, gameState.timePassed),
    );
    const current = getCurrent(seaArea);

    store.dispatch(updateSeaIndicators({ wind, current }));
  }

  if (getTimeOfDay() === 0) {
    store.dispatch(nextDayAtSea({ timePassed: gameState.timePassed }));
  }
};

export const setSail = () => {
  gameState.stage = 'sea';
  gameState.portId = 0;
  gameState.buildingId = 0;

  dispatchUpdate();

  document.addEventListener('keyup', dock);
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

  const { x, y } = gameState.seaCharacters.getPlayer().position();

  const portId = portAdjacentAt(x, y);

  if (!portId) {
    return; // TODO show message
  }

  // TODO NPC fleet positions need to be saved as well
  const playerFleet = gameState.fleets[0];
  playerFleet.position.x = x;
  playerFleet.position.y = y;

  gameState.stage = 'port';
  gameState.portId = portId;

  store.dispatch(dockAction());
  dispatchUpdate();

  document.removeEventListener('keyup', dock);
};

export default gameState;
