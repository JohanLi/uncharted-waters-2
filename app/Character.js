export class Character {

    constructor(x, y, frame, isImmobile = false) {
        this.x = x;
        this.y = y;
        this.visualX = x;
        this.visualY = y;

        this.frame = frame;
        this.startFrame = frame;
        this.isImmobile = isImmobile;

        this.width = 64;
        this.height = 64;
        this.offsetX = 0;
        this.offsetY = -32;

        this.tilesize = 32;
    }

    animate() {
        this.frameDifference = this.frameDifference === 1 ? -1 : 1;
        this.frame += this.frameDifference;
    }

    randomDirection() {
        let randomSameDirection = Math.random();
        let randomDirection = Math.random();

        if (randomSameDirection < 0.75)
            return false;

        if (randomDirection < 0.25) {
            this.direction = 'up';
        } else if (randomDirection < 0.5) {
            this.direction = 'right';
        } else if (randomDirection < 0.75) {
            this.direction = 'down';
        } else {
            this.direction = 'left'
        }

        return this.direction;
    }

    move(direction) {
        this.fromX = this.x;
        this.fromY = this.y;

        if (direction === 'up') {
            this.y -= this.tilesize;
        } else if (direction === 'right') {
            this.x += this.tilesize;
        } else if (direction === 'down') {
            this.y += this.tilesize;
        } else if (direction === 'left') {
            this.x -= this.tilesize;
        }
    }

    undoMove() {
        this.x = this.fromX;
        this.y = this.fromY;
        this.fromX = null;
        this.fromY = null;
    }

    interpolatePosition(percentNextMove) {
        if (this.fromX && this.fromY) {
            this.visualX = this.fromX + Math.round(percentNextMove * (this.x - this.fromX));
            this.visualY = this.fromY + Math.round(percentNextMove * (this.y - this.fromY));
        }

        if (percentNextMove === 1) {
            this.fromX = null;
            this.fromY = null;
        }
    }

    setFrame(direction) {
        if (direction === 'up') {
            this.frame = this.startFrame - 4;
        } else if (direction === 'right') {
            this.frame = this.startFrame - 2;
        } else if (direction === 'down') {
            this.frame = this.startFrame;
        } else if (direction === 'left') {
            this.frame = this.startFrame + 2;
        }

        this.frameDifference = this.frameDifference === 0 ? 1 : 0;
        this.frame += this.frameDifference;
    }

}