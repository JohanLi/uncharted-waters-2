class Port extends Phaser.State {

    preload() {
        this.load.spritesheet('joao', '/img/joao.png', 24, 32);
        this.load.spritesheet('npcs', '/img/npcs.png', 32, 32);
        this.load.tilemap('lisbon', '/tilemaps/lisbon.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1.2', '/img/tileset1.2.png');
        this.load.audio('port', ['/sound/port.mp3']);
    }

    create() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
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
        this.setLeftRightTileCollisions();

        this.layer.debug = true;
    }

    addNpc() {
        this.npc = this.add.group();
        this.npc.create(689, 960, 'npcs', 0);
        this.npc.create(609, 752, 'npcs', 2);
        this.npc.create(897, 560, 'npcs', 4);
        this.physics.enable(this.npc);

        this.npc.forEach((sprite) => {
            sprite.body.immovable = true;
            sprite.animations.add('flash', [sprite.frame, sprite.frame + 1]);
            sprite.animations.play('flash', 5, true);
        });
    }

    addPlayer() {
        this.player = this.add.sprite(868, 1088, 'joao', 0);
        this.camera.follow(this.player);

        this.physics.enable(this.player);
        this.physics.arcade.gravity.y = 0;
        this.player.body.collideWorldBounds = true;

        this.player.animations.add('left', [2,3], 10);
        this.player.animations.add('right', [4,5], 10);
        this.player.animations.add('up', [6,7], 10);
        this.player.animations.add('down', [0,1], 10);

        this.player.body.setSize(24, 16, 0, 16);

        this.speed = 500;
    }

    addMusic() {
        this.music = this.add.audio('port');
        this.music.loop = true;
        //this.music.play();
    }

    movePlayer() {
        this.physics.arcade.collide(this.player, this.layer);
        this.physics.arcade.collide(this.player, this.npc);
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.speed;
            this.player.play('up');
        } else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.speed;
            this.player.play('down');
        }
        else if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.speed;
            this.player.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.speed;
            this.player.play('right');
        } else {
            this.player.animations.stop();
        }
    }

    render() {
        this.game.debug.body(this.player);

        this.npc.forEach((sprite) => {
            this.game.debug.body(sprite);
        });
    }


    // a few collision tiles in the game behave in such a way that the collision don't occur
    // over their entire area. Instead, the collision only happens on either the leftmost or rightmost pixels.
    setLeftRightTileCollisions() {
        const leftCollisionIndices = [31, 34];
        const rightCollisionIndices = [39];

        for (let row of this.layer.map.layers[this.layer.index].data) {
            for (let rowTile of row) {
                if (leftCollisionIndices.includes(rowTile.index)) {
                    rowTile.width = 4;
                } else if (rightCollisionIndices.includes(rowTile.index)) {
                    rowTile.width = 4;
                    rowTile.worldX += 12;
                }
            }
        }
    }
}

export default Port;