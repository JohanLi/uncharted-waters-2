export default class Character {

  constructor(x, y, frame, isImmobile = false) {
    this.x = x;
    this.y = y;
    this.visualX = x;
    this.visualY = y;
    this.isMoving = false;

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

  randomMovementThrottle() {
    if (!this.skipMovement || this.skipped === this.skipMovement) {
      this.skipMovement = Math.floor(Math.random() * (6 - 2)) + 2;
      this.skipped = 0;
      return false;
    }

    this.skipped += 1;
    return true;
  }

  randomDirection() {
    const sameDirection = Math.random();
    const newDirection = Math.random();

    if (this.lastDirection && sameDirection < 0.75) {
      return this.lastDirection;
    }

    if (newDirection < 0.25) {
      return 'up';
    } else if (newDirection < 0.5) {
      return 'right';
    } else if (newDirection < 0.75) {
      return 'down';
    }

    return 'left';
  }

  move(direction) {
    this.isMoving = true;
    this.fromX = this.x;
    this.fromY = this.y;
    this.lastDirection = direction;

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
    this.isMoving = false;
    this.lastDirection = null;
  }

  interpolatePosition(percentNextMove) {
    if (this.isMoving) {
      this.visualX = this.fromX + Math.round(percentNextMove * (this.x - this.fromX));
      this.visualY = this.fromY + Math.round(percentNextMove * (this.y - this.fromY));
    }

    if (percentNextMove === 1) {
      this.isMoving = false;
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
