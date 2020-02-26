import { Injectable } from "@angular/core";
import { MusicControls } from "@ionic-native/music-controls/ngx";

@Injectable()
export class RadioPlayer {
  public stream: any;
  streaming: any;
  promise: any;
  url: string;
  CurrentRadio: string;
  radioImageFM = {
    title: "Image FM Radio",
    description: "Image FM",
    url: "http://streaming.hamropatro.com:8631/;stream.mp3",
    image: "assets/ifm.png"
  };

  radioImageNewsFM = {
    title: "Image News FM Radio",
    description: "Image News FM",
    url: "http://streaming.hamropatro.com:8633/;stream.mp3",
    image: "assets/infm.png"
  };

  constructor(private musicControls: MusicControls) {}

  public createImageFMMusic() {
    this.musicControls.destroy();
    return this.musicControls.create({
      track: this.radioImageFM.description,
      artist: this.radioImageFM.title,
      cover: this.radioImageFM.image,
      isPlaying: false,
      dismissable: false,
      hasPrev: false,
      hasNext: false,
      hasClose: true,
      album: "",
      duration: 0,
      elapsed: 0,
      ticker: this.radioImageFM.title
    });
  }

  public createImageNewsFMMusic() {
    this.musicControls.destroy();
    return this.musicControls.create({
      track: this.radioImageNewsFM.description,
      artist: this.radioImageNewsFM.title,
      cover: this.radioImageNewsFM.image,
      isPlaying: false,
      dismissable: false,
      hasPrev: false,
      hasNext: false,
      hasClose: true,
      album: "",
      duration: 0,
      elapsed: 0,
      ticker: this.radioImageNewsFM.title
    });
  }

  play(link: any) {
    if (this.stream == null) {
      if (link == "ImageFM") {
        this.CurrentRadio = "ImageFM";
        this.url = "http://streaming.hamropatro.com:8631/;stream.mp3";
        this.stream = new Audio(this.url);
      } else {
        this.CurrentRadio = "news";
        this.url = "http://streaming.hamropatro.com:8633/;stream.mp3";
        this.stream = new Audio(this.url);
      }
    }
    this.stream.play();
    this.promise = new Promise((resolve, reject) => {
      this.stream.addEventListener("playing", () => {
        resolve(true);
      });

      this.stream.addEventListener("error", () => {
        reject(false);
      });
    });
    this.streaming = "playing";
    return this.promise;
  }

  pause() {
    try {
      this.stream.pause();
      this.stream = null;
      this.streaming = null;
    } catch (err) {
      if (this.stream != null) {
        this.play(this.radioImageFM.url);
        this.stream = null;
        this.streaming = null;
      }
    }
  }
}
