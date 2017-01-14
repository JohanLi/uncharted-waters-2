import {preload} from './Preload';
import {Player} from './Player';
import {Npcs} from './Npcs';
import {Map} from './Map';

class Game {

    constructor() {
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

                window.requestAnimationFrame(this.loop.bind(this));
            });
    }

    update(timestamp) {
        this.checkMovement();
    }

    loop(timestamp) {
        this.update(timestamp);
        this.map.draw();
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

        this.npcs.animate();
    }

    throttleMovement() {
        if (window.performance.now() - this.lastMoveTime < 50)
            return true;

        this.lastMoveTime = window.performance.now();
    }

}

new Game();