/*
  The files below are given a .wasm extension so they automatically get served
  with a content-type that enables compression. .json works as well.
 */

import portTilemaps from './portTilemaps.wasm?url';
import worldTilemap from './worldTilemap.wasm?url';
import windsCurrent from './windsCurrent.wasm?url';

const dataAssets = {
  portTilemaps,
  worldTilemap,
  windsCurrent,
};

export type DataAssets = keyof typeof dataAssets;

export default dataAssets;
