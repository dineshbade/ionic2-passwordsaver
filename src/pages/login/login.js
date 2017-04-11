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
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
/*import { User } from '../../model/user.model';
*/ import { AuthenticationService } from '../../providers/auth-service';
//import { Facebook } from 'ionic-native';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
/*
    Generated class for the Login page.

    See http://ionicframework.com/docs/v2/components/#navigation for more info on
    Ionic pages and navigation.
*/
var LoginPage = (function () {
    function LoginPage(toastCtrl, navCtrl, navParams, _authService, fb, loadingCtrl, alertCtrl) {
        /*let userCreateStatus=navParams.get('status');
        if(userCreateStatus===true){
            this.presentToast();
        }else{
            this.presentLoading();
        }*/
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._authService = _authService;
        this.fb = fb;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.loginForm = fb.group({
            'email': ['', Validators.required],
            'password': ['']
        });
        this.email = this.loginForm.controls['email'];
        this.password = this.loginForm.controls['password'];
    }
    LoginPage.prototype.registerPage = function () {
        console.log("register page click");
        this.navCtrl.push(RegisterPage);
    };
    /*facebookLogin(){
        facebookConnectPlugin.login(['email'],function(response){
            alert("Logged in");
            alert(JSON.stringify(response.authResponse));

        },function(error){
            alert(error);
        });
    }*/
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.getLogin = function () {
        var _this = this;
        console.log(this.loginForm.value);
        var email = this.loginForm.value['email'];
        var password = this.loginForm.value['password'];
        this._authService.getLogin(email, password)
            .subscribe(function (res) {
            if (res.success === false) {
                _this.loginForm.get('password').setValue('');
                _this.showAlert(res.message);
            }
            else if (res.success === true) {
                _this.navCtrl.setRoot(HomePage);
                _this.presentToast(res.message);
            }
            else
                _this.showAlert("something went wrong");
        });
    };
    LoginPage.prototype.presentLoading = function () {
        var loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();
    };
    LoginPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    LoginPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [AuthenticationService]
    }),
    __metadata("design:paramtypes", [ToastController,
        NavController,
        NavParams,
        AuthenticationService,
        FormBuilder,
        LoadingController,
        AlertController])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map