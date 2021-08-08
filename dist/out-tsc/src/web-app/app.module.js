"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var test_component_1 = require("./components/test/test.component");
var equal_validator_directive_1 = require("./shared/equal.validator.directive");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var http_1 = require("@angular/common/http");
var config_service_1 = require("./services/config.service");
var mission_service_1 = require("./services/mission/mission.service");
var auth_service_1 = require("./services/auth/auth.service");
var home_component_1 = require("./pages/home/home.component");
var registration_component_1 = require("./pages/registration/registration.component");
var login_component_1 = require("./pages/login/login.component");
var info_component_1 = require("./pages/info/info.component");
var nav_component_1 = require("./components/nav/nav.component");
var page_not_found_component_1 = require("./pages/page-not-found/page-not-found.component");
var angular_font_awesome_1 = require("angular-font-awesome");
var confirm_dialog_component_1 = require("../components/confirm-dialog/confirm-dialog.component");
var fava_login_1 = require("fava-login");
var myRoots = [
    { path: '', component: home_component_1.HomeComponent, pathMatch: 'full' },
    { path: 'register', component: registration_component_1.RegistrationComponent, pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'info', component: info_component_1.InfoComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'missions', loadChildren: './pages/missions/missions.module#MissionsModule' },
    { path: 'mission-details/:id', loadChildren: './pages/mission-details/mission-details.module#MissionDetailsModule' },
    { path: 'users', loadChildren: './pages/users/users.module#UsersModule' },
    { path: 'news', loadChildren: './pages/news/news.module#NewsModule' },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                nav_component_1.NavComponent,
                registration_component_1.RegistrationComponent,
                login_component_1.LoginComponent,
                equal_validator_directive_1.EqualValidatorDirective,
                info_component_1.InfoComponent,
                test_component_1.TestComponent,
                page_not_found_component_1.PageNotFoundComponent,
                confirm_dialog_component_1.ConfirmDialogComponent,
            ],
            entryComponents: [
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            imports: [
                platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, material_1.MatListModule,
                material_1.MatButtonModule, material_1.MatCardModule, material_1.MatInputModule, material_1.MatSnackBarModule, material_1.MatToolbarModule, material_1.MatSidenavModule,
                router_1.RouterModule.forRoot(myRoots, { useHash: true }), angular_font_awesome_1.AngularFontAwesomeModule,
                http_1.HttpClientModule, fava_login_1.FavaLoginModule
            ],
            providers: [
                auth_service_1.AuthService,
                mission_service_1.MissionService,
                config_service_1.ConfigService,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map