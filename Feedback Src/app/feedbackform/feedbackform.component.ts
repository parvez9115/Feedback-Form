import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AjaxService } from "../ajax.service";
import { CommonService } from '../common.service';
@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.scss'],
})
export class FeedbackformComponent implements OnInit {
public segment="happy";
public segmentValue="happy";
public segmentValue2="happy";
public typeValue="";
public typeValue2="";
public textarea1="";
public textarea2="";
  header: string;
  word: string;
  delight: string;
  happy: string;
  satisfied: string;
  poor: string;
  notSatisfied: any;
  suggestion: any;
  something: any;
  Compliant: string;
  q1: any;
  q2: any;
  sent: string;
  a1: any;
  a2: string;
  show:boolean=false;
  name: any;
  constructor(   private commonService:CommonService,private router: Router,private ajaxService : AjaxService) {
   
   }
send(){
  this.commonService.presentLoader();
  var userId=localStorage.getItem("userid");
  var datas=[{"fbStatus":this.segmentValue,"fbType":this.typeValue,"fbDetails":this.textarea1,"userid":userId,"question":"question1"},
  {"fbStatus":this.segmentValue2,"fbType":this.typeValue2,"fbDetails":this.textarea2,"userid":userId,"question":"question2"}]
  const url='http://apmkingstrack.com:9080/Feedback/api/insert/feedback';
   this.ajaxService.ajaxPutMethod(url,datas).subscribe(res =>{
    //  console.log(res);
      if (res.message == "Persisted") {
        this.router.navigateByUrl('/businesslead');
       this.commonService.presentToast("Thanks for submitting the feedback");
      } else {
        this.router.navigateByUrl('/feedbackform');
      }
    })
    this.commonService.dismissLoader();
}
public folder: string;
isDisabled:boolean=true;
public segmentTwo="happyTwo";
suggestionButton ={
  btn_active:'btn-active',
}
selectedButton1;
selectedButton2=this.suggestionButton;
selectedButton3;
selectedButton4;
selectedButton6;
selectedButton5=this.suggestionButton;


getOtp(){
this.isDisabled=false;
}
suggestionTypes(data,value){
if(data == 'suggestion'){
  this.typeValue = 'suggestion';
 this.selectedButton1=this.suggestionButton;}
else{this.selectedButton1=value;}
 if(data =='notRight'){
  this.typeValue = 'notRight';
   this.selectedButton2=this.suggestionButton;}
else{
  this.selectedButton2=value;}
 if(data =='compliant'){
  this.typeValue = 'compliant';
   this.selectedButton3=this.suggestionButton;}
else{
  this.selectedButton3=value;}
}
suggestionTypetwo(data,value){
  if(data == 'suggestions'){
    this.typeValue2 = 'suggestion';
    this.selectedButton4=this.suggestionButton;}
  else{
    this.selectedButton4=value;}
  if(data == 'notRights'){
    this.typeValue2 = 'notRight';
    this.selectedButton5=this.suggestionButton;}
  else{
    this.selectedButton5=value;}
  if(data == 'compliants'){
    this.typeValue2 = 'compliant';
    this.selectedButton6=this.suggestionButton;}
  else{
    this.selectedButton6=value;}
  }
segmentvalues(value,segmentNum){
if(segmentNum == 'segment1'){
if(value == 'delighted'){
  this.segmentValue = 'delighted';
}else if(value == 'happy'){
  this.segmentValue = 'happy';
}else if(value == 'satisfied'){
  this.segmentValue = 'satisfied';
}else if(value == 'notSatisfied'){
  this.segmentValue = 'notSatisfied';
}else if(value == 'poor'){
  this.segmentValue = 'poor';
}
// console.log(this.segmentValue);
  }else if(segmentNum == 'segment2'){
    if(value == 'delighted'){
      this.segmentValue2 = 'delighted';
    }else if(value == 'happy'){
      this.segmentValue2 = 'happy';
    }else if(value == 'satisfied'){
      this.segmentValue2 = 'satisfied';
    }else if(value == 'notSatisfied'){
      this.segmentValue2 = 'notSatisfied';
    }else if(value == 'poor'){
      this.segmentValue2 = 'poor';
    }
    // console.log(this.segmentValue2);
      }

}
// ionViewWillEnter(){
// this.segment = "satisfied";
// this.segmentTwo = "notSatisfiedTwo";

// }
public language = {
  english:{
    "Customer FeedBack":"Customer FeedBack",
    "Let's get in touch":"Let's get in touch",
    "Delighted":"Delighted",
    "Happy":"Happy",
    "Satisfied":"Satisfied",
    "Not Satisfied":" Not Satisfied",
    "Poor":"Poor",
    "Suggestion":"Suggestion",
    "Something":" Something is not quit right",
    "Compliant":"Compliant",
    "How was the over all experience":"How was the over all experience ?",
    "Please select your feedback category below.":"Please select your feedback category below.",
    "Would You Like Rate the Staff Who Provided Serviced?":"Would You Like Rate the Staff Who Provided Service?",
   "Sent":"SUBMIT",
    "Please enter your feedback.":"Please enter your feedback.",
  },
  tanzania:{ "Customer FeedBack":"Customer FeedBack",
    "Let's get in touch":"Let's get in touch",
    "Delighted":"Delighted",
    "Happy":"Happy",
    "Satisfied":"Satisfied",
    "Not Satisfied":"Not Satisfied",
    "Poor":"Poor",
    "Suggestion":"Suggestion",
    "Something":"Something is not quit right",
    "Compliant":"Compliant",
    "How was the over all experience":"How was the over all experience ?",
    "Please select your feedback category below.":"Please select your feedback category below.",
    "Would You Like Rate the Staff Who Provided Serviced?":"Would You Like Rate the Staff Who Provided Service ?",
   "Sent":"SUBMIT",
    "Please enter your feedback.":"Please enter your feedback.",
  },
}
ngOnInit() {
  
  if (localStorage.getItem("language") === "tan") {
    this.header = this.language["tanzania"]["Customer FeedBack"];
    this.word =this.language["tanzania"]["Let's get in touch"];
    this.delight =this.language["tanzania"]["Delighted"];
    this.happy=this.language["tanzania"]["Happy"];
    this.satisfied=this.language["tanzania"]["Satisfied"];
    this.poor=this.language["tanzania"]["Poor"];
    this.notSatisfied=this.language["tanzania"]["Not Satisfied"];
    this.suggestion=this.language["tanzania"]["Suggestion"];
    this.something=this.language["tanzania"]["Something"];
    this.Compliant=this.language["tanzania"]["Compliant"];
    this.q1=this.language["tanzania"]["Please select your feedback category below."];
    this.q2=this.language["tanzania"]["Would You Like Rate the Staff Who Provided Serviced?"];
    this.sent=this.language["tanzania"]["Sent"];
    this.a1=this.language["tanzania"]["Please enter your feedback."];
    this.a2=this.language["tanzania"]["How was the over all experience"];
  }else{
    this.header = this.language["english"]["Customer FeedBack"];
    this.word =this.language["english"]["Let's get in touch"];
    this.delight =this.language["english"]["Delighted"];
    this.happy=this.language["english"]["Happy"];
    this.satisfied=this.language["english"]["Satisfied"];
    this.poor=this.language["english"]["Poor"];
    this.notSatisfied=this.language["english"]["Not Satisfied"];
    this.suggestion=this.language["english"]["Suggestion"];
    this.something=this.language["english"]["Something"];
    this.Compliant=this.language["english"]["Compliant"];
    this.q1=this.language["english"]["Please select your feedback category below."];
    this.q2=this.language["english"]["Would You Like Rate the Staff Who Provided Serviced?"];
    this.sent=this.language["english"]["Sent"];
    this.a1=this.language["english"]["Please enter your feedback."];
    this.a2=this.language["tanzania"]["How was the over all experience"];
  }
  if(localStorage.getItem("userDetails").length >= 1 ){
         this.show =true;
         console.log(localStorage.getItem("userDetails").length);
         var data =JSON.parse(localStorage.getItem("userDetails"));
         this.name=data.customerName;
  }
}

}
