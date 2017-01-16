export class Npcs {

    constructor() {

    }

    setup() {
        this.npcs = [
            {
                frame: 4,
                x: this.buildings.market.x - 32,
                y: this.buildings.market.y + 16,
                static: false
            },
            {
                frame: 4,
                x: this.buildings.shipyard.x,
                y: this.buildings.shipyard.y,
                static: false
            },
            {
                frame: 12,
                x: this.buildings.bar.x - 32,
                y: this.buildings.bar.y + 16,
                static: false
            },
            {
                frame: 12,
                x: this.buildings.lodge.x - 32,
                y: this.buildings.lodge.y + 16,
                static: false
            },
            {
                frame: 16,
                x: this.buildings.market.x + 32,
                y: this.buildings.market.y + 16,
                static: true
            },
            {
                frame: 18,
                x: this.buildings.lodge.x + 32,
                y: this.buildings.lodge.y + 16,
                static: true
            },
            {
                frame: 20,
                x: this.buildings.bar.x + 32,
                y: this.buildings.bar.y + 16,
                static: true
            }
        ];

        this.npcs.map(this.setupDirectionFrames);

        this.width = 32;
        this.height = 32;
    }

    setupDirectionFrames(npc) {
        if (npc.static)
            return;

        npc.up = npc.frame - 4;
        npc.right = npc.frame - 2;
        npc.down = npc.frame;
        npc.left = npc.frame + 2;
    }

    update() {
        for (let npc of this.npcs) {
            if (npc.static) {
                this.animate(npc);
            } else {
                this.move(npc);
            }
        }
    }

    animate(npc) {
        if (Math.random() < 0.2)
            return;

        npc.frameDifference = npc.frameDifference === 1 ? -1 : 1;
        npc.frame += npc.frameDifference;
    }

    move(npc) {
        if (Math.random() < 0.2)
            return;

        this.randomizeDirection(npc);

        if (npc.currentDirection === 'up') {
            npc.frame = npc.up;
            npc.y -= 16;
        } else if (npc.currentDirection === 'right') {
            npc.frame = npc.right;
            npc.x += 16;
        } else if (npc.currentDirection === 'down') {
            npc.frame = npc.down;
            npc.y += 16;
        } else if (npc.currentDirection === 'left') {
            npc.frame = npc.left;
            npc.x -= 16;
        }

        npc.frameDifference = npc.frameDifference === 0 ? 1 : 0;
        npc.frame += npc.frameDifference;
    }

    randomizeDirection(npc) {
        let randomSameDirection = Math.random();
        let randomDirection = Math.random();

        if (randomSameDirection < 0.75)
            return;

        if (randomDirection < 0.25) {
            npc.currentDirection = 'up';
        } else if (randomDirection < 0.5) {
            npc.currentDirection = 'right';
        } else if (randomDirection < 0.75) {
            npc.currentDirection = 'down';
        } else {
            npc.currentDirection = 'left'
        }
    }

}