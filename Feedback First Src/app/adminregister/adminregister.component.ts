import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AjaxService } from "../ajax.service";
import { Router } from "@angular/router";
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { CommonService } from "../common.service";
@Component({
  selector: "app-adminregister",
  templateUrl: "./adminregister.component.html",
  styleUrls: ["./adminregister.component.scss"],
})
export class AdminregisterComponent implements OnInit {
  admin: FormGroup;
  userDetails: any;
  public url = "https://feedback.apmkingstrack.com/feedback/api/add/admin";
  value = false;
  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private firebaseX: FirebaseX
  ) {}

  submit() {
    var data = {
      username: this.admin.value.username,
      password: this.admin.value.password,
      fullname: this.admin.value.name,
      designation: this.admin.value.designation,
      primaryMobileno: this.admin.value.mobileNo,
      secondaryMobileno: this.admin.value.whatappNo,
      mailId: this.admin.value.mail,
    };
    //  let url='https://feedback.apmkingstrack.com/feedback/api/add/admin';
    //  let url='https://feedback.apmkingstrack.com/feedback/api/update/admin';
    //  var url1 ="https://feedback.apmkingstrack.com/feedback/api/otp";
    this.ajaxService.ajaxPutMethod(this.url, data).subscribe((res) => {
      // console.log(res);
      if (res.message == "Persisted") {
        this.router.navigateByUrl("/login");
        this.commonService.presentToast("Enter Your Username and Password");
      } else if (res.message == "Username Already Available") {
        this.router.navigateByUrl("/login");
        this.commonService.presentToast("Username Already Available");
      } else if (res.message == "Updated") {
        this.commonService.presentToast("Your details are Updated ");
        this.router.navigateByUrl("/admindashboard");
      }
    });
  }

  ngOnInit() {
    this.admin = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z ]*$"),
      ]),
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern("^[a-zA-Z ]*$"),
      ]),

      mobileNo: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(9),
          Validators.maxLength(10),
        ],
      ],
      whatappNo: new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ]),
      mail: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
      ]),
      designation: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(12),
      ]),
    });
    if (localStorage.getItem("details").length >= 20) {
      this.value = true;
      this.url = "https://feedback.apmkingstrack.com/feedback/api/update/admin";
      this.userDetails = JSON.parse(localStorage.getItem("details"));
      this.admin.patchValue({
        name: this.userDetails.fullname,
        designation: this.userDetails.designation,
        mobileNo: this.userDetails.primaryMobileno,
        whatappNo: this.userDetails.primaryMobileno,
        mail: this.userDetails.mailId,
        username: this.userDetails.username,
        password: this.userDetails.password,
      });
    }
  }
}
