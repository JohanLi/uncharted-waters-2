require('./sass/styles.scss');
import {preload} from './Preload';

import {Map} from './Map';
import {Characters} from './Characters';
import {World} from './World';
import {Camera} from './Camera';
import {Sound} from './Sound';

class Game {

    constructor() {
        this.assets = {
            tilemap: '/tilemaps/lisbon.json',
            tileset: '/img/tileset1.2.png',
            characters: '/img/characters.png'
        };

        preload.load(this.assets)
            .then((assets) => {
                this.map = new Map(assets);
                this.characters = new Characters(this.map);
                this.world = new World(this.map, this.characters);
                this.camera = new Camera(this.world);
                //this.sound = new Sound();

                window.requestAnimationFrame(() => this.loop());
            });
    }

    loop() {
        let framePercentage = this.framePercentage();

        this.characters.interpolateMovement(framePercentage);
        this.world.draw();
        this.camera.draw();

        if (framePercentage === 1)
            this.characters.move();

        window.requestAnimationFrame(() => this.loop());
    }

    framePercentage() {
        if (window.performance.now() - this.lastMoveTime < 67)
            return (window.performance.now() - this.lastMoveTime) / 67;
        else {
            this.lastMoveTime = window.performance.now();
            return 1;
        }
    }

}

new Game();