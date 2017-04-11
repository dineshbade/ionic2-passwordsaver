var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { HomeService } from '../../providers/home-service';
import { LoginPage } from '../login/login';
/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MainPage = (function () {
    function MainPage(navCtrl, navParams, homeService, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homeService = homeService;
        this.app = app;
        this.rootPage = HomePage;
    }
    MainPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainPage');
    };
    MainPage.prototype.openPage = function (p) {
        this.rootPage = p;
    };
    MainPage.prototype.profile = function () {
        this.navCtrl.push(ProfilePage);
    };
    MainPage.prototype.logout = function () {
        console.log("logout");
        this.homeService.logout();
        this.app.getRootNav().setRoot(LoginPage);
    };
    return MainPage;
}());
MainPage = __decorate([
    Component({
        selector: 'page-main',
        templateUrl: 'main.html',
        providers: [HomeService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        HomeService,
        App])
], MainPage);
export { MainPage };
//# sourceMappingURL=main.js.map