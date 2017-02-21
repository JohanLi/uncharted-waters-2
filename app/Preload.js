export default class Preload {

  static load(assets) {
    const loadPromises = [];

    Object.keys(assets).forEach((key) => {
      if (key === 'tilemap') {
        loadPromises.push(Preload.loadTilemap(assets[key], key));
      } else {
        loadPromises.push(Preload.loadImage(assets[key], key));
      }
    });

    return Promise.all(loadPromises)
      .then(images => Object.assign(...images));
  }

  static loadTilemap(url, key) {
    return fetch(url, { method: 'get' })
      .then(response => response.json())
      .then(tilemap => ({
        [key]: tilemap
      }));
  }

  static loadImage(url, key) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve({
          [key]: img
        });
      };
    });
  }

}
