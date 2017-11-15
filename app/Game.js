import Preload from './Preload';
import Map from './Map';
import Characters from './Characters';
import World from './World';
import Camera from './Camera';
import Sound from './Sound';
import './game.jsx';

require('./sass/styles.scss');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registration succeeded');
    } catch (error) {
      console.log('Service Worker registration failed: ', error);
    }
  });
}

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
        this.sound = new Sound();

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
