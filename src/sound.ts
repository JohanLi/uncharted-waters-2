import gameState from './gameState';

import mastInTheMist from './sound/mast-in-the-mist.mp3';
import capriceForLute from './sound/caprice-for-lute.mp3';

const createSound = () => {
  const audio = new Audio();

  document.addEventListener('click', () => audio.play(), {
    once: true,
  });

  return {
    play: () => {
      audio.loop = true;

      const { stage } = gameState;

      if (stage === 'sea') {
        audio.src = capriceForLute;
      } else {
        audio.src = mastInTheMist;
      }

      audio.play();
    },
  };
};

export default createSound;
