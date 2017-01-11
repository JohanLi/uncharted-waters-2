import {tilemap} from './tilemaps/lisbon';
import {Preload} from './Preload';

class Game extends Preload {

    constructor(window) {
        super();

        this.debugCamera = document.querySelector('.camera');
        this.debugPlayer = document.querySelector('.player');

        let assets = {
            tileset: '/img/tileset1.2.png',
            player: '/img/joao.png'
        };

        this.load(assets)
            .then((assets) => {

                let map = document.getElementById('map');
                map.width = 1536;
                map.height = 1536;

                let mapContext = map.getContext('2d');
                let tileSize = map.width / tilemap.columns;

                tilemap.tiles.forEach((tile, i) => {
                    let sourceX = (tile - 1) * tileSize;
                    let targetX = (i % tilemap.columns) * tileSize;
                    let targetY = Math.floor(i / tilemap.columns) * tileSize;

                    mapContext.drawImage(assets.tileset, sourceX, 0, tileSize, tileSize, targetX, targetY, tileSize, tileSize);
                });

                this.world = {
                    canvas: document.getElementById('world')
                };

                this.world.context = this.world.canvas.getContext('2d');
                this.world.canvas.height = 1536;
                this.world.canvas.width = 1536;

                this.camera = {
                    x: 0,
                    y: 0,
                    canvas: document.getElementById('camera'),
                };

                this.camera.context = this.camera.canvas.getContext('2d');
                this.camera.canvas.width = 1280;
                this.camera.canvas.height = 800;

                this.lastRender = 0;
                this.keyMap = {
                    38: 'up',
                    40: 'down',
                    37: 'left',
                    39: 'right'
                };

                this.player = {
                    x: 864,
                    y: 1104,
                    pressedKeys: {
                        left: false,
                        right: false,
                        up: false,
                        down: false
                    },
                    sprite: assets.player
                };

                document.addEventListener('keydown', this.keydown.bind(this));
                document.addEventListener('keyup', this.keyup.bind(this));
                window.requestAnimationFrame(this.loop.bind(this));
             });
    }

    update(progress) {
        this.moveSpeed = 6;

        if (this.player.pressedKeys.up) {
            this.player.y -= this.moveSpeed;
        }
        if (this.player.pressedKeys.down) {
            this.player.y += this.moveSpeed;
        }
        if (this.player.pressedKeys.left) {
            this.player.x -= this.moveSpeed;
        }
        if (this.player.pressedKeys.right) {
            this.player.x += this.moveSpeed;
        }

        this.camera.x = this.player.x - 1280 / 2;
        this.camera.y = this.player.y - 800 / 2;

        if (this.camera.x < 0) {
            this.camera.x = 0;
        }

        if (this.camera.x + 1280 > 1536) {
            this.camera.x = 1536 - 1280;
        }

        if (this.camera.y + 800 > 1536) {
            this.camera.y = 1536 - 800;
        }

        if (this.camera.y < 0) {
            this.camera.y = 0;
        }

        this.debug();
    }

    draw() {
        this.world.context.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.world.context.drawImage(map, 0, 0);
        this.world.context.drawImage(this.player.sprite, 0, 0, 32, 32, this.player.x, this.player.y - 16, 32, 32);

        this.camera.context.drawImage(this.world.canvas, this.camera.x, this.camera.y, 1280, 800, 0, 0, 1280, 800);
    }

    loop(timestamp) {
        let progress = timestamp - this.lastRender;

        this.update(progress);
        this.draw();

        this.lastRender = timestamp;
        window.requestAnimationFrame(this.loop.bind(this));
    }

    keydown(e) {
        let key = this.keyMap[e.keyCode];
        this.player.pressedKeys[key] = true;

        e.preventDefault();
    }

    keyup(e) {
        let key = this.keyMap[e.keyCode];
        this.player.pressedKeys[key] = false;
    }

    debug() {
        this.debugCamera.textContent = this.camera.x + ', ' + this.camera.y;
        this.debugPlayer.textContent = this.player.x + ', ' + this.player.y;
    }

}

new Game(window);

