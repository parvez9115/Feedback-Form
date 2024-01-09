import { Component, OnInit } from '@angular/core';
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

  submit() {
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
            this.close();
          } else {
            this.commonService.showConfirm(res.message);
          }
        });
    }
  }

  ngOnInit() {
    this.createForm();
  }
}
