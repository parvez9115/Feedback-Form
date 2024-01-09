import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-add-gatemaster',
  templateUrl: './add-gatemaster.component.html',
  styleUrls: ['./add-gatemaster.component.scss'],
})
export class AddGatemasterComponent implements OnInit {
  admin: FormGroup;
  userDetails: any;
  value = false;
  update = 'edit';
  selectedValue;
  check: any;
  hideSerialNo: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService // private firebaseX: FirebaseX
  ) {}

  get() {
    this.selectedValue;
  }

  submit(data?) {
    if (data == 'add') {
      this.getstatus();
      var datas = {
        gateid: '',
        gatename: this.admin.value.gatename,
        description: this.admin.value.description,
        status: this.check,
        createdby: localStorage.getItem('createdby'),
      };
      const url =
        'https://feedback.apmkingstrack.com/feedback/api/add/gatedetail';
      this.ajaxService.ajaxPutMethod(url, datas).subscribe((res) => {
        if (JSON.parse(res).message == 'Updated') {
          this.router.navigateByUrl('/gatemaster');
          this.commonService.presentToast('Gate details added successfully');
        } else if (JSON.parse(res).message == 'Username Already Available') {
          this.router.navigateByUrl('/login');
          this.commonService.presentToast('Username Already Available');
        }
      });
    } else if (data == 'edit') {
      this.getstatus();
      var datass = {
        gateid: localStorage.getItem('gateid'),
        gatename: this.admin.value.gatename,
        description: this.admin.value.description,
        status: this.check,
        createdby: localStorage.getItem('createdby'),
      };
      const url =
        'https://feedback.apmkingstrack.com/feedback/api/add/gatedetail';
      this.ajaxService.ajaxPutMethod(url, datass).subscribe((res) => {
        if (JSON.parse(res).message == 'Updated') {
          this.router.navigateByUrl('/gatemaster');
          this.commonService.presentToast('Your details are Updated ');
        } else if (JSON.parse(res).message == 'Username Already Available') {
          this.router.navigateByUrl('/login');
          this.commonService.presentToast('Username Already Available');
        }
      });
    }
    this.hideSerialNo = false;
  }

  edit() {
    this.hideSerialNo = true;
    this.admin.patchValue({
      gatename: localStorage.getItem('gatename'),
      description: localStorage.getItem('description'),
      status: localStorage.getItem('status'),
      createdby: localStorage.getItem('createdby'),
    });
  }

  getstatus() {
    let box = this.admin.value.checkbox ? 1 : 0;
    if (box == 1) {
      this.check = '1';
    } else if (box == 0) {
      this.check = '0';
    }
  }

  clear() {
    this.admin.patchValue({
      gatename: '',
      description: '',
      checkbox: 0,
    });
    this.hideSerialNo = false;
    this.router.navigateByUrl('/gatemaster');
  }

  ngOnInit() {
    this.admin = this.formBuilder.group({
      gatename: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      checkbox: new FormControl(0),
    });
    if (this.update == localStorage.getItem('edit')) {
      this.edit();
      localStorage.removeItem('gatename'),
        localStorage.removeItem('description');
    }
  }
}
