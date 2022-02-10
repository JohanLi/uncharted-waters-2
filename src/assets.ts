const imagesToLoad = {
  portTilesets: import('./assets/portTilesets.png'),
  portCharacters: import('./assets/portCharacters.png'),
  worldTileset: import('./assets/worldTileset.png'),
  worldShips: import('./assets/worldShips.png'),
};

const interfaceImagesToLoad = {
  dialogCorner: import('./assets/dialogCorner.png'),
  dialogCaretDown: import('./assets/dialogCaretDown.png'),
  dialogShip: import('./assets/dialogShip.png'),
  dialogYes: import('./assets/dialogYes.png'),
  dialogNo: import('./assets/dialogNo.png'),
  dialogSubmit: import('./assets/dialogSubmit.png'),
  buildingBackground: import('./assets/buildingBackground.png'),
  buildings: import('./assets/buildings.png'),
  characters: import('./assets/characters.png'),
  worldIndicators: import('./assets/worldIndicators.png'),
  worldWater: import('./assets/worldWater.png'),
  worldFood: import('./assets/worldFood.png'),
  worldLumber: import('./assets/worldLumber.png'),
  worldShot: import('./assets/worldShot.png'),
  ships: import('./assets/ships.png'),
};

const dataToLoad = {
  portTilemaps: import('./data/portTilemaps.bin'),
  worldTilemap: import('./data/worldTilemap.bin'),
  windsCurrent: import('./data/windsCurrent.bin'),
};

const loadImage = (url: string, upscale: boolean) =>
  new Promise<HTMLCanvasElement>((resolve) => {
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
  });

const loadBinary = async (url: string) => {
  const response = await fetch(url);
  return new Uint8Array(await response.arrayBuffer());
};

export type ImageKeys = keyof typeof imagesToLoad;
export type ImageInterfaceKeys = keyof typeof interfaceImagesToLoad;
type DataKeys = keyof typeof dataToLoad;

interface SliceCache {
  [key: string]: string;
}

const sliceCache = {} as SliceCache;

const slice = (key: ImageInterfaceKeys, i: number, widthPerSlice: number) => {
  const cacheKey = `${key}:${i}`;
  const cache = sliceCache[cacheKey];

  if (cache) {
    return cache;
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const image = Assets.images[key];

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

const Assets = {
  load: () =>
    Promise.all(
      [
        Object.entries(imagesToLoad).map(([key, value]) =>
          value.then((module) =>
            loadImage(module.default, true).then((canvas) => {
              // @ts-ignore
              Assets.images[key] = canvas;
            }),
          ),
        ),
        Object.entries(interfaceImagesToLoad).map(([key, value]) =>
          value.then((module) =>
            loadImage(module.default, false).then((canvas) => {
              // @ts-ignore
              Assets.images[key] = canvas;
            }),
          ),
        ),
        Object.entries(dataToLoad).map(([key, value]) =>
          value.then((module) =>
            loadBinary(module.default).then((data) => {
              // @ts-ignore
              Assets.data[key] = data;
            }),
          ),
        ),
      ].flat(),
    ),
  images: {} as { [key in ImageKeys | ImageInterfaceKeys]: HTMLCanvasElement },
  data: {} as { [key in DataKeys]: Uint8Array },
  buildings: (id: string) => slice('buildings', Number(id) - 1, 136),
  characters: (id: string) => slice('characters', Number(id) - 1, 64),
  indicators: (direction: number) => slice('worldIndicators', direction, 80),
  ships: (id: string) => slice('ships', Number(id) - 1, 128),
};

export default Assets;
