import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { OTPComponent } from "./otp/otp.component";
import { RegisterformComponent } from "./registerform/registerform.component";
import { BusinessleadsComponent } from "./businessleads/businessleads.component";
import { FeedbackformComponent } from "./feedbackform/feedbackform.component";
import { AdvertisementComponent } from "./advertisement/advertisement.component";
import { LoginComponent } from "./login/login.component";
import { AdminregisterComponent } from "./adminregister/adminregister.component";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { AdminfeedbackComponent } from "./adminfeedback/adminfeedback.component";
import { AdminbusinessleadComponent } from "./adminbusinesslead/adminbusinesslead.component";
import { AdminuserComponent } from "./adminuser/adminuser.component";
import { AdminsettingComponent } from "./adminsetting/adminsetting.component";
import { from } from "rxjs";
const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "otp",
    component: OTPComponent,
  },
  {
    path: "registerform",
    component: RegisterformComponent,
  },
  {
    path: "feedbackform",
    component: FeedbackformComponent,
  },
  {
    path: "businesslead",
    component: BusinessleadsComponent,
  },
  {
    path: "advertisement",
    component: AdvertisementComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "adminregister",
    component: AdminregisterComponent,
  },
  {
    path: "admindashboard",
    component: AdmindashboardComponent,
  },
  {
    path: "alerts",
    component: AlertsComponent,
  },
  {
    path: "adminfeedback",
    component: AdminfeedbackComponent,
  },
  {
    path: "adminbussinesslead",
    component: AdminbusinessleadComponent,
  },
  {
    path: "adminuser",
    component: AdminuserComponent,
  },
  {
    path: "adminSetting",
    component: AdminsettingComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
