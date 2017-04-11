import { Injectable } from '@angular/core';
import { Http,Response,Headers } from '@angular/http';
import { User } from '../model/user.model';



import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { StorageUtils } from '../utils/storageUtils';


const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
/*const URL:string ='http://localhost:3000/api';
*/
const URL:string ='http://192.168.1.9:3000/api';

/*
  Generated class for the AuthenticationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthenticationService {
    private userStatus:boolean=false;
  constructor(public http: Http) {
    console.log('Hello AuthenticationService Provider');
  }

  getLogin(email:string,password:string){
    console.log("inside login service");

  	let headers:Headers = new Headers();
  	headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON)

  	return this.http.post(URL+'/auth/signin',JSON.stringify({email:email,password:password}),{headers:headers})
  	.map((res)=>{
          let user:User;
         let  data:any=res.json();
         console.log(data);
          if(data['status']===200){

            let loginDetail=data.token;
            let user=this.readJWT(loginDetail);
            StorageUtils.setAccount(user);
            StorageUtils.setToken(loginDetail);
         return data;
          }else if(data['status']===401){
            console.log("here"+data.message);
            return data;
          }

			
  			
  	},
    (error)=>{
      console.log(error)
    }
   )
  	.catch(this.handleError);

  }

  register(fullName:string,email:string,password:string){
      let headers:Headers = new Headers();
    headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON)

  
    return this.http.post(URL+'/auth/signup',JSON.stringify({
                            fullName:fullName,
                            email:email,
                            password:password
                          }),{headers:headers})
                          .map((res)=>{
                             res=res.json();
                             if(res.status===201){
                               return this.userStatus=true;
                             }
                             return this.userStatus=false;
                              }
                         );
                        }

  readJWT(token:string){
  	let tokens:Array<any>=token.split('.');

   

  	let tokenPayload:any = JSON.parse(atob(tokens[1]));
  	let user:User = new User();
  	user=tokenPayload.sub;
    console.log(tokenPayload.sub);
 

  	return user;
  }

  handleError(error){
     console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }
}
