import { Component } from '@angular/core';
import {Platform,ToastController} from 'ionic-angular';
import { StatusBar, Splashscreen,Network } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StorageUtils } from '../utils/storageUtils';
import { MainPage } from '../pages/main/main';
import { HomeService} from '../providers/home-service'

import { ProfilePage } from '../pages/profile/profile';



@Component({
  templateUrl: 'app.html',
  providers:[HomeService]
})
export class MyApp {
  rootPage;

  constructor(platform: Platform,
   public homeSer:HomeService,
    public toastCtrl:ToastController
    ) {

    platform.ready().then(() => {
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
        if(StorageUtils.hasAccount()){
         this.rootPage=MainPage;

        }else{
          this.rootPage=LoginPage;

        }
    });
  }

   presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}