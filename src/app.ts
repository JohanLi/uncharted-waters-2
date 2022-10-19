import Assets from './assets';
import Input from './input';
import renderInterface from './interface/Interface';
import createWorld from './game/world/world';
import createPort from './game/port/port';

import state from './state/state';
import { updateGeneral } from './state/actionsPort';
import { setDockedFleetPositions } from './state/actionsWorld';

const start = async () => {
  await Assets.load();
  Input.setup();

  await renderInterface();

  updateGeneral();

  setDockedFleetPositions();

  const loop = () => {
    if (state.portId !== null) {
      if (!state.port) {
        state.port = createPort(state.portId);
      }

      if (state.buildingId === null) {
        state.port.update();
        state.port.draw();
      }
    }

    if (state.portId === null) {
      if (!state.world) {
        state.world = createWorld();
      }

      state.world.update();
      state.world.draw();
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

start();
