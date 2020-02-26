import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {  IonicRouteStrategy ,IonicModule} from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RadioPlayer } from './services/radio-player';
import { HttpClientModule } from '@angular/common/http/';
import { HTTP } from '@ionic-native/http/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SettingsService } from './setting/setting.service';
import { LocalStorageService } from './services/local-storage_services';
import { SettingsPage } from './setting/setting.page';
import { Network } from '@ionic-native/network/ngx';
import { DatePipe } from '@angular/common';
import {NewsServices} from './services/news-service';
import { SQLite} from '@ionic-native/sqlite/ngx';
import { SqlStorage } from './services/SqlStorage.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RadioPlayer,
    HttpClientModule,
    HTTP,
    BackgroundMode,
    MusicControls,
    LocalStorageService,
    SettingsPage,
    SettingsService,
    SocialSharing,
    Network,
    DatePipe,
    NewsServices,
    SQLite,
    SqlStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
