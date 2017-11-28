import state from "../state";
import Camera from "./Camera";
import Characters from "./Characters";
import Map from "./Map";

import {IMap, ICharacters, ICamera} from "../types";

const renderPort = () => {
  const map: IMap = new Map();
  const characters: ICharacters = new Characters(map);
  const camera: ICamera = new Camera(map, characters);

  const loop = () => {
    if (!state.building) {
      characters.update();
      camera.update();
      camera.draw();
    }

    window.requestAnimationFrame(loop);
  };

  window.requestAnimationFrame(loop);
};

export default renderPort;
