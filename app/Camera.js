export class Camera {

    constructor(map, characters) {
        this.map = map;

        this.characters = characters;
        this.player = characters[0];

        this.setupCamera();
    }

    setupCamera() {
        this.camera = {
            canvas: document.getElementById('camera'),
            x: 0,
            y: 0,
            width: 1280,
            height: 800
        };

        this.camera.context = this.camera.canvas.getContext('2d');
        this.camera.canvas.width = this.camera.width;
        this.camera.canvas.height = this.camera.height;
    }

    update() {
        this.camera.x = this.player.x + this.player.width / 2 + this.player.offsetX - this.camera.width / 2;
        this.camera.y = this.player.y + this.player.height / 2 + this.player.offsetY - this.camera.height / 2;

        if (this.camera.x < 0) {
            this.camera.x = 0;
        }

        if (this.camera.x + this.camera.width > 3072) {
            this.camera.x = 3072 - this.camera.width;
        }

        if (this.camera.y + this.camera.height > 3072) {
            this.camera.y = 3072 - this.camera.height;
        }

        if (this.camera.y < 0) {
            this.camera.y = 0;
        }

        this.draw();
    }

    draw() {
        this.camera.context.drawImage(
            this.map.world.canvas,
            this.camera.x, this.camera.y,
            this.camera.width, this.camera.height,
            0, 0,
            this.camera.width, this.camera.height
        );
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