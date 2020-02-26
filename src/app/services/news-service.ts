import { Injectable } from "@angular/core";
import { HTTP } from "@ionic-native/http/ngx";
import { ConfigService } from "../services/config.service";
import { LocalStorageService } from "../services/local-storage_services";
import * as moment from "moment";
import "moment/locale/ne";
@Injectable()
export class NewsServices {
  constructor(
    private nativeHttp: HTTP,
    public config: ConfigService,
    private storageservice: LocalStorageService
  ) {}

  async getCategory(id: any) {
    return this.nativeHttp
      .get(
        this.config.newsByCatid.apiUrl + id + "/" + this.config.newsByCatid.num,
        {},
        {}
      )
      .then(data => {
        let parsed = JSON.parse(data.data);
        if (id == 20) moment.locale("en");
        let Data1 = parsed["data"];
        for (let v of Data1) {
          let img = v["thumbnail"];
          let e = img.substring(img.length - 4);
          v["thumbnail"] = img.replace(e, "-medium" + e);
          v["created_"] = moment(v["created_at"])
            .startOf("minute")
            .fromNow();
        }
        if (id == 20) moment.locale("ne");
        return Data1;
      });
  }

  async HotNews() {
    return this.nativeHttp
      .get(
        this.config.hotNews.apiUrl + this.config.hotNews.num + "/?_embed/",
        {},
        {}
      )
      .then(data => {
        let parsed = JSON.parse(data.data);
        let Data1 = parsed["data"];
        for (let v of Data1) {
          let img = v["thumbnail"];
          let e = img.substring(img.length - 4);
          v["thumbnail"] = img.replace(e, "-medium" + e);
          v["created_"] = moment(v["created_at"])
            .startOf("minute")
            .fromNow();
        }
        this.storageservice.cacheHotNews(JSON.stringify(Data1));
        return Data1;
      });
  }

  async PopularNews() {
    return this.nativeHttp
      .get(
        this.config.popularNews.apiUrl +
          this.config.popularNews.num +
          "/?_embed/",
        {},
        {}
      )
      .then(data => {
        let parsed = JSON.parse(data.data);
        let Data1 = parsed["data"];
        for (let v of Data1) {
          let img = v["thumbnail"];
          let e = img.substring(img.length - 4);
          v["thumbnail"] = img.replace(e, "-medium" + e);
          v["created_"] = moment(v["created_at"])
            .startOf("minute")
            .fromNow();
        }
        this.storageservice.cachePopularNews(JSON.stringify(Data1));
        return Data1;
      });
  }

  async LatestNews() {
    return this.nativeHttp
      .get(
        this.config.latestNews.apiUrl +
          this.config.latestNews.num +
          "/?_embed/",
        {},
        {}
      )
      .then(data => {
        let parsed = JSON.parse(data.data);
        let Data1 = parsed["data"];
        for (let v of Data1) {
          let img = v["thumbnail"];
          let e = img.substring(img.length - 4);
          v["thumbnail"] = img.replace(e, "-medium" + e);
          v["created_"] = moment(v["created_at"])
            .startOf("minute")
            .fromNow();
        }
        this.storageservice.cacheLatestNews(JSON.stringify(Data1));
        return Data1;
      });
  }

  async Aboutus() {
    return this.nativeHttp
      .get(this.config.specialPages.aboutusPage + "/?_embed/", {}, {})
      .then(data => {
        let parsed = JSON.parse(data.data);
        let Data1 = parsed["data"];
        return Data1;
      });
  }
  async AddService(pos: String) {
    return this.nativeHttp
      .get("http://imagekhabar.com/api/ads/" + pos + "/?_embed/", {}, {})
      .then(data => {
        let parsed = JSON.parse(data.data);
        return parsed;
      });
  }

  cacheData() {
    let h = this.storageservice.getItem("HotNews");
    let l = this.storageservice.getItem("LatestNews");
    let p = this.storageservice.getItem("PopularNews");
    return [l, p, h];
  }
}
