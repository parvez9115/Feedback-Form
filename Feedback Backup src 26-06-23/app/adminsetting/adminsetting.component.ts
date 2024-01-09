import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from '../services/ajax.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-adminsetting',
  templateUrl: './adminsetting.component.html',
  styleUrls: ['./adminsetting.component.scss'],
})
export class AdminsettingComponent implements OnInit {
  branches: FormGroup;
  public name: any;
  branchNames = '';
  namesList = [];
  isDisabled: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  productForm: FormGroup;
  // get items(){
  //   return this.branches.get('items') as FormArray;
  // }

  addRow() {
    // const itemLength=this.items.length;
    this.sellingPoints.push(this.fb.group({ point: '' }));
    this.isDisabled = false;
  }

  submit() {
    for (var i = 0; this.sellingPoints.value.length; i++) {
      // if (this.sellingPoints.value.length == [i]) {
      //   break;
      // }
      if (this.sellingPoints.value[i].point == '') {
        console.log('true');
        var valid = true;
      }
      // else{
      //   var valid="true";
      // }
    }
    if (valid != true) {
      this.isDisabled = true;
      this.commonService.presentLoader();
      // this.commonService.presentToast("please remove all empty fields");
      var url1 = 'https://feedback.apmkingstrack.com/feedback/api/appSetting';
      // var details=[];
      var dat = '';
      for (var i = 0; this.sellingPoints.value.length; i++) {
        // if (this.sellingPoints.value.length == [i]) {
        //   break;
        // }
        //  details.push(this.sellingPoints.value[i].point);
        this.branchNames += this.sellingPoints.value[i].point + ',';
      }

      // for(var i=0;i<this.branchNames.length;i++){
      //  if( this.branchNames[i]  == ""){
      //    console.log("worked");
      //  }

      // }

      var data = JSON.stringify({ key: 'branch', value: this.branchNames });
      this.ajaxService.ajaxPutMethod(url1, data).subscribe((res) => {
        console.log(res);
        this.commonService.presentToast('Updated successfully');
        this.commonService.dismissLoader();
        this.router.navigateByUrl('/admindashboard');
      });
    } else {
      this.commonService.presentToast('please remove empty branches');
      this.isDisabled = false;
    }
  }
  changeBtn() {
    console.log('worked');
    var len = this.sellingPoints.length;
    if (this.sellingPoints.length > len || this.sellingPoints.length < len) {
      this.isDisabled = false;
    }
  }
  ngOnInit() {
    /* Initiate the form structure */
    this.productForm = this.fb.group({
      title: [],
      selling_points: this.fb.array([this.fb.group({ point: '' })]),
    });

    // const url =
    //   'https://feedback.apmkingstrack.com/feedback/api/appSetting/branch';
    // this.ajaxService.ajaxGetWithError(url).subscribe((res) => {
    //   var data = localStorage.getItem('res');
    //   this.namesList = data.split(',');
    //   this.namesList.splice(this.namesList.length - 1, 1);
    //   for (var i = 0; i < this.namesList.length; i++) {
    //     this.sellingPoints.push(this.fb.group({ point: this.namesList[i] }));
    //   }
    // });
    // this.sellingPoints.(this.fb.group({point:this.namesList.shift()}));
    // this.commonService.presentToast("please remove all empty fields");
    this.sellingPoints.removeAt(this.sellingPoints.value[0]);
  }

  get sellingPoints() {
    return this.productForm.get('selling_points') as FormArray;
  }

  /////// This is new /////////////////

  addSellingPoint() {
    this.sellingPoints.push(this.fb.group({ point: '' }));
    this.isDisabled = false;
  }

  deleteSellingPoint(index) {
    this.sellingPoints.removeAt(index);
    this.isDisabled = false;
  }
}
