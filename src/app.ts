import { load } from './assets';
import createWorld, { World } from './world';
import renderInterface from './interface/app';

import './app.css?inline';

import { Stage } from './memoryState';

load()
  .then(() => {
    document.getElementById('center')!.innerHTML = `
      <canvas id="camera" width="1280" height="800"></canvas>
      <div id="interface"></div>
    `;

    const state = renderInterface();

    if (!state) {
      return;
    }

    let lastStage: Stage;
    let world: World;

    const loop = () => {
      if (lastStage !== state.stage) {
        lastStage = state.stage;

        world = createWorld(state);
      }

      if (!state.paused) {
        world.update();
        world.draw();
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  });
