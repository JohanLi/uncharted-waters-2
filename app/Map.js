export class Map {

    constructor(assets) {
        this.assets = assets;
        this.tilesize = this.assets.tilemap.tilesize;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.assets.tilemap.columns * this.tilesize;
        this.canvas.height = this.assets.tilemap.rows * this.tilesize;

        this.setupCollision();
        this.setupBuildings();
        this.draw();
    }

    setupCollision() {
        this.collisionCoordinates = {};
        this.collisionIndices = {
            from: 31,
            to: 240,
            leftmost: [29, 30, 31, 32, 33],
            rightmost: [34, 35, 36, 37, 38, 39]
        };
    }

    setupBuildings() {
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
    }

    draw() {
        this.assets.tilemap.tiles.forEach((tile, i) => {
            let targetX = (i % this.assets.tilemap.columns) * this.tilesize;
            let targetY = Math.floor(i / this.assets.tilemap.columns) * this.tilesize;

            this.context.drawImage(
                this.assets.tileset,
                tile * this.tilesize, 0,
                this.tilesize, this.tilesize,
                targetX, targetY,
                this.tilesize, this.tilesize
            );

            this.updateCollision(tile, targetX, targetY);
            this.updateBuilding(tile, targetX, targetY);
        });
    }
    
    updateCollision(tile, x, y) {
        if (tile >= this.collisionIndices.from && tile <= this.collisionIndices.to) {
            if (!this.collisionCoordinates[x])
                this.collisionCoordinates[x] = {};

            this.collisionCoordinates[x][y] = tile;
        }
    }
    
    updateBuilding(tile, x, y) {
        Object.keys(this.buildingIndices).forEach((key) => {
            if (this.buildingIndices[key] === tile) {
                delete this.buildingIndices[key];

                this.buildings[key] = {
                    x: x - 64,
                    y: y + 32
                }
            }
        });
    }

    outOfBoundsAt(position) {
        return Boolean(
            position.x < 0 || position.x + 64 - this.tilesize >= this.canvas.width
            || position.y - 32 < 0 || position.y >= this.canvas.height
        );
    }

    tileCollisionAt(position) {
        const collision = ((this.collisionCoordinates || {})[position.x] || {})[position.y];
        const collisionRight = ((this.collisionCoordinates || {})[position.x + 64 - this.tilesize] || {})[position.y];

        if (this.collisionIndices.leftmost.includes(collision) || this.collisionIndices.rightmost.includes(collisionRight))
            return false;

        if (collision || collisionRight)
            return true;
    }

}