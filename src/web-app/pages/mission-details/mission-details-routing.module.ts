import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MissionTreeComponent} from './org-for-fight/org-for-fight.component';
import {IndexComponent} from './index/index.component';
import {MissionUsersComponent} from './users/users.component';
import { NewsListComponent } from './news-list/news-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import { ReportListComponent } from './report-list/report-list.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'org-for-fight',
        component: MissionTreeComponent
      },
      {
        path: 'users',
        component: MissionUsersComponent
      },
      {
        path: 'report/news',
        component: NewsListComponent
      },
      {
        path: 'report/message',
        component: MessageListComponent
      },
      {
        path: 'report/form',
        component: ReportListComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDetailsRoutingModule {
}
