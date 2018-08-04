import PercentNextMove from './percent-next-move';
import Character from './character';
import Camera from './camera';
import Input from './input';
import Sound from '../sound';

export default {
  setup: () => {
    Camera.setup();
    Input.setup();
    Sound.play();
  },
  loop: () => {
    PercentNextMove.update();
    Character.update();
    Camera.update();
  },
}
