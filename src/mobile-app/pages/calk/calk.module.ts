import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalkRoutingModule} from './calk-routing.module';
import {IndexComponent} from 'src/mobile-app/pages/calk/index/index.component';
import {PipesModule} from 'src/pipes/pipes.module';
import {
  MatSidenavModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSortModule, MatAutocompleteModule, MatRadioModule, MatToolbarModule, MatMenuModule
} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayersComponent} from './components/layers/layers.component';
import {TreeLayersComponent} from './components/tree-layers/tree-layers.component';
import {TreeModule} from 'angular-tree-component';
import {AddLayerComponent} from './components/add-layer/add-layer.component';
import {ModifyFeatureComponent} from './components/modify-feature/modify-feature.component';
import {FeaturesComponent} from './components/features/features.component';
import {DynamicFormFieldComponent} from '../../../components/dynamic-form-field/dynamic-form-field.component';
import {QuillModule} from 'ngx-quill';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {ColorPickerModule} from 'ngx-color-picker';
import { UnitComponent } from "src/mobile-app/pages/calk/components/popups/unit/unit.component";



@NgModule({
  imports: [
    CommonModule, TreeModule,
    CalkRoutingModule, PipesModule,
    MatSidenavModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatCheckboxModule,
    MatFormFieldModule, MatCardModule, MatTabsModule, FormsModule, MatIconModule,
    MatButtonModule, MatListModule, MatCheckboxModule, MatTableModule, MatRadioModule,
    AngularFontAwesomeModule, MatDialogModule, MatPaginatorModule, MatToolbarModule,
    MatExpansionModule, MatSortModule, QuillModule, DpDatePickerModule, ColorPickerModule,
    MatListModule, MatCheckboxModule, MatTableModule,
    AngularFontAwesomeModule, MatDialogModule, MatPaginatorModule, MatExpansionModule, MatSortModule,
    MatMenuModule
  ],

  entryComponents: [
    AddLayerComponent,UnitComponent
  ],
  declarations: [
    IndexComponent, TreeLayersComponent, LayersComponent,
    AddLayerComponent, ModifyFeatureComponent, FeaturesComponent,
    DynamicFormFieldComponent, NavBarComponent,
    TreeLayersComponent,
    LayersComponent,
    AddLayerComponent,
    ModifyFeatureComponent,
    FeaturesComponent,
    NavBarComponent,
    UnitComponent
  ]
})
export class CalkModule {
}
