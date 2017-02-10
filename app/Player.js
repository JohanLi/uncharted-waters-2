import {Controls} from './Controls';

export class Player {
    
    constructor(x, y, frame) {
        this.x = x;
        this.y = y;

        this.width = 64;
        this.height = 64;
        this.offsetX = 0;
        this.offsetY = -32;

        this.frame = frame;
        this.frameUp = frame - 4;
        this.frameRight = frame - 2;
        this.frameDown = frame;
        this.frameLeft = frame + 2;

        this.tilesize = 32;

        this.controls = new Controls();
    }

    setDestination() {
        this.destination = {
            x: this.x,
            y: this.y,
        };

        if (this.controls.direction === 'up') {
            this.frame = this.frameUp;
            this.destination.y -= this.tilesize;
        } else if (this.controls.direction === 'right') {
            this.frame = this.frameRight;
            this.destination.x += this.tilesize;
        } else if (this.controls.direction === 'down') {
            this.frame = this.frameDown;
            this.destination.y += this.tilesize;
        } else if (this.controls.direction === 'left') {
            this.frame = this.frameLeft;
            this.destination.x -= this.tilesize;
        }

        if (this.controls.direction) {
            this.frameDifference = this.frameDifference === 0 ? 1 : 0;
            this.frame += this.frameDifference;
        }
    }

    move() {
        this.x = this.destination.x;
        this.y = this.destination.y;
    }

}