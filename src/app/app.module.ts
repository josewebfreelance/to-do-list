import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import localeEs from "@angular/common/locales/es";
import {DatePipe, registerLocaleData} from "@angular/common";
import {TransformTasksPipe} from "./pipes/transform-tasks.pipe";
import {ExportXlsxService} from "./services/export-xlsx.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ExportPdfService} from "./services/export-pdf.service";
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    TransformTasksPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    ExportXlsxService,
    ExportPdfService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
