/*
 TODO
  Consider moving assets used exclusively by the interface out of here,
  and use image-rendering: pixelated
  We should still ensure those assets are loaded before the game starts, though.
 */

const unloadedImages = {
  portTilesets: import('./port/tilesets.png'),
  portCharacters: import('./port/portCharacters.png'),
  buildingBackground: import('./interface/port/assets/background.png'),
  buildingMarket: import('./interface/port/assets/market.png'),
  buildingPub: import('./interface/port/assets/pub.png'),
  buildingShipyard: import('./interface/port/assets/shipyard.png'),
  buildingHarbor: import('./interface/port/assets/harbor.png'),
  buildingLodge: import('./interface/port/assets/lodge.png'),
  buildingPalace: import('./interface/port/assets/palace.png'),
  buildingGuild: import('./interface/port/assets/guild.png'),
  buildingMisc: import('./interface/port/assets/misc.png'),
  buildingBank: import('./interface/port/assets/bank.png'),
  buildingItemShop: import('./interface/port/assets/item-shop.png'),
  buildingChurch: import('./interface/port/assets/church.png'),
  buildingFortuneTeller: import('./interface/port/assets/fortune-teller.png'),
  buildingDialogCorner: import('./interface/assets/dialog-corner.png'),
  seaTileset: import('./sea/tileset.png'),
  seaCharacters: import('./sea/seaCharacters.png'),
  seaWater: import('./interface/sea/assets/water.png'),
  seaFood: import('./interface/sea/assets/food.png'),
  seaLumber: import('./interface/sea/assets/lumber.png'),
  seaShot: import('./interface/sea/assets/shot.png'),
};

const unloadedImagesInterface = {
  seaIndicators: import('./interface/sea/assets/indicators.png'),
};

const unloadedData = {
  portTilemaps: import('./port/tilemaps.bin'),
  seaTilemap: import('./sea/tilemap.bin'),
  windsCurrent: import('./sea/windsCurrent.bin'),
};

const loadImage = (url: string, upscale = true) =>
  new Promise<HTMLCanvasElement>((resolve) => {
    const scale = upscale ? 2 : 1;

    const img = new Image();
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
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

export type ImageKeys = keyof typeof unloadedImages;
export type ImageInterfaceKeys = keyof typeof unloadedImagesInterface;
type DataKeys = keyof typeof unloadedData;

interface Cache {
  [tilesetOffset: string]: HTMLCanvasElement;
}

const cache = <Cache>{};

const Assets = {
  load: async () => {
    let imageKeys: ImageKeys;

    for (imageKeys in unloadedImages) {
      const url = (await unloadedImages[imageKeys]).default;
      Assets.images[imageKeys] = await loadImage(url);
    }

    let imageInterfaceKeys: ImageInterfaceKeys;

    for (imageInterfaceKeys in unloadedImagesInterface) {
      const url = (await unloadedImagesInterface[imageInterfaceKeys]).default;
      Assets.images[imageInterfaceKeys] = await loadImage(url, false);
    }

    let dataKeys: DataKeys;

    for (dataKeys in unloadedData) {
      const url = (await unloadedData[dataKeys]).default;
      Assets.data[dataKeys] = await loadBinary(url);
    }
  },
  images: {} as { [key in ImageKeys | ImageInterfaceKeys]: HTMLCanvasElement },
  data: {} as { [key in DataKeys]: Uint8Array },
  indicator: (direction: number) => {
    const cached = cache[`indicator${direction}`];

    if (cached) {
      return cached;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 80;
    canvas.height = 80;

    const context = canvas.getContext('2d')!;

    context.drawImage(
      Assets.images.seaIndicators,
      direction * 80,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    cache[`indicator${direction}`] = canvas;

    return canvas;
  },
};

export default Assets;
