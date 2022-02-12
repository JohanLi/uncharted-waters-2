/*
Dynamically importing would reduce code repetition, but the issue
is that separate JS chunks will be created for each asset.

Require.context() is also a solution, but extra code will still be needed
as all assets shouldn’t be processed the same way.
*/

import gameImages, { GameImages } from './game/images/gameImages';
import interfaceImages, {
  InterfaceImages,
} from './interface/images/interfaceImages';
import dataAssets, { DataAssets } from './data/assets/dataAssets';

type LoadedAssets = {
  [key in GameImages | InterfaceImages]: HTMLCanvasElement;
} & { [key in DataAssets]: Uint8Array };
const loadedAssets = {} as LoadedAssets;

interface SliceCache {
  [key: string]: string;
}

const sliceCache = {} as SliceCache;

const slice = (key: InterfaceImages, i: number, widthPerSlice: number) => {
  const cacheKey = `${key}:${i}`;
  const cache = sliceCache[cacheKey];

  if (cache) {
    return cache;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const image = loadedAssets[key];

  const canvas = document.createElement('canvas');
  canvas.width = widthPerSlice;
  canvas.height = image.height;

  const context = canvas.getContext('2d')!;

  context.drawImage(
    image,
    i * widthPerSlice,
    0,
    canvas.width,
    canvas.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  const result = canvas.toDataURL();
  sliceCache[cacheKey] = result;

  return result;
};

const loadImage = (url: string, upscale: boolean) =>
  new Promise<HTMLCanvasElement>((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = upscale ? 2 : 1;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const context = canvas.getContext('2d')!;
      context.imageSmoothingEnabled = false;

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    };

    img.onerror = () => reject(Error('Failed loading image'));
  });

const loadBinary = async (url: string) => {
  const response = await fetch(url);
  return new Uint8Array(await response.arrayBuffer());
};

const Assets = {
  load: () =>
    Promise.all(
      [
        Object.entries(gameImages).map(([key, value]) =>
          loadImage(value, true).then((canvas) => {
            // @ts-ignore
            loadedAssets[key] = canvas;
          }),
        ),
        Object.entries(interfaceImages).map(([key, value]) =>
          loadImage(value, false).then((canvas) => {
            // @ts-ignore
            loadedAssets[key] = canvas;
          }),
        ),
        Object.entries(dataAssets).map(([key, value]) =>
          loadBinary(value).then((data) => {
            // @ts-ignore
            loadedAssets[key] = data;
          }),
        ),
      ].flat(),
    ),
  images: (id: GameImages | InterfaceImages) => loadedAssets[id],
  data: (id: DataAssets) => loadedAssets[id],
  buildings: (id: string) => slice('buildings', Number(id) - 1, 136),
  // multiple items can share the same image
  items: (i: number) => slice('items', i, 48),
  characters: (id: string) => slice('characters', Number(id) - 1, 64),
  indicators: (direction: number) => slice('worldIndicators', direction, 80),
  ships: (id: string) => slice('ships', Number(id) - 1, 128),
};

export default Assets;
