
import { Component } from '@angular/core';

import {ViewController,
	NavParams,
	ToastController,
	AlertController,
	LoadingController
	} from 'ionic-angular';
 
 import{FormBuilder ,FormGroup,Validators,AbstractControl } from '@angular/forms'
 import { EqualPasswordValidator} from '../../../validators/equalPasswordValidator';
 import { Detail } from '../../../model/detail.model';
 import { HomeService} from '../../../providers/home-service'


@Component({
	selector:'page-modal',
	templateUrl:'modal.html',
	providers:[HomeService]
})

export class ModalContentPage{
	values:Detail;
	detail:Detail;
	public addForm:FormGroup;
	public id:AbstractControl;
	public type:AbstractControl;
	public username:AbstractControl;
	public passwords:FormGroup;
	public password:AbstractControl;
	public repassword:AbstractControl;
	 loader:any;
	public headerTitle:string;

	 constructor(
    public formBuilder:FormBuilder,
    public viewCtrl: ViewController,
        public params: NavParams,
        public homeService:HomeService,
        public toastCtrl:ToastController,
        public alertCtrl:AlertController,
        public loadingCtrl:LoadingController

  ){
	 		
	 	this.values=params.get('value');

	 		console.log(this.values);
	 if(this.values==='' || this.values==='undefine'){
	 		this.headerTitle="Add Detail"
	 		console.log("add form");
	 		this.addForm = formBuilder.group({
	 			'id':[''],
	 		'type':['',Validators.compose([Validators.maxLength(10),Validators.pattern('[a-zA-z]*'),Validators.required])],
	 		'username':['',Validators.required],
	 		/*password:['',Validators.required],
	 		repassword:['',Validators.required]*/
	 		'passwords':formBuilder.group({
	 			'password':['',Validators.required],
	 			'repassword':['',Validators.required]
	 		},{validator:EqualPasswordValidator.validate('password','repassword')})
    
	 	});
	 }else{
	 	this.headerTitle="Edit Detail";
	 	console.log(this.values._id);
	 	this.addForm = formBuilder.group({
	 		'id':[this.values._id],
	 		'type':[this.values.type,Validators.compose([Validators.maxLength(10),Validators.pattern('[a-zA-z]*'),Validators.required])],
	 		'username':[this.values.username,Validators.required],
	 		/*password:['',Validators.required],
	 		repassword:['',Validators.required]*/
	 		'passwords':formBuilder.group({
	 			'password':['',Validators.required],
	 			'repassword':['',Validators.required]
	 		},{validator:EqualPasswordValidator.validate('password','repassword')})
    
	 	});
	 }

	 this.id=this.addForm.controls['id'];
	 	this.type = this.addForm.controls['type'];
    this.username = this.addForm.controls['username'];
    this.passwords = <FormGroup> this.addForm.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repassword = this.passwords.controls['repassword'];
	 }
	
 
 	logForm(){

 		

 		if(this.addForm.value['id']===''|| this.addForm.value['id']==='undefine'){
 			console.log("add form action")
 				let username=this.addForm.value['username'];
 				let type=this.addForm.value['type'];
 				let password=this.addForm.value['passwords']['password'];
 		

//	 Encrypt 
			this.homeService.addDetail(username,password,type)
 								.subscribe((result)=>{
 										if(result.success===true){
 											/*this.loader.dismiss();*/
 											this.presentToast("detail added successfully");
 											/*this.dismiss();*/
 										}else{
 												/*this.dismiss();*/
 												this.showAlert(result.message);
 										}
 								});
 		}else if(this.addForm.value['id']!=='' && this.addForm.value['id']!=='undefine'){
 			console.log("update form action");

 		let	detail:Detail={};	
 			detail._id=this.addForm.value['id'];
 			detail.username=this.addForm.value['username'];
 			detail.password=this.addForm.value['passwords']['password'];
 			detail.type=this.addForm.value['type'];
 			this.homeService.updateDetail(detail)
 			.subscribe(result=>{
 				/*this.loader.dismiss();*/
 				if(result.success===true && result.status===200){
 					this.presentToast("update successful");

 				}else{
 					this.presentToast(result.message);
 				}
 			})

 		}


 	}
 presentLoading() {
     this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    this.loader.present();
  }
 	 presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  showAlert(message:string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


   dismiss() {
    this.viewCtrl.dismiss();
  }

}