import { Component } from '@angular/core';
import { NavController,ToastController,
 NavParams,
 ActionSheetController,
 LoadingController,
 Platform,
 Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
	 imagePath: string = null;
  loading: Loading;
  public base64Image: string;
  public bgImage:string=null;
  public imageNewPath:string;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public actionSheetCtrl:ActionSheetController,
   public toastCtrl: ToastController, 
   public platform: Platform,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
 public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Gallery',
          icon:'albums',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          icon:'camera',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  
  uploadPhoto() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    let filename = this.imagePath.split('/').pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg"
     /* params: { 'title': this.postTitle, 'description': this.desc }*/
    };


    const fileTransfer = new Transfer();

    fileTransfer.upload(this.imageNewPath,'',
      options).then((entry) => {
        this.imagePath = '';
       
        
      }, (err) => {
        alert(JSON.stringify(err));
      });
  }

  	public takePicture(sourceType){
  		

        let options={
           sourceType: sourceType,
          destinationType:Camera.DestinationType.FILE_URI,
                
          encodingType:Camera.EncodingType.JPEG,
          saveToPhotoAlbum:true
         
        };

        // Get the data of an image
 /* Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          console.log(correctPath);
         console.log(currentName);

        this.copyFileToLocalDir(correctPath, currentName);
      });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      console.log(correctPath);
      this.copyFileToLocalDir(correctPath, currentName);
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}*/

// Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
        console.log("file Path"+filePath);
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
         console.log("correct Path="+correctPath);

          let currentName = filePath.substring(filePath.lastIndexOf('/') + 1);
          console.log("current name="+ currentName);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.imagePath = cordova.file.dataDirectory + newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
      /*  Camera.getPicture(options).then((imgUrl) => {
            console.log(imgUrl);*/
           /* this.imagePath=imgUrl;*/
    /*var sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      var sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      console.log(sourceFileName);
      sourceFileName = sourceFileName.split('?').shift();
      console.log(sourceFileName);
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath = imgUrl;
       

        this.imageNewPath = result.nativeURL;
        console.log("image new path="+this.imageNewPath);


      }, (err) => {
        alert(JSON.stringify(err));
      })*/
   
 

	private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
}