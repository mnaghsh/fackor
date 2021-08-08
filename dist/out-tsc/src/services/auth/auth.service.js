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
var router_1 = require("@angular/router");
var config_service_1 = require("../config.service");
var http_1 = require("@angular/common/http");
var local_storage_service_1 = require("../local-storage/local-storage.service");
var AuthService = /** @class */ (function () {
    function AuthService(myRoute, localStorage, configService) {
        this.myRoute = myRoute;
        this.localStorage = localStorage;
        this.configService = configService;
    }
    AuthService.prototype.setLoginEntryItems = function (loginValues) {
        var oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
        if (!oldUsers) {
            oldUsers = [];
        }
        var isExist = false;
        for (var i = 0; i < oldUsers.length; i++) {
            if (oldUsers[i].username === loginValues.username) {
                oldUsers[i].password = loginValues.password;
                isExist = true;
            }
        }
        if (!isExist) {
            oldUsers.push({
                'username': loginValues.username,
                'password': loginValues.password
            });
        }
        this.localStorage.set('oldUsers', JSON.stringify(oldUsers));
    };
    AuthService.prototype.checkLoginEntryItems = function (loginValues) {
        var oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
        for (var i = 0; i < oldUsers.length; i++) {
            if (oldUsers[i].username === loginValues.username
                && oldUsers[i].password === loginValues.password) {
                return true;
            }
        }
        return false;
    };
    AuthService.prototype.login = function (username, password) {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            withCredentials: true
        };
        var body = 'username=' + username + '&password=' + password;
        var url = '/security/login';
        return this.configService.post(url, body, httpOptions);
    };
    AuthService.prototype.autoLogin = function () {
        var oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
        var activeUser = this.getActiveUser();
        for (var i = 0; i < oldUsers.length; i++) {
            if (oldUsers[i].username === activeUser) {
                return this.login(oldUsers[i].username, oldUsers[i].password);
            }
        }
    };
    AuthService.prototype.logout = function () {
        return this.configService.get('/security/logout', { withCredentials: true });
    };
    AuthService.prototype.getUserInfo = function () {
        return this.configService.get('/security/currentUser', { withCredentials: true });
    };
    AuthService.prototype.setActiveUser = function (username) {
        this.localStorage.set('activeUser', username);
        this.activeUser = username;
    };
    AuthService.prototype.removeActiveUserData = function () {
        this.localStorage.remove('activeUser');
        this.localStorage.remove('userMission');
        this.localStorage.remove('userInfo');
        this.localStorage.remove('missionOrgForFight');
        this.localStorage.remove('orgForFightUsers');
    };
    AuthService.prototype.getActiveUser = function () {
        return this.localStorage.get('activeUser');
    };
    AuthService.prototype.isLoggednIn = function () {
        return this.getActiveUser() !== null;
    };
    AuthService.prototype.getHashCode = function (str) {
        var hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router,
            local_storage_service_1.LocalStorageService,
            config_service_1.ConfigService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map