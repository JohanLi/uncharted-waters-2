export class Npc {

    constructor(x, y, frame, immobile) {
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

        this.immobile = immobile;
    }

    animate() {
        if (Math.random() < 0.2)
            return;

        this.frameDifference = this.frameDifference === 1 ? -1 : 1;
        this.frame += this.frameDifference;
    }

    setDestination() {
        this.destination = {
            x: this.x,
            y: this.y
        };

        if (Math.random() < 0.2)
            return;

        this.randomizeDirection();

        if (this.currentDirection === 'up') {
            this.frame = this.frameUp;
            this.destination.y -= 32;
        } else if (this.currentDirection === 'right') {
            this.frame = this.frameRight;
            this.destination.x += 32;
        } else if (this.currentDirection === 'down') {
            this.frame = this.frameDown;
            this.destination.y += 32;
        } else if (this.currentDirection === 'left') {
            this.frame = this.frameLeft;
            this.destination.x -= 32;
        }

        this.frameDifference = this.frameDifference === 0 ? 1 : 0;
        this.frame += this.frameDifference;
    }

    move() {
        this.x = this.destination.x;
        this.y = this.destination.y;
    }

    randomizeDirection() {
        let randomSameDirection = Math.random();
        let randomDirection = Math.random();

        if (randomSameDirection < 0.75)
            return;

        if (randomDirection < 0.25) {
            this.currentDirection = 'up';
        } else if (randomDirection < 0.5) {
            this.currentDirection = 'right';
        } else if (randomDirection < 0.75) {
            this.currentDirection = 'down';
        } else {
            this.currentDirection = 'left'
        }
    }

}