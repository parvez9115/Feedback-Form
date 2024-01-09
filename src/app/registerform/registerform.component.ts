import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss'],
})
export class RegisterformComponent implements OnInit {
  public num: any;
  // public number2:any;
  details: FormGroup;
  public color: any;
  public color1: any;
  public color2: any;
  public color3: any;
  public color4: any;
  public color5: any;
  public color6: any;

  //  phonenumber: any;
  public otp1: number;
  public generatedOtp: any;
  public name: any;
  public nationalId: any;
  public customerId: any;
  public companyName: any;
  public vehicleregistrationNo: any;
  public position: any;
  public town: any;
  public country: any;
  public memberNo: any;
  public primaryContact: any;
  public secondaryContact: any;
  public mobile3: any;
  public mobile4: any;
  public mobile5: any;
  public mobile6: any;
  public mobile7: any;
  isDisabled1: boolean = true;
  sendBtn1: boolean = true;
  sendBtn2: boolean = true;
  sendBtn3: boolean = true;
  sendBtn4: boolean = true;
  sendBtn5: boolean = true;
  sendBtn6: boolean = true;
  sendBtn7: boolean = true;
  isDisabled: boolean = true;
  numb: any;
  otp: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;
  otp7: any;
  public placeHolder = 'Primary Contact';
  // placeHolderOtp="Enter OTP";
  sendOtp: string;
  enterOtp: string;
  sub: string;
  feedbackform: string;
  word: string;
  btnClr1 = 'dark';
  btnClr2 = 'dark';
  btnClr3 = 'dark';
  btnClr4 = 'dark';
  btnClr5 = 'dark';
  btnClr6 = 'dark';
  btnClr7 = 'dark';
  userDetails: any;

  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService
  ) {}
  myFunction(value) {
    if (value === 'number1') {
      this.primaryContact = this.details.value.primaryContact;
      if (this.primaryContact === null) {
        this.color = 'silver';
      } else if (JSON.stringify(this.primaryContact).length >= 1) {
        this.color = 'red';
      }
      if (
        JSON.stringify(this.primaryContact).length === 9 ||
        JSON.stringify(this.primaryContact).length === 10
      ) {
        this.sendBtn1 = false;
        this.btnClr1 = 'primary';
      } else {
        this.sendBtn1 = true;
        this.btnClr1 = 'dark';
      }
    } else if (value == 'number2') {
      this.secondaryContact = this.details.value.secondaryContact;
      if (this.secondaryContact === null) {
        this.color1 = 'silver';
      } else if (JSON.stringify(this.secondaryContact).length >= 1) {
        this.color1 = 'red';
      }
      if (
        JSON.stringify(this.secondaryContact).length === 9 ||
        JSON.stringify(this.secondaryContact).length === 10
      ) {
        this.sendBtn2 = false;
        this.btnClr2 = 'primary';
      } else {
        this.sendBtn2 = true;
        this.btnClr2 = 'dark';
      }
    } else if (value == 'number3') {
      this.mobile3 = this.details.value.mobile3;
      if (this.mobile3 === null) {
        this.color2 = 'silver';
      } else if (JSON.stringify(this.mobile3).length >= 1) {
        this.color2 = 'red';
      }
      if (
        JSON.stringify(this.mobile3).length === 9 ||
        JSON.stringify(this.mobile3).length === 10
      ) {
        this.sendBtn3 = false;
        this.btnClr3 = 'primary';
      } else {
        this.sendBtn3 = true;
        this.btnClr3 = 'dark';
      }
    } else if (value == 'number4') {
      this.mobile4 = this.details.value.mobile4;
      if (this.mobile4 === null) {
        this.color3 = 'silver';
      } else if (JSON.stringify(this.mobile4).length >= 1) {
        this.color3 = 'red';
      }
      if (
        JSON.stringify(this.mobile4).length === 9 ||
        JSON.stringify(this.mobile4).length === 10
      ) {
        this.sendBtn4 = false;
        this.btnClr4 = 'primary';
      } else {
        this.sendBtn4 = true;
        this.btnClr4 = 'dark';
      }
    } else if (value == 'number5') {
      this.mobile5 = this.details.value.mobile5;
      if (this.mobile5 === null) {
        this.color4 = 'silver';
      } else if (JSON.stringify(this.mobile5).length >= 1) {
        this.color4 = 'red';
      }
      if (
        JSON.stringify(this.mobile5).length === 9 ||
        JSON.stringify(this.mobile5).length === 10
      ) {
        this.sendBtn5 = false;
        this.btnClr5 = 'primary';
      } else {
        this.sendBtn5 = true;
        this.btnClr5 = 'dark';
      }
    } else if (value == 'number6') {
      this.mobile6 = this.details.value.mobile6;
      if (this.mobile6 === null) {
        this.color5 = 'silver';
      } else if (JSON.stringify(this.mobile6).length >= 1) {
        this.color5 = 'red';
      }
      if (
        JSON.stringify(this.mobile6).length === 9 ||
        JSON.stringify(this.mobile6).length === 10
      ) {
        this.sendBtn6 = false;
        this.btnClr6 = 'primary';
      } else {
        this.sendBtn6 = true;
        this.btnClr6 = 'dark';
      }
    } else if (value == 'number7') {
      this.mobile7 = this.details.value.mobile7;
      if (this.mobile7 === null) {
        this.color6 = 'silver';
      } else if (JSON.stringify(this.mobile7).length >= 1) {
        this.color6 = 'red';
      }
      if (
        JSON.stringify(this.mobile7).length === 9 ||
        JSON.stringify(this.mobile7).length === 10
      ) {
        this.sendBtn7 = false;
        this.btnClr7 = 'primary';
      } else {
        this.sendBtn7 = true;
        this.btnClr7 = 'dark';
      }
    }
  }
  public data = {
    mobile1: { otp: '', number: '', isverify: '' },
    mobile2: { otp: '', number: '', isverify: '' },
    mobile3: { otp: '', number: '', isverify: '' },
    mobile4: { otp: '', number: '', isverify: '' },
    mobile5: { otp: '', number: '', isverify: '' },
    mobile6: { otp: '', number: '', isverify: '' },
    mobile7: { otp: '', number: '', isverify: '' },
  };
  //  verify otp and changing the color

  verify(phonenumber, key) {
    if (key == 'mobile1') {
      this.otp1 = this.details.value.otp1;

      if (
        phonenumber.value == this.data.mobile1.number &&
        JSON.stringify(this.otp1) == this.data.mobile1.otp
      ) {
        this.color = 'green';
        this.data.mobile1.isverify = 'verifed';
        if (this.details.valid == true) {
          this.isDisabled = false;
        }
      } else if (phonenumber.value == '') {
        this.data.mobile1.isverify = 'notused';
      } else if (JSON.stringify(this.otp1) != this.data.mobile1.otp) {
        this.data.mobile1.isverify = 'notverfied';
        this.color = 'red';
      }
    } else if (key == 'mobile2') {
      this.otp2 = this.details.value.otp2;
      if (
        phonenumber.value == this.data.mobile2.number &&
        JSON.stringify(this.otp2) == this.data.mobile2.otp
      ) {
        this.color1 = 'green';
        this.data.mobile2.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile2.isverify = 'notused';
      } else if (JSON.stringify(this.otp2) != this.data.mobile2.otp) {
        this.data.mobile2.isverify = 'notverfied';
        this.color1 = 'red';
      }
    } else if (key == 'mobile3') {
      this.otp3 = this.details.value.otp3;
      if (
        phonenumber.value == this.data.mobile3.number &&
        JSON.stringify(this.otp3) == this.data.mobile3.otp
      ) {
        this.color2 = 'green';
        this.data.mobile3.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile3.isverify = 'notused';
      } else if (JSON.stringify(this.otp3) != this.data.mobile3.otp) {
        this.data.mobile3.isverify = 'notverfied';
        this.color2 = 'red';
      }
    } else if (key == 'mobile4') {
      this.otp4 = this.details.value.otp4;
      if (
        phonenumber.value == this.data.mobile4.number &&
        JSON.stringify(this.otp4) == this.data.mobile4.otp
      ) {
        this.color3 = 'green';
        this.data.mobile4.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile4.isverify = 'notused';
      } else if (JSON.stringify(this.otp4) != this.data.mobile4.otp) {
        this.data.mobile4.isverify = 'notverfied';
        this.color3 = 'red';
      }
    } else if (key == 'mobile5') {
      this.otp5 = this.details.value.otp5;
      if (
        phonenumber.value == this.data.mobile5.number &&
        JSON.stringify(this.otp5) == this.data.mobile5.otp
      ) {
        this.color4 = 'green';
        this.data.mobile5.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile5.isverify = 'notused';
      } else if (JSON.stringify(this.otp5) != this.data.mobile5.otp) {
        this.data.mobile5.isverify = 'notverfied';
        this.color4 = 'red';
      }
    } else if (key == 'mobile6') {
      this.otp6 = this.details.value.otp6;
      if (
        phonenumber.value == this.data.mobile6.number &&
        JSON.stringify(this.otp6) == this.data.mobile6.otp
      ) {
        this.color5 = 'green';
        this.data.mobile6.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile6.isverify = 'notused';
      } else if (JSON.stringify(this.otp6) != this.data.mobile6.otp) {
        this.data.mobile6.isverify = 'notverfied';
        this.color5 = 'red';
      }
    } else if (key == 'mobile7') {
      this.otp7 = this.details.value.otp7;
      if (
        phonenumber.value == this.data.mobile7.number &&
        JSON.stringify(this.otp7) == this.data.mobile7.otp
      ) {
        this.color6 = 'green';
        this.data.mobile7.isverify = 'verifed';
      } else if (phonenumber.value == '') {
        this.data.mobile7.isverify = 'notused';
      } else if (JSON.stringify(this.otp7) != this.data.mobile7.otp) {
        this.data.mobile7.isverify = 'notverfied';
        this.color6 = 'red';
      }
    }
  }

  getOtp(phonenumber, key) {
    if (phonenumber.value.length == 9 || phonenumber.value.length == 10) {
      var digits = '123456789';
      this.generatedOtp = '';
      for (let i = 0; i < 4; i++) {
        this.generatedOtp += digits[Math.floor(Math.random() * 9)];
      }

      //  var encodeNum = encodeURI(phonenumber.value);
      //  var mes='your otp is '+ this.generatedOtp+'';
      //  var encodeMes =encodeURI(mes);
      //  var url='https://control.msg91.com/api/sendhttp.php?authkey=106304ADx2uldkCr4G56d58def&mobiles='+encodeNum+'&message='+encodeMes+'&sender=KTRACK&route=4&country=91&unicode=1';
      //  this.http.get(url).subscribe(res =>{

      //  })
      var url1 = 'https://feedback.apmkingstrack.com/feedback/api/otp';
      var data = { toNumber: phonenumber.value, otp: this.generatedOtp };
      // var url='https://control.msg91.com/api/sendhttp.php?authkey=106304ADx2uldkCr4G56d58def&mobiles='+encodeNum+'&message='+encodeMes+'&sender=KTRACK&route=4&country=91&unicode=1';
      this.ajaxService.ajaxPutMethod(url1, data).subscribe((res) => {
        // console.log(res);
      });
      if (key == 'mobile1') {
        this.data.mobile1.number = phonenumber.value;
        this.data.mobile1.otp = this.generatedOtp;
      } else if (key == 'mobile2') {
        this.data.mobile2.number = phonenumber.value;
        this.data.mobile2.otp = this.generatedOtp;
      } else if (key == 'mobile3') {
        this.data.mobile3.number = phonenumber.value;
        this.data.mobile3.otp = this.generatedOtp;
      } else if (key == 'mobile4') {
        this.data.mobile4.number = phonenumber.value;
        this.data.mobile4.otp = this.generatedOtp;
      } else if (key == 'mobile5') {
        this.data.mobile5.number = phonenumber.value;
        this.data.mobile5.otp = this.generatedOtp;
      } else if (key == 'mobile6') {
        this.data.mobile6.number = phonenumber.value;
        this.data.mobile6.otp = this.generatedOtp;
      } else if (key == 'mobile7') {
        this.data.mobile7.number = phonenumber.value;
        this.data.mobile7.otp = this.generatedOtp;
      }
    } else {
      this.commonService.presentToast('please enter 9 or 10 digits number');
    }
  }
  submit() {
    this.commonService.presentLoader();
    var datas = {
      primaryContact: this.details.value.primaryContact + '',
      customerId: this.details.value.customerId,
      vehicleRegNo: this.details.value.vehicleregistrationNo,
      customerName: this.details.value.name,
      memberId: this.details.value.memberNo,
      passportNo: this.details.value.nationalId,
      companyName: this.details.value.companyName,
      position: this.details.value.position,
      town: this.details.value.town,
      country: this.details.value.country,
      mobileNo2: this.data.mobile2.number,
      mobileNo3: this.data.mobile3.number,
      mobileNo4: this.data.mobile4.number,
      mobileNo5: this.data.mobile5.number,
      whatsappNo1: this.data.mobile6.number,
      whatsappNo2: this.data.mobile7.number,
    };
    if (JSON.stringify(this.otp1) == this.data.mobile1.otp) {
      let url = 'https://feedback.apmkingstrack.com/feedback/api/add/user';
      this.ajaxService.ajaxPutMethod(url, datas).subscribe((res) => {
        localStorage.setItem('userid', res.userid);
        if (JSON.parse(res).message == 'Persisted') {
          this.router.navigateByUrl('/feedbackform');
        } else {
          this.router.navigateByUrl('/registerform');
        }
      });
    } else {
      this.commonService.presentToast('please enter correct otp number');
      //  alert("please enter correct otp number");
    }
    this.commonService.dismissLoader();
  }
  public language = {
    english: {
      feedbackform: 'FeedBack Form',
      "Let's get in touch": "Let's get in touch",
      name: 'Name',
      'send otp': 'SEND OTP',
      'enter otp': 'Enter OTP',
      'National id/Passport No': 'National id/Passport No',
      submit: 'SUBMIT',
      'Customer ID': 'Customer ID',
      'Company Name': 'Company Name',
      'Vehicle Registration No': 'Vehicle Registration No',
      Position: 'Position',
      Town: 'Town',
      Country: 'Country',
      'Member ID No.': 'Member ID No.',
      'Primary Contact': 'Primary Contact',
      'Secondary Contact': 'Secondary Contact',
      'Mobile No.3': 'Mobile No.3',
      'Mobile No.4': 'Mobile No.4',
      'Mobile No.5': 'Mobile No.5',
      'Whatsapp No.1': 'Whatsapp No.1',
      'Whatsapp No.2': 'Whatsapp No.2',
    },
    tanzania: {
      feedbackform: 'FeedBack Form',
      "Let's get in touch": "Let's get in touch",
      name: 'Name',
      'send otp': 'SEND OTP',
      'enter otp': 'Enter OTP',
      'National id/Passport No': 'National id/Passport No',
      submit: 'SUBMIT',
      'Customer ID': 'Customer ID',
      'Company Name': 'Company Name',
      'Vehicle Registration No': 'Vehicle Registration No',
      Position: 'Position',
      Town: 'Town',
      Country: 'Country',
      'Member ID No.': 'Member ID No.',
      'Primary Contact': 'Primary Contact',
      'Secondary Contact': 'Secondary Contact',
      'Mobile No.3': 'Mobile No.3',
      'Mobile No.4': 'Mobile No.4',
      'Mobile No.5': 'Mobile No.5',
      'Whatsapp No.1': 'Whatsapp No.1',
      'Whatsapp No.2': 'Whatsapp No.2',
    },
  };

  customTranslate(text) {
    if (localStorage.getItem('language') === 'tan') {
      //     return englishText[text];
      this.name = this.language['tanzania'].name;
      this.sendOtp = this.language['tanzania']['send otp'];
      this.enterOtp = this.language['tanzania']['enter otp'];
      this.sub = this.language['tanzania']['submit'];
      this.nationalId = this.language['tanzania']['National id/Passport No'];
      this.customerId = this.language['tanzania']['Customer ID'];
      this.position = this.language['tanzania']['Position'];
      this.town = this.language['tanzania']['Town'];
      this.country = this.language['tanzania']['Country'];
      this.memberNo = this.language['tanzania']['Member ID No.'];
      this.primaryContact = this.language['tanzania']['Primary Contact'];
      this.secondaryContact = this.language['tanzania']['Secondary Contact'];
      this.mobile3 = this.language['tanzania']['Mobile No.3'];
      this.mobile4 = this.language['tanzania']['Mobile No.4'];
      this.mobile5 = this.language['tanzania']['Mobile No.5'];
      this.mobile6 = this.language['tanzania']['Whatsapp No.1'];
      this.mobile7 = this.language['tanzania']['Whatsapp No.2'];
      this.companyName = this.language['tanzania']['Company Name'];
      this.vehicleregistrationNo =
        this.language['tanzania']['Vehicle Registration No'];
      this.feedbackform = this.language['english']['feedbackform'];
      this.word = this.language['english']["Let's get in touch"];
    } else {
      this.name = this.language['tanzania'].name;
      this.sendOtp = this.language['tanzania']['send otp'];
      this.enterOtp = this.language['tanzania']['enter otp'];
      this.sub = this.language['tanzania']['submit'];
      this.nationalId = this.language['tanzania']['National id/Passport No'];
      this.customerId = this.language['tanzania']['Customer ID'];
      this.position = this.language['tanzania']['Position'];
      this.town = this.language['tanzania']['Town'];
      this.country = this.language['tanzania']['Country'];
      this.memberNo = this.language['tanzania']['Member ID No.'];
      this.primaryContact = this.language['tanzania']['Primary Contact'];
      this.secondaryContact = this.language['tanzania']['Secondary Contact'];
      this.mobile3 = this.language['tanzania']['Mobile No.3'];
      this.mobile4 = this.language['tanzania']['Mobile No.4'];
      this.mobile5 = this.language['tanzania']['Mobile No.5'];
      this.mobile6 = this.language['tanzania']['Whatsapp No.1'];
      this.mobile7 = this.language['tanzania']['Whatsapp No.2'];
      this.companyName = this.language['tanzania']['Company Name'];
      this.vehicleregistrationNo =
        this.language['tanzania']['Vehicle Registration No'];
      this.feedbackform = this.language['english']['feedbackform'];
      this.word = this.language['english']["Let's get in touch"];
    }
  }

  ngOnInit() {
    // this.details.reset();

    this.details = this.formBuilder.group({
      name: ['', Validators.required],
      nationalId: ['', Validators.required],
      customerId: ['', Validators.required],
      vehicleregistrationNo: ['', Validators.required],
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      memberNo: ['', Validators.required],
      primaryContact: ['', Validators.required],
      secondaryContact: [''],
      mobile3: [''],
      mobile4: [''],
      mobile5: [''],
      mobile6: [''],
      mobile7: [''],
      otp1: ['', Validators.required],
      otp2: [''],
      otp3: [''],
      otp4: [''],
      otp5: [''],
      otp6: [''],
      otp7: [''],
    });
    // this.numb=localStorage.getItem("number");
    // this.otp=localStorage.getItem("otp");
    // if(this.numb > 1){
    //   this.placeHolder = this.numb;
    //   this.placeHolderOtp=this.otp
    //   this.color="green";
    // }
    if (localStorage.getItem('language') === 'tan') {
      this.name = this.language['tanzania'].name;
      this.sendOtp = this.language['tanzania']['send otp'];
      this.enterOtp = this.language['tanzania']['enter otp'];
      this.sub = this.language['tanzania']['submit'];
      this.nationalId = this.language['tanzania']['National id/Passport No'];
      this.customerId = this.language['tanzania']['Customer ID'];
      this.position = this.language['tanzania']['Position'];
      this.town = this.language['tanzania']['Town'];
      this.country = this.language['tanzania']['Country'];
      this.memberNo = this.language['tanzania']['Member ID No.'];
      this.primaryContact = this.language['tanzania']['Primary Contact'];
      this.secondaryContact = this.language['tanzania']['Secondary Contact'];
      this.mobile3 = this.language['tanzania']['Mobile No.3'];
      this.mobile4 = this.language['tanzania']['Mobile No.4'];
      this.mobile5 = this.language['tanzania']['Mobile No.5'];
      this.mobile6 = this.language['tanzania']['Whatsapp No.1'];
      this.mobile7 = this.language['tanzania']['Whatsapp No.2'];
      this.companyName = this.language['tanzania']['Company Name'];
      this.vehicleregistrationNo =
        this.language['tanzania']['Vehicle Registration No'];
      this.feedbackform = this.language['tanzania']['feedbackform'];
      this.word = this.language['tanzania']["Let's get in touch"];
    } else {
      this.name = this.language['tanzania'].name;
      this.sendOtp = this.language['tanzania']['send otp'];
      this.enterOtp = this.language['tanzania']['enter otp'];
      this.sub = this.language['tanzania']['submit'];
      this.nationalId = this.language['tanzania']['National id/Passport No'];
      this.customerId = this.language['tanzania']['Customer ID'];
      this.position = this.language['tanzania']['Position'];
      this.town = this.language['tanzania']['Town'];
      this.country = this.language['tanzania']['Country'];
      this.memberNo = this.language['tanzania']['Member ID No.'];
      this.primaryContact = this.language['tanzania']['Primary Contact'];
      this.secondaryContact = this.language['tanzania']['Secondary Contact'];
      this.mobile3 = this.language['tanzania']['Mobile No.3'];
      this.mobile4 = this.language['tanzania']['Mobile No.4'];
      this.mobile5 = this.language['tanzania']['Mobile No.5'];
      this.mobile6 = this.language['tanzania']['Whatsapp No.1'];
      this.mobile7 = this.language['tanzania']['Whatsapp No.2'];
      this.companyName = this.language['tanzania']['Company Name'];
      this.vehicleregistrationNo =
        this.language['tanzania']['Vehicle Registration No'];
      this.feedbackform = this.language['english']['feedbackform'];
      this.word = this.language['english']["Let's get in touch"];
    }

    if (localStorage.getItem('userDetails').length >= 1) {
      var data = JSON.parse(localStorage.getItem('userDetails'));
      this.name = data.customerName;
      this.nationalId = data.passportNo;
      this.customerId = data.customerName;
      this.companyName = data.companyName;
      this.vehicleregistrationNo = data.vehicleRegNo;
      this.town = data.town;
      this.position = data.position;
      this.country = data.country;
      this.memberNo = data.memberId;
      this.primaryContact = data.primaryContact;
      this.secondaryContact = data.mobileNo2;
      this.mobile3 = data.mobileNo3;
      this.mobile4 = data.mobileNo4;
      this.mobile5 = data.mobileNo5;
      this.mobile6 = data.whatsappNo1;
      this.mobile7 = data.whatsappNo2;
    }
  }
}
