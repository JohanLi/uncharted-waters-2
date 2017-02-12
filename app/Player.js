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
        if (!this.controls.direction)
            return;

        this.destination = {
            x: this.x,
            y: this.y,
            fromX: this.x,
            fromY: this.y
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

        this.frameDifference = this.frameDifference === 0 ? 1 : 0;
        this.frame += this.frameDifference;

        return true;
    }

    removeDestination() {
        this.destination = null;
    }

    interpolateDestination(framePercentage) {
        if (this.destination) {
            this.x = this.destination.fromX + Math.round(framePercentage * (this.destination.x - this.destination.fromX));
            this.y = this.destination.fromY + Math.round(framePercentage * (this.destination.y - this.destination.fromY));
        }

        if (framePercentage === 1) {
            this.removeDestination();
        }
    }

}