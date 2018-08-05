import state from '../state';
import Camera from './Camera';
import Characters from './Characters';
import Map from './Map';
import Sound from '../sound';

const port = {
  setup: () => {
    port.map = new Map();
    port.characters = new Characters(port.map);
    port.camera = new Camera(port.map, port.characters);
    Sound.play();
  },
  loop: () => {
    if (!state.building) {
      port.characters.update();
      port.camera.update();
      port.camera.draw();
    }
  },
};

export default port;
