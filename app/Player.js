import {Controls} from './Controls';

export class Player {
    
    constructor(x, y, frame) {
        this.x = x;
        this.y = y;

        this.width = 32;
        this.height = 32;
        this.frame = frame;
        this.offsetX = 0;
        this.offsetY = -16;
        this.tilesize = 16;

        this.controls = new Controls();
    }

    setDestination() {
        this.destination = {
            x: this.x,
            y: this.y,
        };

        if (this.controls.direction === 'up') {
            this.destination.y -= this.tilesize;
            this.frame = this.frame === 0 ? 1 : 0;
        } else if (this.controls.direction === 'right') {
            this.destination.x += this.tilesize;
            this.frame = this.frame === 2 ? 3 : 2;
        } else if (this.controls.direction === 'down') {
            this.destination.y += this.tilesize;
            this.frame = this.frame === 4 ? 5 : 4;
        } else if (this.controls.direction === 'left') {
            this.destination.x -= this.tilesize;
            this.frame = this.frame === 6 ? 7 : 6;
        }
    }

    move() {
        this.x = this.destination.x;
        this.y = this.destination.y;
    }

    collisionAt(destination) {
        const xCollision = destination.x - this.x < this.width && destination.x - this.x > -this.width;
        const yCollision = destination.y - this.y < this.height && destination.y - this.y > -this.height;

        return xCollision && yCollision;
    }

}