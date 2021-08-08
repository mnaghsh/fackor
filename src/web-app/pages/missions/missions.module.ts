import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionsRoutingModule } from './missions-routing.module';
import { MissionsListComponent } from './missions-list/missions-list.component';
import {MissionService} from '../../services/mission/mission.service';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { IndexComponent } from './index/index.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { PipesModule } from 'src/pipes/pipes.module';

import {JalaliPipe} from '../../pipes/jalali.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

@NgModule({
  imports: [
    CommonModule,
    MissionsRoutingModule,
    HttpClientModule,
    MatButtonModule, MatCardModule,
    MatInputModule, MatSnackBarModule,
    MatToolbarModule, MatTableModule, MatTabsModule, MatButtonModule,
    MatListModule,
    PipesModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    AngularFontAwesomeModule,
    DpDatePickerModule
  ],
  declarations: [
    MissionsListComponent,
    IndexComponent,
    AddMissionComponent
  ],
  providers: [
    MissionService
  ]
})
export class MissionsModule { }
