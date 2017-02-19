export class Character {

    constructor(x, y, frame, isImmobile = false) {
        this.x = x;
        this.y = y;
        this.visualX = x;
        this.visualY = y;

        this.frame = frame;
        this.isImmobile = isImmobile;

        this.width = 64;
        this.height = 64;
        this.offsetX = 0;
        this.offsetY = -32;

        if (!this.isImmobile) {
            this.frameUp = this.frame - 4;
            this.frameRight = this.frame - 2;
            this.frameDown = this.frame;
            this.frameLeft = this.frame + 2;
        }

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

    setDestination(direction) {
        if (!direction)
            return false;

        this.fromX = this.x;
        this.fromY = this.y;

        if (direction === 'up') {
            this.frame = this.frameUp;
            this.y -= this.tilesize;
        } else if (direction === 'right') {
            this.frame = this.frameRight;
            this.x += this.tilesize;
        } else if (direction === 'down') {
            this.frame = this.frameDown;
            this.y += this.tilesize;
        } else if (direction === 'left') {
            this.frame = this.frameLeft;
            this.x -= this.tilesize;
        }

        this.frameDifference = this.frameDifference === 0 ? 1 : 0;
        this.frame += this.frameDifference;
    }


    interpolateDestination(framePercentage) {
        if (this.fromX && this.fromY) {
            this.visualX = this.fromX + Math.round(framePercentage * (this.x - this.fromX));
            this.visualY = this.fromY + Math.round(framePercentage * (this.y - this.fromY));
        }
    }

    removeDestination() {
        if (this.fromX && this.fromY) {
            this.x = this.fromX;
            this.y = this.fromY;
            this.visualX = this.fromX;
            this.visualY = this.fromY;
            this.fromX = null;
            this.fromY = null;
        }
    }

}