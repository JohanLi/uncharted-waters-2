export class Camera {

    constructor(assets, map, characters) {
        this.assets = assets;
        this.map = map;

        this.player = characters.player;
        this.npcs = characters.npcs;

        this.setupCamera();
        this.updateCamera();
    }

    setupCamera() {
        this.camera = {
            canvas: document.getElementById('camera'),
            x: 0,
            y: 0,
            width: 640,
            height: 400,
            scaleX: 2,
            scaleY: 2
        };

        this.camera.context = this.camera.canvas.getContext('2d');
        this.camera.canvas.width = this.camera.width * this.camera.scaleX;
        this.camera.canvas.height = this.camera.height * this.camera.scaleY;

        this.camera.context.imageSmoothingEnabled = false;
        this.camera.context.msImageSmoothingEnabled = false;
        this.camera.context.scale(this.camera.scaleX, this.camera.scaleY);
    }

    updateCamera() {
        this.camera.x = this.player.x + this.player.width / 2 + this.player.offsetX - this.camera.width / 2;
        this.camera.y = this.player.y + this.player.height / 2 + this.player.offsetY - this.camera.height / 2;

        if (this.camera.x < 0) {
            this.camera.x = 0;
        }

        if (this.camera.x + this.camera.width > 1536) {
            this.camera.x = 1536 - this.camera.width;
        }

        if (this.camera.y + this.camera.height > 1536) {
            this.camera.y = 1536 - this.camera.height;
        }

        if (this.camera.y < 0) {
            this.camera.y = 0;
        }
    }

    draw() {
        this.map.world.context.clearRect(0, 0, this.map.world.canvas.width, this.map.world.canvas.height);
        this.map.world.context.drawImage(this.map.map.canvas, 0, 0);

        for (let npc of this.npcs) {
            this.map.world.context.drawImage(
                this.assets.npcs, npc.frame * 32, 0, 32, 32,
                npc.x + 0, npc.y - 16, 32, 32
            );
        }

        this.map.world.context.drawImage(
            this.assets.player,
            this.player.frame * this.player.width,
            0,
            this.player.width,
            this.player.height,
            this.player.x + this.player.offsetX,
            this.player.y + this.player.offsetY,
            this.player.width, this.player.height
        );

        this.camera.context.drawImage(this.map.world.canvas, this.camera.x, this.camera.y, this.camera.width, this.camera.height, 0, 0, this.camera.width, this.camera.height);
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
            (this.camera.width - this.centerSize) / 2,
            (this.camera.height - this.centerSize) / 2,
            this.centerSize,
            this.centerSize
        );
    }

}