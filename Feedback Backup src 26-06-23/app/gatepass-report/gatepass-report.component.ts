import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { Platform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gatepass-report',
  templateUrl: './gatepass-report.component.html',
  styleUrls: ['./gatepass-report.component.scss'],
})
export class GatepassReportComponent implements OnInit {
  gateentryreport: FormGroup;
  title = 'angular-export-to-excel';
  titles = 'jspdf-autotable-demo';
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myPanel', { static: false }) myPanel: jqxPanelComponent;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: string;
  columns: any;
  employeeAdapter: any;
  source: { localdata: any };
  tableData: any;
  selectedRow: number[];
  gatenamelist: any;
  vehiclelist: any;
  numberlist: any;
  customerlist: any;
  show: boolean = false;

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    // public ete: ExportExcelService,
    private platform: Platform,
    private formBuilder: FormBuilder
  ) {}

  createForm() {
    this.gateentryreport = this.formBuilder.group({
      gatename: [''],
      vehicleno: [''],
      mobileno: [''],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
      customername: [''],
    });
  }

  clear() {
    this.gateentryreport.patchValue({
      gatename: '',
      vehicleno: '',
      mobileno: '',
      fromdate: '',
      todate: '',
      customername: '',
    });
    this.show = false;
  }

  getgatename() {
    const url = 'https://feedback.apmkingstrack.com/feedback/api/getgatename';
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.gatenamelist = res;
    });
  }

  getvehicleno() {
    const url = 'https://feedback.apmkingstrack.com/feedback/api/getvehicle';
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.vehiclelist = res;
    });
  }

  getnumber() {
    const url = 'https://feedback.apmkingstrack.com/feedback/api/getmobileno';
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.numberlist = res;
    });
  }

  getcustomername() {
    const url = 'https://feedback.apmkingstrack.com/feedback/api/getmobileno';
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.customerlist = res;
    });
  }

  submit() {
    const url =
      ' https://feedback.apmkingstrack.com/feedback/api/gateentryreport?gatename=' +
      this.gateentryreport.value.gatename +
      '&customername=' +
      this.gateentryreport.value.customername +
      '&vehicleno=' +
      this.gateentryreport.value.vehicleno +
      '&mobileno=' +
      this.gateentryreport.value.mobileno +
      '&fromdate=' +
      this.gateentryreport.value.fromdate +
      '&todate=' +
      this.gateentryreport.value.todate;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.tableData = res;
      this.getdata();
    });
  }

  getdata() {
    this.show = true;
    this.source = { localdata: this.tableData };
    this.employeeAdapter = new jqx.dataAdapter(this.source);
    this.renderer = (row: number, column: any, value: any) => {
      if (value == '' || null || undefined) {
        return '---';
      } else {
        return (
          '<span  style="padding:15px 0px;font-size:10px;color:black;display:flex;place-content:center">' +
          value +
          '</span>'
        );
      }
    };
    this.columns = [
      {
        text: 'Gate Name',
        datafield: 'gatename',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '10%',
      },
      {
        text: 'Name',
        datafield: 'personname',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '13%',
      },
      {
        text: 'Vehicle No',
        datafield: 'vehicleno',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '10%',
      },
      {
        text: 'Phone No',
        datafield: 'phoneno',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '10%',
      },

      {
        text: 'Email ID',
        datafield: 'emailid',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '15%',
      },
      {
        text: 'Address',
        datafield: 'address',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '30%',
      },
      {
        text: 'Created On',
        datafield: 'createddate',
        cellalign: 'center',
        align: 'center',
        cellsrenderer: this.renderer,
        width: '10%',
      },
    ];
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
    this.createForm();
    this.getgatename();
    this.getvehicleno();
    this.getnumber();
    this.getcustomername();
  }
}
