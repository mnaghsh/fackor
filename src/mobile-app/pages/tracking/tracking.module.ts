import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatProgressBarModule,
  MatMenuModule,
  MatExpansionModule,
  MatTooltipModule,
  MatChipsModule,
  MatDatepickerModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatRadioModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {TrackingRoutingModule} from './tracking-routing.module';
import {IndexComponent} from './index/index.component';
import {FavaLayerModule} from 'fava-layer';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {PipesModule} from '../../../pipes/pipes.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SettingsComponent} from 'src/mobile-app/pages/tracking/components/settings/settings.component';
import {TrackNavBarComponent} from "../../../components/track-nav-bar/track-nav-bar.component";



@NgModule({
  imports: [
    CommonModule,
    TrackingRoutingModule, MatProgressBarModule,
    MatSidenavModule, MatSelectModule, MatFormFieldModule,
    MatTabsModule, MatButtonModule, MatListModule, AngularFontAwesomeModule, MatMenuModule, MatExpansionModule, MatChipsModule,
    MatTooltipModule, DpDatePickerModule, PipesModule,
    CommonModule,
    MatSidenavModule, MatSelectModule, MatFormFieldModule,
    MatSidenavModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, MatCardModule, MatTabsModule, FormsModule, MatIconModule,
    MatButtonModule, MatListModule, MatCheckboxModule, MatTableModule, MatNativeDateModule,
    AngularFontAwesomeModule, MatDialogModule, MatPaginatorModule, MatRadioModule, MatDatepickerModule,
    MatTabsModule, MatButtonModule, MatListModule, MatDialogModule, MatExpansionModule, MatSlideToggleModule, MatToolbarModule, FavaLayerModule
  ],
  entryComponents: [SettingsComponent, TrackNavBarComponent],
  declarations: [IndexComponent, SettingsComponent, TrackNavBarComponent]
})
export class TrackingModule {
}
