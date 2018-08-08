import state from '../state';
import Camera from './camera';
import Characters from './characters';
import Map from './map';
import Sound from '../sound';
import Input from './input';

const port = {
  setup: () => {
    Input.setup();
    Map.setup();
    Camera.setup();
    Characters.setup();
    Sound.play();
  },
  loop: () => {
    if (!state.building) {
      Characters.update();
      Camera.update();
      Camera.draw();
    }
  },
};

export default port;
