import ph from 'phaser';
import Port from './Port';
import Building from './Building';

class App extends Phaser.Game {

    constructor() {
        super(1280, 800, Phaser.AUTO);

        this.state.add('Port', Port, false);
        this.state.add('Building', Building, false);
        this.state.start('Port');
    }

}

new App();