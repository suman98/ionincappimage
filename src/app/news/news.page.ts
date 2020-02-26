import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HTTP } from "@ionic-native/http/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ConfigService } from "../services/config.service";
import { Network } from "@ionic-native/network/ngx";
import { NewsServices } from "../services/news-service";
import { SqlStorage } from "../services/SqlStorage.service";
import * as moment from "moment";
import "moment/locale/ne";
@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"]
})
export class NewsPage {
  PostUrl: any;
  PostId: any;
  style: any;
  constructor(
    private socialSharing: SocialSharing,
    private route: ActivatedRoute,
    private newsservice: NewsServices,
    public config: ConfigService,
    private network: Network,
    public service: SqlStorage,
    private nativeHttp: HTTP
  ) {}
  post: any;
  latestNewsdata: any;
  ionViewWillEnter() {
    this.PostUrl =
      "https://imagekhabar.com/news/" +
      this.route.snapshot.paramMap.get("id") +
      "/-";
    this.PostId = this.route.snapshot.paramMap.get("id");
    let Postobj = this.route.snapshot.paramMap.get("obj");
    this.service
      .check_saved(this.PostId)
      .then(c => {
        if (c == 0) {
          this.style = "#FFFFFF";
        } else {
          this.style = "#000000";
        }
      })
      .catch(() => {});
    this.SelectNews(Postobj);
  }

  SelectNews(obj: any) {
    let n = this.network.type;
    try {
      let data1 = JSON.parse(obj);
      this.post = data1;
    } catch (err) {
      alert("SomeThing went wrong please try again");
    }
    if (n != null) {
      this.LatestNews(0);
      //  this.getAd();
    }
  }

  ads = {
    below_menu: null,
    homepage_below_featured: null
  };
  getAd() {
    let x = ["below_menu", "homepage_below_featured"];
    x.forEach(a => {
      this.newsservice
        .AddService(a)
        .then(val2 => {
          if (val2 != "/storage/") {
            let y = val2.replace("#", "");
            this.ads[a] = y;
          }
        })
        .catch(() => {
          console.log("No ads");
        });
    });
  }
  LatestNews(n: number) {
    this.nativeHttp
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
        let lnews = [];
        for (let v of Data1) {
          if (v["id"] != this.PostId) {
            v["created_"] = moment(v["created_at"])
              .startOf("minute")
              .fromNow();
            let img = v["thumbnail"];
            let e = img.substring(img.length - 4);
            v["thumbnail"] = img.replace(e, "-medium" + e);
            v["detailobj"] = JSON.stringify(v);
            lnews.push(v);
          }
        }
        this.latestNewsdata = lnews;
      })
      .catch(error => {
        if (n == 0) {
          this.LatestNews(1);
        }
      });
  }

  public whatsappShare(message: any, image: any, link: any) {
    this.socialSharing.shareViaWhatsApp(message, image, link);
  }

  public shareTwitter(message: any, image: any, link: any) {
    this.socialSharing.shareViaTwitter(message, image, link);
  }

  public facebookShare(message: any, image: any, link: any) {
    this.socialSharing.shareViaFacebook(message, image, link);
  }

  public otherShare(message: any, subject: any, file: any, url: any) {
    this.socialSharing.share(message, subject, file, url);
  }
  // check=0;
  // async  synchNews(id){
  //   this.post=null;
  //   let loading = await this.loadingCtrl.create();
  //   await loading.present();
  //   this.nativeHttp.get('https://imagekhabar.com/api/news/'+id+'/', {}, {}).then(data => {
  //     let parsed = JSON.parse(data.data);
  //     let data1=parsed['data'][0];
  //     data1['photo']='https://imagekhabar.com/'+data1['photo'];
  //     this.post=data1;
  //     // this.posts=parsed['data'];
  //   })
  //   .catch(error => {
  //     if(this.check==0){
  //       this.check=1;;
  //       this.synchNews(id);
  //     }
  //     else
  //       alert("Something went wrong or check connection!");
  //   }).finally(() => loading.dismiss());
  // }

  doRefresh(event: any) {
    console.log("Begin async operation");
    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  public saveNewsBookmark(event: any, news: any, news_type: any) {
    this.service.saveNewsBookmarkStorage(news, news_type).then(color => {
      this.style = color;
    });
  }
}
