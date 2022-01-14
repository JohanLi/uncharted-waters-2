import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createBuilding from '../building';
import createPortCharacters from './portCharacters';
import { getPortMetadata } from './portUtils';
import { enterBuilding } from '../state/actionsPort';
import { getTimeOfDay, isDay } from '../state/selectors';
import {
  drawCharacter,
  getCameraPosition,
  TILE_SIZE,
} from '../world/sharedUtils';

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
      const camera = getCameraPosition(
        player,
        { width, height },
        map,
        PercentNextMove.get(),
        false,
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

      drawCharacter(
        context,
        Assets.images.portCharacters,
        player,
        camera,
        PercentNextMove.get(),
      );

      const npcs = characters.npcs();

      npcs.forEach((npc) => {
        drawCharacter(
          context,
          Assets.images.portCharacters,
          npc,
          camera,
          PercentNextMove.get(),
        );
      });
    },
    characters: () => characters,
  };
};

export type Port = ReturnType<typeof createPort>;

export default createPort;
