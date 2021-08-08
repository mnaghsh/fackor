import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormulaRoutingModule } from './formula-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    CommonModule,
    FormulaRoutingModule
  ],
  declarations: [IndexComponent]
})
export class FormulaModule { }
