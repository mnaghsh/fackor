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
var auth_service_1 = require("../../services/auth/auth.service");
var router_1 = require("@angular/router");
var users_service_1 = require("../../services/users/users.service");
var LoginGuard = /** @class */ (function () {
    function LoginGuard(loginService, myRoute, auth) {
        this.loginService = loginService;
        this.myRoute = myRoute;
        this.auth = auth;
    }
    LoginGuard.prototype.canActivate = function (next, state) {
        if (!this.loginService.isLoggednIn()) {
            this.myRoute.navigate(['login']);
            return false;
        }
        return true;
    };
    LoginGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router,
            users_service_1.UsersService])
    ], LoginGuard);
    return LoginGuard;
}());
exports.LoginGuard = LoginGuard;
//# sourceMappingURL=login.guard.js.map