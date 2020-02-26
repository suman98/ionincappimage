import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "home", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  { path: "news/:obj/:id", loadChildren: "./news/news.module#NewsPageModule" },
  {
    path: "setting",
    loadChildren: "./setting/setting.module#SettingPageModule"
  },
  {
    path: "developers",
    loadChildren: "./developers/developers.module#DevelopersPageModule"
  },
  {
    path: "dateconveter",
    loadChildren: "./dateconveter/dateconveter.module#DateconveterPageModule"
  },
  {
    path: "aboutus",
    loadChildren: "./aboutus/aboutus.module#AboutusPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
