import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular'
import {  BehaviorSubject  } from 'rxjs';
import { Router } from '@angular/router';
// import { websocket } from '../interfaces/webSocket';
// import { WebAppInterface } from 'src/app/interfaces/AndroidNative';


// declare var Android: WebAppInterface;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading: boolean;
  public companyInfo = new BehaviorSubject('');
  subscription: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public router: Router,
    private platform: Platform
    ) { }
    
    async presentAlert(header, msg) {
      const alert = await this.alertController.create({
        header: header,
        message: msg,
        backdropDismiss: false,
        buttons: ['OK']
      });
      await alert.present();
    }
    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 6000
      });
      toast.present();
    }
    
    async presentLoader() {
      this.isLoading = true;
      return await this.loadingController.create({
        spinner: "circles",
        message: "Please Wait!",
        translucent: false,
        cssClass: 'custom-loader-class'
      }).then(a => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
    }
    
    async dismissLoader() {
      this.isLoading = false;
      return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    }
    
    updateLogo(item: any) {
      this.companyInfo.next(item);
    }
    
    commandsBasedOnModel(modelName: string, returnValue: string) {
      const data = JSON.parse(localStorage.getItem('commandsData'));
      for (let i = 0; i < data.length; i++) {
        if (data[i].hasOwnProperty(modelName)) {
          return data[i][modelName][returnValue];
        }
      }
    }
    
    liveTrackingStatus(modelName, status) {
      const ArmoronCommandsData = JSON.parse(localStorage.getItem('ArmoronCommandsData'));
      if (ArmoronCommandsData !== null) {
        if (ArmoronCommandsData.hasOwnProperty(modelName)) {
          if (ArmoronCommandsData[modelName].hasOwnProperty(status)) {
            return ArmoronCommandsData[modelName][status];
          } else {
            return status;
          }
        } else {
          return status;
        }
      } else {
        return status;
      }
    }
    
    updateCacheAddress(cacheAddress,liveDatas){
      if(cacheAddress){
        Object.keys(cacheAddress).forEach(vin => {
          liveDatas[vin]["location"] = cacheAddress[vin];
        });
      }     
      const dashboardData = {
        "liveDatas" : liveDatas,
        "dashboardData" : Object.values(liveDatas)
      }
      return dashboardData;
    }
    
    secondstoHHMMSSCal(currentTimeStamp, prevTimeStamp) {
      const diffrenceinSec = ((currentTimeStamp.getTime() - prevTimeStamp
      .getTime()) / 1000).toString();
      const sec_num = parseInt(diffrenceinSec, 10); // don't forget the second param
      const hours = Math.floor(sec_num / 3600);
      const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      const seconds = sec_num - (hours * 3600) - (minutes * 60);
      let hrs, mins, scnds;
      if (hours < 10) {
        hrs = '0' + hours;
      }
      if (minutes < 10) {
        mins = '0' + minutes;
      }
      if (seconds < 10) {
        scnds = '0' + seconds;
      }
      return hrs + ':' + mins + ':' + scnds;
    }
    
    timeConverter(format,returnType){
      const array = format.split(":");
      const json = {"d":array[0],"h":array[1],"m":array[2],"s":array[3]}
      let res:string = "";
      let hours: number = 0 ;
      Object.keys(json).forEach((element) => {
        if(returnType == "display"){
          if(json[element] !== "0" && json[element] !== "00"){
            res += json[element]+" "+element+" ";            
          }
        }else{
          switch(element){
            case "d":
            hours += parseInt(array[0])*24  ;
            break;
            case "h":
            hours += parseInt(array[1])  ;
            break;
            case "m":
            hours += parseInt(array[2])/60  ;
            break;    
          }
        }
      })
      if(res == ""){res = "--"}
      const returnObj: object ={ "display" : res , "minutes" : hours};
      return returnObj[returnType];
    }
    

    async alarmPopup(header, msg) {
      const alarmPopup = await this.alertController.create({
        header: header,
        message: msg,
        backdropDismiss: true,
        cssClass : 'custom-popup',
        buttons: [
          {
            text : 'OK',
            handler: () => {
              // Android.stopMediaPlayer();
            }
          }
        ],
      });
      this.subscription = this.platform.backButton.subscribe(async ()=>{
        alarmPopup.dismiss();
        // Android.stopMediaPlayer();
      });
      await alarmPopup.present();
    }
    
  }
  