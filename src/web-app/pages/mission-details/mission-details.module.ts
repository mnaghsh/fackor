import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MissionDetailsRoutingModule} from './mission-details-routing.module';
import {IndexComponent} from './index/index.component';
import {MissionTreeComponent} from './org-for-fight/org-for-fight.component';
import {MissionUsersComponent} from './users/users.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldControl,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressSpinnerModule, MatSidenavModule
} from '@angular/material';
import {TreeModule} from "angular-tree-component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewsListComponent} from './news-list/news-list.component';
import {PipesModule} from 'src/pipes/pipes.module';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MessageListComponent} from './message-list/message-list.component';
import {ReportListComponent} from './report-list/report-list.component';
import {ContentComponent} from 'src/web-app/pages/mission-details/news-list/content/content.component';
import {FormContentComponent} from 'src/web-app/pages/mission-details/report-list/content/content.component';

@NgModule({
  imports: [
    CommonModule,
    MissionDetailsRoutingModule,
    MatListModule,
    TreeModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatCardModule, MatButtonModule, MatIconModule, MatDatepickerModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatProgressSpinnerModule,
    PipesModule,
    DpDatePickerModule, MatSidenavModule
  ],
  declarations: [
    IndexComponent,
    MissionTreeComponent,
    MissionUsersComponent,
    NewsListComponent,
    MessageListComponent,
    ReportListComponent,
    ContentComponent,
    FormContentComponent
  ],
  entryComponents: [
    ContentComponent,
    FormContentComponent
  ]
})
export class MissionDetailsModule {
}
