export class Preload {

    load(assets) {
        let loadPromises = [];

        Object.keys(assets).forEach((key) => {
            loadPromises.push(this.loadImage(assets[key], key));
        });

        return Promise.all(loadPromises)
            .then((assets) => {
                return Object.assign(...assets);
            });
    }

    loadImage(url, key) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                resolve({
                    [key]: img
                });
            }
        });
    }

}