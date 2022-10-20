/*
  The files below are given a .wasm extension so they automatically get served
  with a content-type that enables compression. .json works as well.
 */

import portTilemaps from './portTilemaps.wasm';
import worldTilemap from './worldTilemap.wasm';
import windsCurrent from './windsCurrent.wasm';

const dataAssets = {
  portTilemaps,
  worldTilemap,
  windsCurrent,
};

export type DataAssets = keyof typeof dataAssets;

export default dataAssets;
