const imagesToLoad = {
  portTilesets: import('./port/tilesets.png'),
  portCharacters: import('./port/characters.png'),
  worldTileset: import('./world/tileset.png'),
  worldShips: import('./world/ships.png'),
};

const interfaceImagesToLoad = {
  dialogCorner: import('./interface/assets/dialog-corner.png'),
  dialogCaretDown: import('./interface/assets/dialog-caret-down.png'),
  dialogShip: import('./interface/assets/dialog-ship.png'),
  dialogYes: import('./interface/assets/dialog-yes.png'),
  dialogNo: import('./interface/assets/dialog-no.png'),
  dialogSubmit: import('./interface/assets/dialog-submit.png'),
  buildingBackground: import('./interface/port/assets/background.png'),
  buildings: import('./interface/port/assets/buildings.png'),
  characters: import('./interface/assets/characters.png'),
  worldIndicators: import('./interface/world/assets/indicators.png'),
  worldWater: import('./interface/world/assets/water.png'),
  worldFood: import('./interface/world/assets/food.png'),
  worldLumber: import('./interface/world/assets/lumber.png'),
  worldShot: import('./interface/world/assets/shot.png'),
  ships: import('./interface/assets/ships.png'),
};

const dataToLoad = {
  portTilemaps: import('./port/tilemaps.bin'),
  worldTilemap: import('./world/tilemap.bin'),
  windsCurrent: import('./world/windsCurrent.bin'),
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
