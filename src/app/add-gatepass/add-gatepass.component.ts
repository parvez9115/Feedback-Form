import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-add-gatepass',
  templateUrl: './add-gatepass.component.html',
  styleUrls: ['./add-gatepass.component.scss'],
})
export class AddGatepassComponent implements OnInit {
  admin: FormGroup;
  userDetails: any;
  public url = 'https://feedback.apmkingstrack.com/feedback/api/add/admin';
  value = false;
  show = false;
  public values;
  public level: 'L' | 'M' | 'Q' | 'H';
  public width: number;
  data;
  display = [];

  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService // private firebaseX: FirebaseX
  ) {}

  createForm() {
    this.admin = this.formBuilder.group({
      personname: ['', Validators.required],
      phonenumber: ['', Validators.required],
      vnumber: ['', Validators.required],
      mail: [''],
      address: [''],
      remarks: [''],
    });
  }

  close() {
    this.admin.patchValue({
      personname: '',
      phonenumber: '',
      vnumber: '',
      mail: '',
      address: '',
      remarks: '',
    });
    this.router.navigateByUrl('/gatepass');
  }

  clear() {
    this.admin.patchValue({
      personname: '',
      phonenumber: '',
      vnumber: '',
      mail: '',
      address: '',
      remarks: '',
    });
  }

  submit() {
    this.show = false;
    if (this.admin.value.phonenumber.toString().length != 10) {
      this.commonService.presentToast('Enter the 10 Digit Number');
    } else {
      var data;
      data = {
        name: this.admin.value.personname.toString(),
        phoneno: this.admin.value.phonenumber.toString(),
        vehicleno: this.admin.value.vnumber.toString(),
        emailid: this.admin.value.mail.toString(),
        address: this.admin.value.address.toString(),
        remarks: this.admin.value.remarks.toString(),
        createdby: localStorage.getItem('loginData'),
        gatepassid: '',
      };
      const url =
        'https://feedback.apmkingstrack.com/feedback/api/add/gatepassdetail';
      this.ajaxService
        .ajaxPutMethod(url, JSON.stringify(data))
        .subscribe((res) => {
          if (JSON.parse(res).message == 'Updated') {
            this.commonService.presentToast(
              'Gate Pass details added successfully'
            );
            var detailofqrcode = [];
            detailofqrcode.push(
              this.admin.value.personname,
              this.admin.value.phonenumber,
              this.admin.value.vnumber
            );
            this.data = detailofqrcode.toString();
            this.values = this.data;
            this.display = this.values.split(',');
            console.log(this.display);
            this.show = true;
            setTimeout(() => {
              this.clickToDownload();
            }, 3000);

            this.clear();
          } else {
            this.commonService.showConfirm(res.message);
            this.show = false;
          }
        });
    }
  }

  clickToDownload() {
    const printContents = document.getElementById('print')?.innerHTML;
    const pageContent = `<!DOCTYPE html><html><head></head><body onload="window.print()">${printContents}</html>`;
    let popupWindow: Window;
    popupWindow = window.open(
      '',
      '_blank',
      'width=900,height=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'
    );

    popupWindow.document.write(pageContent);
    popupWindow.document.close();
  }

  ngOnInit() {
    this.createForm();
  }
}
