import Assets from './assets';
import createMap from './map';
import PercentNextMove from './percentNextMove';
import gameState, { getTimeOfDay, seaTimeTick } from './gameState';
import createBuilding from './building';
import createPortCharacters from './port/portCharacters';
import createSeaCharacters from './sea/seaCharacters';

const TILE_SIZE = 32;

const createWorld = () => {
  const canvas = document.getElementById('camera') as HTMLCanvasElement;
  const context = canvas.getContext('2d', { alpha: false })!;

  const width = canvas.width / TILE_SIZE;
  const height = canvas.height / TILE_SIZE;

  const map = createMap(gameState, [Math.ceil(width + 1), Math.ceil(height + 1)]);

  const { stage, portId } = gameState;

  let characterAsset: CanvasImageSource;

  if (stage === 'port') {
    const building = createBuilding(portId);
    gameState.portCharacters = createPortCharacters(map, building);

    characterAsset = Assets.portCharacters;
  } else {
    gameState.seaCharacters = createSeaCharacters(map);

    characterAsset = Assets.seaShips;
  }

  return {
    update: () => {
      PercentNextMove.update();

      if (PercentNextMove.get() !== 0) {
        return;
      }

      if (stage === 'port') {
        gameState.portCharacters.update();
      } else {
        gameState.seaCharacters.update();

        seaTimeTick();
      }
    },
    draw: () => {
      const player = stage === 'port' ? gameState.portCharacters.getPlayer() : gameState.seaCharacters.getPlayer();
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
          getTimeOfDay(),
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
        characterAsset,
        player.frame() * player.width * TILE_SIZE,
        0,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
        (characterX - cameraX) * TILE_SIZE,
        (characterY - cameraY) * TILE_SIZE,
        player.width * TILE_SIZE,
        player.height * TILE_SIZE,
      );

      const npcs = stage === 'port' ? gameState.portCharacters.getNpcs() : gameState.seaCharacters.getNpcs();

      npcs.forEach((npc) => {
        context.drawImage(
          characterAsset,
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
