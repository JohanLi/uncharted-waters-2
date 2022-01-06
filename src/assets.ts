/*
 TODO
  consider moving assets used exclusively by the interface out of here, and use image-rendering: pixelated
  We should still ensure those assets are loaded before the game starts, though.
 */

const images = {
  portTilesets: import('./port/tilesets.png'),
  portCharacters: import('./port/portCharacters.png'),
  buildingBackground: import('./interface/building/assets/background.png'),
  buildingMarket: import('./interface/building/assets/market.png'),
  buildingPub: import('./interface/building/assets/pub.png'),
  buildingShipyard: import('./interface/building/assets/shipyard.png'),
  buildingHarbor: import('./interface/building/assets/harbor.png'),
  buildingLodge: import('./interface/building/assets/lodge.png'),
  buildingPalace: import('./interface/building/assets/palace.png'),
  buildingGuild: import('./interface/building/assets/guild.png'),
  buildingMisc: import('./interface/building/assets/misc.png'),
  buildingBank: import('./interface/building/assets/bank.png'),
  buildingItemShop: import('./interface/building/assets/item-shop.png'),
  buildingChurch: import('./interface/building/assets/church.png'),
  buildingFortuneTeller: import('./interface/building/assets/fortune-teller.png'),
  seaTileset: import('./sea/tileset.png'),
  seaCharacters: import('./sea/seaCharacters.png'),
  seaHeadingIndicators: import('./interface/sea/assets/heading-indicators.png'),
  seaWater: import('./interface/sea/assets/water.png'),
  seaFood: import('./interface/sea/assets/food.png'),
  seaLumber: import('./interface/sea/assets/lumber.png'),
  seaShot: import('./interface/sea/assets/shot.png'),
}

const tilemaps = {
  port: import('./port/tilemaps.bin'),
  sea: import('./sea/tilemap.bin'),
};

export type ImageKeys = keyof typeof images;
type TilemapKeys = keyof typeof tilemaps;

export const Images = {} as { [key in ImageKeys]: HTMLCanvasElement };

export const Tilemaps = {} as { [key in TilemapKeys]: Uint8Array };

const ASSETS_SCALE = 2;

const loadImage = (url: string) => new Promise<HTMLCanvasElement>((resolve) => {
  const img = new Image();
  img.src = url;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width * ASSETS_SCALE;
    canvas.height = img.height * ASSETS_SCALE;

    const context = canvas.getContext('2d')!;
    context.imageSmoothingEnabled = false;

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    resolve(canvas);
  };
});

const loadBinary = async (url: string) => {
  const response = await fetch(url);
  return new Uint8Array(await response.arrayBuffer());
}

export const load = async () => {
  let imageKeys: ImageKeys;

  for (imageKeys in images) {
    const url = (await images[imageKeys]).default;
    Images[imageKeys] = await loadImage(url);
  }

  let dataKeys: TilemapKeys;

  for (dataKeys in tilemaps) {
    const url = (await tilemaps[dataKeys]).default;
    Tilemaps[dataKeys] = await loadBinary(url);
  }
};
