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
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { StorageUtils } from '../utils/storageUtils';
import { MainPage } from '../pages/main/main';
import { HomeService } from '../providers/home-service';
var MyApp = (function () {
    function MyApp(platform, homeSer, toastCtrl) {
        var _this = this;
        this.homeSer = homeSer;
        this.toastCtrl = toastCtrl;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            /*  this.homeSer.connectAPI()
              .subscribe((res)=>
                {if(res.status===200)
                         this.presentToast("connected api");
                          else{
                              this.presentToast("no connection");
                            }
                            }
                           )*/
            if (StorageUtils.hasAccount()) {
                _this.rootPage = MainPage;
            }
            else {
                _this.rootPage = LoginPage;
            }
        });
    }
    MyApp.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    return MyApp;
}());
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [HomeService]
    }),
    __metadata("design:paramtypes", [Platform,
        HomeService,
        ToastController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map