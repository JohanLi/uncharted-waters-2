import Assets from './assets';
import Input from './input';
import Sound from './sound';
import renderInterface from './interface/Interface';
import createWorld from './world/world';
import createPort from './port/port';

import gameState, {
  getStage,
  setDockedFleetPositions,
  updateGeneral,
} from './gameState';

const start = async () => {
  await Assets.load();
  Input.setup();
  Sound.setup();

  renderInterface();

  updateGeneral();

  gameState.port = createPort(gameState.portId);
  setDockedFleetPositions();
  gameState.world = createWorld();

  Sound.play('port');

  const loop = () => {
    const stage = getStage();

    if (stage === 'port') {
      gameState.port.update();
      gameState.port.draw();
    }

    if (stage === 'world') {
      gameState.world.update();
      gameState.world.draw();
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
};

start();
