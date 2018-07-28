import Assets from './assets';
import Camera from './camera';
import Character from './character';
import PercentNextMove from './percent-next-move';

Assets.load()
  .then(() => {
    const loop = () => {
      PercentNextMove.update();
      Character.update();
      Camera.update();

      requestAnimationFrame(loop)
    };

    requestAnimationFrame(loop)
  });
