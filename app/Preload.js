class Preload {

    load(assets) {
        let loadPromises = [];

        Object.keys(assets).forEach((key) => {
            if (key === 'tilemap') {
                loadPromises.push(this.loadTilemap(assets[key], key));
            } else {
                loadPromises.push(this.loadImage(assets[key], key));
            }
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

    loadTilemap(url, key) {
        return fetch(url, {method: 'get'})
            .then((response) => {
                return response.json();
            })
            .then((tilemap) => {
                return {
                    [key]: tilemap
                };
            });
    }

}

export const preload = new Preload();