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

                this.player = this.characters.player;
                this.npcs = this.characters.npcs;

                if (!this.debug)
                    this.sound = new Sound();

                window.requestAnimationFrame(this.loop.bind(this));
            });
    }

    loop(timestamp) {
        let framePercentage = this.framePercentage();

        this.player.interpolateDestination(framePercentage);

        for (let npc of this.npcs) {
            npc.interpolateDestination(framePercentage);
        }

        if (framePercentage < 1) {
            this.camera.updateCamera();
            this.camera.draw();
        } else {
            this.characters.updatePlayer();
            this.characters.updateNpcs();
        }

        window.requestAnimationFrame(this.loop.bind(this));
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