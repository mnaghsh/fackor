import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {TestComponent} from './components/test/test.component';
import {EqualValidatorDirective} from './shared/equal.validator.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule, MatListModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './services/config.service';
import {MissionService} from './services/mission/mission.service';
import {AuthService} from './services/auth/auth.service';
import {HomeComponent} from "./pages/home/home.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {LoginComponent} from "./pages/login/login.component";
import {InfoComponent} from "./pages/info/info.component";
import {NavComponent} from "./components/nav/nav.component";
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ConfirmDialogComponent} from '../components/confirm-dialog/confirm-dialog.component';
import {FavaLoginModule} from 'fava-login';

const myRoots: Routes = [
  // {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'info', component: InfoComponent},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'missions', loadChildren: './pages/missions/missions.module#MissionsModule'},
      {path: 'users', loadChildren: './pages/users/users.module#UsersModule'},
      {path: 'news', loadChildren: './pages/news/news.module#NewsModule'}
    ]
  },
  {
    path: 'mission-details/:id',
    loadChildren: './pages/mission-details/mission-details.module#MissionDetailsModule'
  },
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegistrationComponent,
    LoginComponent,
    EqualValidatorDirective,
    InfoComponent,
    TestComponent,
    PageNotFoundComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [

    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatListModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule, MatSidenavModule,
    RouterModule.forRoot(myRoots, {useHash: true}), AngularFontAwesomeModule,
    HttpClientModule, FavaLoginModule
  ],
  providers: [
    AuthService,
    MissionService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
