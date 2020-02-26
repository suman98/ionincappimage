import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SettingsPage } from "./setting/setting.page";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  public chosenTheme: any;
  public theme: any;
  public chosenFontSize: any;
  public counter = 0;
  public pushNotificationStatus: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public _settings: SettingsPage,
    private router: Router,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    // this._settings.getPushNotification().subscribe(val => this.pushNotificationStatus = val);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigate(["home"]);
      this.splashScreen.hide();
      this.statusBar.styleBlackTranslucent();
      this._settings.getTheme();
      document.addEventListener("backbutton", () => {
        let view = this.router.url;
        if (view == "/home") {
          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => {
              this.counter = 0;
            }, 3000);
          } else {
            navigator["app"].exitApp();
          }
        }
      });
    });
  }

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
