import type { Stage } from './gameState';

import mastInTheMist from './sound/mast-in-the-mist.mp3';
import capriceForLute from './sound/caprice-for-lute.mp3';

const audio = new Audio();

const Sound = {
  setup: () => {
    document.addEventListener('click', () => audio.play(), {
      once: true,
    });
  },
  play: (stage: Stage) => {
    audio.loop = true;

    if (stage === 'world') {
      audio.src = capriceForLute;
    } else {
      audio.src = mastInTheMist;
    }

    audio.play();
  },
};

export default Sound;
