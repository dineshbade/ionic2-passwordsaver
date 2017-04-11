import { Component } from '@angular/core';
import { NavController, NavParams ,App} from 'ionic-angular';

import { HomePage } from '../home/home';
import {ProfilePage} from '../profile/profile';
import { HomeService} from '../../providers/home-service';
import { StorageUtils } from '../../utils/storageUtils';
import {LoginPage} from '../login/login';



/*
  Generated class for the Main page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers:[HomeService]
})
export class MainPage {
		private rootPage;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public homeService:HomeService,
   public app:App) {
  	 this.rootPage = HomePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
  
  openPage(p) {
    this.rootPage = p;
  }
 profile(){
      this.navCtrl.push(ProfilePage);
    }

  logout(){
    console.log("logout");
     this.homeService.logout();
      this.app.getRootNav().setRoot(LoginPage);


    
  }

}
