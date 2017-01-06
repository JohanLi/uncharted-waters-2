class Port extends Phaser.State {

    preload() {
        this.debug = false;

        this.load.spritesheet('joao', '/img/joao.png', 32, 32);
        this.load.spritesheet('npcs', '/img/npcs.png', 32, 32);
        this.load.tilemap('lisbon', '/tilemaps/lisbon.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1.2', '/img/tileset1.2.png');
        this.load.image('hud', '/img/hud.png');

        this.load.audio('port', ['/sound/port.mp3']);

        this.tileSize = 16;
        this.collisionIndices = {
            from: 29,
            to: 240,
            leftmost: [31, 34],
            rightmost: [39, 40]
        };

        this.hudWidths = {
            top: 16,
            bottom: 16,
            left: 192,
            right: 320
        };

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.addMap();
        this.addNpc();
        this.addHud();
        this.addPlayer();

        this.addMusic();
    }

    update() {
        this.checkMovement();
    }

    render() {
        if (this.debug) {
            this.game.debug.spriteInfo(this.player, 32, 32, '#ffffff');
            this.game.debug.spriteBounds(this.player, '#ce0020', false);

            this.npc.forEach((sprite) => {
                this.game.debug.spriteBounds(sprite, '#ce7524', false);
            });
        }
    }

    /*
     This is a workaround for placing a fixed HUD on the map.
     It's currently not possible/easy to have a centered TilemapLayer that is smaller than the game world.
     The workaround expands the game world, where the expanded parts are covered by the HUD.
     The camera is also repositioned in order to center the player.
     */
    addHud() {
        let hud = this.game.add.image(0, 0, 'hud');
        hud.fixedToCamera = true;
        let portDimensions = 1536;

        this.world.setBounds(
            -this.hudWidths.left,
            -this.hudWidths.top,
            portDimensions + this.hudWidths.left + this.hudWidths.right,
            portDimensions + this.hudWidths.top + this.hudWidths.bottom
        );
    }

    addMap() {
        this.map = this.add.tilemap('lisbon');
        this.map.addTilesetImage('Tileset1.2', 'tileset1.2');

        this.layer = this.map.createLayer('Lisbon');
        this.map.setLayer(this.layer);

        this.map.setCollisionBetween(this.collisionIndices.from, this.collisionIndices.to);

        if (this.debug)
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
        this.cameraFocusPlayer();
    }

    addMusic() {
        this.music = this.add.audio('port');
        this.music.loop = true;
        // this.music.play();
    }

    checkMovement() {
        if (this.throttleMovement())
            return;

        this.setDestination();

        if (this.noDestinationCollision()) {
            this.movePlayer();
        }
    }

    throttleMovement() {
        if (this.time.now - this.lastMoveTime < 40)
            return true;

        this.lastMoveTime = this.time.now;
    }

    setDestination() {
        this.destination = {
            x: this.player.x,
            y: this.player.y,
        };

        if (this.cursors.up.isDown) {
            this.destination.y -= this.tileSize;
            this.player.frame = this.player.frame === 6 ? 7 : 6;
        } else if (this.cursors.down.isDown) {
            this.destination.y += this.tileSize;
            this.player.frame = this.player.frame === 0 ? 1 : 0;
        }
        else if (this.cursors.left.isDown) {
            this.destination.x -= this.tileSize;
            this.player.frame = this.player.frame === 2 ? 3 : 2;
        }
        else if (this.cursors.right.isDown) {
            this.destination.x += this.tileSize;
            this.player.frame = this.player.frame === 4 ? 5 : 4;
        }

        this.destination.tile = this.map.getTile(
            this.destination.x / this.tileSize,
            this.destination.y / this.tileSize
        );

        this.destination.tileRight = this.map.getTile(
            this.destination.x / this.tileSize + 1,
            this.destination.y / this.tileSize
        );
    }

    noDestinationCollision() {
        let noCollision = true;

        if (this.npcCollision()) {
            return false;
        }

        if (!this.destination.tile || !this.destination.tileRight)
            return false;

        if (this.destination.tile.collides || this.destination.tileRight.collides)
            noCollision = false;

        if (this.collisionIndices.leftmost.includes(this.destination.tile.index)) {
            noCollision = true;
        }

        if (this.collisionIndices.rightmost.includes(this.destination.tileRight.index)) {
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

    movePlayer() {
        this.player.x = this.destination.x;
        this.player.y = this.destination.y;

        this.cameraFocusPlayer();
    }

    cameraFocusPlayer() {
        let xAdjustment = this.hudWidths.left / 2 - this.player.height / 2;
        this.camera.focusOnXY(this.player.x + xAdjustment, this.player.y);
    }
}

export default Port;