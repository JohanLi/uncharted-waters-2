class Preload {

    load(images) {
        let loadPromises = [];

        Object.keys(images).forEach((key) => {
            loadPromises.push(this.loadImage(images[key], key));
        });

        return Promise.all(loadPromises)
            .then((images) => {
                return Object.assign(...images);
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

export const preload = new Preload();