import {Injectable} from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from "jspdf-autotable";
import {Task} from "../models/task";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {

  constructor(
    private datePipe: DatePipe
  ) {
  }

  downloadPDF(data: any[], fileName: string) {
    let body: any[] = [];
    const doc = new jsPDF({
      orientation: 'p',
      format: 'letter'
    });

    doc.setFontSize(18);
    doc.text('Listado tareas', 14, 11);

    doc.setFontSize(12);
    doc.text(`${data?.length} Tareas`, 150, 11);
    doc.setFontSize(8);

    data?.forEach((task: Task) => {
      const tempArray: any[] = [];

      tempArray.push(task.name);
      tempArray.push(this.datePipe.transform(task.date, 'MMMM d, y'));
      tempArray.push(task.selected ? 'Finalizada' : 'Pendiente');

      body.push(tempArray);
    });

    autoTable(doc, {
      head: [['Nombre', 'Creación', 'Estado']],
      body: body
    })

    doc.save(`${fileName}_${new Date().getTime()}.pdf`);
  }
}
