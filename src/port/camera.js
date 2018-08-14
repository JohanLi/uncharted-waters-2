import Assets from '../assets';
import Map from './map';
import Characters from './characters';
import PercentNextMove from './percent-next-move';

const camera = {
  setup: () => {
    camera.width = 40;
    camera.height = 25;
    camera.x = 0;
    camera.y = 0;

    camera.canvas = document.getElementById('camera');
    camera.context = camera.canvas.getContext('2d');
    camera.canvas.width = camera.width * 32;
    camera.canvas.height = camera.height * 32;
  },
  update: () => {
    const player = Characters.player();
    const { x, y } = player.position(PercentNextMove.percentNextMove);
    camera.x = x + (player.width / 2) - (camera.width / 2);
    camera.y = y + (player.height / 2) - (camera.height / 2);

    if (camera.x < 0) {
      camera.x = 0;
    }

    if (camera.x + camera.width > 96) {
      camera.x = 96 - camera.width;
    }

    if (camera.y + camera.height > 96) {
      camera.y = 96 - camera.height;
    }

    if (camera.y < 0) {
      camera.y = 0;
    }

    draw();
  },
};

const draw = () => {
  camera.context.drawImage(
    Map.get(),
    Math.floor(camera.x * 32), Math.floor(camera.y * 32),
    camera.canvas.width, camera.canvas.height,
    0, 0,
    camera.canvas.width, camera.canvas.height,
  );

  Characters.characters().forEach((character) => {
    const { x, y } = character.position(PercentNextMove.percentNextMove);

    camera.context.drawImage(
      Assets.assets.port.characters,
      character.frame() * character.width * 32, 0,
      character.width * 32, character.height * 32,
      Math.floor((x - camera.x) * 32), Math.floor((y - camera.y) * 32),
      character.width * 32, character.height * 32,
    );
  });
};

export default camera;
