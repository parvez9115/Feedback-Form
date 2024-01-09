import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import{OTPComponent}from './otp/otp.component';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {  RouterModule, Routes,} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {RegisterformComponent} from './registerform/registerform.component';
import {FeedbackformComponent} from './feedbackform/feedbackform.component';
import {BusinessleadsComponent}from './businessleads/businessleads.component'; 
import{AdvertisementComponent} from './advertisement/advertisement.component';
import {LoginComponent}from './login/login.component';
 import {AdminregisterComponent}from './adminregister/adminregister.component';
 import{AdmindashboardComponent}from './admindashboard/admindashboard.component';
import{AlertsComponent}from './alerts/alerts.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { jqxDropDownListModule } from 'jqwidgets-ng/jqxdropdownlist';
import { jqxInputModule }   from 'jqwidgets-ng/jqxinput';
import { jqxNumberInputModule } from 'jqwidgets-ng/jqxnumberinput';
import { jqxWindowModule } from 'jqwidgets-ng/jqxwindow';
import {AdminfeedbackComponent}from './adminfeedback/adminfeedback.component';
import {AdminbusinessleadComponent}from './adminbusinesslead/adminbusinesslead.component';
 import { ExportExcelService } from './services/export-excel.service';
 import {AdminuserComponent} from './adminuser/adminuser.component';
 import {AdminsettingComponent} from './adminsetting/adminsetting.component';
// import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'otp', component: OTPComponent },
];
@NgModule({
  declarations: [AppComponent,
    OTPComponent,RegisterformComponent,AdmindashboardComponent,
    FeedbackformComponent,BusinessleadsComponent,
    AdvertisementComponent,LoginComponent,
    AdminregisterComponent,
    AdminbusinessleadComponent,
    AlertsComponent,
    AdminfeedbackComponent,AdminuserComponent,AdminsettingComponent
  ],
  entryComponents: [],
  imports: [BrowserModule,FormsModule, 
     jqxNumberInputModule,
    jqxButtonModule,
    jqxGridModule,
    jqxPanelModule,
    jqxDropDownListModule,
   jqxInputModule,
   jqxWindowModule,
   ReactiveFormsModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule,RouterModule.forRoot(routes)],
  providers: [
    StatusBar, FirebaseX,  
     ExportExcelService,
    SplashScreen,FormsModule,UniqueDeviceID,
  {provide: RouteReuseStrategy,useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
