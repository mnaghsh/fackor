import { IndexComponent } from './../formula/index/index.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: IndexComponent,
  // children: [
  //   {
  //     path: 'inbox',
  //     component: InboxComponent
  //   }
  // ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormulaRoutingModule { }
