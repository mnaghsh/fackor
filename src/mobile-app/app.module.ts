import { LoginComponent } from './pages/login/login.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {
  MatSidenavModule,
  MatSelectModule,
  MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialog,
  MatDialogModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatCheckboxChange,
  MatCheckboxModule,
  MatBadgeModule,

} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {MapComponent} from '../components/map/map.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {ConfigService} from '../services/config.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoginGuard} from '../guards/login/login.guard';
import {UserInfoComponent} from "./pages/dashboard/user-info/user-info.component";
import {MissionInfoComponent} from "./pages/dashboard/mission-info/mission-info.component";
import {MissionGuard} from "../guards/mission/mission.guard";
import {PipesModule} from "../pipes/pipes.module";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {DialogComponent} from "../components/dialog/dialog.component";
import {ConfirmDialogComponent} from 'src/components/confirm-dialog/confirm-dialog.component';
import {ImagePreviewComponent} from "../components/image-preview/image-preview.component";
import {UpdateComponent} from "./pages/dashboard/update/update.component";
import { AuthInterceptor } from '../services/auth-interceptor.service';
import {CoordinateDialogComponent} from "../components/coordinate-dialog/coordinate-dialog.component";
import {TrackNavBarComponent} from "../components/track-nav-bar/track-nav-bar.component";


const myRoots: Routes = [
  {
    path: '', component: LoginComponent,
    // canActivate: [LoginGuard, MissionGuard],
    // canActivateChild: [LoginGuard],
    children: [
      {path: '', component: MapComponent},
      {path: 'news', loadChildren: './pages/news/news.module#NewsModule'},
      {path: 'formula', loadChildren: './pages/formula/formula.module#FormulaModule'},
      {path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule'},
      {path: 'report', loadChildren: './pages/report/report.module#ReportModule'},
      {path: 'tracking', loadChildren: './pages/tracking/tracking.module#TrackingModule'},
      {path: 'calk', loadChildren: './pages/calk/calk.module#CalkModule'},
      {path: 'user-info', component: UserInfoComponent},
      {path: 'mission-info', component: MissionInfoComponent},
      {path: 'update', component: UpdateComponent},
    ]
  },
  {path: 'login', component: LoginComponent}
  // { path: 'login', component: LoginComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    LoginComponent,
    UserInfoComponent,
    MissionInfoComponent,
    DialogComponent,
    ConfirmDialogComponent,
    ImagePreviewComponent,
    UpdateComponent,
    CoordinateDialogComponent,
  ],
  entryComponents: [
    DialogComponent,
    ConfirmDialogComponent,
    ImagePreviewComponent,
    CoordinateDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule, FormsModule, MatCardModule,
    MatSidenavModule, MatSelectModule, MatFormFieldModule, MatTabsModule, MatButtonModule,
    BrowserModule, FormsModule, ReactiveFormsModule, MatInputModule,
    MatButtonModule, MatCardModule, MatToolbarModule, MatMenuModule, MatSnackBarModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatDialogModule,
    RouterModule.forRoot(myRoots, {useHash: true}),
    PipesModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    AuthInterceptor,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
