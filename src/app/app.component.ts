import {Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {v4 as uuid} from 'uuid';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Task} from "./models/task";
import {ExportXlsxService} from "./services/export-xlsx.service";
import {faFileExcel, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import {ExportPdfService} from "./services/export-pdf.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('fieldName') fieldName!: ElementRef<HTMLInputElement>;
  currentDate = new Date();

  form: FormGroup;
  list: Task[] = [
    {id: uuid(), selected: false, name: 'Tarea 1', date: new Date('2023-07-30')},
    {id: uuid(), selected: true, name: 'Tarea 2', date: new Date('2023-07-30')},
    {id: uuid(), selected: false, name: 'Tarea 3', date: new Date('2023-07-29')},
    {id: uuid(), selected: true, name: 'Tarea 4', date: new Date('2023-07-28')},
    {id: uuid(), selected: true, name: 'Tarea 4.1', date: new Date('2023-07-28')},
    {id: uuid(), selected: false, name: 'Tarea 5', date: new Date('2023-07-28')},
    {id: uuid(), selected: true, name: 'Tarea 6', date: new Date('2023-07-27')},
    {id: uuid(), selected: true, name: 'Tarea 7', date: new Date('2023-07-27')},
    {id: uuid(), selected: false, name: 'Tarea 8', date: new Date('2023-07-27')},
  ];

  pdfIcon = faFilePdf;
  xlsIcon = faFileExcel;

  constructor(
    private _snackBar: MatSnackBar,
    private exportService: ExportXlsxService,
    private exportPdfService: ExportPdfService
  ) {
    this.form = new FormGroup<any>({
      name: new FormControl(null)
    });
  }

  onSubmit(): void {
    const control: any = this.form.get('name');

    control.setValue(control?.value?.toString()?.trim());

    if (!control.value) {
      this._snackBar.open('Oops! Al parecer no escribió, el nombre de la nueva tarea.', 'Cerrar', {
        duration: 5 * 1000
      });

      return;
    }

    if (control.value) {

      this.list = [{
        id: uuid(),
        selected: false,
        name: control.value,
        date: this.currentDate
      }, ...this.list];

      this.form.reset();

      this.fieldName.nativeElement.focus();
    }
  }

  markAsComplete(itemSelected: Task): void {
    this.list.map((item: Task) => {
      if (item.id === itemSelected.id) item.selected = true;
    });
  }

  deleteTask(itemSelected: Task, index: number): void {
    this.list = this.list.filter((item: Task) => item.id !== itemSelected.id);
  }

  exportAsXLSX(): void {
    this.exportService.exportToExcel(this.list, 'tareas');
  }

  exportAsPDF(): void {
    this.exportPdfService.downloadPDF(this.list, 'tareas');
  }
}
