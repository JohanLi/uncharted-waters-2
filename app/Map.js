import {Character} from './Character';

export class Map {

    constructor(assets) {
        this.assets = assets;

        this.collisionCoordinates = {};
        this.collisionIndices = {
            from: 31,
            to: 240,
            leftmost: [29, 30, 31, 32, 33],
            rightmost: [34, 35, 36, 37, 38, 39]
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
        this.setupCharacters();
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
                        x: targetX - 64,
                        y: targetY + 32
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

    setupCharacters() {
        this.characters = [
            new Character(this.buildings.harbor.x, this.buildings.harbor.y + 32, 4, true),
            new Character(this.buildings.market.x - 64, this.buildings.market.y + 32, 12),
            new Character(this.buildings.shipyard.x, this.buildings.shipyard.y, 12),
            new Character(this.buildings.bar.x - 64, this.buildings.bar.y + 32, 20),
            new Character(this.buildings.lodge.x - 64, this.buildings.lodge.y + 32, 20),
            new Character(this.buildings.market.x + 64, this.buildings.market.y + 32, 24, false, true),
            new Character(this.buildings.lodge.x + 64, this.buildings.lodge.y + 32, 26, false, true),
            new Character(this.buildings.bar.x + 64, this.buildings.bar.y + 32, 28, false, true)
        ];

        this.player = this.characters[0];
    }

    update(framePercentage) {
        this.interpolateCharacters(framePercentage);
        this.draw();

        if (framePercentage === 1)
            this.moveCharacters();
    }

    draw() {
        this.world.context.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.world.context.drawImage(this.map.canvas, 0, 0);

        for (let character of this.characters) {
            this.world.context.drawImage(
                this.assets.characters,
                character.frame * character.width,
                0,
                character.width,
                character.height,
                character.x + character.offsetX,
                character.y + character.offsetY,
                character.width,
                character.height
            );
        }
    }

    interpolateCharacters(framePercentage) {
        for (let character of this.characters) {
            character.interpolateDestination(framePercentage);

            if (framePercentage === 1)
                character.removeDestination();
        }
    }

    moveCharacters() {
        for (let character of this.characters) {
            if (character.isImmobile) {
                character.animate();
                continue;
            }

            if (!character.setDestination())
                continue;

            if (this.outOfBoundsAt(character.destination)
                || this.tileCollisionAt(character.destination)
                || this.characterCollisionWith(character)) {
                character.removeDestination();
            }
        }
    }

    outOfBoundsAt(destination) {
        return Boolean(
            destination.x < 0 || destination.x + 64 - this.assets.tilemap.tilesize >= this.world.canvas.width
            || destination.y - 32 < 0 || destination.y >= this.world.canvas.height
        );
    }

    tileCollisionAt(destination) {
        const collision = ((this.collisionCoordinates || {})[destination.x] || {})[destination.y];
        const collisionRight = ((this.collisionCoordinates || {})[destination.x + 64 - this.assets.tilemap.tilesize] || {})[destination.y];

        if (this.collisionIndices.leftmost.includes(collision) || this.collisionIndices.rightmost.includes(collisionRight)) {
            return false;
        }

        if (collision || collisionRight)
            return true;
    }

    characterCollisionWith(self) {
        return this.characters.some((character) => {
            if (character === self)
                return false;

            const xDifference = self.destination.x - character.x;
            const yDifference = self.destination.y - character.y;
            const xCollision = xDifference < character.width && xDifference > -character.width;
            const yCollision = yDifference < character.height && yDifference > -character.height;

            return xCollision && yCollision;
        });
    }

}