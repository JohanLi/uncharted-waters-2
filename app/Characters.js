import {Player} from './Player';
import {Npc} from './Npc';

export class Characters {

    constructor(map) {
        this.map = map;

        this.player = new Player(this.map.buildings.harbor.x, this.map.buildings.harbor.y + 32, 4);
        this.npcs = [
            new Npc(this.map.buildings.market.x - 64, this.map.buildings.market.y + 32, 4, false),
            new Npc(this.map.buildings.shipyard.x, this.map.buildings.shipyard.y, 4, false),
            new Npc(this.map.buildings.bar.x - 64, this.map.buildings.bar.y + 32, 12, false),
            new Npc(this.map.buildings.lodge.x - 64, this.map.buildings.lodge.y + 32, 12, false),
            new Npc(this.map.buildings.market.x + 64, this.map.buildings.market.y + 32, 16, true),
            new Npc(this.map.buildings.lodge.x + 64, this.map.buildings.lodge.y + 32, 18, true),
            new Npc(this.map.buildings.bar.x + 64, this.map.buildings.bar.y + 32, 20, true)
        ];

        this.lastMoveTime = {};
    }

    throttleMovement(milliseconds) {
        if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds)
            return true;

        this.lastMoveTime[milliseconds] = window.performance.now();
    }

    updatePlayer() {
        this.player.setDestination();

        if (!this.map.outOfBoundsAt(this.player.destination)
            && !this.map.collisionAt(this.player.destination)
            && !this.collisionWithAt(this.player)) {
            this.player.move();
        }
    }

    updateNpcs() {
        for (let npc of this.npcs) {
            if (npc.immobile) {
                npc.animate();
            } else {
                npc.setDestination();

                if (!this.map.outOfBoundsAt(npc.destination)
                    && !this.map.collisionAt(npc.destination)
                    && !this.collisionWithAt(npc)) {
                    npc.move();
                }
            }
        }
    }

    collisionWithAt(character) {
        return this.playerCollision(character) || this.npcCollision(character);
    }

    playerCollision(character) {
        if (character === this.player)
            return false;

        const xDifference = character.destination.x - this.player.x;
        const yDifference = character.destination.y - this.player.y;
        const xCollision = xDifference < this.player.width && xDifference > -this.player.width;
        const yCollision = yDifference < this.player.height && yDifference > -this.player.height;

        return xCollision && yCollision;
    }

    npcCollision(character) {
        return this.npcs.some((npc) => {
            if (character === npc)
               return false;

            const xDifference = character.destination.x - npc.x;
            const yDifference = character.destination.y - npc.y;
            const xCollision = xDifference < npc.width && xDifference > -npc.width;
            const yCollision = yDifference < npc.height && yDifference > -npc.height;

            return xCollision && yCollision;
        });
    }

}