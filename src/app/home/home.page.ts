import { Component } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public number1: any;

  public color: any;

  phonenumber: any;
  public otp: any;
  generatedOtp: any;
  public name: any;
  sendOtpClr = 'dark';
  regBtn: boolean = false;
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router,
    private ajaxService: AjaxService
  ) {}
  //   myFunction(value){
  //     console.log("helo");
  //     console.log(this.name);
  //     if(value === "number1"){
  //     if(this.number1 === null ){
  //       this.color="silver";
  //     }
  //     else if (JSON.stringify(this.number1).length > 1){
  //       this.color='red';
  //     }

  // }else if(value === "number2"){
  //   if(this.number2 === null ){
  //     this.color1="silver";
  //   }
  //   else if (JSON.stringify(this.number1).length > 1){
  //     this.color1='red';
  //   }
  // }
  //   }
  isDisabled: boolean = true;
  isDisabled1: boolean = true;
  public hide: boolean = true;
  otpVerify() {
    if (JSON.stringify(this.otp) === this.generatedOtp) {
      this.isDisabled1 = false;
    }
  }
  getOtp() {
    this.regBtn = true;
    this.isDisabled = false;
    var digits = '123456789';
    this.generatedOtp = '';
    for (let i = 0; i < 4; i++) {
      this.generatedOtp += digits[Math.floor(Math.random() * 9)];
    }
    //  var encodeNum = encodeURI(this.number1);
    // var mes='your otp is '+ this.generatedOtp+'';
    // var encodeMes =encodeURI(mes);
    var url1 = 'https://feedback.apmkingstrack.com/feedback/api/otp';
    var data = { toNumber: this.number1.toString(), otp: this.generatedOtp };
    // var url='https://control.msg91.com/api/sendhttp.php?authkey=106304ADx2uldkCr4G56d58def&mobiles='+encodeNum+'&message='+encodeMes+'&sender=KTRACK&route=4&country=91&unicode=1';
    this.ajaxService.ajaxPutMethod(url1, data).subscribe((res) => {
      console.log(res);
    });
  }

  reg() {
    this.commonService.presentToast(
      'You are not an registered user, please register'
    );
  }

  submit() {
    // localStorage.setItem("number",this.number1)
    // localStorage.setItem("otp",this.otp)

    this.commonService.presentLoader();
    if (JSON.stringify(this.otp) === this.generatedOtp) {
      let url =
        'https://feedback.apmkingstrack.com/feedback/api/auth/' +
        this.number1 +
        '';
      this.ajaxService.ajaxGetObject(url).subscribe((res) => {
        //  console.log(res);
        localStorage.setItem('userid', JSON.parse(res).userid);
        if (JSON.parse(res).message == 'Available') {
          this.router.navigateByUrl('/feedbackform');
          (this.number1 = ''), (this.otp = '');
        } else {
          this.router.navigateByUrl('/registerform');
          this.commonService.presentToast(
            'You are not an registered user, please register'
          );
        }
      });
    } else {
      alert('entered otp is wrong');
    }
    this.commonService.dismissLoader();
  }
  valid() {
    if (
      JSON.stringify(this.number1).length === 9 ||
      JSON.stringify(this.number1).length === 10
    ) {
      this.hide = false;
      this.sendOtpClr = 'primary';
    } else {
      this.hide = true;
      this.sendOtpClr = 'dark';
    }
  }

  public language = {
    english: {
      'Registered Mobile Number': 'Registered Mobile Number',
      'send otp': 'SEND OTP',
      'enter otp': 'Enter OTP',
      register: 'REGISTER',
      submit: 'SUBMIT',
      feedbackform: 'FeedBack Form',
      "Let's get in touch": "Let's get in touch",
    },
    tanzania: {
      'Registered Mobile Number': 'Registered Mobile Number',
      'send otp': 'SEND OTP',
      'enter otp': 'Enter OTP',
      register: 'REGISTER',
      submit: 'SUBMIT',
      feedbackform: 'FeedBack Form',
      "Let's get in touch": "Let's get in touch",
    },
  };
  /* translate Funciton */
  public register: any;
  public sendOtp: any;
  public enterOtp: any;
  public regButton: any;
  public sub: any;
  public feedbackform: any;
  public word: any;

  ionViewWillEnter() {
    this.register = this.language['english']['Registered Mobile Number'];
    this.sendOtp = this.language['english']['send otp'];
    this.enterOtp = this.language['english']['enter otp'];
    this.regButton = this.language['english']['register'];
    this.sub = this.language['english']['submit'];
    this.feedbackform = this.language['english']['feedbackform'];
    this.word = this.language['english']["Let's get in touch"];
    var data = JSON.stringify({
      userid: 'User ID',
      primaryContact: 'Primary Contact',
      customerId: 'Customer ID',
      vehicleRegNo: 'Vehicle Reg No',
      customerName: 'Your Name',
      memberId: 'Member ID',
      passportNo: 'Passport No',
      companyName: 'Company Name',
      position: 'Position',
      town: 'Town',
      country: 'Country',
      mobileNo2: 'Mobile No 2',
      mobileNo3: 'Mobile No 3',
      mobileNo4: 'Mobile No 4',
      mobileNo5: 'Mobile No 5',
      whatsappNo1: 'Whatsapp No 1',
      whatsappNo2: 'Whatsapp No 2',
    });
    localStorage.setItem('userDetails', data);
  }

  customTranslate(text) {
    if (text === 'tan') {
      //     return englishText[text];
      this.register = this.language['tanzania'].register;
      this.sendOtp = this.language['tanzania']['send otp'];
      this.enterOtp = this.language['tanzania']['enter otp'];
      this.sub = this.language['tanzania']['submit'];
      this.feedbackform = this.language['tanzania']['feedbackform'];
      this.word = this.language['tanzania']["Let's get in touch"];
    } else {
      this.register = this.language['english'].register;
      this.sendOtp = this.language['english']['send otp'];
      this.enterOtp = this.language['english']['enter otp'];
      this.regButton = this.language['english']['register'];
      this.sub = this.language['english']['submit'];
      this.feedbackform = this.language['english']['feedbackform'];
      this.word = this.language['english']["Let's get in touch"];
    }
  }
}
