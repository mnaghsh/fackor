import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MissionsListComponent} from './missions-list/missions-list.component';
import {IndexComponent} from './index/index.component';
import {AddMissionComponent} from './add-mission/add-mission.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'list',
        component: MissionsListComponent
      },
      {
        path: 'add',
        component: AddMissionComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionsRoutingModule {
}
