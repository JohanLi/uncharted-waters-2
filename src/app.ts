import Assets from './assets';
import Input from './input';
import createWorld, { World } from './world';
import renderInterface from './interface/interface';
import createSound from './sound';

import './app.css?inline';

import { gameState, Stage } from './gameState';

const start = async () => {
  await Assets.load();
  Input.setup();

  document.getElementById('center')!.innerHTML = `
    <canvas id="camera" width="1280" height="800"></canvas>
    <div id="interface"></div>
  `;

  renderInterface();
  const sound = createSound();

  let lastStage: Stage;
  let world: World;

  const loop = () => {
    const { stage } = gameState;

    if (stage !== 'building') {
      if (lastStage !== stage) {
        lastStage = stage;
        world = createWorld();
        sound.play();
      }

      world.update();
      world.draw();
    }

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);
}

start();
