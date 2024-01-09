import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-gateentry',
  templateUrl: './gateentry.component.html',
  styleUrls: ['./gateentry.component.scss'],
})
export class GateentryComponent implements OnInit {
  gateentry: FormGroup;
  response: any;
  value: any;
  constructor(
    private ajaxService: AjaxService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  createForm() {
    this.gateentry = this.formBuilder.group({
      gatename: ['', Validators.required],
      qrvalus: ['', Validators.required],
    });
  }
  clear() {
    this.gateentry.patchValue({
      gatename: '',
      qrvalus: '',
    });
  }
  reset() {
    this.gateentry.patchValue({
      qrvalus: '',
    });
  }

  onEnter() {
    this.value = this.gateentry.value.qrvalus.split(',');
    if (this.gateentry.value.qrvalus != '') {
      var data = {
        gatepassid: this.value[0],
        vehicleno: this.value[1],
        phoneno: this.value[2],
        gatename: this.gateentry.value.gatename.toString(),
        createdby: localStorage.getItem('loginData'),
      };

      const url =
        'https://feedback.apmkingstrack.com/feedback/api/add/gateentrydetail';
      this.ajaxService.ajaxPutMethod(url, data).subscribe((res) => {
        if (JSON.parse(res).message == 'Updated') {
          this.commonService.presentToast('Added Successfully');
          this.reset();
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
    }
  }

  getname() {
    const url =
      'https://feedback.apmkingstrack.com/feedback/api/getgatenamedetails';
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.response = res;
    });
  }
  ngOnInit() {
    this.getname();
    this.createForm();
    this.clear();
  }
}
