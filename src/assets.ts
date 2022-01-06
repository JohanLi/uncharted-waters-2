import portTilesets from './port/tilesets.png';
import portTilemaps from './port/tilemaps.bin';
import portCharacters from './port/portCharacters.png';

import buildingBackground from './interface/building/assets/background.png';
import buildingMarket from './interface/building/assets/market.png';
import buildingPub from './interface/building/assets/pub.png';
import buildingShipyard from './interface/building/assets/shipyard.png';
import buildingHarbor from './interface/building/assets/harbor.png';
import buildingLodge from './interface/building/assets/lodge.png';
import buildingPalace from './interface/building/assets/palace.png';
import buildingGuild from './interface/building/assets/guild.png';
import buildingMisc from './interface/building/assets/misc.png';
import buildingBank from './interface/building/assets/bank.png';
import buildingItemShop from './interface/building/assets/item-shop.png';
import buildingChurch from './interface/building/assets/church.png';
import buildingFortuneTeller from './interface/building/assets/fortune-teller.png';

import seaTilemap from './sea/tilemap.bin';
import seaTileset from './sea/tileset.png';
import seaCharacters from './sea/seaCharacters.png';
import seaHeadingIndicators from './interface/sea/assets/heading-indicators.png';
import seaWater from './interface/sea/assets/water.png';
import seaFood from './interface/sea/assets/food.png';
import seaLumber from './interface/sea/assets/lumber.png';
import seaShot from './interface/sea/assets/shot.png';

export interface Assets {
  [key: string]: any;
}

const SCALE = 2;

// if initialized with the interface, autocomplete will not be possible
const assets = {
  portTilesets,
  portTilemaps,
  portCharacters,
  buildingBackground,
  buildingMarket,
  buildingPub,
  buildingShipyard,
  buildingHarbor,
  buildingLodge,
  buildingPalace,
  buildingGuild,
  buildingMisc,
  buildingBank,
  buildingItemShop,
  buildingChurch,
  buildingFortuneTeller,
  seaTileset,
  seaTilemap,
  seaCharacters,
  seaHeadingIndicators,
  seaWater,
  seaFood,
  seaLumber,
  seaShot,
};

const isImage = (url: string) => url.endsWith('.png');
const isBinary = (url: string) => url.endsWith('.bin');

const loadImage = (url: string, scale = SCALE) => new Promise<HTMLCanvasElement>((resolve) => {
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

const loadBinary = (url: string) => fetch(url)
  .then(response => response.arrayBuffer())
  .then(response => new Uint8Array(response));

// the goal is to only have to call load() one time
const load = async (a: Assets = assets) => {
  const promises: Promise<HTMLCanvasElement | Uint8Array>[] = [];

  Object.keys(a).forEach((key) => {
    if (isImage(a[key])) {
      promises.push(loadImage(a[key]));
    } else if (isBinary(a[key])) {
      promises.push(loadBinary(a[key]));
    }
  });

  const resolvedPromises = await Promise.all(promises);

  Object.keys(a).forEach((key) => {
    a[key] = resolvedPromises.shift()!;
  });
};

export default assets;
export { load };
