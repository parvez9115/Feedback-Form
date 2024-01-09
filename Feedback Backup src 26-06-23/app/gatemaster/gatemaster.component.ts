import { Component, OnInit, ViewChild } from '@angular/core';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { jqxPanelComponent } from 'jqwidgets-ng/jqxpanel';
import { AjaxService } from '../services/ajax.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-gatemaster',
  templateUrl: './gatemaster.component.html',
  styleUrls: ['./gatemaster.component.scss'],
})
export class GatemasterComponent implements OnInit {
  title = 'angular-export-to-excel';
  titles = 'jspdf-autotable-demo';
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  @ViewChild('myPanel', { static: false }) myPanel: jqxPanelComponent;
  renderer: (row: number, column: any, value: string) => string;
  bussiness: any;
  myPlatform: string;
  url: string;
  datas = [];
  columns: {
    text: string;
    datafield: string;
    cellalign: string;
    align: string;
    cellsrenderer: any;
  }[];
  employeeAdapter: any;
  source: { localdata: any };
  tableData: any;
  checkbox: string;
  result: any;
  selectedRow: any;
  selectedRowValue: any;

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    // public ete: ExportExcelService,
    private platform: Platform
  ) {}

  add(data?) {
    if (data == 'add') {
      localStorage.setItem('createdby', this.tableData[0].createdby);
      this.router.navigateByUrl('/add-gatemaster');
    } else if (data == 'edit') {
      if (this.selectedRow) {
        localStorage.setItem('edit', data);
        localStorage.setItem('gateid', this.selectedRowValue.gateid);
        localStorage.setItem('gatename', this.selectedRowValue.gatename);
        localStorage.setItem('description', this.selectedRowValue.description);
        localStorage.setItem('status', this.selectedRowValue.status);
        localStorage.setItem('createdby', this.selectedRowValue.createdby);
        this.router.navigateByUrl('/add-gatemaster');
        this.myGrid.clearselection();
        this.selectedRow = '';
      } else {
        this.commonService.presentToast('Please select a row to Edit');
      }
    }
  }

  obj = [
    {
      'Business Status': '1',
      'Business Details': '2',
      'Business Natrue': '3',
      'User Name': '4',
      Company: '3',
      Place: '6',
      'Mobile No': '7',
      WhatsappNo: '8',
      Branch: '9',
      dateTime: '10',
    },
  ];

  dataForExcel = [];
  exportToExcel() {
    for (var i = 0; i < this.bussiness.length; i++) {
      this.dataForExcel.push([
        this.bussiness[i].gateid,
        this.bussiness[i].gatename,
        this.bussiness[i].description,
        this.bussiness[i].status,
        this.bussiness[i].createddate,
      ]);
    }
    let reportData = {
      title: 'Gate Master Details',
      data: this.dataForExcel,
      headers: Object.keys(this.obj[0]),
    };
  }

  head = [
    ['Gate Id', 'Gate Name', 'Description', 'statusMobile No', 'createddate'],
  ];

  ngAfterViewInit() {
    // this.myGrid.showloadelement();
    this.getData();
  }
  getData() {
    this.url = 'https://feedback.apmkingstrack.com/feedback/api/gatedetail';
    this.ajaxService.ajaxGetObject(this.url).subscribe((res) => {
      this.tableData = JSON.parse(res);
      // if (this.tableData[0].status == '0') {
      //   this.result = 'Active';
      //   console.log(this.result);
      // } else {
      //   this.result = 'InActive';
      //   console.log(this.result);
      // }
      this.bussiness = res;
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
          text: 'Gate Id',
          datafield: 'gateid',
          cellalign: 'center',
          align: 'center',
          cellsrenderer: this.renderer,
        },
        {
          text: 'Gate Name',
          datafield: 'gatename',
          cellalign: 'center',
          align: 'center',
          cellsrenderer: this.renderer,
        },
        {
          text: 'Description',
          datafield: 'description',
          cellalign: 'center',
          align: 'center',
          cellsrenderer: this.renderer,
        },
        {
          text: 'Status',
          datafield: 'status',
          cellalign: 'center',
          align: 'center',
          cellsrenderer: this.renderer,
        },

        {
          text: 'Create On',
          datafield: 'createddate',
          cellalign: 'center',
          align: 'center',
          cellsrenderer: this.renderer,
        },
      ];

      // this.myGrid.updatebounddata();
      // console.log(res);
      // for (var i = 0; i < this.bussiness.length; i++) {
      //   this.datas.push([
      //     this.bussiness[i].gateid,
      //     this.bussiness[i].gatename,
      //     this.bussiness[i].description,
      //     this.bussiness[i].status,
      //     this.bussiness[i].createddate,
      //   ]);
      // }
    });
  }
  // myGridOnRowSelect(event: any): void {
  //   this.selectedRow = this.myGrid.getselectedrowindexes();
  // }

  myGridOnRowclick(event: any): void {
    this.selectedRowValue = event.args.row;
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == 'tablet') {
      this.myPlatform = 'desktop';
    }
  }
}
