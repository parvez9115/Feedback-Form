import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ExportExcelService } from '../services/export-excel.service';

@Component({
  selector: 'app-gatepass',
  templateUrl: './gatepass.component.html',
  styleUrls: ['./gatepass.component.scss'],
})
export class GatepassComponent implements OnInit {
  title = 'angular-export-to-excel';
  titles = 'jspdf-autotable-demo';
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myPanel', { static: false }) myPanel: jqxPanelComponent;
  bussiness: any;
  myPlatform: string;
  url: string;
  datas = [];
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private platform: Platform,
    public ete: ExportExcelService
  ) {}

  add() {
    this.router.navigateByUrl('/add-gatepass');
  }
  source: any = {
    localdata: null,
    datafields: [
      { name: 'personname', type: 'string' },
      { name: 'phoneno', type: 'string' },
      { name: 'vehicleno', type: 'string' },
      { name: 'emailid', type: 'string' },
      { name: 'address', type: 'string' },
      { name: 'remarks', type: 'string' },
      { name: 'createddate', type: 'string' },
    ],
  };

  employeeAdapter: any = new jqx.dataAdapter(this.source);
  renderer = (row: number, column: any, value: string) => {
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
  columns: any[] = [
    {
      text: 'Name',
      datafield: 'personname',
      cellalign: 'center',
      align: 'center',
      width: 150,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Phone No',
      datafield: 'phoneno',
      cellalign: 'center',
      align: 'center',
      width: 150,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Vehicle No',
      datafield: 'vehicleno',
      cellalign: 'center',
      align: 'center',
      width: 150,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Email id',
      datafield: 'emailid',
      cellalign: 'center',
      align: 'center',
      width: 200,
      cellsrenderer: this.renderer,
    },

    {
      text: 'Address',
      datafield: 'address',
      cellalign: 'center',
      align: 'center',
      width: 513,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Remarks',
      datafield: 'remarks',
      cellalign: 'center',
      align: 'center',
      width: 100,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Create On',
      datafield: 'createddate',
      cellalign: 'center',
      align: 'center',
      width: 150,
      cellsrenderer: this.renderer,
    },
  ];

  obj = [
    {
      Name: '1',
      'Phone No': '2',
      'Vehicle No': '3',
      'Email id': '4',
      Address: '3',
      Remarks: '6',
      'Create On': '7',
    },
  ];

  dataForExcel = [];
  //exportExcel
  exportToExcel() {
    // this.bussiness.forEach((row: any) => {
    //   this.dataForExcel.push(Object.values(row))
    // })
    for (var i = 0; i < this.bussiness.length; i++) {
      this.dataForExcel.push([
        this.bussiness[i].personname,
        this.bussiness[i].phoneno,
        this.bussiness[i].vehicleno,
        this.bussiness[i].emailid,
        this.bussiness[i].address,
        this.bussiness[i].remarks,
        this.bussiness[i].createddate,
      ]);
    }
    let reportData = {
      title: 'Gate Pass Details',
      data: this.dataForExcel,
      headers: Object.keys(this.obj[0]),
    };
    this.ete.exportExcel(reportData);
  }

  head = [
    ['Gate Id', 'Gate Name', 'Description', 'statusMobile No', 'createddate'],
  ];

  ionViewWillEnter() {
    this.myGrid.showloadelement();
    this.getData();
  }
  getData() {
    this.url = 'https://feedback.apmkingstrack.com/feedback/api/gatepassdetail';
    this.ajaxService.ajaxGetObject(this.url).subscribe((res) => {
      this.source.localdata = JSON.parse(res);
      this.bussiness = JSON.parse(res);
      this.myGrid.updatebounddata();
      for (var i = 0; i < this.bussiness.length; i++) {
        this.datas.push([
          this.bussiness[i].personname,
          this.bussiness[i].phoneno,
          this.bussiness[i].vehicleno,
          this.bussiness[i].emailid,
          this.bussiness[i].address,
          this.bussiness[i].remarks,
          this.bussiness[i].createddate,
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
}
