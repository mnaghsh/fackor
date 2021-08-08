"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var mission_service_1 = require("../../services/mission/mission.service");
var auth_service_1 = require("../../services/auth/auth.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(missionService, fb, myRoute, auth) {
        this.missionService = missionService;
        this.fb = fb;
        this.myRoute = myRoute;
        this.auth = auth;
        // this.form = fb.group({
        //   email: ['', [Validators.required]],
        //   password: ['', Validators.required]
        // });
    }
    LoginComponent.prototype.confirmEvent = function (e) {
        console.log('e', e);
        if (e = "success") {
            this.myRoute.navigate(['/missions/list']);
            this.auth.sendToken('true');
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        // if (this.form.valid) {
        //  this.missionService.login().subscribe();
        //   this.auth.sendToken(this.form.value.email);
        // this.myRoute.navigate(['/missions/list']);
        // }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [mission_service_1.MissionService,
            forms_1.FormBuilder,
            router_1.Router,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map