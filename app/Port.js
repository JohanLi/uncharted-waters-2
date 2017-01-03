class Port extends Phaser.State {

    preload() {
        this.load.spritesheet('joao', '/img/joao.png', 24, 32);
        this.load.audio('port', ['/sound/port.mp3']);
        this.load.tilemap('lisbon', '/tilemaps/lisbon.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tileset1.2', '/img/tileset1.2.png');
    }

    create() {
        this.addMap();
        this.addPlayer();
        this.addMusic();
        this.addControls();
    }

    update() {
        if (this.upKey.isDown || this.downKey.isDown || this.leftKey.isDown || this.rightKey.isDown) {

            if (!this.lastMoveTime || this.time.now > this.lastMoveTime + 50) {
                this.movePlayer();
                this.lastMoveTime = this.time.now;
            }
        }
    }

    addMap() {
        this.map = this.add.tilemap('lisbon');
        this.map.addTilesetImage('Tileset1.2', 'tileset1.2');

        this.layer = this.map.createLayer('Lisbon');
        this.map.setCollisionBetween(29, 240);
        //this.layer.debug = true;
        this.layer.resizeWorld();
    }

    addPlayer() {
        // The player sprite is 24x32, but only occupies 24x16 with the lower half.
        // However, this is still larger than the individual tiles which are 16x16.

        this.player = this.add.sprite(868, 1104, 'joao', 0);
        this.player.anchor.setTo(0, 0.5); // only the lower half of the sprite occupies space
        this.camera.follow(this.player);

        this.player.animations.add('left', [2,3], 20);
        this.player.animations.add('right', [4,5], 20);
        this.player.animations.add('up', [6,7], 20);
        this.player.animations.add('down', [0,1], 20);
    }

    addMusic() {
        this.music = this.add.audio('port');
        this.music.loop = true;
        this.music.play();
    }

    addControls() {
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

    movePlayer() {
        this.checkCollision();
        
        let stepChange = 16;

        if (this.upKey.isDown && !this.collision.up) {
            this.player.y -= stepChange;
            this.player.play('up');
        } else if (this.downKey.isDown && !this.collision.down) {
            this.player.y += stepChange;
            this.player.play('down');
        }
        else if (this.leftKey.isDown && !this.collision.left) {
            this.player.x -= stepChange;
            this.player.play('left');
        }
        else if (this.rightKey.isDown && !this.collision.right) {
            this.player.x += stepChange;
            this.player.play('right');
        } else {
            this.player.animations.stop();
        }
    }

    checkCollision() {
        let i = this.layer.index;
        let playerGrid = {
            x: Math.floor(this.player.x / 16),
            y: Math.floor(this.player.y / 16)
        };

        this.collision = {
            up: !this.map.getTileAbove(i, playerGrid.x, playerGrid.y)
                || this.map.getTileAbove(i, playerGrid.x, playerGrid.y).collides
                || this.map.getTileAbove(i, playerGrid.x + 1, playerGrid.y).collides,
            down: !this.map.getTileBelow(i, playerGrid.x, playerGrid.y)
                || this.map.getTileBelow(i, playerGrid.x, playerGrid.y).collides
                || this.map.getTileBelow(i, playerGrid.x + 1, playerGrid.y).collides,
            left: !this.map.getTileLeft(i, playerGrid.x, playerGrid.y)
                || this.map.getTileLeft(i, playerGrid.x, playerGrid.y).collides,
            right: !this.map.getTileRight(i, playerGrid.x + 1, playerGrid.y)
                || this.map.getTileRight(i, playerGrid.x + 1, playerGrid.y).collides
        };
    }

}

export default Port;