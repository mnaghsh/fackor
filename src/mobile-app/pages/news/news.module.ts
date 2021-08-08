import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NewsRoutingModule} from './news-routing.module';
import {IndexComponent} from './index/index.component';
import {InboxComponent} from './inbox/inbox.component';
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
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSortModule, MatAutocompleteModule
} from '@angular/material';
import {DraftComponent} from './draft/draft.component';
import {OutBoxComponent} from './out-box/out-box.component';
import {ListComponent} from './components/list/list.component';
import {ComposeComponent} from './compose/compose.component';
import {CrudComponent} from './components/crud/crud.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MultiSelectComponent} from './components/multi-select/multi-select.component';
import {PipesModule} from '../../../pipes/pipes.module';
import {ContentComponent} from './components/content/content.component';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import {NgxWigModule} from "ngx-wig";
import {QuillModule} from "ngx-quill";

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    MatSidenavModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, MatCardModule, MatTabsModule, FormsModule, MatIconModule,
    MatButtonModule, MatListModule, NewsRoutingModule, MatCheckboxModule, MatTableModule,
    AngularFontAwesomeModule, MatDialogModule, MatPaginatorModule, MatExpansionModule, MatSortModule, NgxWigModule,
    QuillModule, MatAutocompleteModule, NguiAutoCompleteModule
  ],
  entryComponents: [MultiSelectComponent, ContentComponent],
  declarations: [IndexComponent, InboxComponent, DraftComponent, OutBoxComponent, ListComponent,
    ComposeComponent, CrudComponent, ContentComponent, MultiSelectComponent, ContentComponent],
  exports: []
})
export class NewsModule {
}
