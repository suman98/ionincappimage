import { Injectable } from "@angular/core";
import { AlertController, ToastController } from "@ionic/angular";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import * as moment from "moment";
import "moment/locale/ne";
@Injectable()
export class SqlStorage {
  database: SQLiteObject;
  conn: any;
  constructor(
    public sqlite: SQLite,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    try {
      this.sqlite
        .create({
          name: "data.db",
          location: "default"
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          db.executeSql(
            "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, news_id INTEGER, title VARCHAR(255), slug VARCHAR(255), introtext TEXT, content TEXT, thumbnail VARCHAR(255), photo VARCHAR(255), news_type VARCHAR(50), category VARCHAR(100), parent_category VARCHAR(100), views VARCHAR(50), created_at VARCHAR(100), updated_at VARCHAR(100), published_at VARCHAR(100))",
            []
          )
            .then(() => console.log("Executed SQL"))
            .catch(e => console.log(e));

          db.executeSql(
            "CREATE TABLE IF NOT EXISTS category_news (id INTEGER PRIMARY KEY AUTOINCREMENT, news_id INTEGER, title VARCHAR(255), slug VARCHAR(255), introtext TEXT, content TEXT, thumbnail VARCHAR(255), photo VARCHAR(255), category_id INTEGER, category VARCHAR(100), parent_category VARCHAR(100), views VARCHAR(50), created_at VARCHAR(100), updated_at VARCHAR(100), published_at VARCHAR(100))",
            []
          )
            .then(() => console.log("Executed SQL"))
            .catch(e => console.log(e));

          db.executeSql(
            "CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY AUTOINCREMENT, news_id INTEGER, title VARCHAR(255), slug VARCHAR(255), introtext TEXT, content TEXT, thumbnail VARCHAR(255), photo VARCHAR(255), news_type VARCHAR(100), category VARCHAR(100), parent_category VARCHAR(100), views VARCHAR(50), created_at VARCHAR(100), updated_at VARCHAR(100), published_at VARCHAR(100))",
            []
          )
            .then(() => console.log("Executed SQL"))
            .catch(e => console.log(e));
        });
    } catch (err) {}
  }
  async BookMark() {
    let sql = "SELECT * FROM bookmarks";
    return this.database.executeSql(sql, []).then(r => {
      let bookMark = [];
      if (r.rows.length > 0) {
        for (var i = 0; i < r.rows.length; i++) {
          //alert(data.rows.item(i).name);
          let item = r.rows.item(i);
          let data = {
            id: item.news_id,
            title: item.title,
            slug: item.slug,
            introtext: item.introtext,
            content: item.content,
            thumbnail: item.thumbnail,
            photo: item.photo,
            category: item.category,
            parent_category: item.parent_category,
            views: item.views,
            created_: moment(item.created_at)
              .startOf("minute")
              .fromNow(),
            updated_at: item.updated_at,
            published_at: item.published_at
          };
          bookMark.push(data);
        }
      }
      return bookMark;
    });
  }

  async check_saved(id: String) {
    let sql = 'SELECT * FROM bookmarks WHERE news_id = "' + id + '"';
    const r = await this.database.executeSql(sql, []);
    return r.rows.length;
  }

  async saveNewsBookmarkStorage(news: any, news_type: string) {
    // Check if the news bookmark is already exists or not.
    let sql = 'SELECT * FROM bookmarks WHERE news_id = "' + news.id + '"';
    return this.database.executeSql(sql, []).then(async r => {
      if (r.rows.length == 0) {
        let insert_sql =
          "INSERT INTO bookmarks (news_id, title, slug, introtext, content, thumbnail, photo, news_type, category, parent_category, views, created_at, updated_at, published_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        this.database
          .executeSql(insert_sql, [
            news.id,
            news.title,
            news.slug,
            news.introtext,
            news.content,
            news.thumbnail,
            news.photo,
            news_type,
            news.category,
            news.parent_category,
            news.views,
            news.created_at,
            news.updated_at,
            news.published_at
          ])
          .then(() => console.log("Executed SQL: Bookmark saved"))
          .catch((e: any) => console.log(e));
        let toast = await this.toastCtrl.create({
          message: "News is saved Successfully.",
          duration: 3000
        });
        toast.present();
        return "#000000";
      } else {
        this.removeBookmarkStorage(news.id);
        return "#FFFFFF";
        // let toast = await this.toastCtrl.create({
        //     message: 'News has already been saved.',
        //     duration: 3000
        // });
        // toast.present();
      }
    });
  }

  public removeBookmarkStorage(id: any) {
    let sql = 'DELETE FROM bookmarks WHERE news_id = "' + id + '"';

    this.database.executeSql(sql, []).then(async () => {
      let toast = await this.toastCtrl.create({
        message: "Bookmark is deleted Successfully.",
        duration: 3000
      });
      toast.present();
    });
  }
}
