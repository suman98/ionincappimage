import { Component, OnInit } from "@angular/core";
import { MenuController, LoadingController } from "@ionic/angular";
import { ConfigService } from "../services/config.service";
import { music } from "../services/music";
import { Network } from "@ionic-native/network/ngx";
import { NewsServices } from "../services/news-service";
import { SqlStorage } from "../services/SqlStorage.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "home.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  hotNewsdata: Array<any>;
  popularNewsdata: Array<any>;
  myplayer: any;
  CatData = this.config.CategoriesData;
  status: boolean = false;
  heading: any;
  slides: any;
  segmentButton: any;
  index: number;
  segment: any;
  error: String;
  DateNp: any;
  DateEng: String;
  f_visible: String = "block";
  categories = new Array<Array<any>>(13);
  slidevisible = Array<String>(13).fill("block");
  load: Boolean = true;
  constructor(
    private network: Network,
    private config: ConfigService,
    private datePipe: DatePipe,
    public music: music,
    private menu: MenuController,
    public news: NewsServices,
    private bookSql: SqlStorage,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}
  ngOnInit() {
    this.heading = "ताजा समाचार";
    document.body.style.setProperty("--navcolor", "#d13938");
    let cache = this.news.cacheData();
    if (cache[0] != null) {
      let data1 = JSON.parse(cache[0]);
      this.categories[0] = data1;
    }
    if (cache[1] != null) this.popularNewsdata = JSON.parse(cache[1]);
    if (cache[2] != null) this.hotNewsdata = JSON.parse(cache[2]);
  }

  ionViewDidEnter() {
    if (this.load) {
      this.load = false;
      this.index = 0;
      this.getDate();
      this.segment = document.querySelector("ion-segment");
      this.slides = document.querySelector("ion-slides");
      this.segmentButton = this.segment.querySelectorAll("ion-segment-button");
      let conn = this.network.type;
      if (conn != "none" && conn != undefined) {
        this.status = true;
        this.LatestNews(0);
        this.getCategory();
        this.PopularNews(0);
        this.HotNews(0);
        this.getAd();
      } else {
        this.music.presentToast("No Internet Connection");
      }
    }
  }

  getDate() {
    let adbs = require("ad-bs-converter");
    let utc = new Date();
    this.DateEng = utc.toDateString();
    let utc1 = this.datePipe.transform(utc, "yyyy/MM/dd");
    this.DateNp = adbs.ad2bs(utc1);
  }

  async LatestNews(n: number) {
    let loading = await this.loadingCtrl.create({
      spinner: "bubbles",
      duration: 8000
    });
    await loading.present();
    this.news
      .LatestNews()
      .then(val => {
        this.categories[0] = val;
      })
      .catch(err => {
        if (n == 0) {
          this.LatestNews(1);
        }
      })
      .finally(() => loading.dismiss());
  }

  PopularNews(n: number) {
    this.news
      .PopularNews()
      .then(val1 => {
        this.popularNewsdata = val1;
      })
      .catch(() => {
        if (n == 1) this.PopularNews(1);
      });
  }

  HotNews(n: number) {
    this.news
      .HotNews()
      .then(val2 => {
        this.hotNewsdata = val2;
      })
      .catch(() => {
        if (n == 0) this.HotNews(1);
      });
  }

  navigateImageFM() {
    if (this.network.type != "none") this.music.navigateImageFM();
    else this.music.presentAlert("No Connection");
  }
  navigateImageNewsFM() {
    if (this.network.type != "none") this.music.navigateImageNewsFM();
    else this.music.presentAlert("No Connection");
  }

  doRefresh(event: any, i: number) {
    console.log("Begin async operation");
    if (i == 12) {
      this.readLater();
    } else if (this.status == false && this.network.type != "none") {
      this.load = true;
      this.ionViewDidEnter();
      this.slides.slideTo(0);
    } else if (this.network.type != "none") {
      if (i == 0) {
        this.LatestNews(0);
      } else {
        let id = this.CatData[i - 1].catid;
        this.news
          .getCategory(id)
          .then(val3 => {
            this.categories[i] = val3;
          })
          .catch(() => {
            console.log("Cannot Synch");
          });
      }
    }
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  temp = [];
  async dataCat(n: number, id: any, sid: any) {
    await this.news
      .getCategory(id)
      .then(val3 => {
        this.temp[sid] = val3;
      })
      .catch(() => {
        if (n == 0) this.dataCat(1, id, sid);
      });
  }
  getCategory() {
    this.CatData.forEach(item => {
      this.dataCat(0, item.catid, item.sid);
    });
  }

  async onSlideDidChange() {
    this.error = null;
    await this.slides.getActiveIndex().then(async (i: any) => {
      this.slidevisible[i] = "block";
      this.slides.scrollIntoView();
      this.index = i;
      this.segment.value = i;
      let active = this.segmentButton[i];
      active.scrollIntoView({ behavior: "smooth", inline: "center" });
      this.f_visible = "none";
      if (i == 0) {
        document.body.style.setProperty("--navcolor", "#d13938");
        this.heading = "ताजा समाचार";
        this.f_visible = "block";
      } else if (i == 12) {
        this.heading = "बुकमार्क";
        this.index = 12;
        this.readLater();
      } else if (this.status == false) {
        //user does not have internet connection
        let c = this.CatData[i - 1];
        this.heading = c.title;
        let color = this.config.color[c.catid];
        document.body.style.setProperty("--navcolor", color);
        this.error = "No Internet connection !!!";
      } else if (this.categories[i] == undefined) {
        let c = this.CatData[i - 1];
        this.heading = c.title;
        let color = this.config.color[c.catid];
        document.body.style.setProperty("--navcolor", color);
        this.categories[i] = this.temp[c.sid];
        this.temp[c.sid] = null;
        let loading = await this.loadingCtrl.create({
          spinner: "bubbles",
          duration: 1000
        });
        await loading.present();
      } else {
        let c = this.CatData[i - 1];
        this.heading = c.title;
        let color = this.config.color[c.catid];
        document.body.style.setProperty("--navcolor", color);
      }
      this.slideDisplay(i);
    });
  }

  getCategoryClick(id: number) {
    this.slidevisible[id] = "block";
    this.slides.slideTo(id);
    return false;
  }

  ads = {
    below_menu: null,
    homepage_below_featured: null
  };
  getAd() {
    let x = ["below_menu", "homepage_below_featured"];
    x.forEach(a => {
      this.news
        .AddService(a)
        .then(val2 => {
          let adimg = val2.data;
          if (adimg != "") {
            let add = [val2.link];
            let y = adimg.replace("#", "");
            add.push(y);
            this.ads[a] = add;
          }
        })
        .catch(() => {});
    });
  }
  async readLater() {
    this.bookSql.BookMark().then(async book => {
      if (book.length == 0) {
        this.error = "No any BookMark saved !!";
      } else {
        book.reverse();
        this.categories[12] = book;
        let loading = await this.loadingCtrl.create({
          spinner: "bubbles",
          duration: 1000
        });
        await loading.present();
      }
    });
  }

  Home() {
    this.slidevisible[0] = "block";
    this.slides.slideTo(0);
    this.menu.close();
  }

  youtube() {
    window.open(
      "https://www.youtube.com/user/imagechannelnepal",
      "_system",
      "location=yes"
    );
    return false;
  }
  twitter() {
    window.open("https://twitter.com/imagekhabar", "_system", "location=yes");
    return false;
  }
  insta() {
    window.open(
      "https://www.instagram.com/imagekhabar/?hl=en",
      "_system",
      "location=yes"
    );
    return false;
  }
  facebook() {
    window.open(
      "https://www.facebook.com/imagekhabar.com.np",
      "_system",
      "location=yes"
    );
    return false;
  }

  newsDetail(c: any, id: Number) {
    let news = JSON.stringify(c);
    this.router.navigate(["news", news, id]);
  }

  slideDisplay(n: any) {
    let x = n - 1;
    let y = n + 1;
    for (let i = 0; i < 13; i++) {
      i < x || i > y
        ? (this.slidevisible[i] = "none")
        : (this.slidevisible[i] = "block");
    }
  }
  openAds(link: any) {
    window.open(link, "_system", "location=yes");
    return false;
  }
}
