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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordValidator } from '../../validators/equalPasswordValidator';
import { AuthenticationService } from '../../providers/auth-service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RegisterPage = (function () {
    function RegisterPage(toastCtrl, navCtrl, navParams, formBuilder, _authService) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this._authService = _authService;
        this.registerForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'fullName': ['', Validators.required],
            'passwords': formBuilder.group({
                'password': ['', Validators.required],
                'repassword': ['', Validators.required]
            }, { validator: EqualPasswordValidator.validate('password', 'repassword') })
        });
        this.email = this.registerForm.controls['email'];
        this.fullName = this.registerForm.controls['fullName'];
        this.passwords = this.registerForm.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repassword = this.passwords.controls['repassword'];
    }
    RegisterPage.prototype.registerUser = function () {
        var _this = this;
        console.log(this.registerForm.value);
        /* this.user.fullName=this.registerForm['fullName'];
         this.user.email=this.registerForm['email'];
         this.user.password=this.registerForm['passwords']['password'];*/
        console.log(this.registerForm.value['fullName']);
        var fullName = this.registerForm.value['fullName'];
        var email = this.registerForm.value['email'];
        var password = this.registerForm.value['passwords']['password'];
        this._authService.register(fullName, email, password)
            .subscribe(function (res) {
            if (res === true) {
                _this.navCtrl.pop();
                _this.presentToast("User created");
            }
            else {
                _this.presentToast("User add fail");
            }
        });
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Component({
        selector: 'page-register',
        templateUrl: 'register.html',
        providers: [AuthenticationService]
    }),
    __metadata("design:paramtypes", [ToastController,
        NavController,
        NavParams,
        FormBuilder,
        AuthenticationService])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.js.map