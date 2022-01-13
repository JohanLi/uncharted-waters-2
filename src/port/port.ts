import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createBuilding from '../building';
import createPortCharacters from './portCharacters';
import { getPortMetadata } from './portUtils';
import { enterBuilding } from '../state/actionsPort';
import { getTimeOfDay, isDay } from '../state/selectors';

const TILE_SIZE = 32;

const createPort = (portId: number) => {
  const canvas = document.getElementById('camera') as HTMLCanvasElement;
  const context = canvas.getContext('2d', { alpha: false })!;

  const width = canvas.width / TILE_SIZE;
  const height = canvas.height / TILE_SIZE;

  const portMetadata = getPortMetadata(portId);
  const map = createMap(
    [Math.ceil(width + 1), Math.ceil(height + 1)],
    portMetadata,
  );

  const building = createBuilding(portId);
  const characters = createPortCharacters(
    map,
    building,
    portMetadata.isSupplyPort,
  );

  if (isDay()) {
    characters.spawnNpcs();
  }

  return {
    update: () => {
      PercentNextMove.update();

      if (PercentNextMove.get() !== 0) {
        return;
      }

      characters.update();

      // TODO destination should be undefined if player is not moving – check for that instead
      const buildingId = building.at(characters.player().position());

      if (buildingId) {
        enterBuilding(buildingId);
      }
    },
    draw: () => {
      const player = characters.player();
      const { x: characterX, y: characterY } = player.position(
        PercentNextMove.get(),
      );

      const cameraCenterX = characterX + player.width / 2;
      const cameraCenterY = characterY + player.height / 2;

      let cameraX = Math.max(cameraCenterX - width / 2, 0);
      let cameraY = Math.max(cameraCenterY - height / 2, 0);

      cameraX = Math.min(cameraX, map.tilemapColumns - width);
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

      context.drawImage(
        Assets.images.portCharacters,
        player.frame() * player.width * TILE_SIZE,
        0,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
        (characterX - cameraX) * TILE_SIZE,
        (characterY - cameraY) * TILE_SIZE,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
      );

      const npcs = characters.npcs();

      npcs.forEach((npc) => {
        context.drawImage(
          Assets.images.portCharacters,
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
    characters: () => characters,
  };
};

export type Port = ReturnType<typeof createPort>;

export default createPort;
