import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createBuilding from '../building';
import createPortCharacters from './portCharacters';
import { getPortMetadata } from './portUtils';
import { enterBuilding } from '../state/actionsPort';
import { getTimeOfDay, isDay } from '../state/selectors';
import { drawCharacter, TILE_SIZE } from '../world/worldUtils';

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
      const { x: playerX, y: playerY } = player.position(PercentNextMove.get());

      const cameraCenterX = playerX + player.width / 2;
      const cameraCenterY = playerY + player.height / 2;

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

      drawCharacter(
        context,
        Assets.images.portCharacters,
        player,
        { x: cameraX, y: cameraY },
        PercentNextMove.get(),
      );

      const npcs = characters.npcs();

      npcs.forEach((npc) => {
        drawCharacter(
          context,
          Assets.images.portCharacters,
          npc,
          { x: cameraX, y: cameraY },
          PercentNextMove.get(),
        );
      });
    },
    characters: () => characters,
  };
};

export type Port = ReturnType<typeof createPort>;

export default createPort;
