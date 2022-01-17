import updateInterface from './updateInterface';
import { sample } from '../utils';
import state from './state';
import { isDay } from './selectors';

export const updateGeneral = () => {
  updateInterface.general({
    portId: state.portId,
    buildingId: state.buildingId,
    timePassed: state.timePassed,
    gold: state.gold,
  });
};

export const enterBuilding = (buildingId: number) => {
  state.buildingId = buildingId;

  updateGeneral();
};

export const exitBuilding = () => {
  state.timePassed += sample([40, 60, 80]);
  state.buildingId = 0;

  if (isDay()) {
    state.port.characters().spawnNpcs();
  } else {
    state.port.characters().despawnNpcs();
  }

  updateGeneral();
};
