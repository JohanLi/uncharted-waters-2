import { IAssets } from "./types";

const urls: { [key: string]: string } = {
  ports: "/data/ports.json",
  characters: "/img/characters.png",
  tileset0: "/img/tileset0.2.png",
  tileset2: "/img/tileset2.2.png",
};

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

const isImage = (url: string): boolean => url.substr(-4) === ".png";

const assets: IAssets = {
  load: async (): Promise<void> => {
    const promises: Array<Promise<object>> = [];

    Object.keys(urls).forEach((key) => {
      if (isImage(urls[key])) {
        promises.push(imageToPromise(urls[key], key));
      } else {
        promises.push(toPromise(urls[key], key));
      }
    });

    const loaded = await Promise.all(promises);
    Object.assign(assets, loaded.reduce((prev, curr) => Object.assign(prev, curr), {}));
  },
};

export default assets;
