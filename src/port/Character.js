export default class Character {
  constructor(x, y, frame, isImmobile = false) {
    this.width = 64;
    this.height = 64;
    this.offsetX = 0;
    this.offsetY = -32;
    this.isImmobile;
    this.tilesize = 32;

    this.x = x;
    this.y = y;
    this.visualX = x;
    this.visualY = y;
    this.isMoving = false;

    this.frame = frame;
    this.startFrame = frame;
    this.isImmobile = isImmobile;
  }

  move(direction) {
    this.isMoving = true;
    this.fromX = this.x;
    this.fromY = this.y;
    this.lastDirection = direction;

    if (direction === 'n') {
      this.y -= this.tilesize;
    } else if (direction === 'e') {
      this.x += this.tilesize;
    } else if (direction === 's') {
      this.y += this.tilesize;
    } else if (direction === 'w') {
      this.x -= this.tilesize;
    }
  }

  undoMove() {
    this.x = this.fromX;
    this.y = this.fromY;
    this.isMoving = false;
    this.lastDirection = '';
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
    if (direction === 'n') {
      this.frame = this.startFrame - 4;
    } else if (direction === 'e') {
      this.frame = this.startFrame - 2;
    } else if (direction === 's') {
      this.frame = this.startFrame;
    } else if (direction === 'w') {
      this.frame = this.startFrame + 2;
    }

    this.frameDifference = this.frameDifference === 0 ? 1 : 0;
    this.frame += this.frameDifference;
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
      return 'n';
    } else if (newDirection < 0.5) {
      return 'e';
    } else if (newDirection < 0.75) {
      return 's';
    }

    return 'w';
  }
}
