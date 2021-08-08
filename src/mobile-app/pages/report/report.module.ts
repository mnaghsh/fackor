import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatSidenavModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatOptionModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatRadioModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatExpansionModule, MatSortModule
} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {ReportRoutingModule} from './report-routing.module';
import {IndexComponent} from './index/index.component';
import {ReportsComponent} from './reports/reports.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewFormComponent} from './new-form/new-form.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ContentComponent} from 'src/mobile-app/pages/report/component/content/content.component';
import {SentReportsComponent} from './sent-reports/sent-reports.component';
import {PipesModule} from 'src/pipes/pipes.module';
import {JalaliPipe} from "../../../web-app/pipes/jalali.pipe";
import {QuillModule} from 'ngx-quill';


@NgModule({
  imports: [
    // HttpClientModule,
    // BrowserModule,
    PipesModule,
    CommonModule,
    ReportRoutingModule,
    MatSidenavModule, MatSelectModule, MatFormFieldModule, MatSidenavModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, MatCardModule, MatTabsModule, FormsModule, MatIconModule,
    MatButtonModule, MatListModule, MatCheckboxModule, MatTableModule, MatNativeDateModule,
    AngularFontAwesomeModule, MatDialogModule, MatPaginatorModule, MatRadioModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatListModule, MatDialogModule, MatExpansionModule,
    DpDatePickerModule, QuillModule, MatSortModule
  ],
  entryComponents: [ContentComponent],
  declarations: [IndexComponent, ReportsComponent, NewFormComponent, ContentComponent, SentReportsComponent],
  providers: [JalaliPipe]
})
export class ReportModule {
}
