export class Npcs {

    constructor() {
        this.npcs = [
            {
                frame: 0,
                x: 688,
                y: 976
            },
            {
                frame: 2,
                x: 608,
                y: 768
            },
            {
                frame: 4,
                x: 896,
                y: 576
            }
        ];

        this.width = 32;
        this.height = 32;
    }

    animate() {
        for (let npc of this.npcs) {
            if (Math.random() > 0.8) {
                npc.frameDifference = npc.frameDifference === 1 ? -1 : 1;
                npc.frame += npc.frameDifference;
            }
        }
    }

}