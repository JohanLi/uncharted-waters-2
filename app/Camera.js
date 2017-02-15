export class Camera {

    constructor(world) {
        this.worldCanvas = world.canvas;
        this.player = world.characters[0];

        this.canvas = document.getElementById('camera');
        this.x = 0;
        this.y = 0;
        this.width = 1280;
        this.height = 800;

        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    update() {
        this.x = this.player.x + this.player.width / 2 + this.player.offsetX - this.width / 2;
        this.y = this.player.y + this.player.height / 2 + this.player.offsetY - this.height / 2;

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x + this.width > 3072) {
            this.x = 3072 - this.width;
        }

        if (this.y + this.height > 3072) {
            this.y = 3072 - this.height;
        }

        if (this.y < 0) {
            this.y = 0;
        }
    }

    draw() {
        this.update();

        this.context.drawImage(
            this.worldCanvas,
            this.x, this.y,
            this.width, this.height,
            0, 0,
            this.width, this.height
        );
    }

}