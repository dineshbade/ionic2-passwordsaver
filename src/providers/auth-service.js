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
import { User } from '../model/user.model';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { StorageUtils } from '../utils/storageUtils';
var CONTENT_TYPE_HEADER = 'Content-Type';
var APPLICATION_JSON = 'application/json';
/*const URL:string ='http://localhost:3000/api';
*/
var URL = 'http://192.168.1.12:3000/api';
/*
  Generated class for the AuthenticationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.userStatus = false;
        console.log('Hello AuthenticationService Provider');
    }
    AuthenticationService.prototype.getLogin = function (email, password) {
        var _this = this;
        console.log("inside login service");
        var headers = new Headers();
        headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return this.http.post(URL + '/auth/signin', JSON.stringify({ email: email, password: password }), { headers: headers })
            .map(function (res) {
            var user;
            var data = res.json();
            console.log(data);
            if (data['status'] === 200) {
                var loginDetail = data.token;
                var user_1 = _this.readJWT(loginDetail);
                StorageUtils.setAccount(user_1);
                StorageUtils.setToken(loginDetail);
                return data;
            }
            else if (data['status'] === 401) {
                console.log("here" + data.message);
                return data;
            }
        }, function (error) {
            console.log(error);
        })
            .catch(this.handleError);
    };
    AuthenticationService.prototype.register = function (fullName, email, password) {
        var _this = this;
        var headers = new Headers();
        headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return this.http.post(URL + '/auth/signup', JSON.stringify({
            fullName: fullName,
            email: email,
            password: password
        }), { headers: headers })
            .map(function (res) {
            res = res.json();
            if (res.status === 201) {
                return _this.userStatus = true;
            }
            return _this.userStatus = false;
        });
    };
    AuthenticationService.prototype.readJWT = function (token) {
        var tokens = token.split('.');
        var tokenPayload = JSON.parse(atob(tokens[1]));
        var user = new User();
        user = tokenPayload.sub;
        console.log(tokenPayload.sub);
        return user;
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=auth-service.js.map