import portTilesets from './portTilesets.png';
import portCharacters from './portCharacters.png';
import worldTileset from './worldTileset.png';
import worldShips from './worldShips.png';

const gameImages = {
  portTilesets,
  portCharacters,
  worldTileset,
  worldShips,
};

export type GameImages = keyof typeof gameImages;

export default gameImages;
