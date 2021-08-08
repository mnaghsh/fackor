import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { IndexComponent } from './index/index.component';
import { ListComponent } from './list/list.component';
import {
  MatTableModule, MatCheckboxModule, MatIconModule, MatPaginatorModule
  , MatFormFieldModule, MatFormFieldControl, MatInputModule, MatDialogModule, MatCardModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog/confirm-dialog.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    AngularFontAwesomeModule


  ],
  entryComponents: [],
  declarations: [IndexComponent, ListComponent, ]
})
export class UsersModule { }
