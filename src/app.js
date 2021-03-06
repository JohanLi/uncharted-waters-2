import renderInterface from './interface';
import State from './state';

import Assets from './assets';
import Cursors from './cursors';
import EventListener from './event-listener';
import Port from './port';
import WorldMap from './world-map';
import Sound from './sound';

// eslint-disable-next-line import/no-unresolved
import './app.css?inline';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register('service-worker.js');
  });
}

let lastState;

Assets.load()
  .then(() => {
    const loop = () => {
      if (State.portId === 0) {
        if (State.portId !== lastState) {
          lastState = State.portId;
          EventListener.removeAll();
          WorldMap.setup();
        }

        WorldMap.loop();
      } else {
        if (State.portId !== lastState) {
          lastState = State.portId;
          EventListener.removeAll();
          Port.setup();
        }

        Port.loop();
      }
      requestAnimationFrame(loop);
    };

    renderInterface();
    Cursors.setup();
    Sound.setup();
    requestAnimationFrame(loop);
  });
