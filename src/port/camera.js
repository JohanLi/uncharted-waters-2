import Assets from '../assets';
import Map from './map';
import Characters from './characters';

const camera = {
  setup: () => {
    camera.width = 1280;
    camera.height = 800;
    camera.x = 0;
    camera.y = 0;

    camera.canvas = document.getElementById('camera');
    camera.context = camera.canvas.getContext('2d');
    camera.canvas.width = camera.width;
    camera.canvas.height = camera.height;
  },
  update: () => {
    const player = Characters.player;

    camera.x = (player.visualX + (player.width / 2) + player.offsetX) - (camera.width / 2);
    camera.y = (player.visualY + (player.height / 2) + player.offsetY) - (camera.height / 2);

    if (camera.x < 0) {
      camera.x = 0;
    }

    if (camera.x + camera.width > 3072) {
      camera.x = 3072 - camera.width;
    }

    if (camera.y + camera.height > 3072) {
      camera.y = 3072 - camera.height;
    }

    if (camera.y < 0) {
      camera.y = 0;
    }
  },
  draw: () => {
    camera.context.drawImage(
      Map.canvas,
      camera.x, camera.y,
      camera.width, camera.height,
      0, 0,
      camera.width, camera.height,
    );

    Characters.characters.forEach((character) => {
      const x = character.visualX + character.offsetX - camera.x;
      const y = character.visualY + character.offsetY - camera.y;

      camera.context.drawImage(
        Assets.assets.characters,
        character.frame * character.width, 0,
        character.width, character.height,
        x, y,
        character.width, character.height,
      );
    });
  },  
};

export default camera;
