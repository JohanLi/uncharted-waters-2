import State from '../state';
import Camera from './camera';
import Characters from './characters';
import Map from './map';
import Sound from '../sound';
import Input from './input';
import PercentNextMove from './percent-next-move';

const port = {
  setup: () => {
    Input.setup();
    Map.setup();
    Camera.setup();
    Characters.setup();
    Sound.play();
  },
  loop: () => {
    if (!State.building) {
      PercentNextMove.update();
      if (PercentNextMove.percentNextMove === 0) {
        Characters.update();
      }
      Camera.update();
    }
  },
};

export default port;
