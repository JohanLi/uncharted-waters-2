import { IAssets } from "./types";

import * as buildings from "./assets/data/buildings.json";
import * as ports from "./assets/data/ports.json";

import * as characters from "./assets/img/characters.png";
import * as tileset0 from "./assets/img/tileset0.2.png";
import * as tileset2 from "./assets/img/tileset2.2.png";

const toPromise = async (url: string, key: string): Promise<object> => {
  const response = await fetch(url);
  const data = await response.json();

  return { [key]: data };
};

const imageToPromise = (url: string, key: string): Promise<object> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve({ [key]: img });
    img.onerror = reject;
  });

const isObject = (url: object): boolean => typeof url === "object";
const isImage = (url: string): boolean => url.substr(-4) === ".png";

const assets: IAssets = {};
export default assets;

export const loadAssets = async (): Promise<void> => {
  const load = async (unloadedAssets: IAssets): Promise<object> => {
    const output: IAssets = {};
    const promises: Array<Promise<object>> = [];

    Object.keys(unloadedAssets).forEach(async (key) => {
      if (isObject(unloadedAssets[key])) {
        output[key] = await load(unloadedAssets[key]);
      } else if (isImage(unloadedAssets[key])) {
        promises.push(imageToPromise(unloadedAssets[key], key));
      }  else {
        promises.push(toPromise(unloadedAssets[key], key));
      }
    });

    const loaded = await Promise.all(promises);
    return loaded.reduce((prev, curr) => Object.assign(prev, curr), output);
  };

  const importBuildings = () => {
    const requireContext = require.context("../", true, /\/buildings\/[a-z-]+.png$/);
    const output: IAssets = {};

    requireContext.keys().forEach((key) => {
      output[key.match(/([a-z-]+).png$/)[1]] = requireContext(key);
    });

    return output;
  };

  Object.assign(
    assets,
    await load({
      buildings,
      ports,
      characters,
      tileset0,
      tileset2,
      buildingAssets: {
        ...importBuildings(),
      },
    }),
  );
};
