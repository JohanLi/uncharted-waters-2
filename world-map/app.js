import Assets from './assets';
import Camera from './camera';
import Character from './character';
import Input from './input';
import PercentNextMove from './percent-next-move';

Assets.load()
  .then(() => {
    const loop = () => {
      PercentNextMove.update();
      Character.update();
      Camera.update();

      requestAnimationFrame(loop);
    };

    Input.setup();
    requestAnimationFrame(loop);
  });
