import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Detail } from '../model/detail.model';
import * as Crypto from 'crypto-js';



// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


/*import API_URL from '../utils/constant';
*/
const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
/*const URL:string ='http://localhost:3000/api';
*/
const URL:string ='http://192.168.1.9:3000/api';

import { StorageUtils } from '../utils/storageUtils';

/*
  Generated class for the Home provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HomeService {
  data:any;
  
  constructor(public http: Http) {
  	
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
  loadData(){
    let headers:Headers = new Headers;
    headers.append('Authorization','Basic '+StorageUtils.getToken());

    return this.http.get(URL+'/details',{headers:headers})
    .map((res)=>{
      this.data=res.json()
      console.log(this.data);

            if(this.data.success===true)
                   for(let item of this.data.result){

                          console.log("password before decrtyption"+item.password)
                        let decrypttext = Crypto.AES.decrypt(item.password, '1ep11is023guessMenot');
                        item.password=decrypttext.toString(Crypto.enc.Utf8);
                        console.log("inside item after encrypteio"+item.password);
                   }
                    return this.data.result;

    },
    (error)=>console.log(error))
    /*.catch(this.handleError);*/
  }

  addDetail(username:string,password:string,type:string){
    let ciphertext = Crypto.AES.encrypt(password, '1ep11is023guessMenot');
      console.log(ciphertext.toString());
     
          let headers:Headers=new Headers();
          console.log("inside add detail service");
          headers.append('Authorization','Basic '+ StorageUtils.getToken());
           headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return  this.http.post(URL+'/detail',
            JSON.stringify({
              username:username,
              password:ciphertext.toString(),
              type:type

            }),
            {headers:headers})
          .map((res)=>{
            console.log("add detail rsponse"+res);
            this.data=res.json();
            if(this.data.status===201 && this.data.success=== true){
                  return this.data;
            }else{
              return this.data.message;
            }


          })
  }

   updateDetail(detail:Detail){
    let ciphertext = Crypto.AES.encrypt(detail.password, '1ep11is023guessMenot');
       detail.password=ciphertext.toString();
          let headers:Headers=new Headers();
          console.log("inside add detail service");
          headers.append('Authorization','Basic '+ StorageUtils.getToken());
           headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
        return  this.http.put(URL+'/detail',
            JSON.stringify({
              detail

            }),
            {headers:headers})
          .map((res)=>{
            this.data=res.json();
           
              return this.data;
            


          })
        }
    deleteItem(item:Detail){
       let headers:Headers=new Headers();
          console.log("inside add detail service");
          headers.append('Authorization','Basic '+ StorageUtils.getToken());
           headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
          return this.http.delete(URL+'/detail/'+item._id,{headers:headers})
          .map((res)=>{

            res=res.json()
            return res; }
            );
         
    }
  logout(){
     StorageUtils.removeAccount();
      StorageUtils.removeToken();
  }
   

   handleError(error){
     console.error(error);
        return Observable.throw(error.json().error || 'Server error');
  }

}
