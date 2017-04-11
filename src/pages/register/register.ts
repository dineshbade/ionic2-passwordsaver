import { Component } from '@angular/core';
import { NavController, NavParams,ToastController} from 'ionic-angular';
import { FormGroup,
			
			AbstractControl,
			FormBuilder,
			Validators
		} from '@angular/forms';
import{ LoginPage } from '../login/login';
import { EqualPasswordValidator } from '../../validators/equalPasswordValidator';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../providers/auth-service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[AuthenticationService]
})
export class RegisterPage {
	private fullName:AbstractControl;
	private email:AbstractControl;
	private passwords:FormGroup;
	private password:AbstractControl;
	private repassword:AbstractControl;
	private registerForm:FormGroup;
  user:User;

  constructor(
        public toastCtrl:ToastController,
      public navCtrl: NavController,
   				public navParams: NavParams,
   				public formBuilder:FormBuilder,
          public _authService:AuthenticationService
   				) {

  		this.registerForm=this.formBuilder.group({
  			'email':['',Validators.required],
  			'fullName':['',Validators.required],
  			'passwords':formBuilder.group({
	 			'password':['',Validators.required],
	 			'repassword':['',Validators.required]
	 		},{validator:EqualPasswordValidator.validate('password','repassword')})
    
  		});
  		this.email = this.registerForm.controls['email'];
    this.fullName = this.registerForm.controls['fullName'];
    this.passwords = <FormGroup> this.registerForm.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repassword = this.passwords.controls['repassword'];

  }

  registerUser(){
    console.log(this.registerForm.value);
   /* this.user.fullName=this.registerForm['fullName'];
    this.user.email=this.registerForm['email'];
    this.user.password=this.registerForm['passwords']['password'];*/
    console.log(this.registerForm.value['fullName']);
     let fullName=this.registerForm.value['fullName'];
      let  email=this.registerForm.value['email'];
      let password=this.registerForm.value['passwords']['password']
   this._authService.register(fullName,email,password)
    .subscribe((res)=>{
             if(res===true){
              this.navCtrl.pop();
              this.presentToast("User created");
                }
               else{
                   this.presentToast("User add fail");
               }

        }
      
    
      );
    

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

   presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
