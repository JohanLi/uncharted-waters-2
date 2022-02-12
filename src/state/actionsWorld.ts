import state from './state';
import { portAdjacentAt } from '../game/port/portUtils';
import createPort from '../game/port/port';
import Input from '../input';
import updateInterface from './updateInterface';
import { updateGeneral } from './actionsPort';
import {
  getCurrent,
  getIsSummer,
  getSeaArea,
  getWind,
} from '../game/world/windCurrent';
import { START_DATE } from '../constants';
import {
  getTimeOfDay,
  positionAdjacentToPort,
  shouldUpdateWorldStatus,
} from './selectors';
import { Position } from '../types';

export const dock = (position: Position) => {
  const portId = portAdjacentAt(position);

  if (!portId) {
    return false; // TODO show message
  }

  // TODO NPC fleet positions need to be saved as well
  const playerFleet = state.fleets[1];

  if (playerFleet.position) {
    playerFleet.position = position;
  }

  state.port = createPort(portId);
  state.portId = portId;

  Input.reset();

  updateGeneral();

  state.dayAtSea = 0;
  updateInterface.dayAtSea(state.dayAtSea);

  return true;
};

const updateProvisions = () => {
  const provisions = {
    water: 0,
    food: 0,
    lumber: 0,
    shot: 0,
  };

  const playerFleet = state.fleets[1];

  playerFleet.ships.forEach((ship) => {
    ship.cargo.forEach((item) => {
      if (item.type in provisions) {
        provisions[item.type] += item.quantity;
      }
    });
  });

  updateInterface.provisions(provisions);
};

export const updateWorldStatus = () => {
  const { position } = state.fleets['1'];

  if (!position) {
    throw Error('Player fleet position is not set');
  }

  const seaArea = getSeaArea(position);

  const wind = getWind(seaArea, getIsSummer(START_DATE, state.timePassed));
  const current = getCurrent(seaArea);

  state.wind = wind;
  state.current = current;

  updateInterface.indicators({
    wind,
    current,
  });
};

export const worldTimeTick = () => {
  state.timePassed += 20;

  if (shouldUpdateWorldStatus()) {
    updateWorldStatus();
  }

  if (getTimeOfDay() === 0) {
    updateGeneral();

    state.dayAtSea += 1;
    updateInterface.dayAtSea(state.dayAtSea);
  }
};

/*
  While fleets under normal circumstances always have a position even when
  docked, there are two exceptions:
    - The player at the start of the game
    - NPC sailors who have respawned
 */
export const setDockedFleetPositions = () => {
  const playerFleet = state.fleets[1];

  if (!playerFleet.position) {
    if (state.portId === null) {
      throw Error('Player fleet must start with a position if not in port');
    }

    playerFleet.position = positionAdjacentToPort(state.portId);
  }
};

export const setSail = () => {
  state.portId = null;
  state.buildingId = null;

  updateWorldStatus();

  Input.reset();

  updateGeneral();
  updateProvisions();
};
