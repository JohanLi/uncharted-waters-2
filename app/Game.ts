import "./game.jsx";
import "./sass/styles.scss";

import Camera from "./Camera";
import Characters from "./Characters";
import Map from "./Map";
import preload from "./preload";
import Sound from "./Sound";
import World from "./World";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/service-worker.js");
  });
}

class Game {
  private assets: object;
  private map: object;
  private characters: object;
  private world: object;
  private camera: object;
  private sound: object;
  private lastMoveTime: number;

  constructor() {
    this.assets = {
      tilemap: "/tilemaps/lisbon.json",
      characters: "/img/characters.png",
      tileset0: "/img/tileset0.2.png",
      tileset2: "/img/tileset2.2.png",
    };

    preload(this.assets)
      .then((assets) => {
        this.map = new Map(assets);
        this.characters = new Characters(this.map);
        this.world = new World(this.map, this.characters);
        this.camera = new Camera(this.world);
        this.sound = new Sound();

        window.requestAnimationFrame(() => this.loop());
      });
  }

  private loop() {
    this.characters.update(this.percentNextMove());
    this.world.draw();
    this.camera.draw();

    window.requestAnimationFrame(() => this.loop());
  }

  private percentNextMove() {
    if (window.performance.now() - this.lastMoveTime < 67) {
      return (window.performance.now() - this.lastMoveTime) / 67;
    }

    this.lastMoveTime = window.performance.now();
    return 1;
  }
}

new Game();
