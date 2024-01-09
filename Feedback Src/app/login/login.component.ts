import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AjaxService } from "../ajax.service";
import { Router } from "@angular/router";
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
login:FormGroup;
eye_icon: string = "eye-off";
password_type: string = "password";
datas={
  "Name":"apm",
};
  data: { fullname: string; dateOfBirth: string; gender: string; designation: string; primaryMobileno: string; secondaryMobileno: string; mailId: string; };
  constructor(private formBuilder: FormBuilder,private commonService:CommonService,private ajaxService : AjaxService,private router: Router,  private firebaseX: FirebaseX, private udid: UniqueDeviceID) { }
//   Put ==> http://localhost:8080/Feedback/api/add/admin
// Body ==> 
showHidePass = () => {
  this.password_type = this.password_type === "text" ? "password" : "text";
  this.eye_icon = this.eye_icon === "eye" ? "eye-off" : "eye";
}
submit(){
//   var data={"username":this.login.value.userName,"password":this.login.value.password};
//  let url='http://localhost:8080/Feedback/api/add/admin';
localStorage.setItem('loginData',this.login.value.userName);
let url='http://apmkingstrack.com:9080/Feedback/api/auth/admin/{"username":'+JSON.stringify(this.login.value.userName)+',"password":'+JSON.stringify(this.login.value.password)+'}'
  this.ajaxService.ajaxGetObject(url).subscribe(res =>{
    // console.log(res);
    if(res.message =='Available'){
      this.router.navigateByUrl('/admindashboard');
      localStorage.setItem("details",JSON.stringify(res));
       this.pushNotificationConfig();
    }else if(res.message =='Password Mismatched'){
      this.commonService.presentToast("Your password is mismatched, please enter correct password");
      // this.router.navigateByUrl('/adminregister');
    }else if(res.message =='User Not Available'){
      localStorage.removeItem("details");
      localStorage.setItem("details",JSON.stringify(this.datas));
      this.router.navigateByUrl('/adminregister');
    }
  })  
}
 async pushNotificationConfig  () {
    let pushDetails : object;
  
         this.firebaseX.getToken()
           .then(token =>{ 
          
            this.udid.get()
             .then((uuid: any) =>{ 
        
              pushDetails =  
              {"imeiNo":uuid,
              "username":this.login.value.userName,
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
        reg(){
          localStorage.removeItem("details");
          localStorage.setItem("details",JSON.stringify({"Name":"gokul"}));
        }         
       
        // ngAfterViewInit() {
        //  this.login.reset();
        //  console.log("asdfs")
        // }
        ionViewWillEnter(){
          
            this.login.reset();
      }
      
  ngOnInit() {
this.login =this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
    })
    this.login.reset();

//  this.data={
//       "fullname":"gokul",
//       "dateOfBirth":"19-01-1999",
//       "gender":"male",
//       "designation":"softwaredev",
//       "primaryMobileno":"9962139969",
//       "secondaryMobileno":"",
//       "mailId":"gokul@apmkingstrack.com"
//       };
//       localStorage.setItem("details",JSON.stringify(this.data));
  }
    
}
