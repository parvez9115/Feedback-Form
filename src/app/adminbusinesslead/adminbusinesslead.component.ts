import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ExportExcelService } from '../services/export-excel.service';

@Component({
  selector: 'app-adminbusinesslead',
  templateUrl: './adminbusinesslead.component.html',
  styleUrls: ['./adminbusinesslead.component.scss'],
})
export class AdminbusinessleadComponent implements OnInit {
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
    public ete: ExportExcelService,
    private platform: Platform
  ) {}
  source: any = {
    localdata: null,
    datafields: [
      { name: 'name', type: 'string' },
      { name: 'company', type: 'string' },
      { name: 'place', type: 'string' },
      { name: 'mobileno', type: 'string' },
      { name: 'whatsappno', type: 'number' },
      { name: 'natureofbusiness', type: 'string' },
      { name: 'businessdetails', type: 'string' },
      { name: 'businessstatus', type: 'string' },
      { name: 'branch', type: 'string' },
      { name: 'dateTime', type: 'string' },
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
      text: 'User Name',
      datafield: 'name',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Company',
      datafield: 'company',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Place',
      datafield: 'place',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Mobile No',
      datafield: 'mobileno',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Whatsapp No',
      datafield: 'whatsappno',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Business Nature',
      datafield: 'natureofbusiness',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Business Details',
      datafield: 'businessdetails',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Business Status',
      datafield: 'businessstatus',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Branch',
      datafield: 'branch',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
    {
      text: 'Date and Time',
      datafield: 'dateTime',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
      width: 134,
    },
  ];

  obj = [
    {
      'User Name': '1',
      Company: '2',
      Place: '3',
      'Mobile No': '4',
      WhatsappNo: '5',
      'Business Natrue': '6',
      'Business Details': '7',
      'Business Status': '8',
      Branch: '9',
      'Date an Time': '10',
    },
  ];

  dataForExcel = [];
  //exportExcel
  exportToExcel() {
    for (var i = 0; i < this.bussiness.length; i++) {
      this.dataForExcel.push([
        this.bussiness[i].name,
        this.bussiness[i].company,
        this.bussiness[i].place,
        this.bussiness[i].mobileno,
        this.bussiness[i].whatsappno,
        this.bussiness[i].natureofbusiness,
        this.bussiness[i].businessdetails,
        this.bussiness[i].businessstatus,

        this.bussiness[i].branch,
        this.bussiness[i].dateTime,
      ]);
    }
    let reportData = {
      title: 'Business Lead',
      data: this.dataForExcel,
      headers: Object.keys(this.obj[0]),
    };

    this.ete.exportExcel(reportData);
  }

  head = [
    [
      'User Name',
      'Company',
      'Place',
      'Mobile No',
      'Whatsapp No',
      'Business Nature',
      'Business Details',
      'Business Status',
      'Branch',
      'Date and Time',
    ],
  ];

  getData() {
    this.url =
      'https://feedback.apmkingstrack.com/feedback/api/business/leads/all';
    this.ajaxService.ajaxGetObject(this.url).subscribe((res) => {
      this.source.localdata = JSON.parse(res);
      this.bussiness = JSON.parse(res);

      this.myGrid.updatebounddata();
      for (var i = 0; i < this.bussiness.length; i++) {
        this.datas.push([
          this.bussiness[i].name,
          this.bussiness[i].company,
          this.bussiness[i].place,
          this.bussiness[i].mobileno,
          this.bussiness[i].whatsappno,
          this.bussiness[i].natureofbusiness,
          this.bussiness[i].businessdetails,
          this.bussiness[i].businessstatus,
          this.bussiness[i].branch,
          this.bussiness[i].dateTime,
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
