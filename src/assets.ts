import { IAssets } from "./types";

import * as buildings from "./assets/data/buildings.json";
import * as ports from "./assets/data/ports.json";

import * as characters from "./assets/img/characters.png";
import * as tileset0 from "./assets/img/tileset0.2.png";
import * as tileset2 from "./assets/img/tileset2.2.png";

const isObject = (url: object): boolean => typeof url === "object";
const isImage = (url: string): boolean => url.substr(-4) === ".png";

const toPromise = async (url: string, key: string): Promise<object> => {
  if (isImage(url)) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ [key]: img });
      img.onerror = reject;
    });
  } else {
    const response = await fetch(url);
    const data = await response.json();

    return { [key]: data };
  }
};

const load = async (unloadedAssets: IAssets): Promise<object> => {
  const promises: Array<Promise<object>> = Object.keys(unloadedAssets).map(async (key) => {
    if (isObject(unloadedAssets[key])) {
      return {[key]: await load(unloadedAssets[key])};
    }

    return toPromise(unloadedAssets[key], key);
  });

  const loaded = await Promise.all(promises);
  return loaded.reduce((prev, curr) => Object.assign(prev, curr), {});
};

const assets: IAssets = {};

export const loadAssets = async (): Promise<object> => new Promise((resolve) => {
  const importBuildings = () => {
    const requireContext = require.context("./", true, /\/buildings\/[a-z-]+.png$/);
    const output: IAssets = {};

    requireContext.keys().forEach((key) => {
      output[key.match(/([a-z-]+).png$/)[1]] = requireContext(key);
    });

    return output;
  };

  const importInterface = () => {
    const requireContext = require.context("./", true, /\/(interface|cursor)\/[a-z-]+.png$/);
    const output: IAssets = {};

    requireContext.keys().forEach((key) => {
      output[key.match(/([a-z-]+).png$/)[1]] = requireContext(key);
    });

    return output;
  };

  load({
    buildings,
    ports,
    characters,
    tileset0,
    tileset2,
    buildingAssets: {
      ...importBuildings(),
    },
    interfaceAssets: {
      ...importInterface(),
    },
  })
    .then((loadedAssets) => {
      Object.assign(assets, loadedAssets);
      resolve();
    });
});

export default assets;
