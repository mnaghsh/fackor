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
var auth_service_1 = require("../../services/auth/auth.service");
var core_2 = require("@angular/core");
var users_service_1 = require("../../services/users/users.service");
var material_1 = require("@angular/material");
var mission_service_1 = require("../../services/mission/mission.service");
var socket_service_1 = require("../../services/socket/socket.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, myRoute, usersService, missionService, auth, user, socket, dialog) {
        this.fb = fb;
        this.myRoute = myRoute;
        this.usersService = usersService;
        this.missionService = missionService;
        this.auth = auth;
        this.user = user;
        this.socket = socket;
        this.dialog = dialog;
        this.loginForm = fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.activeUserInfo = this.usersService.getUserInfo();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(function () {
                _this.successfulLogin();
            }, function (error) {
                _this.unSuccessfulLogin(error);
            });
        }
        else {
            this.message = 'لطفا مقادیر بالا را به صورت صحیح وارد کنید.';
        }
    };
    LoginComponent.prototype.successfulLogin = function () {
        var _this = this;
        this.auth.setLoginEntryItems(this.loginForm.value);
        this.auth.setActiveUser(this.loginForm.value.username);
        this.user.setInfo(this.loginForm.value.username);
        this.user.localStorageSet.subscribe(function () {
            if (!_this.socket.autoSender)
                _this.myRoute.navigate(['']);
        });
    };
    LoginComponent.prototype.unSuccessfulLogin = function (error) {
        var _this = this;
        if (error.status === 0) {
            var userIsExist = this.auth.checkLoginEntryItems(this.loginForm.value);
            if (userIsExist) {
                this.auth.setActiveUser(this.loginForm.value.username);
                var userMissionExist = this.user.hasOldMission();
                if (userMissionExist) {
                    this.user.setInfo(this.loginForm.value.username);
                }
                this.user.localStorageSet.subscribe(function () {
                    if (!_this.socket.autoSender)
                        _this.myRoute.navigate(['']);
                });
            }
            else {
                this.message = 'نام کاربری و یا رمز عبور اشتباه است.';
            }
        }
        else {
            this.message = error.error.text;
        }
    };
    __decorate([
        core_2.ViewChild('username'),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "username", void 0);
    __decorate([
        core_2.ViewChild('password'),
        __metadata("design:type", Object)
    ], LoginComponent.prototype, "password", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            router_1.Router,
            users_service_1.UsersService,
            mission_service_1.MissionService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            socket_service_1.SocketService,
            material_1.MatDialog])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map