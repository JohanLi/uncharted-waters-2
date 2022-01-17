import Assets from '../assets';
import createMap from '../map';
import PercentNextMove from '../percentNextMove';
import createBuilding from '../building';
import createPortCharacters from './portCharacters';
import { getPortMetadata } from './portUtils';
import { getTimeOfDay, isDay } from '../state/selectors';
import {
  drawCamera,
  drawCharacter,
  getCameraPosition,
} from '../world/sharedUtils';
import { TILE_SIZE } from '../constants';

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

      drawCamera(context, { ...camera, width, height }, map, getTimeOfDay());

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
