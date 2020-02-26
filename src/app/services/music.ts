import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { MusicControls } from "@ionic-native/music-controls/ngx";
import { ToastController, AlertController } from "@ionic/angular";
import { RadioPlayer } from "./radio-player";
@Injectable({
  providedIn: "root"
})
export class music {
  private imageFMAudioUrl: any;
  private imageFMOptions: any;
  private imageNewsFMAudioUrl: any;
  private imageNewsFMOptions: any;
  public stream: any;
  public streamOption: any;
  public playing: boolean = false;
  public icono: string = "play";
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
  data = [];
  myplayer: any;
  constructor(
    private platform: Platform,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public backgroundMode: BackgroundMode,
    public musicControls: MusicControls,
    myplayer: RadioPlayer
  ) {
    this.myplayer = myplayer;
    if (this.myplayer.stream) {
      this.eventPlay(true);
    }
  }
  async navigateImageFM() {
    if (this.myplayer.streaming == "playing") {
      //this.backgroundMode.disable();
      this.myplayer.pause();
    }

    this.myplayer.createImageFMMusic();
    this.musicControls.listen();

    let toast = await this.toastCtrl.create({
      message: "Playing Image FM Radio...",
      duration: 10000,
      //duration: 10000,
      position: "bottom"
    });

    toast.present();

    this.myplayer
      .play("ImageFM")
      .then(() => {
        this.musicControls.updateIsPlaying(true);
        this.eventPlay(true);
        toast.dismiss();
      })
      .catch((error: any) => {
        toast.dismiss();
        //this.presentAlert("Error msg= " + error + "<br>Radio url = " + this.imageFMAudioUrl);
        this.pause();
        this.eventPlay(false);
      });

    this.musicControls.subscribe().subscribe(action => {
      this.eventos(action, this.imageFMAudioUrl);
    });

    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({
      silent: true
    });
    this.backgroundMode.on("activate").subscribe(() => {
      /*this.myplayer.createImageFMMusic();
    this.musicControls.listen();*/
      this.musicControls.updateIsPlaying(true);
      this.eventPlay(true);

      this.musicControls.subscribe().subscribe(action => {
        this.eventos(action, this.imageFMAudioUrl);
      });
    });
  }

  async navigateImageNewsFM() {
    if (this.myplayer.streaming == "playing") {
      //this.backgroundMode.disable();
      this.myplayer.pause();
    }
    this.myplayer.createImageNewsFMMusic();
    this.musicControls.listen();

    let toast = await this.toastCtrl.create({
      message: "Playing Image News FM Radio...",
      duration: 10000,
      position: "bottom"
    });

    toast.present();

    this.myplayer
      .play("ImageNewsFM")
      .then(() => {
        this.musicControls.updateIsPlaying(true);
        this.eventPlay(true);
        toast.dismiss();
      })
      .catch((error: any) => {
        toast.dismiss();
        //this.presentAlert("Error msg= " + error + "<br>Radio url = " + this.imageNewsFMAudioUrl);
        this.pause();
        this.eventPlay(false);
      });

    this.musicControls.subscribe().subscribe(action => {
      this.eventos(action, this.imageNewsFMAudioUrl);
    });

    this.backgroundMode.enable();
    this.backgroundMode.setDefaults({
      silent: true
    });
    this.backgroundMode.on("activate").subscribe(() => {
      /*this.myplayer.createImageNewsFMMusic();
    this.musicControls.listen();*/
      this.musicControls.updateIsPlaying(true);
      this.eventPlay(true);

      this.musicControls.subscribe().subscribe(action => {
        this.eventos(action, this.imageNewsFMAudioUrl);
      });
    });
  }

  public eventPlay(valor: any) {
    this.icono = valor ? "pause" : "play";
    this.playing = valor;
  }

  pause() {
    this.eventPlay(false);
    if (this.platform.is("cordova")) {
      this.musicControls.updateIsPlaying(false);
    }
    this.myplayer.pause();
  }

  async presentAlert(title: any) {
    let alert = await this.alertCtrl.create({
      message: title,
      buttons: ["OK"]
    });
    alert.present();
  }

  async presentToast(title: any) {
    let toast = await this.toastCtrl.create({
      message: title,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  eventos(action: any, radioUrl: any) {
    const message = JSON.parse(action).message;
    switch (message) {
      case "music-controls-pause":
        this.myplayer.pause();
        this.musicControls.updateIsPlaying(false);
        this.eventPlay(false);
        break;
      case "music-controls-play":
        //this.streamingMedia.stopAudio();
        // alert(this.myplayer.CurrentRadio);
        this.myplayer
          .play(this.myplayer.CurrentRadio)
          .then(() => {
            this.musicControls.updateIsPlaying(true);
            this.eventPlay(true);
          })
          .catch((error: any) => {
            //this.presentAlert("Error msg= " + error + "<br>Radio url = " + radioUrl);
            this.pause();
            this.eventPlay(false);
          });
        break;
      case "music-controls-destroy":
        this.backgroundMode.disable();
        this.myplayer.pause();
        // Do something
        break;
      case "music-controls-toggle-play-pause":
        // Do something
        break;
      case "music-controls-seek-to":
        // Do something
        break;
      case "music-controls-media-button":
        // Do something
        break;
      case "music-controls-headset-unplugged":
        // Do something
        break;
      case "music-controls-headset-plugged":
        // Do something
        break;
      default:
        break;
    }
  }
}
