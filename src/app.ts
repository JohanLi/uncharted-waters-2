import { load } from './assets';
import createWorld, { World } from './world';
import renderInterface from './interface/interface';

import './app.css?inline';

import { gameState, Stage } from './gameState';

load()
  .then(() => {
    document.getElementById('center')!.innerHTML = `
      <canvas id="camera" width="1280" height="800"></canvas>
      <div id="interface"></div>
    `;

    renderInterface();

    let lastStage: Stage;
    let world: World;

    const loop = () => {
      const { stage } = gameState;

      if (stage !== 'building') {
        if (lastStage !== stage) {
          lastStage = stage;
          world = createWorld();
        }

        world.update();
        world.draw();
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  });
