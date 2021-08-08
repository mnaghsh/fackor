import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ReportsComponent } from './reports/reports.component';
import { NewFormComponent } from './new-form/new-form.component';
import { SentReportsComponent } from 'src/mobile-app/pages/report/sent-reports/sent-reports.component';


const routes: Routes = [{
  path:'',
  component:IndexComponent,
  children: [
    {
      path:'reports',
      component:ReportsComponent
    },
    {
      path:'reports/:id',
      component:ReportsComponent
    },
    {
      path:'sent-reports',
      component:SentReportsComponent
    },
    {
      path:'sent-reports/:id',
      component:SentReportsComponent
    }
    ,
    {
      path:'new-form/:inputId',
      component:NewFormComponent
    }
    ,
    {
      path:'new-form',
      component:NewFormComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
