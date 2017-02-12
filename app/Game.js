require('./sass/styles.scss');
import {preload} from './Preload';

import {Map} from './Map';
import {Camera} from './Camera';
import {Sound} from './Sound';

class Game {

    constructor() {
        this.debug = true;

        this.assets = {
            tilemap: '/tilemaps/lisbon.json',
            tileset: '/img/tileset1.2.png',
            characters: '/img/characters.png'
        };

        preload.load(this.assets)
            .then((assets) => {
                this.map = new Map(assets);
                this.camera = new Camera(this.map, this.map.characters);

                if (!this.debug)
                    this.sound = new Sound();

                window.requestAnimationFrame(() => this.loop());
            });
    }

    loop() {
        this.map.update(this.framePercentage());
        this.camera.update();

        window.requestAnimationFrame(() => this.loop());
    }

    framePercentage() {
        if (window.performance.now() - this.lastMoveTime < 70)
            return (window.performance.now() - this.lastMoveTime) / 70;
        else {
            this.lastMoveTime = window.performance.now();
            return 1;
        }
    }

}

new Game();