import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { ExportExcelService } from '../services/export-excel.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-adminfeedback',
  templateUrl: './adminfeedback.component.html',
  styleUrls: ['./adminfeedback.component.scss'],
})
export class AdminfeedbackComponent implements OnInit {
  title = 'angular-export-to-excel';
  titles = 'jspdf-autotable-demo';
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myPanel', { static: false }) myPanel: jqxPanelComponent;
  url: string;
  feedback: any;
  myPlatform: any;
  constructor(
    public ete: ExportExcelService,
    private ajaxService: AjaxService,
    private router: Router,
    private platform: Platform
  ) {}

  source: any = {
    localdata: null,
    datafields: [
      { name: 'customerName', type: 'number' },
      { name: 'primaryContact', type: 'string' },
      { name: 'status1', type: 'string' },
      { name: 'status2', type: 'string' },
      { name: 'details1', type: 'string' },
      { name: 'details2', type: 'string' },
      { name: 'branch', type: 'string' },
      { name: 'dateTime', type: 'string' },
    ],
  };

  employeeAdapter: any = new jqx.dataAdapter(this.source);
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
      text: 'User Name',
      datafield: 'customerName',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
    },
    {
      text: 'Mobile No',
      datafield: 'primaryContact',
      cellalign: 'center',
      align: 'center',
      width: 90,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Branch',
      datafield: 'branch',
      cellalign: 'center',
      align: 'center',
      width: 90,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Date and Time',
      datafield: 'dateTime',
      cellalign: 'center',
      align: 'center',
      width: 120,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Staff Service',
      columngroup: 'StaffService',
      datafield: 'details1',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
    },
    {
      text: 'Staff Rating',
      columngroup: 'StaffService',
      datafield: 'status2',
      cellalign: 'center',
      align: 'center',
      width: 100,
      cellsrenderer: this.renderer,
    },
    {
      text: 'Over all Experience',
      columngroup: 'overallExperience',
      datafield: 'details2',
      cellalign: 'center',
      align: 'center',
      cellsrenderer: this.renderer,
    },
    {
      text: 'Over all Rating',
      columngroup: 'overallExperience',
      datafield: 'status1',
      cellalign: 'center',
      align: 'center',
      width: 100,
      cellsrenderer: this.renderer,
    },
  ];
  columngroups: any[] = [
    { text: 'Over all Experience', align: 'center', name: 'overallExperience' },
    { text: 'Staff Service', align: 'center', name: 'StaffService' },
  ];

  dataForExcel = [];

  obj = [
    {
      customerName: '1',
      primaryContact: '2',
      status1: '3',
      status2: '4',
      details1: '5',
      details2: '6',
      branch: '7',
      'date and time': '8',
    },
  ];
  //exportExcel
  exportToExcel() {
    for (var i = 0; i < this.feedback.length; i++) {
      this.dataForExcel.push([
        this.feedback[i].customerName,
        this.feedback[i].primaryContact,
        this.feedback[i].status1,
        this.feedback[i].status2,
        this.feedback[i].details1,
        this.feedback[i].details2,
        this.feedback[i].branch,
        this.feedback[i].dateTime,
      ]);
    }

    let reportData = {
      title: 'Customer FeedBack',
      data: this.dataForExcel,
      headers: Object.keys(this.obj[0]),
    };

    this.ete.exportExcel(reportData);
  }

  head = [
    [
      'User Name',
      'Mobile No',
      'Staff Service',
      'Staff Rating',
      'Over all Experience',
      'Over all Rating',
      'Branch',
      'Date and time',
    ],
  ];

  ngAfterViewInit() {
    this.myGrid.showloadelement();
    this.getData();
  }
  getData() {
    this.url = 'https://feedback.apmkingstrack.com/feedback/api/feedbacks/all';
    this.ajaxService.ajaxGetObject(this.url).subscribe((res) => {
      //  this.feedback=res;
      this.source.localdata = JSON.parse(res);
      this.feedback = JSON.parse(res);
      this.myGrid.updatebounddata();
    });
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }
}
