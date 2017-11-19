import "./game.jsx";
import "./sass/styles.scss";

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
  private world: object;
  private sound: object;

  constructor() {
    this.assets = {
      tilemap: "/tilemaps/lisbon.json",
      characters: "/img/characters.png",
      tileset0: "/img/tileset0.2.png",
      tileset2: "/img/tileset2.2.png",
    };

    preload(this.assets)
      .then((assets) => {
        this.world = new World(assets);
        this.sound = new Sound();

        window.requestAnimationFrame(() => this.loop());
      });
  }

  private loop() {
    this.world.update();
    this.world.draw();

    window.requestAnimationFrame(() => this.loop());
  }
}

new Game();
