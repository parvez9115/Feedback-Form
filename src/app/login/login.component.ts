import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  eye_icon: string = 'eye-off';
  password_type: string = 'password';
  datas = {
    Name: 'apm',
  };
  data: {
    fullname: string;
    dateOfBirth: string;
    gender: string;
    designation: string;
    primaryMobileno: string;
    secondaryMobileno: string;
    mailId: string;
  };

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private ajaxService: AjaxService,
    private router: Router // private firebaseX: FirebaseX, // private udid: UniqueDeviceID
  ) {}

  showHidePass = () => {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
    this.eye_icon = this.eye_icon === 'eye' ? 'eye-off' : 'eye';
  };

  submit() {
    localStorage.setItem('loginData', this.login.value.userName);
    let url =
      'https://feedback.apmkingstrack.com/feedback/api/auth/admin/' +
      this.login.value.userName +
      '/' +
      this.login.value.password;
    this.ajaxService.ajaxGetObject(url).subscribe((res) => {
      var response = JSON.parse(res);
      if (response.message == 'Available') {
        this.router.navigateByUrl('/admindashboard');
        localStorage.setItem('details', JSON.stringify(res));
        // this.pushNotificationConfig();
      } else if (response.message == 'Password Mismatched') {
        this.commonService.presentToast(
          'Your password is mismatched, please enter correct password'
        );
      } else if (response.message == 'User Not Available') {
        this.commonService.presentToast(response.message);
        localStorage.removeItem('details');
        localStorage.setItem('details', JSON.stringify(this.datas));
        this.router.navigateByUrl('/adminregister');
      }
    });
  }

  // async pushNotificationConfig() {
  //   let pushDetails: object;
  //   this.firebaseX.getToken().then((token) => {
  //     this.udid.get().then((uuid: any) => {
  //       pushDetails = {
  //         imeiNo: uuid,
  //         username: this.login.value.userName,
  //         deviceId: token,
  //         pushType: "ionic",
  //         pustStatus: true,
  //       };
  //       console.log(uuid);
  //       console.log(token);
  //       const url =
  //         "https://feedback.apmkingstrack.com/feedback/api/pushnotification";
  //       this.ajaxService.ajaxPutMethod(url, pushDetails).subscribe((res) => {
  //         console.log(res);
  //       });
  //     });
  //   });
  // }

  reg() {
    localStorage.removeItem('details');
    localStorage.setItem('details', JSON.stringify({ Name: 'gokul' }));
  }

  ionViewWillEnter() {
    this.login.reset();
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.login.reset();
  }
}
