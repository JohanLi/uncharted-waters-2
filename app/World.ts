import Characters from "./Characters";
import Map from "./Map";

interface IMap {
  canvas: HTMLCanvasElement;
  assets: IAssets;
}

interface IAssets {
  characters: HTMLImageElement;
}

interface ICharacters {
  characters: ICharacter[];
}

interface ICharacter {
  visualX: number;
  visualY: number;
  frame: number;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

interface ICamera {
  width: number;
  height: number;
  x: number;
  y: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

export default class World {
  private assets: object;
  private map: IMap;
  private characters: ICharacters;
  private camera: ICamera;

  constructor(assets) {
    this.map = new Map(assets);
    this.characters = new Characters(this.map);

    this.setupCamera();
  }

  private setupCamera() {
    this.camera = {};
    this.camera.width = 1280;
    this.camera.height = 800;
    this.camera.x = 0;
    this.camera.y = 0;

    this.camera.canvas = document.getElementById("camera") as HTMLCanvasElement;
    this.camera.context = this.camera.canvas.getContext("2d");
    this.camera.canvas.width = this.camera.width;
    this.camera.canvas.height = this.camera.height;
  }

  private updateCamera() {
    const player = this.characters.player;
    
    this.camera.x = (player.visualX + (player.width / 2) + player.offsetX) - (this.camera.width / 2);
    this.camera.y = (player.visualY + (player.height / 2) + player.offsetY) - (this.camera.height / 2);

    if (this.camera.x < 0) {
      this.camera.x = 0;
    }

    if (this.camera.x + this.camera.width > 3072) {
      this.camera.x = 3072 - this.camera.width;
    }

    if (this.camera.y + this.camera.height > 3072) {
      this.camera.y = 3072 - this.camera.height;
    }

    if (this.camera.y < 0) {
      this.camera.y = 0;
    }
  }

  public update() {
    this.characters.update();
    this.updateCamera();
  }

  public draw() {
    this.camera.context.drawImage(
      this.map.canvas,
      this.camera.x, this.camera.y,
      this.camera.width, this.camera.height,
      0, 0,
      this.camera.width, this.camera.height,
    );

    this.characters.characters.forEach((character) => {
      const x = character.visualX + character.offsetX - this.camera.x;
      const y = character.visualY + character.offsetY - this.camera.y;

      this.camera.context.drawImage(
        this.map.assets.characters,
        character.frame * character.width, 0,
        character.width, character.height,
        x, y,
        character.width, character.height,
      );
    });
  }
}
