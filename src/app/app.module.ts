import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { BusinessleadsComponent } from './businessleads/businessleads.component';
import { AlertsComponent } from './alerts/alerts.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
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
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddGatemasterComponent } from './add-gatemaster/add-gatemaster.component';
import { AddGatepassComponent } from './add-gatepass/add-gatepass.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GateEntryReportComponent } from './gate-entry-report/gate-entry-report.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminbusinessleadComponent,
    AdmindashboardComponent,
    AdminfeedbackComponent,
    AdminregisterComponent,
    AdminsettingComponent,
    AdminuserComponent,
    AdvertisementComponent,
    AlertsComponent,
    BusinessleadsComponent,
    FeedbackformComponent,
    GateentryComponent,
    GatemasterComponent,
    GatepassComponent,
    LoginComponent,
    OtpComponent,
    RegisterformComponent,
    AddGatemasterComponent,
    AddGatepassComponent,
    GateEntryReportComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    jqxGridModule,
    jqxPanelModule,
    jqxDropDownListModule,
    jqxInputModule,
    jqxWindowModule,
    jqxNumberInputModule,
    jqxButtonModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
