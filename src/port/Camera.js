import assets from '../assets';

export default class Camera {
  constructor(map, characters) {
    this.map = map;
    this.characters = characters;

    this.width = 1280;
    this.height = 800;
    this.x = 0;
    this.y = 0;

    this.canvas = document.getElementById('camera');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  update() {
    const player = this.characters.player;

    this.x = (player.visualX + (player.width / 2) + player.offsetX) - (this.width / 2);
    this.y = (player.visualY + (player.height / 2) + player.offsetY) - (this.height / 2);

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

  draw() {
    this.context.drawImage(
      this.map.canvas,
      this.x, this.y,
      this.width, this.height,
      0, 0,
      this.width, this.height,
    );

    this.characters.characters.forEach((character) => {
      const x = character.visualX + character.offsetX - this.x;
      const y = character.visualY + character.offsetY - this.y;

      this.context.drawImage(
        assets.characters,
        character.frame * character.width, 0,
        character.width, character.height,
        x, y,
        character.width, character.height,
      );
    });
  }
}
