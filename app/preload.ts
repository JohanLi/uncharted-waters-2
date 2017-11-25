import { IAssets } from "./types";

export default async (assets: IAssets): Promise<object> => {
  const image = (url: string, key: string): Promise<object> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ [key]: img });
      img.onerror = reject;
    });

  const asset = async (url: string, key: string): Promise<object> => {
    const response = await fetch(url);
    const data = await response.json();

    return { [key]: data };
  };

  const isImage = (url: string): boolean => url.substr(-4) === ".png";

  const loadPromises: Array<Promise<object>> = [];

  Object.keys(assets).forEach((key) => {
    if (isImage(assets[key])) {
      loadPromises.push(image(assets[key], key));
    } else {
      loadPromises.push(asset(assets[key], key));
    }
  });

  const loadedAssets = await Promise.all(loadPromises);
  return loadedAssets.reduce((prev, curr) => Object.assign(prev, curr), {});
  // Object.assign(...loadedAssets) causes a compiler error https://github.com/Microsoft/TypeScript/issues/4130
};
