import Assets from './assets';
import PercentNextMove from './percent-next-move';
import Character from './character';
import Camera from './camera';
import Input from './input';
import Sound from './sound';

Assets.load()
  .then(() => {
    const loop = () => {
      PercentNextMove.update();
      Character.update();
      Camera.update();

      requestAnimationFrame(loop);
    };

    Input.setup();
    Sound.setup();
    requestAnimationFrame(loop);
  });
