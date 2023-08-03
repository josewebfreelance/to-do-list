import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {DatePipe} from "@angular/common";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()
export class ExportXlsxService {

  constructor(
    private datePipe: DatePipe
  ) { }

  exportToExcel(json: any[], excelFileName: string): void {
    json = json.map((task) => {
      return {
        'Nombre': task.name,
        'Creación': this.datePipe.transform(task.date, 'MMMM d, y'),
        'Estado': task.selected ? 'Finalizada' : 'Pendiente'
      };
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet}, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, `${fileName}_${new Date().getTime()}${EXCEL_EXT}`);
  }
}
