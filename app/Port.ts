import render from "./interface/game";
import "./sass/styles.scss";

import assets from "./assets";
import Camera from "./Camera";
import Characters from "./Characters";
import Map from "./Map";
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
    assets.load()
      .then(() => {
        render();
        this.map = new Map();
        this.characters = new Characters(this.map);
        this.camera = new Camera(this.map, this.characters);
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
