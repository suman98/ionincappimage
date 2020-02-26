import { Component } from "@angular/core";
import { SettingsService } from "./setting.service";
/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: "app-setting",
  templateUrl: "setting.page.html",
  styleUrls: ["setting.page.scss"]
  //   styles: [`
  //   ion-content {
  //   background-color:red !important;
  //   }
  // `],
})
export class SettingsPage {
  fontSize: String;
  nightMode: String;
  notificationSetting: String;
  ThemeData: any;
  constructor(private _settings: SettingsService) {
    this._settings
      .getPushNotification()
      .subscribe(val => (this.notificationSetting = val));
    this._settings.getFontSize().subscribe(val => (this.fontSize = val));
    this._settings.getNightMode().subscribe(val => (this.nightMode = val));
  }
  dataRefresher: any;

  public setPushNotification(e: any) {
    this._settings.setPushNotification(e);
  }

  public setFontSize(e: any) {
    let f = e.target.value;
    this._settings.setFontSize(f);
    this.getTheme();
  }

  public setNightMode(e: any) {
    let f = e.target.value;
    this._settings.setNightMode(f);
    this.getTheme();
  }

  public getTheme() {
    if (this.nightMode == "dark-theme") {
      document.body.style.setProperty("--theme", "#121212");
      document.body.style.setProperty("--font", "#FFFFFF");
      document.body.style.setProperty("--border", "#FFFFFF");
    } else {
      document.body.style.setProperty("--theme", "#FFFFFF");
      document.body.style.setProperty("--font", "#121212");
      document.body.style.setProperty("--border", "#D3D3D3");
    }

    if (this.fontSize == "fnt-sm")
      document.body.style.setProperty("--size", "16px");
    else if (this.fontSize == "fnt-md")
      document.body.style.setProperty("--size", "18px");
    else document.body.style.setProperty("--size", "22px");
  }
}
