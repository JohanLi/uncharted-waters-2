interface ICharacter {
  visualX: number;
  visualY: number;
  frame: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

interface IWorld {
  canvas: HTMLCanvasElement;
  characters: ICharacters;
}

interface ICharacters {
  player: ICharacter;
}

export default class Camera {
  private worldCanvas: HTMLCanvasElement;
  private player: ICharacter;
  private canvas: HTMLCanvasElement;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private context: CanvasRenderingContext2D;

  constructor(world: IWorld) {
    this.worldCanvas = world.canvas;
    this.player = world.characters.player;

    this.canvas = document.getElementById("camera") as HTMLCanvasElement;
    this.x = 0;
    this.y = 0;
    this.width = 1280;
    this.height = 800;

    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  public draw() {
    this.update();

    this.context.drawImage(
      this.worldCanvas,
      this.x, this.y,
      this.width, this.height,
      0, 0,
      this.width, this.height,
    );
  }

  private update() {
    this.x =
      (this.player.visualX + (this.player.width / 2) + this.player.offsetX) - (this.width / 2);
    this.y =
      (this.player.visualY + (this.player.height / 2) + this.player.offsetY) - (this.height / 2);

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.x + this.width > 3072) {
      this.x = 3072 - this.width;
    }

    if (this.y + this.height > 3072) {
      this.y = 3072 - this.height;
    }

    if (this.y < 0) {
      this.y = 0;
    }
  }
}
