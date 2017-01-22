export class Map {

    constructor(assets) {
        this.assets = assets;

        this.collisionCoordinates = {};
        this.collisionIndices = {
            from: 31,
            to: 240,
            leftmost: [30, 31, 33],
            rightmost: [36, 38, 39]
        };

        this.buildings = {};
        this.buildingIndices = {
            market: 80,
            bar: 81,
            shipyard: 83,
            harbor: 100,
            lodge: 215,
            guild: 224,
            special: 233,
            bank: 234,
            itemShop: 235,
            church: 236,
            fortune: 237
        };

        this.setupMap();
        this.setupWorld();
    }

    setupMap() {
        this.map = {
            canvas: document.createElement('canvas')
        };

        this.map.context = this.map.canvas.getContext('2d');
        this.map.canvas.width = this.assets.tilemap.columns * this.assets.tilemap.tilesize;
        this.map.canvas.height = this.assets.tilemap.rows * this.assets.tilemap.tilesize;

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

            Object.keys(this.buildingIndices).forEach((key) => {
                if (this.buildingIndices[key] === tile) {
                    delete this.buildingIndices[key];

                    this.buildings[key] = {
                        x: targetX - 32,
                        y: targetY + 16
                    }
                }
            });
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

    outOfBoundsAt(destination) {
        return Boolean(
            destination.x < 0 || destination.x + 32 - this.assets.tilemap.tilesize >= this.map.canvas.width
            || destination.y < 0 || destination.y >= this.map.canvas.height
        );
    }

    // http://stackoverflow.com/a/4034468
    collisionAt(destination) {
        const collision = ((this.collisionCoordinates || {})[destination.x] || {})[destination.y];
        const collisionRight = ((this.collisionCoordinates || {})[destination.x + 32 - this.assets.tilemap.tilesize] || {})[destination.y];

        if (this.collisionIndices.leftmost.includes(collision) || this.collisionIndices.rightmost.includes(collisionRight)) {
            return false;
        }

        if (collision || collisionRight)
            return true;
    }

}