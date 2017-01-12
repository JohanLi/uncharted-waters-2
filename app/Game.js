import {tilemap} from './tilemaps/lisbon';
import {Preload} from './Preload';

class Game extends Preload {

    constructor(window) {
        super();

        let assets = {
            tileset: '/img/tileset1.2.png',
            player: '/img/joao.png'
        };

        this.load(assets)
            .then((assets) => {

                this.map = {
                    canvas: document.createElement('canvas')
                };

                this.map.context = this.map.canvas.getContext('2d');
                this.map.canvas.width = tilemap.columns * tilemap.tilesize;
                this.map.canvas.height = tilemap.rows * tilemap.tilesize;

                tilemap.tiles.forEach((tile, i) => {
                    let sourceX = (tile - 1) * tilemap.tilesize;
                    let targetX = (i % tilemap.columns) * tilemap.tilesize;
                    let targetY = Math.floor(i / tilemap.columns) * tilemap.tilesize;

                    this.map.context.drawImage(
                        assets.tileset, sourceX, 0, tilemap.tilesize, tilemap.tilesize,
                        targetX, targetY, tilemap.tilesize, tilemap.tilesize
                    );
                });

                this.world = {
                    canvas: document.createElement('canvas')
                };

                this.world.context = this.world.canvas.getContext('2d');
                this.world.canvas.width = this.map.canvas.width;
                this.world.canvas.height = this.map.canvas.height;

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
                    move: {
                        left: false,
                        right: false,
                        up: false,
                        down: false
                    },
                    sprite: assets.player,
                    width: 32,
                    height: 32,
                    frame: 0,
                    offsetX: 0,
                    offsetY: -16
                };

                document.addEventListener('keydown', this.keydown.bind(this));
                document.addEventListener('keyup', this.keyup.bind(this));
                window.requestAnimationFrame(this.loop.bind(this));
             });
    }

    update(progress) {
        this.moveSpeed = 6;

        if (this.player.move.up) {
            this.player.y -= this.moveSpeed;
            this.player.frame = this.player.frame === 6 ? 7 : 6;
        } else if (this.player.move.down) {
            this.player.y += this.moveSpeed;
            this.player.frame = this.player.frame === 0 ? 1 : 0;
        } else if (this.player.move.left) {
            this.player.x -= this.moveSpeed;
            this.player.frame = this.player.frame === 2 ? 3 : 2;
        } else if (this.player.move.right) {
            this.player.x += this.moveSpeed;
            this.player.frame = this.player.frame === 4 ? 5 : 4;
        }

        this.camera.x = this.player.x + this.player.width / 2 + this.player.offsetX - 1280 / 2;
        this.camera.y = this.player.y + this.player.height / 2 + this.player.offsetY - 800 / 2;

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
    }

    draw() {
        this.world.context.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.world.context.drawImage(this.map.canvas, 0, 0);
        this.world.context.drawImage(
            this.player.sprite,
            this.player.frame * this.player.width,
            0,
            this.player.width,
            this.player.height,
            this.player.x + this.player.offsetX,
            this.player.y + this.player.offsetY,
            this.player.width, this.player.height
        );

        this.camera.context.drawImage(this.world.canvas, this.camera.x, this.camera.y, 1280, 800, 0, 0, 1280, 800);

        this.debug();
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

        if (key) {
            this.player.move[key] = true;
            e.preventDefault();
        }
    }

    keyup(e) {
        let key = this.keyMap[e.keyCode];

        if (key) {
            this.player.move[key] = false;
            e.preventDefault();
        }
    }

    debug() {
        if (!this.debugCamera)
            this.debugCamera = document.querySelector('.camera');

        if (!this.debugPlayer)
            this.debugPlayer = document.querySelector('.player');

        this.debugCamera.textContent = this.camera.x + ', ' + this.camera.y;
        this.debugPlayer.textContent = this.player.x + ', ' + this.player.y;

        this.centerSize = 10;
        this.camera.context.fillStyle = '#ff0000';
        this.camera.context.fillRect(
            (this.camera.canvas.width - this.centerSize) / 2,
            (this.camera.canvas.height - this.centerSize) / 2,
            this.centerSize,
            this.centerSize
        );
    }

}

new Game(window);

