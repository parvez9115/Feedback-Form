import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss'],
})
export class AdmindashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private ajaxService: AjaxService // private firebaseX: FirebaseX, // private udid: UniqueDeviceID
  ) {}
  dashboardData = [
    { name: 'User', icon: 'person', color: '#eb79b2f1' },
    { name: 'Feedback', icon: 'book', color: '#ebb68bf1' },
    { name: 'BusinessLeads', icon: 'business', color: '#c694f0f1' },
    { name: 'Alerts', icon: 'alert', color: '#96eeacf1' },
    { name: 'Gate Master', icon: 'terminal', color: '#94757e' },
    { name: 'Gate Pass', icon: 'albums', color: '#c7b271' },

    { name: 'Gate Entry', icon: 'car-sport', color: '#8fc97b' },
    { name: 'Gate Entry Report', icon: 'reader', color: '#3e87d2' },
    { name: 'Settings', icon: 'settings', color: '#03befc' },
    { name: 'Profile', icon: 'person', color: '#d9eb97f1' },
    { name: 'Logout', icon: 'power', color: '#a2dcf3f1' },
  ];
  // {"name":"Settings","icon":"settings","color":"#a2dcf3f1"}
  routerUrl(data) {
    if (data == 'Alerts') {
      this.router.navigateByUrl('/alerts');
    } else if (data == 'Profile') {
      this.router.navigateByUrl('/adminregister');
    } else if (data == 'Feedback') {
      this.router.navigateByUrl('/adminfeedback');
    } else if (data == 'BusinessLeads') {
      this.router.navigateByUrl('/adminbusinesslead');
    } else if (data == 'User') {
      this.router.navigateByUrl('/adminuser');
    } else if (data == 'Settings') {
      this.router.navigateByUrl('/adminsetting');
    } else if (data == 'Gate Master') {
      this.router.navigateByUrl('/gatemaster');
    } else if (data == 'Gate Pass') {
      this.router.navigateByUrl('/gatepass');
    } else if (data == 'Gate Entry Report') {
      this.router.navigateByUrl('/gatepass-report');
    } else if (data == 'Gate Entry') {
      this.router.navigateByUrl('/gateentry');
    } else if (data == 'Logout') {
      window.localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  // async pushNotificationConfig() {
  //   let pushDetails: object;

  //   this.firebaseX.getToken().then((token) => {
  //     this.udid.get().then((uuid: any) => {
  //       pushDetails = {
  //         imeiNo: uuid,
  //         username: localStorage.loginData,
  //         deviceId: token,
  //         pushType: "ionic",
  //         pustStatus: true,
  //       };
  //       // console.log(uuid);
  //       // console.log(token);
  //       const url =
  //         "https://feedback.apmkingstrack.com/feedback/api/pushnotification";
  //       this.ajaxService.ajaxPutMethod(url, pushDetails).subscribe((res) => {
  //         console.log(res);
  //       });
  //     });
  //   });
  // }
  ngOnInit() {
    // this.pushNotificationConfig();
  }
}
