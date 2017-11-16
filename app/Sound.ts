export default class Sound {
  private sound: HTMLAudioElement;

  constructor() {
    this.sound = new Audio();
    this.sound.autoplay = true;
    this.sound.loop = true;
    this.sound.src = "/sound/port.mp3";
    document.getElementById("app").appendChild(this.sound);
  }
}
