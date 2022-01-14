import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createWorldCharacters from './worldCharacters';
import { getTimeOfDay } from '../state/selectors';
import { worldTimeTick } from '../state/actionsWorld';
import { drawCharacter, getCameraPosition, TILE_SIZE } from './sharedUtils';

const createWorld = () => {
  const canvas = document.getElementById('camera') as HTMLCanvasElement;
  const context = canvas.getContext('2d', { alpha: false })!;

  const width = canvas.width / TILE_SIZE;
  const height = canvas.height / TILE_SIZE;

  const map = createMap([Math.ceil(width + 1), Math.ceil(height + 1)]);

  const characters = createWorldCharacters(map);

  return {
    update: () => {
      PercentNextMove.update();

      if (PercentNextMove.get() !== 0) {
        return;
      }

      characters.update();

      worldTimeTick();
    },
    draw: () => {
      const player = characters.player();
      const camera = getCameraPosition(
        player,
        { width, height },
        map,
        PercentNextMove.get(),
        true,
      );

      context.drawImage(
        map.draw(Math.floor(camera.x), Math.floor(camera.y), getTimeOfDay()),
        Math.floor((camera.x % 1) * TILE_SIZE),
        Math.floor((camera.y % 1) * TILE_SIZE),
        width * TILE_SIZE,
        height * TILE_SIZE,
        0,
        0,
        width * TILE_SIZE,
        height * TILE_SIZE,
      );

      const npcs = characters.npcs();

      npcs.forEach((npc) => {
        drawCharacter(
          context,
          Assets.images.worldShips,
          npc,
          camera,
          PercentNextMove.get(),
        );
      });

      // player drawn last as there’s no collision at sea
      drawCharacter(
        context,
        Assets.images.worldShips,
        player,
        camera,
        PercentNextMove.get(),
      );
    },
    characters: () => characters,
  };
};

export type World = ReturnType<typeof createWorld>;

export default createWorld;
