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
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var angular_font_awesome_1 = require("angular-font-awesome");
var map_component_1 = require("../components/map/map.component");
var login_component_1 = require("../components/login/login.component");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var auth_service_1 = require("../services/auth/auth.service");
var config_service_1 = require("../services/config.service");
var http_1 = require("@angular/common/http");
var login_guard_1 = require("../guards/login/login.guard");
var user_info_component_1 = require("./pages/dashboard/user-info/user-info.component");
var mission_info_component_1 = require("./pages/dashboard/mission-info/mission-info.component");
var mission_guard_1 = require("../guards/mission/mission.guard");
var pipes_module_1 = require("../pipes/pipes.module");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var dialog_component_1 = require("../components/dialog/dialog.component");
var confirm_dialog_component_1 = require("src/components/confirm-dialog/confirm-dialog.component");
var myRoots = [
    {
        path: '', component: dashboard_component_1.DashboardComponent,
        canActivate: [login_guard_1.LoginGuard, mission_guard_1.MissionGuard],
        // canActivateChild: [LoginGuard],
        children: [
            { path: '', component: map_component_1.MapComponent },
            { path: 'news', loadChildren: './pages/news/news.module#NewsModule' },
            { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule' },
            { path: 'report', loadChildren: './pages/report/report.module#ReportModule' },
            { path: 'tracking', loadChildren: './pages/tracking/tracking.module#TrackingModule' },
            { path: 'user-info', component: user_info_component_1.UserInfoComponent },
            { path: 'mission-info', component: mission_info_component_1.MissionInfoComponent },
        ]
    },
    { path: 'login', component: login_component_1.LoginComponent }
    // { path: 'login', component: LoginComponent },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                map_component_1.MapComponent,
                login_component_1.LoginComponent,
                user_info_component_1.UserInfoComponent,
                mission_info_component_1.MissionInfoComponent,
                dialog_component_1.DialogComponent,
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            entryComponents: [
                dialog_component_1.DialogComponent,
                confirm_dialog_component_1.ConfirmDialogComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                material_1.MatTabsModule,
                material_1.MatListModule,
                http_1.HttpClientModule,
                angular_font_awesome_1.AngularFontAwesomeModule,
                animations_1.BrowserAnimationsModule, forms_1.FormsModule, material_1.MatCardModule,
                material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatFormFieldModule, material_1.MatTabsModule, material_1.MatButtonModule,
                platform_browser_1.BrowserModule, forms_1.FormsModule, forms_2.ReactiveFormsModule, material_1.MatInputModule,
                material_1.MatButtonModule, material_1.MatCardModule, material_1.MatToolbarModule, material_1.MatMenuModule, material_1.MatSnackBarModule,
                bottom_sheet_1.MatBottomSheetModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                router_1.RouterModule.forRoot(myRoots, { useHash: true }),
                pipes_module_1.PipesModule
            ],
            providers: [
                auth_service_1.AuthService,
                config_service_1.ConfigService,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map