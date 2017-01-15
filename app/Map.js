export class Map {

    constructor(assets, player, npcs) {
        this.assets = assets;
        this.player = player;
        this.npcs = npcs;

        this.setupMap();
        this.setupWorld();
        this.setupCamera();
    }

    setupMap() {
        this.map = {
            canvas: document.createElement('canvas')
        };

        this.map.context = this.map.canvas.getContext('2d');
        this.map.canvas.width = this.assets.tilemap.columns * this.assets.tilemap.tilesize;
        this.map.canvas.height = this.assets.tilemap.rows * this.assets.tilemap.tilesize;

        this.collisionCoordinates = {};
        this.collisionIndices = {
            from: 29,
            to: 240,
            leftmost: [30, 33],
            rightmost: [38, 39]
        };

        this.assets.tilemap.tiles.forEach((tile, i) => {
            let sourceX = tile * this.assets.tilemap.tilesize;
            let targetX = (i % this.assets.tilemap.columns) * this.assets.tilemap.tilesize;
            let targetY = Math.floor(i / this.assets.tilemap.columns) * this.assets.tilemap.tilesize;

            this.map.context.drawImage(
                this.assets.tileset, sourceX, 0, this.assets.tilemap.tilesize, this.assets.tilemap.tilesize,
                targetX, targetY, this.assets.tilemap.tilesize, this.assets.tilemap.tilesize
            );

            if (tile >= this.collisionIndices.from && tile <= this.collisionIndices.to) {
                if (!this.collisionCoordinates[targetX])
                    this.collisionCoordinates[targetX] = {};

                this.collisionCoordinates[targetX][targetY] = tile;
            }
        });
    }

    setupWorld() {
        this.world = {
            canvas: document.createElement('canvas')
        };

        this.world.context = this.world.canvas.getContext('2d');
        this.world.canvas.width = this.map.canvas.width;
        this.world.canvas.height = this.map.canvas.height;
    }

    setupCamera() {
        this.camera = {
            x: 0,
            y: 0,
            canvas: document.getElementById('camera'),
        };

        this.camera.context = this.camera.canvas.getContext('2d');
        this.camera.canvas.width = 1280;
        this.camera.canvas.height = 800;
    }

    updateCamera() {
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

    noDestinationCollision() {
        let outOfBounds = Boolean(
            this.player.destination.x < 0 || this.player.destination.x + this.player.width - this.assets.tilemap.tilesize >= this.map.canvas.width
            || this.player.destination.y < 0 || this.player.destination.y >= this.map.canvas.height
        );

        if (outOfBounds)
            return false;

        if (this.npcCollision()) {
            return false;
        }

        let noCollision = true;
        let collision = this.collisionCoordinates[this.player.destination.x][this.player.destination.y];
        let collisionRight = this.collisionCoordinates[this.player.destination.x + this.player.width - this.assets.tilemap.tilesize][this.player.destination.y];

        if (collision || collisionRight)
            noCollision = false;

        if (this.collisionIndices.leftmost.includes(collision) || this.collisionIndices.rightmost.includes(collisionRight)) {
            noCollision = true;
        }

        return noCollision;
    }

    npcCollision() {
        return this.npcs.npcs.some((npc) => {
            let xCollision = this.player.destination.x - npc.x < this.npcs.width && this.player.destination.x - npc.x > -this.npcs.width;
            let yCollision = this.player.destination.y - npc.y < this.npcs.height && this.player.destination.y - npc.y > -this.npcs.height;
            return xCollision && yCollision;
        });
    }

    draw() {
        this.world.context.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.world.context.drawImage(this.map.canvas, 0, 0);

        for (let npc of this.npcs.npcs) {
            this.world.context.drawImage(
                this.assets.npcs, npc.frame * 32, 0, 32, 32,
                npc.x + 0, npc.y - 16, 32, 32
            );
        }

        this.world.context.drawImage(
            this.assets.player,
            this.player.frame * this.player.width,
            0,
            this.player.width,
            this.player.height,
            this.player.x + this.player.offsetX,
            this.player.y + this.player.offsetY,
            this.player.width, this.player.height
        );

        this.camera.context.drawImage(this.world.canvas, this.camera.x, this.camera.y, 1280, 800, 0, 0, 1280, 800);
    }

    debug() {
        if (!this.debugElement) {
            this.debugElement = document.createElement('div');
            this.debugElement.id = 'debug';
            document.getElementById('app').appendChild(this.debugElement);
        }

        this.debugElement.innerHTML = `Camera ${this.camera.x}, ${this.camera.y}<br>Player ${this.player.x}, ${this.player.y}`;

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