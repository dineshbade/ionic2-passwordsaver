var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as Crypto from 'crypto-js';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*import API_URL from '../utils/constant';
*/
var CONTENT_TYPE_HEADER = 'Content-Type';
var APPLICATION_JSON = 'application/json';
/*const URL:string ='http://localhost:3000/api';
*/
var URL = 'http://192.168.1.9:3000/api';
import { StorageUtils } from '../utils/storageUtils';
/*
  Generated class for the Home provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var HomeService = (function () {
    function HomeService(http) {
        this.http = http;
        console.log('Hello Home Provider');
    }
    /* connectAPI(){
        let headers:Headers=new Headers();
           console.log("inside add detail service");
            headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
      return this.http.get(API_URL)
               .map(res=>
                { return res.json()})
     }*/
    HomeService.prototype.loadData = function () {
        var _this = this;
        var headers = new Headers;
        headers.append('Authorization', 'Basic ' + StorageUtils.getToken());
        return this.http.get(URL + '/details', { headers: headers })
            .map(function (res) {
            _this.data = res.json();
            console.log(_this.data);
            if (_this.data.success === true)
                for (var _i = 0, _a = _this.data.result; _i < _a.length; _i++) {
                    var item = _a[_i];
                    var decrypttext = Crypto.AES.decrypt(item.password, '1ep11is023guessMenot');
                    console.log(decrypttext);
                    console.log(decrypttext.toString(Crypto.enc.Utf8));
                    item.password = decrypttext.toString(Crypto.enc.Utf8);
                    console.log("inside item after encrypteio" + item);
                }
            return _this.data.result;
        }, function (error) { return console.log(error); });
        /*.catch(this.handleError);*/
    };
    HomeService.prototype.addDetail = function (username, password, type) {
        var _this = this;
        var ciphertext = Crypto.AES.encrypt(password, '1ep11is023guessMenot');
        console.log(ciphertext.toString());
        var headers = new Headers();
        console.log("inside add detail service");
        headers.append('Authorization', 'Basic ' + StorageUtils.getToken());
        headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return this.http.post(URL + '/detail', JSON.stringify({
            username: username,
            password: ciphertext.toString(),
            type: type
        }), { headers: headers })
            .map(function (res) {
            console.log("add detail rsponse" + res);
            _this.data = res.json();
            if (_this.data.status === 201 && _this.data.success === true) {
                return _this.data;
            }
            else {
                return _this.data.message;
            }
        });
    };
    HomeService.prototype.deleteItem = function (item) {
        var headers = new Headers();
        console.log("inside add detail service");
        headers.append('Authorization', 'Basic ' + StorageUtils.getToken());
        headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return this.http.delete(URL + '/detail/' + item._id, { headers: headers })
            .map(function (res) {
            res = res.json();
            return res;
        });
    };
    HomeService.prototype.logout = function () {
        StorageUtils.removeAccount();
        StorageUtils.removeToken();
    };
    HomeService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return HomeService;
}());
HomeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HomeService);
export { HomeService };
//# sourceMappingURL=home-service.js.map