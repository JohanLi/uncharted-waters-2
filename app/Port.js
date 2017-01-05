class Port extends Phaser.State {

    preload() {
        this.load.spritesheet('joao', '/img/joao.png', 32, 32);
        this.load.spritesheet('npcs', '/img/npcs.png', 32, 32);
        this.load.tilemap('lisbon', '/tilemaps/lisbon.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1.2', '/img/tileset1.2.png');
        this.load.audio('port', ['/sound/port.mp3']);
        this.lastMoveTime = 0;
    }

    create() {
        this.addMap();
        this.addNpc();
        this.addPlayer();
        this.addMusic();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.movePlayer();
    }

    addMap() {
        this.map = this.add.tilemap('lisbon');
        this.map.addTilesetImage('Tileset1.2', 'tileset1.2');

        this.layer = this.map.createLayer('Lisbon');
        this.layer.resizeWorld();

        this.map.setLayer(this.layer);

        this.map.setCollisionBetween(29, 240);

        this.layer.debug = true;
    }

    addNpc() {
        this.npc = this.add.group();
        this.npc.create(688, 976, 'npcs', 0);
        this.npc.create(608, 768, 'npcs', 2);
        this.npc.create(896, 576, 'npcs', 4);

        this.npc.forEach((sprite) => {
            sprite.anchor.setTo(0, 0.5);
            sprite.animations.add('flash', [sprite.frame, sprite.frame + 1]);
            sprite.animations.play('flash', 5, true);
        });
    }

    addPlayer() {
        this.player = this.add.sprite(864, 1104, 'joao', 0);
        this.player.anchor.setTo(0, 0.5);
        this.camera.follow(this.player);
    }

    addMusic() {
        this.music = this.add.audio('port');
        this.music.loop = true;
        //this.music.play();
    }

    movePlayer() {
        if (this.throttleMovement())
            return;

        this.setDestination();

        if (this.noDestinationCollision()) {
            this.updatePlayerLocation();
        }
    }

    throttleMovement() {
        if (this.time.now - this.lastMoveTime < 40)
            return true;

        this.lastMoveTime = this.time.now;
    }

    setDestination() {
        let tileSize = 16;

        this.destination = {
            x: this.player.x,
            y: this.player.y,
        };

        if (this.cursors.up.isDown) {
            this.destination.y -= tileSize;
            this.player.frame = this.player.frame === 6 ? 7 : 6;
        } else if (this.cursors.down.isDown) {
            this.destination.y += tileSize;
            this.player.frame = this.player.frame === 0 ? 1 : 0;
        }
        else if (this.cursors.left.isDown) {
            this.destination.x -= tileSize;
            this.player.frame = this.player.frame === 2 ? 3 : 2;
        }
        else if (this.cursors.right.isDown) {
            this.destination.x += tileSize;
            this.player.frame = this.player.frame === 4 ? 5 : 4;
        }

        this.destination.tileX = this.destination.x / tileSize;
        this.destination.tileY = this.destination.y / tileSize;
    }

    noDestinationCollision() {
        let noCollision = true;
        let destinationTile = this.map.getTile(this.destination.tileX, this.destination.tileY);
        let destinationTileRight = this.map.getTile(this.destination.tileX + 1, this.destination.tileY);
        let leftmostCollisionIndices = [31, 34];
        let rightmostCollisionIndices = [39, 40];

        if (this.npcCollision()) {
            return false;
        }

        if (!destinationTile || !destinationTileRight)
            return false;

        if (destinationTile.collides || destinationTileRight.collides)
            noCollision = false;

        if (leftmostCollisionIndices.includes(destinationTile.index)) {
            noCollision = true;
        }

        if (rightmostCollisionIndices.includes(destinationTileRight.index)) {
            noCollision = true;
        }

        return noCollision;
    }

    npcCollision() {
        // using Phaser.Group.forEach doesn't allow us to break upon detecting a collision
        // Array.prototype.some() and Array.prototype.every() do
        return this.npc.children.some((sprite) => {
            let xCollision = this.destination.x - sprite.x < sprite.width && this.destination.x - sprite.x > -sprite.width;
            let yCollision = this.destination.y - sprite.y < sprite.height && this.destination.y - sprite.y > -sprite.height;
            return xCollision && yCollision;
        });
    }

    updatePlayerLocation() {
        this.player.x = this.destination.x;
        this.player.y = this.destination.y;
    }

    render() {
        this.game.debug.spriteInfo(this.player, 32, 32, '#ffffff');
        this.game.debug.spriteBounds(this.player, '#ce0020', false);

        this.npc.forEach((sprite) => {
            this.game.debug.spriteBounds(sprite, '#ce7524', false);
        });
    }
}

export default Port;