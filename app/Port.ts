import "./game.jsx";
import "./sass/styles.scss";

import Camera from "./Camera";
import Characters from "./Characters";
import Map from "./Map";
import preload from "./preload";
import sound from "./sound";

import {IMap, ICharacters, ICamera} from "./types";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/service-worker.js");
  });
}

class Game {
  private map: IMap;
  private characters: ICharacters;
  private camera: ICamera;

  constructor() {
    preload({
      tilemap: "/tilemaps/lisbon.json",
      characters: "/img/characters.png",
      tileset0: "/img/tileset0.2.png",
      tileset2: "/img/tileset2.2.png",
    })
      .then((assets) => {
        this.map = new Map(assets);
        this.characters = new Characters(this.map);
        this.camera = new Camera(this.map, this.characters, assets);
        sound();

        window.requestAnimationFrame(() => this.loop());
      });
  }

  private loop() {
    this.characters.update();
    this.camera.update();
    this.camera.draw();

    window.requestAnimationFrame(() => this.loop());
  }
}

new Game();
