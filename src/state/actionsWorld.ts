import state from './state';
import { portAdjacentAt } from '../port/portUtils';
import createPort from '../port/port';
import Sound from '../sound';
import Input from '../input';
import updateInterface from './updateInterface';
import { updateGeneral } from './actionsPort';
import {
  getCurrent,
  getIsSummer,
  getSeaArea,
  getWind,
} from '../world/windCurrent';
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

  Sound.play('port');

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
  const seaArea = getSeaArea(state.world.characters().player().position());

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
export const setDockedFleetPositions = (portId: string) => {
  const playerFleet = state.fleets[1];

  if (!playerFleet.position) {
    playerFleet.position = positionAdjacentToPort(portId);
  }
};

export const setSail = () => {
  state.portId = null;
  state.buildingId = null;

  Sound.play('world');

  updateWorldStatus();

  Input.reset();

  updateGeneral();
  updateProvisions();
};
