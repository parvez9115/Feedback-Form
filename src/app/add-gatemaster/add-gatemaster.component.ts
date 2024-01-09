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
  statusSelection = 'Active';

  selectPickDrop(event) {
    this.selectedValue = event.detail.value;
    this.statusSelection = event.detail.value;
  }

  clearModel() {
    this.statusSelection = 'Active';
    this.selectedValue = 'Active';
  }

  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService // private firebaseX: FirebaseX
  ) {}

  submit() {
    if (localStorage.getItem('edit') == 'add') {
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
    } else if (localStorage.getItem('edit') == 'edit') {
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
  }

  edit() {
    this.admin.patchValue({
      gatename: localStorage.getItem('gatename'),
      description: localStorage.getItem('description'),
      status: this.get(),
      createdby: localStorage.getItem('createdby'),
    });
  }

  get() {
    let value = localStorage.getItem('status');
    if (value == '1') {
      this.statusSelection = 'Active';
    } else {
      this.statusSelection = 'Inactive';
    }
  }

  getstatus() {
    let box = this.statusSelection;
    if (box == 'Active') {
      this.check = '1';
    } else if (box == 'Inactive') {
      this.check = '0';
    }
  }

  clear() {
    this.admin.patchValue({
      gatename: '',
      description: '',
    });
    this.router.navigateByUrl('/gatemaster');
    this.clearModel();
  }

  ngOnInit() {
    this.admin = this.formBuilder.group({
      gatename: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
    if (this.update == localStorage.getItem('edit')) {
      this.edit();

      localStorage.removeItem('gatename'),
        localStorage.removeItem('description');
    }
  }
}
