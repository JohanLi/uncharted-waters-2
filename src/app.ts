import Assets from './assets';
import Input from './input';
import renderInterface from './interface/Interface';
import createWorld from './world/world';
import createPort from './port/port';

import state from './state/state';
import { updateGeneral } from './state/actionsPort';
import { getStage } from './state/selectors';
import { setDockedFleetPositions } from './state/actionsWorld';

const start = async () => {
  await Assets.load();
  Input.setup();

  renderInterface();

  updateGeneral();

  if (state.portId) {
    state.port = createPort(state.portId);
    setDockedFleetPositions(state.portId);
  }

  state.world = createWorld();

  const loop = () => {
    const stage = getStage();

    if (stage === 'port') {
      state.port.update();
      state.port.draw();
    }

    if (stage === 'world') {
      state.world.update();
      state.world.draw();
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

start();
