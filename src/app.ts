import renderInterface from "./interface";
import "./sass/styles.scss";

import assets from "./assets";
import renderPort from "./port/";
import state from "./state";
import sound from "./sound";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    await navigator.serviceWorker.register("/service-worker.js");
  });
}

(async () => {
  await assets.load();
  renderInterface();
  renderPort();
  sound();
})();
