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
var http_1 = require("@angular/common/http");
var config_service_1 = require("../config.service");
var MissionService = /** @class */ (function () {
    function MissionService(configService) {
        this.configService = configService;
    }
    MissionService.prototype.login = function () {
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            withCredentials: true
        };
        var body = 'username=' + 'm.khodadadi' + '&password=' + '123456';
        var url = '/security/login';
        return this.configService.post(url, body, httpOptions);
    };
    MissionService.prototype.getAllMissions = function () {
        return this.configService
            .get('/allmissions', { withCredentials: true });
    };
    MissionService.prototype.getMissions = function () {
        return this.configService
            .get('/missions', { withCredentials: true });
    };
    MissionService.prototype.putMissions = function (model) {
        return this.configService.post('/mission', model, { withCredentials: true });
    };
    MissionService.prototype.editMissions = function (model) {
        return this.configService.put('/mission', model, { withCredentials: true });
    };
    MissionService.prototype.deleteMissions = function (id) {
        return this.configService.delete('/mission/' + id, { withCredentials: true });
    };
    MissionService.prototype.logout = function () {
        return this.configService
            .get('/security/logout', { withCredentials: true });
    };
    MissionService.prototype.getMissionById = function (id) {
        return this.configService
            .get('/mission/' + id, { withCredentials: true });
    };
    MissionService.prototype.getOrgForFight = function (id) {
        return this.configService
            .get('/mission/' + id + '/orgForFight', { withCredentials: true });
    };
    MissionService.prototype.setOrgForFightUser = function (body) {
        var httpOptions = {
            withCredentials: true
        };
        var url = '/position';
        return this.configService.put(url, body, httpOptions);
    };
    MissionService.prototype.removeOrgForFightUser = function (id) {
        return this.configService.delete('/position/' + id);
    };
    MissionService.prototype.getOrgForFightUser = function (orgForFightId) {
        return this.configService
            .get('/position/orgforfight-' + orgForFightId, { withCredentials: true });
    };
    MissionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [config_service_1.ConfigService])
    ], MissionService);
    return MissionService;
}());
exports.MissionService = MissionService;
//# sourceMappingURL=mission.service.js.map