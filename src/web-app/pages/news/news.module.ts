import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsRoutingModule} from './news-routing.module';
import {IndexComponent} from './index/index.component';
import {ImportantNewsComponent} from './important-news/important-news.component';
import {SourceNewsComponent} from './source-news/source-news.component';
import {TruthNewsComponent} from './truth-news/truth-news.component';
import {
  MatTableModule,
  MatCheckboxModule,
  MatIconModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatDialogModule, MatCardModule, MatInputModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ArchiveNewsComponent} from './archive-news/archive-news.component';

@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatTableModule,
    AngularFontAwesomeModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    AngularFontAwesomeModule
  ],
  declarations: [IndexComponent, ImportantNewsComponent, SourceNewsComponent, TruthNewsComponent, ArchiveNewsComponent]
})
export class NewsModule {
}
