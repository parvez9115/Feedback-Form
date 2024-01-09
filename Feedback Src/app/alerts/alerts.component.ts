import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AjaxService } from "../ajax.service";
import { CommonService } from '../common.service';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  url: string;
  data: any;

  constructor(private router: Router,private ajaxService : AjaxService,private commonService:CommonService) { }
  
    
    call(a){
      // this.callNumber.callNumber("18001010101", true)
   window.location.href = 'tel:'+ a;
      console.log(a);
    }

    
  ngOnInit(){
    this.commonService.presentLoader();
    this.url="http://apmkingstrack.com:9080/Feedback/api/alerts/feedback/all";
    this.ajaxService.ajaxGetObject(this.url).subscribe(res =>{
                this.data=res;
              //  console.log(res);
    })
    this.commonService.dismissLoader();
  }
       
}
