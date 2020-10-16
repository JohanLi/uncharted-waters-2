import { Direction, directionToChanges } from './types';

export default class Player {
  private x: number;
  private y: number;
  private xTo: number;
  private yTo: number;

  private startFrame: number;
  private frameOffset = 0;
  private frameAlternate = 0;

  public width = 2;
  public height = 2;

  constructor(x: number, y: number, startFrame: number) {
    this.x = x;
    this.y = y
    this.xTo = x;
    this.yTo = y;
    this.startFrame = startFrame;
  }

  move(direction: Direction, shouldAnimate = true) {
    const { xDelta, yDelta, frameOffset } = directionToChanges[direction];
    this.frameOffset = frameOffset;
    this.xTo = this.x + xDelta;
    this.yTo = this.y + yDelta;

    if (shouldAnimate) {
      this.animate();
    }
  }

  undoMove() {
    this.xTo = this.x;
    this.yTo = this.y;
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

  private animate() {
    this.frameAlternate = this.frameAlternate === 0 ? 1 : 0;
  }
}
