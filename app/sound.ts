export default () => {
  const sound: HTMLAudioElement = new Audio();
  sound.autoplay = true;
  sound.loop = true;
  sound.src = "/sound/port.mp3";

  document.getElementById("app").appendChild(sound);
};
