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
var ReportsService = /** @class */ (function () {
    function ReportsService(configService, http) {
        this.configService = configService;
        this.http = http;
    }
    ReportsService.prototype.getUsersByMissionId = function (mId) {
        return this.configService.get('/security/users', { withCredentials: true });
    };
    // public getUsersByMissionId(mId) {
    //   return this.configService.get('/mission/' + mId + '/users',
    //     { withCredentials: true });
    // }
    ReportsService.prototype.getNewsByMissionId = function (params) {
        return this.configService.put('/searchnews', params, { withCredentials: true });
    };
    ReportsService.prototype.getMessageByMissionId = function (params) {
        return this.configService.put('/searchmessage', params, { withCredentials: true });
    };
    ReportsService.prototype.getReportByMissionId = function (params) {
        return this.configService.put('/searchformdata', params, { withCredentials: true });
    };
    ReportsService.prototype.getFormsByMissionId = function () {
        return this.configService.get('/forms', { withCredentials: true });
    };
    ReportsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.HttpClient])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map