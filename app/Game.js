require('./sass/styles.scss');
import {preload} from './Preload';

import {Characters} from './Characters';
import {Map} from './Map';
import {Camera} from './Camera';
import {Sound} from './Sound';

class Game {

    constructor() {
        this.debug = true;

        this.assets = {
            tilemap: '/tilemaps/lisbon.json',
            tileset: '/img/tileset1.2.png',
            player: '/img/joao.png',
            npcs: '/img/npcs.png'
        };

        preload.load(this.assets)
            .then((assets) => {
                this.map = new Map(assets);
                this.characters = new Characters(this.map);
                this.camera = new Camera(assets, this.map, this.characters);

                if (!this.debug)
                    this.sound = new Sound();

                window.requestAnimationFrame(this.loop.bind(this));
            });
    }

    update(timestamp) {

        if (!this.characters.throttleMovement(50)) {
            this.characters.updatePlayer();
            this.camera.updateCamera();
        }

        if (!this.characters.throttleMovement(250)) {
            this.characters.updateNpcs();
        }

    }

    loop(timestamp) {
        this.update(timestamp);
        this.camera.draw();

        if (this.debug)
            this.camera.debug();

        window.requestAnimationFrame(this.loop.bind(this));
    }

}

new Game();