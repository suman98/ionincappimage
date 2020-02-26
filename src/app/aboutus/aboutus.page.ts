import { Component, OnInit } from '@angular/core';
import { NewsServices } from '../services/news-service';
import {  LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
about_content:any;
  constructor(private news:NewsServices,private loadingCtrl:LoadingController) { }

  ngOnInit() {
 this.showAboutus(0);  
  }
  async showAboutus(n:number){
    let loading = await this.loadingCtrl.create({message: `
    <div class="custom-spinner-container">
    <div class="custom-spinner-box"></div>
    </div>`});
    await loading.present();
    this.news.Aboutus().then(val=> {
      this.about_content=val.content;
    }).catch(err=>{
      if(n==0){
      this.showAboutus(1);
      }
    }).finally(()=>loading.dismiss());
  }

}
