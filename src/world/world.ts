import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createWorldCharacters from './worldCharacters';
import { drawCharacter, getXWrapAround, TILE_SIZE } from './worldUtils';
import { getTimeOfDay } from '../state/selectors';
import { worldTimeTick } from '../state/actionsWorld';

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
      const { x: playerX, y: playerY } = player.position(PercentNextMove.get());

      const cameraCenterX = playerX + player.width / 2;
      const cameraCenterY = playerY + player.height / 2;

      const cameraX = getXWrapAround(cameraCenterX - width / 2);

      let cameraY = Math.max(cameraCenterY - height / 2, 0);
      cameraY = Math.min(cameraY, map.tilemapRows - height);

      context.drawImage(
        map.draw(Math.floor(cameraX), Math.floor(cameraY), getTimeOfDay()),
        Math.floor((cameraX % 1) * TILE_SIZE),
        Math.floor((cameraY % 1) * TILE_SIZE),
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
          { x: cameraX, y: cameraY },
          PercentNextMove.get(),
        );
      });

      // player drawn last as there’s no collision at sea
      drawCharacter(
        context,
        Assets.images.worldShips,
        player,
        { x: cameraX, y: cameraY },
        PercentNextMove.get(),
      );
    },
    characters: () => characters,
  };
};

export type World = ReturnType<typeof createWorld>;

export default createWorld;
