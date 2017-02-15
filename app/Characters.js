import {Character} from './Character';

export class Characters {

    constructor(map) {
        this.map = map;
        this.buildings = map.buildings;

        this.characters = [
            new Character(this.buildings.harbor.x, this.buildings.harbor.y + 32, 4, true),
            new Character(this.buildings.market.x - 64, this.buildings.market.y + 32, 12),
            new Character(this.buildings.shipyard.x, this.buildings.shipyard.y, 12),
            new Character(this.buildings.bar.x - 64, this.buildings.bar.y + 32, 20),
            new Character(this.buildings.lodge.x - 64, this.buildings.lodge.y + 32, 20),
            new Character(this.buildings.market.x + 64, this.buildings.market.y + 32, 24, false, true),
            new Character(this.buildings.lodge.x + 64, this.buildings.lodge.y + 32, 26, false, true),
            new Character(this.buildings.bar.x + 64, this.buildings.bar.y + 32, 28, false, true)
        ];

        this.player = this.characters[0];
    }

    interpolateMovement(framePercentage) {
        for (let character of this.characters) {
            character.interpolateDestination(framePercentage);

            if (framePercentage === 1)
                character.removeDestination();
        }
    }

    move() {
        for (let character of this.characters) {
            if (character.isImmobile) {
                character.animate();
                continue;
            }

            if (!character.setDestination())
                continue;

            if (this.map.outOfBoundsAt(character.destination)
                || this.map.tileCollisionAt(character.destination)
                || this.characterCollisionWith(character)) {
                character.removeDestination();
            }
        }
    }

    characterCollisionWith(self) {
        return this.characters.some((character) => {
            if (character === self)
                return false;

            const xDifference = self.destination.x - character.x;
            const yDifference = self.destination.y - character.y;
            const xCollision = xDifference < character.width && xDifference > -character.width;
            const yCollision = yDifference < character.height && yDifference > -character.height;

            return xCollision && yCollision;
        });
    }

}