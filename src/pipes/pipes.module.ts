import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JalaliPipe} from "../web-app/pipes/jalali.pipe";

@NgModule({
  imports: [],
  exports: [JalaliPipe],
  declarations: [JalaliPipe]
})
export class PipesModule {
}
