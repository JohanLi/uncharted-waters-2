class Building extends Phaser.State {

    preload() {
        this.load.image('hud', '/img/hud.png');
        this.load.image('background', '/img/buildings/background.png');
        this.load.image('market', '/img/buildings/market.png');
        this.load.image('dialog', '/img/buildings/dialog.png');
    }

    create() {
        this.addImages();
        this.addText();
    }

    addImages() {
        let images = [
            this.game.add.image(0, 0, 'hud'),
            this.game.add.image(192, 16, 'background'),
            this.game.add.image(208, 32, 'market'),
            this.game.add.image(480, 16, 'dialog')
        ];

        images.map((image) => {
            image.scale.set(2);
            image.smoothed = false;
        });
    }

    addText() {
        let style = {
            font: '700 24px Courier',
            wordWrap: true,
            wordWrapWidth: 416
        };

        this.npcDialog = this.add.text(512, 32, 'How may I help you?', style)
            .setTextBounds(0, 0, 416, 240);
    }

}

export default Building;