import capriceForLute from './assets/caprice-for-lute.mp3';

const play = () => {
  document.removeEventListener('click', play);

  const sound = new Audio();
  sound.loop = true;
  sound.src = capriceForLute;

  document.querySelector('.wrapper').appendChild(sound);
  sound.play();
};

export default {
  setup: () => {
    document.addEventListener('click', play);
  },
};
