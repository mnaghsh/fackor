import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {InboxComponent} from './inbox/inbox.component';
import {DraftComponent} from "./draft/draft.component";
import {ListComponent} from "./components/list/list.component";
import {OutBoxComponent} from "./out-box/out-box.component";
import {ComposeComponent} from "./compose/compose.component";
import { CrudComponent } from './components/crud/crud.component';


const routes: Routes = [{
  path: '',
  component: IndexComponent,
  children: [
    {
      path: 'inbox',
      component: InboxComponent
    },
    {
      path: 'draft',
      component: DraftComponent
    },
    {
      path: 'compose/:id',
      component: ComposeComponent,
    },
    {
      path: 'compose',
      component: ComposeComponent,
    },
    {
      path: 'outbox',
      component: OutBoxComponent
    },
    {
      path: 'crudForm',
      component: CrudComponent
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
