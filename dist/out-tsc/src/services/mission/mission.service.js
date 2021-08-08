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
var config_service_1 = require("../config.service");
var http_1 = require("@angular/common/http");
var MissionService = /** @class */ (function () {
    function MissionService(configService) {
        this.configService = configService;
        this.hasAvticeMission = {
            status: true,
            message: ''
        };
    }
    MissionService.prototype.login = function () {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            withCredentials: true
        };
        var body = 'username=' + 'admin' + '&password=' + '123456';
        var url = '/security/login';
        return this.configService.post(url, body, httpOptions);
    };
    MissionService.prototype.getMissions = function () {
        return this.configService
            .get('/missions', { withCredentials: true });
    };
    MissionService.prototype.logout = function () {
        return this.configService
            .get('/security/logout', { withCredentials: true });
    };
    MissionService.prototype.getCurrentUserMission = function () {
        return this.configService
            .get('/missions', { withCredentials: true });
    };
    MissionService.prototype.getOrgForFightByMissionId = function (id) {
        return this.configService
            .get('/mission/' + id + '/orgForFight', { withCredentials: true });
    };
    MissionService.prototype.getOrgForFightUser = function (orgForFightId) {
        return this.configService
            .get('/position/orgforfight-' + orgForFightId, { withCredentials: true });
    };
    MissionService.prototype.getUsersByMissionId = function (id) {
        return this.configService
            .get('/mission/' + id + '/users', { withCredentials: true });
    };
    MissionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService])
    ], MissionService);
    return MissionService;
}());
exports.MissionService = MissionService;
//# sourceMappingURL=mission.service.js.map