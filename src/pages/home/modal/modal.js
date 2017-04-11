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
import { ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EqualPasswordValidator } from '../../../validators/equalPasswordValidator';
import { HomeService } from '../../../providers/home-service';
var ModalContentPage = (function () {
    function ModalContentPage(formBuilder, viewCtrl, params, homeService, toastCtrl, alertCtrl) {
        this.formBuilder = formBuilder;
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.homeService = homeService;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.values = params.get('value');
        console.log(this.values);
        if (this.values === '' || this.values === 'undefine') {
            this.headerTitle = "Add Detail";
            console.log("add form");
            this.addForm = formBuilder.group({
                'id': [''],
                'type': ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-z]*'), Validators.required])],
                'username': ['', Validators.required],
                /*password:['',Validators.required],
                repassword:['',Validators.required]*/
                'passwords': formBuilder.group({
                    'password': ['', Validators.required],
                    'repassword': ['', Validators.required]
                }, { validator: EqualPasswordValidator.validate('password', 'repassword') })
            });
        }
        else {
            this.headerTitle = "Edit Detail";
            console.log(this.values._id);
            this.addForm = formBuilder.group({
                'id': [this.values._id],
                'type': [this.values.type, Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-z]*'), Validators.required])],
                'username': [this.values.username, Validators.required],
                /*password:['',Validators.required],
                repassword:['',Validators.required]*/
                'passwords': formBuilder.group({
                    'password': ['', Validators.required],
                    'repassword': ['', Validators.required]
                }, { validator: EqualPasswordValidator.validate('password', 'repassword') })
            });
        }
        this.id = this.addForm.controls['id'];
        this.type = this.addForm.controls['type'];
        this.username = this.addForm.controls['username'];
        this.passwords = this.addForm.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repassword = this.passwords.controls['repassword'];
    }
    ModalContentPage.prototype.logForm = function () {
        var _this = this;
        console.log(this.addForm.value);
        if (this.addForm.value.id == '' || this.addForm.value.id == 'undefine') {
            console.log("add form action");
            var username = this.addForm.value['username'];
            var type = this.addForm.value['type'];
            var password = this.addForm.value['passwords']['password'];
            console.log(username, type, password);
            //	 Encrypt 
            this.homeService.addDetail(username, password, type)
                .subscribe(function (result) {
                if (result.success === true) {
                    _this.presentToast("detail added successfully");
                }
                else {
                    /*this.dismiss();*/
                    _this.showAlert(result.message);
                }
            });
        }
        else if (this.addForm.value.id != '' && this.addForm.value.id != 'undefine') {
            console.log("update form action");
        }
    };
    ModalContentPage.prototype.presentToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        toast.present();
    };
    ModalContentPage.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    ModalContentPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return ModalContentPage;
}());
ModalContentPage = __decorate([
    Component({
        selector: 'page-modal',
        templateUrl: 'modal.html',
        providers: [HomeService]
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ViewController,
        NavParams,
        HomeService,
        ToastController,
        AlertController])
], ModalContentPage);
export { ModalContentPage };
//# sourceMappingURL=modal.js.map