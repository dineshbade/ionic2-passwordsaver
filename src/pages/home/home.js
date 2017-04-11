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
import { NavController, Platform, ModalController, ToastController } from 'ionic-angular';
import { ModalContentPage } from './modal/modal';
import { HomeService } from '../../providers/home-service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var HomePage = (function () {
    function HomePage(navCtrl, platform, modalCtrl, _homeService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this._homeService = _homeService;
        this.toastCtrl = toastCtrl;
        /*
        */
        this.load();
    }
    HomePage.prototype.expand = function (detail) {
        detail.expanded = !detail.expanded;
    };
    HomePage.prototype.load = function () {
        var _this = this;
        this._homeService.loadData().subscribe(function (res) {
            _this.items = res;
            console.log(_this.items);
        });
    };
    HomePage.prototype.ngOnInit = function () {
    };
    HomePage.prototype.view = function () {
    };
    HomePage.prototype.changeData = function (action, values) {
        var _this = this;
        switch (action) {
            case "edit":
                var modalCtrl = this.modalCtrl.create(ModalContentPage, { value: values });
                modalCtrl.present();
                /*        this.modalCtrl.create(ModalContentPage,{'values':values}).present();
                */
                // code...
                break;
            case "add":
                var modal = this.modalCtrl.create(ModalContentPage, { value: values });
                modal.onDidDismiss(function () {
                    _this.load();
                });
                modal.present();
                // code...
                break;
        }
    };
    HomePage.prototype.edit = function () {
        var modal = this.modalCtrl.create(ModalContentPage);
        modal.present();
    };
    HomePage.prototype.delete = function (item) {
        var _this = this;
        this._homeService.deleteItem(item)
            .subscribe(function (res) {
            console.log(res);
            if (res.success === true && res.status === 200) {
                _this.presentToast(res.message);
                _this.load();
            }
        });
    };
    HomePage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [HomeService]
    }),
    __metadata("design:paramtypes", [NavController,
        Platform,
        ModalController,
        HomeService,
        ToastController])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map