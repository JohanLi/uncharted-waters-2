import State from './state';

import mastInTheMist from './assets/sound/mast-in-the-mist.mp3';
import capriceForLute from './assets/sound/caprice-for-lute.mp3';

const audio = new Audio();

const sound = {
  setup: () => {
    document.addEventListener('click', () => audio.play(), {
      once: true,
    });
  },
  play: () => {
    audio.loop = true;

    if (State.portId) {
      audio.src = mastInTheMist;
    } else {
      audio.src = capriceForLute;
    }

    if (!audio.paused) {
      document.body.appendChild(audio);
    }

    audio.play();
  },
};

export default sound;
