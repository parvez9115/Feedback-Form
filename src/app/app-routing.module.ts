import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { BusinessleadsComponent } from './businessleads/businessleads.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AdminfeedbackComponent } from './adminfeedback/adminfeedback.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { AdminbusinessleadComponent } from './adminbusinesslead/adminbusinesslead.component';
import { AdminregisterComponent } from './adminregister/adminregister.component';
import { AdminsettingComponent } from './adminsetting/adminsetting.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FeedbackformComponent } from './feedbackform/feedbackform.component';
import { GatemasterComponent } from './gatemaster/gatemaster.component';
import { GatepassComponent } from './gatepass/gatepass.component';
import { GateentryComponent } from './gateentry/gateentry.component';
import { AddGatemasterComponent } from './add-gatemaster/add-gatemaster.component';
import { AddGatepassComponent } from './add-gatepass/add-gatepass.component';
import { GateEntryReportComponent } from './gate-entry-report/gate-entry-report.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'adminbusinesslead',
    component: AdminbusinessleadComponent,
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
  },
  {
    path: 'adminfeedback',
    component: AdminfeedbackComponent,
  },
  {
    path: 'adminregister',
    component: AdminregisterComponent,
  },
  {
    path: 'adminsetting',
    component: AdminsettingComponent,
  },
  {
    path: 'adminuser',
    component: AdminuserComponent,
  },
  {
    path: 'advertisement',
    component: AdvertisementComponent,
  },
  {
    path: 'alerts',
    component: AlertsComponent,
  },
  {
    path: 'businessleads',
    component: BusinessleadsComponent,
  },

  {
    path: 'feedbackform',
    component: FeedbackformComponent,
  },
  {
    path: 'gatemaster',
    component: GatemasterComponent,
  },
  {
    path: 'gatepass',
    component: GatepassComponent,
  },
  {
    path: 'gateentry',
    component: GateentryComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'otp',
    component: OtpComponent,
  },
  {
    path: 'registerform',
    component: RegisterformComponent,
  },
  {
    path: 'add-gatemaster',
    component: AddGatemasterComponent,
  },
  {
    path: 'add-gatepass',
    component: AddGatepassComponent,
  },
  {
    path: 'gate-entry-report',
    component: GateEntryReportComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
