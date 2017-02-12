import {Controls} from './Controls';

export class Character {

    constructor(x, y, frame, isPlayer = false, isImmobile = false) {
        this.x = x;
        this.y = y;
        this.frame = frame;

        this.isPlayer = isPlayer;
        this.isImmobile = isImmobile;

        this.width = 64;
        this.height = 64;
        this.offsetX = 0;
        this.offsetY = -32;

        if (this.isPlayer) {
            this.controls = new Controls();
        } else {
            this.controls = {};
        }

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

    randomizeDirection() {
        let randomSameDirection = Math.random();
        let randomDirection = Math.random();

        if (randomSameDirection < 0.75)
            return false;

        if (randomDirection < 0.25) {
            this.controls.direction = 'up';
        } else if (randomDirection < 0.5) {
            this.controls.direction = 'right';
        } else if (randomDirection < 0.75) {
            this.controls.direction = 'down';
        } else {
            this.controls.direction = 'left'
        }

        return true;
    }

    setDestination() {
        if (this.isPlayer) {
            if (!this.controls.direction)
                return false;
        } else {
            if ((!this.randomizeDirection()))
                return false;
        }

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

    interpolateDestination(framePercentage) {
        if (this.destination) {
            this.x = this.destination.fromX + Math.round(framePercentage * (this.destination.x - this.destination.fromX));
            this.y = this.destination.fromY + Math.round(framePercentage * (this.destination.y - this.destination.fromY));
        }
    }

    removeDestination() {
        this.destination = null;
    }

}