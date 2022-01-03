import Assets from './assets';
import createMap from './map';
import Building from './building';
import PercentNextMove from './percentNextMove';
import createCharacters from './characters';
import { RootState } from './interface/store';

const TILE_SIZE = 32;

type Options = {
  type: 'port';
  portId: number;
  state: RootState;
} | {
  type: 'sea';
  portId: number;
  state: RootState;
};

const createWorld = (options: Options) => {
  const { type, portId, state } = options;

  const canvas = document.getElementById('camera') as HTMLCanvasElement;
  const context = canvas.getContext('2d', { alpha: false })!;

  const width = canvas.width / TILE_SIZE;
  const height = canvas.height / TILE_SIZE;

  const map = createMap({ type, visibleArea: [Math.ceil(width + 1), Math.ceil(height + 1)], portId });
  const building = type === 'port' ? Building(portId) : undefined;

  const characters = createCharacters({ type, map, building, state });

  return {
    update: () => {
      PercentNextMove.update();
      characters.update();
    },
    draw: (time: number) => {
      const { player, npcs } = characters;
      const { x: characterX, y: characterY } = player.position(PercentNextMove.get());
      const cameraCenterX = characterX + (player.width / 2);
      const cameraCenterY = characterY + (player.height / 2);

      let cameraX = Math.max(cameraCenterX - width / 2, 0);
      let cameraY = Math.max(cameraCenterY - height / 2, 0);

      cameraX = Math.min(cameraX, map.tilemapColumns - width);
      cameraY = Math.min(cameraY, map.tilemapRows - height);

      context.drawImage(
        map.draw(
          Math.floor(cameraX),
          Math.floor(cameraY),
          time,
        ),
        Math.floor((cameraX % 1) * TILE_SIZE),
        Math.floor((cameraY % 1) * TILE_SIZE),
        width * TILE_SIZE,
        height * TILE_SIZE,
        0,
        0,
        width * TILE_SIZE,
        height * TILE_SIZE,
      );

      context.drawImage(
        portId ? Assets.portCharacters : Assets.seaShips,
        player.frame() * player.width * TILE_SIZE,
        0,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
        (characterX - cameraX) * TILE_SIZE,
        (characterY - cameraY) * TILE_SIZE,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
      );

      npcs.forEach((npc) => {
        context.drawImage(
          Assets.portCharacters,
          npc.frame() * npc.width * TILE_SIZE,
          0,
          npc.width * TILE_SIZE,
          npc.height * TILE_SIZE,
          (npc.position(PercentNextMove.get()).x - cameraX) * TILE_SIZE,
          (npc.position(PercentNextMove.get()).y - cameraY) * TILE_SIZE,
          npc.width * TILE_SIZE,
          npc.height * TILE_SIZE,
        );
      });
    },
  };
}

export type World = ReturnType<typeof createWorld>;

export default createWorld;
