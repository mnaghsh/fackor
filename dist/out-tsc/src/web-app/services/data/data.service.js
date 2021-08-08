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
var DataService = /** @class */ (function () {
    function DataService(configService, http) {
        this.configService = configService;
        this.http = http;
    }
    DataService.prototype.getType = function () {
        return this.http.get('./assets/data/type.json');
    };
    DataService.prototype.getSize = function () {
        return this.http.get('./assets/data/size.json');
    };
    DataService.prototype.getUsers = function () {
        return this.configService.get('/security/users', { withCredentials: true });
    };
    DataService.prototype.getSourceNews = function () {
        return this.configService.get('/sourcenews', { withCredentials: true });
    };
    DataService.prototype.getUrgentNews = function () {
        return this.configService.get('/urgentnews', { withCredentials: true });
    };
    DataService.prototype.getImportantNews = function () {
        return this.configService.get('/importantnews', { withCredentials: true });
    };
    DataService.prototype.getTruthNews = function () {
        return this.configService.get('/newstruth', { withCredentials: true });
    };
    DataService.prototype.putUsers = function (model) {
        return this.configService.put('/security/users', model
        //  {
        // "id":20386,
        // "firstname":"sample",
        // "lastname":"نقش",
        // "password":"1234",
        // "roles":[{"id":282}],
        // "username":"sahani"
        // }
        , { withCredentials: true });
    };
    DataService.prototype.editUsers = function (model) {
        return this.configService.put('/security/users/update', model, { withCredentials: true });
    };
    DataService.prototype.deleteUsers = function (id) {
        return this.configService.delete('/security/users-' + id, { withCredentials: true });
    };
    DataService.prototype.editImportantNews = function (id, name) {
        return this.configService.put('/importantnewsEdit', {
            "id": id,
            "name": name,
        }, { withCredentials: true });
    };
    DataService.prototype.putImportantNews = function (name) {
        return this.configService.put('/importantnews', {
            "name": name,
        }, { withCredentials: true });
    };
    DataService.prototype.editTruthNews = function (id, name) {
        return this.configService.put('/truthnewsEdit', {
            "id": id,
            "name": name,
        }, { withCredentials: true });
    };
    DataService.prototype.putTruthNews = function (name) {
        return this.configService.put('/truthnews', {
            "name": name,
        }, { withCredentials: true });
    };
    DataService.prototype.editSourceNews = function (id, name) {
        return this.configService.put('/sourcenewsEdit', {
            "id": id,
            "name": name,
        }, { withCredentials: true });
    };
    DataService.prototype.putSourceNews = function (name) {
        return this.configService.put('/sourcenews', {
            "name": name,
        }, { withCredentials: true });
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService, http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map