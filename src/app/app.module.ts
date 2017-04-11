import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {  HomePage } from '../pages/home/home';
import {  MainPage } from '../pages/main/main';

import {  ModalContentPage } from '../pages/home/modal/modal';
import {  LoginPage } from '../pages/login/login';
import {  RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';


@NgModule({
  declarations: [
       MyApp,
    HomePage,
    ModalContentPage,
    LoginPage,
    RegisterPage,
    MainPage,
    ProfilePage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
     MyApp,
    HomePage,
    LoginPage,
    ModalContentPage,
    RegisterPage,
    MainPage,
    ProfilePage
   
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
