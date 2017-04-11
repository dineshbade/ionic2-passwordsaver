import { Component , OnInit} from '@angular/core';

import { NavController,
		Platform, 
		ActionSheetController,
		ModalController,
    ToastController
			 } from 'ionic-angular';
 import {ModalContentPage } from './modal/modal';
import { HomeService} from '../../providers/home-service'
import { Detail } from '../../model/detail.model';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[HomeService]
})
export class HomePage  {
     public items:Detail;

  constructor(public navCtrl: NavController,
  	public platform: Platform,
    public modalCtrl:ModalController,
    public _homeService:HomeService,
    public toastCtrl:ToastController
    ){
     /*
     */
  this.load();
  }   
  
  expand(detail:Detail){
   detail.expanded=!detail.expanded;
  }
  

  load(){

    console.log("load called");
    this._homeService.loadData().subscribe((res)=>{
        this.items=res
        console.log(this.items);
     }
      );
    
  }

  
  

    changeData(action:string,values:Detail){
        switch (action) {
          case "edit":
           let editModal = this.modalCtrl.create(ModalContentPage, { value: values });
               editModal.onDidDismiss(()=>{
         this.load();
       }
         )
               editModal.present();
  

/*        this.modalCtrl.create(ModalContentPage,{'values':values}).present();
*/               
            // code...
            break;
          
          case "add":
       let modal =   this.modalCtrl.create(ModalContentPage, { value: values });
       modal.onDidDismiss(()=>{
         this.load();
       }
         )
       
       modal.present();
                
            // code...
            break;
        }
    }
  edit(){
  	let modal =this.modalCtrl.create(ModalContentPage);
  	modal.present();
  }
    delete(item:Detail){
      this._homeService.deleteItem(item)
      .subscribe((res:any)=>{
        console.log(res)
          if(res.success===true && res.status===200){
              this.presentToast(res.message);
              this.load();
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
