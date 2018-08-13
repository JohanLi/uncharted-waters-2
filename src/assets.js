import portTilesets from './assets/img/port-tilesets.png';
import portTilemaps from './assets/data/port-tilemaps.bin';
import portCharacters from './assets/img/characters.png';

import worldMapTileset from './world-map/assets/world-map-tileset.png';
import tilesetShips from './world-map/assets/world-map-tileset-ships.png';
import tiles from './world-map/assets/world-map.bin';
import cursors from './world-map/assets/cursors.png';

import market from './assets/img/buildings/market.png';
import pub from './assets/img/buildings/pub.png';
import shipyard from './assets/img/buildings/shipyard.png';
import harbor from './assets/img/buildings/harbor.png';
import lodge from './assets/img/buildings/lodge.png';
import palace from './assets/img/buildings/palace.png';
import guild from './assets/img/buildings/guild.png';
import misc from './assets/img/buildings/misc.png';
import bank from './assets/img/buildings/bank.png';
import itemShop from './assets/img/buildings/item-shop.png';
import church from './assets/img/buildings/church.png';
import fortuneTeller from './assets/img/buildings/fortune-teller.png';

import background from './assets/img/interface/background.png';
import dialogCorner from './assets/img/interface/dialog-corner.png';
import hudLeft from './assets/img/interface/hud-left.png';
import hudRight from './assets/img/interface/hud-right.png';
import pointer from './assets/img/interface/pointer.png';


const assets = {
  port: {
    tilesets: portTilesets,
    tilemaps: portTilemaps,
    characters: portCharacters,
  },
  buildings: {
    market,
    pub,
    shipyard,
    harbor,
    lodge,
    palace,
    guild,
    misc,
    bank,
    itemShop,
    church,
    fortuneTeller,
  },
  interface: {
    background,
    dialogCorner,
    hudLeft,
    hudRight,
    pointer,
  },
  worldMap: {
    tileset: worldMapTileset,
    tilesetShips,
    tiles,
  },
  cursors,
};

const isObject = url => typeof url === 'object';
const isImage = url => url.substr(-4) === '.png';
const isBinary = url => url.substr(-4) === '.bin';
const isJson = url => url.substr(-5) === '.json';

const loadImage = image => new Promise((resolve, reject) => {
  const img = new Image();
  img.src = image;

  img.onload = () => resolve(img);

  img.onerror = () => reject(Error(`${image} could not be loaded!`));
});

const loadBinary = binary => fetch(binary)
  .then(response => response.arrayBuffer())
  .then(response => new Uint8Array(response));

const loadJson = json => fetch(json)
  .then(response => response.json());

export default {
  load: async () => {
    const toPromises = (a) => {
      Object.keys(a).forEach((key) => {
        if (isObject(a[key])) {
          toPromises(a[key]);
        } else if (isImage(a[key])) {
          promises.push(loadImage(a[key]));
        } else if (isBinary(a[key])) {
          promises.push(loadBinary(a[key]));
        } else if (isJson(a[key])) {
          promises.push(loadJson(a[key]));
        }
      });
    };

    const updateProperties = (a) => {
      Object.keys(a).forEach((key) => {
        if (isObject(a[key])) {
          updateProperties(a[key]);
        } else {
          a[key] = resolvedPromises.shift();
        }
      });
    };

    const promises = [];
    toPromises(assets);
    const resolvedPromises = await Promise.all(promises);
    updateProperties(assets);
  },
  assets,
};
