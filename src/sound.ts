import * as port from "./assets/sound/port.mp3";

export default () => {
  const sound: HTMLAudioElement = new Audio();
  sound.autoplay = true;
  sound.loop = true;
  sound.src = port;

  document.getElementById("app").appendChild(sound);
};
