import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {SourceNewsComponent} from './source-news/source-news.component';
import {ImportantNewsComponent} from './important-news/important-news.component';
import {TruthNewsComponent} from './truth-news/truth-news.component';
import {ArchiveNewsComponent} from "./archive-news/archive-news.component";

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [{
      path: 'source-news', component: SourceNewsComponent
    },
      {
        path: 'important-news', component: ImportantNewsComponent
      },
      {
        path: 'truth-news', component: TruthNewsComponent
      },
      {
        path: 'archive-news', component: ArchiveNewsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule {
}
