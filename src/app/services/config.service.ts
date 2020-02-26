import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConfigService {
  constructor() {}
  public apiVersion = "v1.0";

  public apiDomain = "https://www.imagekhabar.com";

  public newsListUrl = "https://www.imagekhabar.com/api/newslist";
  public newsItemUrl = "https://www.imagekhabar.com/api/news/";
  public pushNewsItemUrl = "https://www.imagekhabar.com/api/pushNews/";

  public popularNews = {
    apiUrl: "https://www.imagekhabar.com/api/popularnews/",
    num: 5
  };

  public hotNews = {
    apiUrl: "https://www.imagekhabar.com/api/hotnews/",
    num: 5
  };

  public latestNews = {
    apiUrl: "https://www.imagekhabar.com/api/latestnews/",
    num: 10
  };

  public specialPages = {
    aboutusPage: "https://www.imagekhabar.com/api/page/2"
  };

  public newsByCatid = {
    apiUrl: "https://imagekhabar.com/api/categoryitems/",
    num: 15,
    deshCatid: "34",
    rajnitiCatid: "5",
    arthaCatid: "26",
    world: "27",
    crime: "31",
    sports: "8",
    sahitya: "17",
    ent: "6",
    bichar: "13",
    interview: "9",
    tech: "21",
    english: "20",
    rochak: "32",
    patrika: "30",
    yatra: "29",
    health: "28"
  };

  public blogs = {
    apiUrl: "https://www.imagekhabar.com/api/blogs/",
    num: 15
  };

  public eventsListUrl = "https://www.imagekhabar.com/api/eventlist";
  public eventItemUrl = "https://www.imagekhabar.com/api/event/";

  public categoryUrl = "https://imagekhabar.new/api/category-list/";
  public categoryNewsUrl = "https://www.imagekhabar.com/api/courselist";
  public postContactusUrl = "https://www.imagekhabar.com/api/contact/post";

  public albumsUrl = "https://www.imagekhabar.com/api/albums";
  public albumPhotosUrl = "https://www.imagekhabar.com/api/album/";

  public contactUrl = "https://imagekhabar.new/api/contactUrl";
  public newsletterUrl = "https://imagekhabar.new/api/newsletterUrl";

  public CategoriesData = [
    { title: "प्रदेश", icon: "easel", sid: 0, catid: 25 },
    { title: "राजनीति", icon: "bowtie", sid: 1, catid: 5 },
    { title: "समाज", icon: "people", sid: 2, catid: 35 },
    { title: "विश्व", icon: "globe", sid: 3, catid: 27 },
    { title: "स्वास्थ्य", icon: "medkit", sid: 4, catid: 28 },
    { title: "अपराध", icon: "contacts", sid: 5, catid: 31 },
    { title: "खेलकुद", icon: "football", sid: 6, catid: 8 },
    { title: "मनोरञ्जन", icon: "film", sid: 7, catid: 6 },
    { title: "अर्थ", icon: "cash", sid: 8, catid: 26 },
    { title: "विचार", icon: "barcode", sid: 9, catid: 13 },
    { title: "English", icon: "paper", sid: 10, catid: 20 }

    // { title: 'साहित्य', icon: 'create', name: 'CategoryNewsPage', catid: 17 },

    // { title: 'अन्तर्वार्ता', icon: 'people', name: 'CategoryNewsPage',  catid: 18 },
    // { title: 'प्रविधि', icon: 'analytics', name: 'CategoryNewsPage', catid: 21 },

    // { title: 'रोचक प्रसङ्ग', icon: 'globe', name: 'CategoryNewsPage', catid: 32 },
    // { title: 'पत्रपत्रिका', icon: 'paper', name: 'CategoryNewsPage',  catid: 30 },
    // { title: 'यात्रा', icon: 'bus', name: 'CategoryNewsPage',  catid: 29 },
  ];
  public color = {
    25: "#1abc9c",
    5: "#2ecc71",
    35: "#3498db",
    27: "#9b59b6",
    31: "#34495e",
    8: "#16a085",
    17: "#27ae60",
    6: "#2980b9",
    13: "#8e44ad",
    18: "#2c3e50",
    21: "#f1c40f",
    20: "#e67e22",
    32: "#e74c3c",
    30: "#95a5a6",
    26: "#f39c12",
    28: "#d35400"
  };
}
