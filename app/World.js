export class World {

    constructor(map, characters) {
        this.map = map;
        this.characters = characters.characters;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.map.canvas.width;
        this.canvas.height = this.map.canvas.height;
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.map.canvas, 0, 0);

        for (let character of this.characters) {
            this.context.drawImage(
                this.map.assets.characters,
                character.frame * character.width, 0,
                character.width, character.height,
                character.x + character.offsetX, character.y + character.offsetY,
                character.width, character.height
            );
        }
    }

}