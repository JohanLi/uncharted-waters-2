import { load } from './assets';
import createWorld, { World } from './world';
import renderInterface from './interface/app';

import { store } from './interface/store';

import './app.css?inline';
import { tick } from './interface/gameSlice';

load()
  .then(() => {
    document.getElementById('center')!.innerHTML = `
      <canvas id="camera" width="1280" height="800"></canvas>
      <div id="interface"></div>
    `;

    renderInterface();

    let lastState: number;
    let world: World;

    const loop = () => {
      const state = store.getState();
      const portId = state.game.portId;
      const paused = state.port.buildingId;

      if (lastState !== portId) {
        lastState = portId;

        world = createWorld({
          type: portId ? 'port' : 'sea',
          portId,
          state,
        });
      }

      if (!paused) {
        world.update();
        world.draw(state.game.time);

        if (!portId) {
          store.dispatch(tick());
        }
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  });
