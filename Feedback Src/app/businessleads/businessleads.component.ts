import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AjaxService } from "../ajax.service";
import { CommonService } from '../common.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
@Component({
  selector: 'app-businessleads',
  templateUrl: './businessleads.component.html',
  styleUrls: ['./businessleads.component.scss'],
})
export class BusinessleadsComponent implements OnInit {
  datas:FormGroup;
  name: string;
  skipBut: string;
  place: string;
  town: string;
  nature: string;
  newBuss: any;
  mobileNo: string;
  whatappNo: string;
  company: string;
  submitBut: string;
  header: string;
  word: string;
  color="dark";
  // name:any;
  // company:any;
  // place:any;
  // town:any;
  // nature:any;
  // mobile:any;
  // whatsapp:any;
  constructor( private commonService:CommonService,private router: Router,private formBuilder: FormBuilder,private ajaxService : AjaxService) { }
  verfiy(){
       if((JSON.stringify(this.datas.value.whatsapp).length >= 1 && JSON.stringify(this.datas.value.mobile).length >= 1) && ((this.datas.value.nature).length >= 1 && (this.datas.value.town).length >= 1) && ((this.datas.value.name).length >= 1 && (this.datas.value.company).length >= 1)&&((this.datas.value.textArea).length >= 1 && (this.datas.value.place).length >= 1)){
          // console.log("hello");
        this.color="primary";
       }
  }
  
  
  submit(){
    this.commonService.presentLoader();
    if((JSON.stringify(this.datas.value.mobile).length == 9 || JSON.stringify(this.datas.value.mobile).length == 10) && (JSON.stringify(this.datas.value.whatsapp).length == 9 || JSON.stringify(this.datas.value.whatsapp).length == 10)){
                         var userId=localStorage.getItem("userid");
   var data={"userid":userId,"name":this.datas.value.name,"company":this.datas.value.company,"place":this.datas.value.place,
   "mobileNo":JSON.stringify(this.datas.value.mobile),"whatsappNo":JSON.stringify(this.datas.value.whatsapp),"natureOfBusiness":this.datas.value.nature,
   "businessDetails":this.datas.value.textArea};
   const url='http://apmkingstrack.com:9080/Feedback/api/insert/lead';
  this.ajaxService.ajaxPutMethod(url,data).subscribe(res =>{
    // console.log(res);
    if (res.message == "Persisted"){
      this.router.navigateByUrl('/home');
     this.commonService.presentToast("Your details are successfully registered, Thank you");
    } else {
      this.router.navigateByUrl('/businesslead');
    }
  })
    }else{
      this.commonService.presentToast("please check your mobile number OR whatapp number");
    }
    this.commonService.dismissLoader();
    window.localStorage.clear();
   }
   skip(){
    window.localStorage.clear();
    this.commonService.presentLoader();
    this.router.navigateByUrl('/advertisement');
    this.commonService.presentToast("Thank you");
    this.commonService.dismissLoader();
    }
   public language = {
    english:{
      "Lead Details":"Lead Details",
      "Let's get in touch":"Let's get in touch",
      "name":"Name",
      "skip":"SKIP",
      // "enter otp":"Enter OTP",
      "submit":"SUBMIT",
      "Company":"Company",
      "Place":"Place",
      "Town":"Town",
      "Nature of Bussiness":"Nature of Bussiness",
      "New Bussiness Opportunity Details.":"New Bussiness Opportunity Details",
      "Mobile No":"Mobile No",
      "Whatsapp No":"Whatsapp No",
    },
    tanzania:{
      "Lead Details":"Lead Details",
      "Let's get in touch":"Let's get in touch",
      "name":"Name",
      "skip":"SKIP",
      // "enter otp":"Enter OTP",
      "submit":"SUBMIT",
      "Company":"Company",
      "Place":"Place",
      "Town":"Town",
      "Nature of Bussiness":"Nature of Bussiness",
      "New Bussiness Opportunity Details.":"New Bussiness Opportunity Details",
      "Mobile No":"Mobile No",
      "Whatsapp No":"Whatsapp No",
    }
  }
  ngOnInit() {
    this.datas=this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      place: ['', Validators.required],
      mobile: ['',Validators.required],
      nature: ['',Validators.required],
      town: ['',Validators.required],
      whatsapp:['',Validators.required],
      textArea:['',Validators.required],
    })
    if (localStorage.getItem("language") === "tan") {
      this.skipBut = this.language["tanzania"]["skip"];
      this.name = this.language["tanzania"]["name"];
      this.place = this.language["tanzania"]["Place"];
      this.town = this.language["tanzania"]["Town"];
      this.nature = this.language["tanzania"]["Nature of Bussiness"];
      this.newBuss = this.language["tanzania"]["New Bussiness Opportunity Details."];
      this.mobileNo = this.language["tanzania"]["Mobile No"];
      this.whatappNo = this.language["tanzania"]["Whatsapp No"];
      this.company = this.language["tanzania"]["Company"];
      this.submitBut = this.language["tanzania"]["submit"];
      this.header = this.language["tanzania"]["Lead Details"];
      this.word =this.language["tanzania"]["Let's get in touch"];
    }else{
      this.skipBut = this.language["english"]["skip"];
      this.name = this.language["english"]["name"];
      this.place = this.language["english"]["Place"];
      this.town = this.language["english"]["Town"];
      this.nature = this.language["english"]["Nature of Bussiness"];
      this.newBuss = this.language["english"]["New Bussiness Opportunity Details."];
      this.mobileNo = this.language["english"]["Mobile No"];
      this.whatappNo = this.language["english"]["Whatsapp No"];
      this.company = this.language["english"]["Company"];
      this.submitBut = this.language["english"]["submit"];
      this.header = this.language["english"]["Lead Details"];
      this.word =this.language["english"]["Let's get in touch"];
    }
  }

}
