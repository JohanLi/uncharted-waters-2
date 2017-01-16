import {preload} from './Preload';
import {Player} from './Player';
import {Npcs} from './Npcs';
import {Map} from './Map';
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
                this.assets = assets;
                this.player = new Player();
                this.npcs = new Npcs();
                this.map = new Map(this.assets, this.player, this.npcs);

                if (!this.debug)
                    new Sound();

                window.requestAnimationFrame(this.loop.bind(this));
            });
    }

    update(timestamp) {
        this.checkMovement();
    }

    loop(timestamp) {
        this.update(timestamp);
        this.map.draw();

        if (this.debug)
            this.map.debug();

        window.requestAnimationFrame(this.loop.bind(this));
    }

    checkMovement() {
        if (this.throttleMovement())
            return;

        this.player.setDestination();

        if (this.map.noDestinationCollision()) {
            this.player.move();
            this.map.updateCamera();
        }

        if (!this.throttleNpcMovement()) {
            this.npcs.update();
        }
    }

    throttleMovement() {
        if (window.performance.now() - this.lastMoveTime < 50)
            return true;

        this.lastMoveTime = window.performance.now();
    }

    throttleNpcMovement() {
        if (window.performance.now() - this.npcLastMoveTime < 200)
            return true;

        this.npcLastMoveTime = window.performance.now();

    }

}

new Game();