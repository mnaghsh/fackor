import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule, MatBadgeModule
} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {MessagesRoutingModule} from './messages-routing.module';
import {IndexComponent} from './index/index.component';
import {UsersService} from '../../../services/users/users.service';
import {MessengerComponent} from '../../../components/messanger/messenger.component';
import {FormsModule} from '@angular/forms';
import {NavComponent} from '../../../components/nav/nav.component';
import {PipesModule} from "../../../pipes/pipes.module";
import {DialogComponent} from "../../../components/dialog/dialog.component";
import {ImagePreviewComponent} from "../../../components/image-preview/image-preview.component";

@NgModule({
  imports: [
    CommonModule, FormsModule,
    MatSidenavModule, MatSelectModule, MatFormFieldModule,
    MatTabsModule, MatButtonModule, MatListModule, AngularFontAwesomeModule,
    MessagesRoutingModule, MatCardModule, MatChipsModule, MatCheckboxModule, MatToolbarModule, MatInputModule,
    PipesModule, MatBadgeModule
  ],
  providers: [
    UsersService
  ],
  entryComponents: [],
  declarations: [IndexComponent, MessengerComponent, NavComponent]
})
export class MessagesModule {
}
