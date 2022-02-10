import portTilemaps from './portTilemaps.bin';
import worldTilemap from './worldTilemap.bin';
import windsCurrent from './windsCurrent.bin';

const dataAssets = {
  portTilemaps,
  worldTilemap,
  windsCurrent,
};

export type DataAssets = keyof typeof dataAssets;

export default dataAssets;
