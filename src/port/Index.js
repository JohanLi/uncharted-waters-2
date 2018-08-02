import state from '../state';
import Camera from './Camera';
import Characters from './Characters';
import Map from './Map';

import './styles.scss';

const renderPort = () => {
  const map = new Map();
  const characters = new Characters(map);
  const camera = new Camera(map, characters);

  const loop = () => {
    if (!state.building) {
      characters.update();
      camera.update();
      camera.draw();
    }

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
};

export default renderPort;
