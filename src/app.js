import renderInterface from './interface';

import Assets from './assets';
import renderPort from './port/';
import sound from './sound';

import './app.css'

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker.register('/sw.js');
  });
}

(async () => {
  await Assets.load();
  renderInterface();
  renderPort();
  sound();
})();
