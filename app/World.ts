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

export default class World {
  private map: IMap;
  private characters: ICharacters;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(map, characters) {
    this.map = map;
    this.characters = characters;

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = this.map.canvas.width;
    this.canvas.height = this.map.canvas.height;
  }

  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.map.canvas, 0, 0);

    this.characters.characters.forEach((character) => {
      this.context.drawImage(
        this.map.assets.characters,
        character.frame * character.width, 0,
        character.width, character.height,
        character.visualX + character.offsetX, character.visualY + character.offsetY,
        character.width, character.height,
      );
    });
  }
}
