import { Component } from '@angular/core';
import { NavController,
				 NavParams,
				 LoadingController,
				 ToastController,
				 AlertController 
					} from 'ionic-angular';
import { FormControl, FormBuilder,AbstractControl,FormGroup,Validators} from '@angular/forms';
/*import { User } from '../../model/user.model';
*/import { AuthenticationService } from '../../providers/auth-service';
//import { Facebook } from 'ionic-native';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/*
	Generated class for the Login page.

	See http://ionicframework.com/docs/v2/components/#navigation for more info on
	Ionic pages and navigation.
*/
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers:[AuthenticationService]
})
export class LoginPage {
	public loginForm:FormGroup;
	public email:AbstractControl;
	public password:AbstractControl;

	constructor(
		public  toastCtrl:ToastController,
		public navCtrl: NavController,
	 public navParams: NavParams,
	 public _authService:AuthenticationService,
	 public fb:FormBuilder,
	 public loadingCtrl:LoadingController,
	 public alertCtrl:AlertController
	 ) {

			/*let userCreateStatus=navParams.get('status');
			if(userCreateStatus===true){
				this.presentToast();
			}else{
				this.presentLoading();
			}*/


			this.loginForm=fb.group({
				'email':['',Validators.required],
				'password':['']
			});
			
			this.email=this.loginForm.controls['email'];
			this.password=this.loginForm.controls['password'];



	}

	registerPage(){
		console.log("register page click");
		this.navCtrl.push(RegisterPage);
	}

	/*facebookLogin(){
		facebookConnectPlugin.login(['email'],function(response){
			alert("Logged in");
			alert(JSON.stringify(response.authResponse));

		},function(error){
			alert(error);
		});
	}*/
	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
	getLogin(){
		
		console.log(this.loginForm.value);
		let email = this.loginForm.value['email'];
		let password = this.loginForm.value['password'];
		this._authService.getLogin(email,password)
		.subscribe((res)=>{

								if(res.success===false)
										{
											this.loginForm.get('password').setValue('');
												this.showAlert(res.message);
																			}
								 else if(res.success===true){
													 this.navCtrl.setRoot(HomePage); 
												this.presentToast(res.message);
										} else
									 this.showAlert("something went wrong");

								})
	}
presentLoading() {
		let loader = this.loadingCtrl.create({
			content: "Please wait...",
			duration: 3000
		});
		loader.present();
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
}
