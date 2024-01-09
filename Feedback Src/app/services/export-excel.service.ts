import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logo from './mylogo.js';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }


exportExcel(excelData) {
//Title, Header & Data
const title = excelData.title;
const header = excelData.headers
const data = excelData.data;

//Create a workbook with a worksheet
let workbook = new Workbook();
let worksheet = workbook.addWorksheet('Customer List');


//Add Row and formatting
worksheet.mergeCells('C1', 'F4');
let titleRow = worksheet.getCell('C1');
titleRow.value = title
titleRow.font = {
  name: 'Calibri',
  size: 16,
  underline: 'single',
  bold: true,
  color: { argb: '0085A3' }
}
titleRow.alignment = { vertical: 'middle', horizontal: 'center' }



//Adding Header Row
let headerRow = worksheet.addRow(header);
headerRow.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '4167B8' },
    bgColor: { argb: '' }
  }
  cell.font = {
    bold: true,
    color: { argb: 'FFFFFF' },
    //text :'capitalize',
    size: 12
  }
})

// Date
worksheet.mergeCells('G2:H2');
// let d = new Date();
// let date = 'Date :  '+ d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var day = mm + '/' + dd + '/' + yyyy;
// console.log(day)
let dateCell = worksheet.getCell('G2');
dateCell.value = day;
dateCell.font = {
  name: 'Calibri',
  size: 12,
  bold: true
}
dateCell.alignment = { vertical: 'middle', horizontal: 'center' }


//Add Image
let myLogoImage = workbook.addImage({
  base64: logo.imgBase64,
  extension: 'png',
});
worksheet.mergeCells('A1:A3');
let imgCell = worksheet.getCell('A1:B4');
imgCell.alignment = { vertical: 'middle', horizontal: 'center' }
worksheet.addImage(myLogoImage, 'A1:A3');

//Blank Row 

worksheet.addRow([]);
//Adding Data with Conditional Formatting
data.forEach(d => {
  let row = worksheet.addRow(d);}
);


worksheet.getColumn(1).width = 16;
worksheet.getColumn(2).width = 20;
worksheet.getColumn(3).width = 16;
worksheet.getColumn(4).width = 16;
worksheet.getColumn(5).width = 16;
worksheet.getColumn(6).width = 16;
worksheet.getColumn(7).width = 16;
worksheet.getColumn(8).width = 16;
worksheet.getColumn(9).width = 16;
worksheet.getColumn(16).width = 16;

worksheet.addRow([]);

//Generate & Save Excel File
workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fs.saveAs(blob, title + '.xlsx');
})

}
}