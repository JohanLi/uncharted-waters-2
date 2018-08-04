import buildingData from './assets/data/buildings.json';
import ports from './assets/data/ports.json';
import portTilemaps from './assets/data/port-tilemaps.bin';

import characters from './assets/img/characters.png';
import tileset from './assets/img/port-tilesets.png';

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

const camelCase = input => input.replace(/-([a-z])/g, match => match[1].toUpperCase());

const requireBuildings = () => {
  const requireContext = require.context('./assets/img/buildings', false, /[a-z-]+.png$/);
  const output = {};

  requireContext.keys().forEach((key) => {
    const filenameWithoutExtension = key.match(/([a-z-]+).png$/)[1];
    output[camelCase(filenameWithoutExtension)] = requireContext(key);
  });

  return output;
};

const requireInterface = () => {
  const requireContext = require.context('./assets/img/interface', true, /[a-z-]+.png$/);
  const output = {};

  requireContext.keys().forEach((key) => {
    const filenameWithoutExtension = key.match(/([a-z-]+).png$/)[1];
    output[camelCase(filenameWithoutExtension)] = requireContext(key);
  });

  return output;
};

const assets = {
  buildingData,
  ports,
  portTilemaps,
  characters,
  tileset,
  buildings: requireBuildings(),
  interface: requireInterface(),
};

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
