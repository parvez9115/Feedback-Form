import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from '../ajax.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit {

  constructor(private router: Router, private ajaxService : AjaxService,  private firebaseX: FirebaseX, private udid: UniqueDeviceID) { }
dashboardData =[{"name":"User","icon":"person-circle","color":"#eb79b2f1"},{"name":"Feedback","icon":"newspaper","color":"#ebb68bf1"},{"name":"BusinessLeads","icon":"business","color":"#c694f0f1"},
{"name":"Alerts","icon":"alert-circle","color":"#96eeacf1"},{"name":"Profile","icon":"person","color":"#d9eb97f1"},
{"name":"Logout","icon":"power","color":"#a2dcf3f1"}]
// {"name":"Settings","icon":"settings","color":"#a2dcf3f1"}
routerUrl(data){
  if(data=="Alerts"){
    this.router.navigateByUrl('/alerts');
  }else if(data=="Profile"){
    this.router.navigateByUrl('/adminregister');
  }else if(data=="Feedback"){
    this.router.navigateByUrl('/adminfeedback');
  }else if(data=="BusinessLeads"){
    this.router.navigateByUrl('/adminbussinesslead');
  }else if(data=="User"){
    this.router.navigateByUrl('/adminuser');
  }else if(data=="Logout"){
    window.localStorage.clear();
   this.router.navigateByUrl('/login');
  }
  }
  

  async pushNotificationConfig  () {
    let pushDetails : object;
  
         this.firebaseX.getToken()
           .then(token =>{ 
          
            this.udid.get()
             .then((uuid: any) =>{ 
          pushDetails =  
              {"imeiNo":uuid,
              "username": localStorage.loginData,
              "deviceId":token,
              "pushType":"ionic",
              "pustStatus":true};
              // console.log(uuid);
              // console.log(token);
              const url =  'http://apmkingstrack.com:9080/Feedback/api/pushnotification';
              this.ajaxService.ajaxPutMethod(url,pushDetails)
              .subscribe(res =>{
          console.log(res);
              }) 
            })
          })
        }
ngOnInit() {
    this.pushNotificationConfig();
}
}
