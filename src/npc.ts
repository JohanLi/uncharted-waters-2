import { Direction, directionToChanges } from './types';
import { sample, directions } from './utils';

export default class Npc {
  private x: number;
  private y: number;
  private xTo: number;
  private yTo: number;

  private startFrame: number;
  private frameOffset = 0;
  private frameAlternate = 0;

  public width = 2;
  public height = 2;

  public isImmobile: boolean;

  private movesToSkip = Npc.movesToSkip();
  private movesSkipped = 0;

  private currentDirection: Direction = 's';
  private directionWasCollision = false;

  constructor(x: number, y: number, startFrame: number, isImmobile: boolean) {
    this.x = x;
    this.y = y
    this.xTo = x;
    this.yTo = y;
    this.startFrame = startFrame;
    this.isImmobile = isImmobile;
  }

  static movesToSkip() {
    return Math.floor(Math.random() * (6 - 2)) + 2;
  }

  shouldMove() {
    if (this.movesSkipped === this.movesToSkip) {
      this.movesToSkip = Npc.movesToSkip();
      this.movesSkipped = 0;
      return true;
    }

    this.movesSkipped += 1;
    return false;
  }

  move() {
    const direction = this.randomDirection();

    const { xDelta, yDelta, frameOffset } = directionToChanges[direction];
    this.frameOffset = frameOffset;
    this.xTo = this.x + xDelta;
    this.yTo = this.y + yDelta;

    this.currentDirection = direction;
    this.directionWasCollision = false;

    this.animate();
  }

  private randomDirection() {
    const sameDirection = Math.random();

    if (!this.directionWasCollision && sameDirection < 0.75) {
      return this.currentDirection;
    }

    return sample(directions);
  }

  undoMove() {
    this.xTo = this.x;
    this.yTo = this.y;

    this.directionWasCollision = true;
  }

  update() {
    this.x = this.xTo;
    this.y = this.yTo;
  }

  position(percentNextMove = 0) {
    return {
      x: this.x + ((this.xTo - this.x) * percentNextMove),
      y: this.y + ((this.yTo - this.y) * percentNextMove),
    };
  }

  destination() {
    return {
      x: this.xTo,
      y: this.yTo,
    };
  }

  frame() {
    return this.startFrame + this.frameOffset + this.frameAlternate;
  }

  animate() {
    this.frameAlternate = this.frameAlternate === 0 ? 1 : 0;
  }
}
