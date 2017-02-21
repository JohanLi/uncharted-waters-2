import Preload from './Preload';

import Map from './Map';
import Characters from './Characters';
import World from './World';
import Camera from './Camera';
import Sound from './Sound';

require('./sass/styles.scss');

class Game {

  constructor() {
    this.assets = {
      tilemap: '/tilemaps/lisbon.json',
      tileset: '/img/tileset1.2.png',
      characters: '/img/characters.png'
    };

    Preload.load(this.assets)
      .then((assets) => {
        this.map = new Map(assets);
        this.characters = new Characters(this.map);
        this.world = new World(this.map, this.characters);
        this.camera = new Camera(this.world);
        // this.sound = new Sound();

        window.requestAnimationFrame(() => this.loop());
      });
  }

  loop() {
    this.characters.update(this.percentNextMove());
    this.world.draw();
    this.camera.draw();

    window.requestAnimationFrame(() => this.loop());
  }

  percentNextMove() {
    if (window.performance.now() - this.lastMoveTime < 67) {
      return (window.performance.now() - this.lastMoveTime) / 67;
    }

    this.lastMoveTime = window.performance.now();
    return 1;
  }

}

new Game();
