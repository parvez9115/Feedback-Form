import { Component, OnInit, ViewChild } from '@angular/core';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxWindowComponent } from 'jqwidgets-ng/jqxwindow';
import { jqxNumberInputComponent } from 'jqwidgets-ng/jqxnumberinput';
import { ExportExcelService } from '../services/export-excel.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.scss'],
})
export class AdminuserComponent implements OnInit {
  url: string;
  myPlatform: any;

  constructor(
    public ete: ExportExcelService,
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private platform: Platform
  ) {}
  title = 'angular-export-to-excel';
  dataForExcel = [];
  titles = 'jspdf-autotable-demo';

  // @ViewChild('myDropDownList', { static: false }) myDropDownList: jqxDropDownListComponent;
  @ViewChild('myInput', { static: false }) myInput: jqxInputComponent;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myWindow', { static: false }) myWindow: jqxWindowComponent;
  @ViewChild('name', { static: false }) name: jqxInputComponent;
  @ViewChild('primaryContact', { static: false })
  primaryContact: jqxInputComponent;
  @ViewChild('customerId', { static: false }) customerId: jqxInputComponent;
  @ViewChild('vehicleRegNo', { static: false })
  vehicleRegNo: jqxNumberInputComponent;
  // @ViewChild('whatsappNo', { static: false }) whatsappNo1: jqxInputComponent;
  @ViewChild('companyName', { static: false }) companyName: jqxInputComponent;
  @ViewChild('position', { static: false }) position: jqxInputComponent;
  @ViewChild('Town', { static: false }) town: jqxInputComponent;
  @ViewChild('country', { static: false }) country: jqxInputComponent;
  @ViewChild('memberId', { static: false }) memberId: jqxInputComponent;
  dataadd: any;

  customer = [
    {
      id: '1',
      name: 'Arun',
      primaryContact: '9551384567',
      customerId: '0416',
      vehicleRegNo: 'Tn 14 j 8617',
      CustomerId: '1',
      memberId: '454',
      mobileNo2: '8122991988',
      whatsappNo1: '9840158425',
      companyName: 'APM Groups',
    },
    {
      id: '2',
      name: 'Karthick',
      primaryContact: '9551384567',
      customerId: '0416',
      vehicleRegNo: 'Tn 14 j 8617',
      CustomerId: '2',
      memberId: '454',
      mobileNo2: '8122991988',
      whatsappNo1: '9840158425',
      companyName: 'EIT Groups',
    },
    {
      id: '3',
      name: 'Malar',
      primaryContact: '9551384567',
      customerId: '0416',
      vehicleRegNo: 'Tn 14 j 8617',
      CustomerId: '3',
      memberId: '454',
      mobileNo2: '8122991988',
      whatsappNo1: '9840158425',
      companyName: 'APM Groups',
    },
    {
      id: '4',
      name: 'Suda',
      primaryContact: '9551384567',
      customerId: '0416',
      vehicleRegNo: 'Tn 14 j 8617',
      CustomerId: '4',
      memberId: '454',
      mobileNo2: '8122991988',
      whatsappNo1: '9840158425',
      companyName: 'APM Groups',
    },
  ];

  editrow: number = -1;

  source: any = {
    localdata: null,

    root: 'Employees',
    record: 'Employee',
    id: 'id',
  };
  employeesAdapter: any = new jqx.dataAdapter(this.source);

  renderer = (row: number, column: any, value: string) => {
    if (value == '' || null || undefined) {
      return '--';
    } else {
      return (
        '<span  style="padding:15px 0px;font-size:10px;color:black;display:flex;place-content:center">' +
        value +
        '</span>'
      );
    }
  };
  columns: any[] = [
    {
      text: ' User Name',
      datafield: 'customerName',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },
    {
      text: 'Mobile No',
      datafield: 'primaryContact',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },
    {
      text: 'Customer Id',
      datafield: 'customerId',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },
    {
      text: 'Vehicle No',
      datafield: 'vehicleRegNo',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },

    {
      text: 'Company Name',
      datafield: 'companyName',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },
    {
      text: 'Date and Time',
      datafield: 'dateTime',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 215,
    },
  ];

  saveBtn(): void {
    if (this.editrow >= 0) {
      let row = {
        name: this.name.val(),
        primaryContact: this.primaryContact.val(),
        customerId: this.customerId.val(),
        vehicleRegNo: this.vehicleRegNo.val(),
      };
      let rowID = this.myGrid.getrowid(this.editrow);
      this.myGrid.updaterow(rowID, row);
      this.myWindow.hide();
    }
  }
  cancelBtn(): void {
    this.myWindow.hide();
  }

  rowValues: string = '';

  obj = [
    {
      'User Name': '1',
      'Primary Contact': '2',
      'User Id': '3',
      'Vehicle No': '4',
      'Member Id': '5',
      'Mobile No2': '6',
      'Whatsapp No1': '7',
      'Company Name': '8',
      'Date & Time': '9',
    },
  ];

  //exportExcel

  exportToExcel() {
    // this.dataadd.forEach((row: any) => {
    //   this.dataForExcel.push(Object.values(row))
    // })

    let reportData = {
      title: 'Customer List',
      data: this.dataForExcel,
      headers: Object.keys(this.obj[0]),
    };

    this.ete.exportExcel(reportData);
  }

  //exportPDF
  head = [
    [
      'User Name',
      'Primary Contact',
      'User Id',
      'Vehicle No',
      'Member Id',
      'Mobile No2',
      'Whatsapp No1',
      'Company Name',
      'Date & Time',
    ],
  ];

  getData() {
    this.url = 'https://feedback.apmkingstrack.com/feedback/api/users';
    this.ajaxService.ajaxGetObject(this.url).subscribe((res) => {
      //  this.feedback=res;
      this.source.localdata = JSON.parse(res);
      this.customer = res;
      this.myGrid.updatebounddata();
      this.dataadd = JSON.parse(res);
      for (var i = 0; i < this.dataadd.length; i++) {
        this.dataForExcel.push([
          this.dataadd[i].customerName,
          this.dataadd[i].primaryContact,
          this.dataadd[i].userid,
          this.dataadd[i].vehicleRegNo,
          this.dataadd[i].memberId,
          this.dataadd[i].mobileNo2,
          this.dataadd[i].whatsappNo1,
          this.dataadd[i].companyName,
          this.dataadd[i].dateTime,
        ]);
      }
    });
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }

  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
  }
}
