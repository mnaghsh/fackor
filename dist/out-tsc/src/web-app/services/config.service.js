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
var ConfigService = /** @class */ (function () {
    function ConfigService(http) {
        this.http = http;
        this.localVariables = {
            baseUrl: 'http://192.168.3.7:8080/Fackur'
        };
    }
    ConfigService.prototype.get = function (url, options) {
        return this.http.get(this.localVariables.baseUrl + url, options);
    };
    ConfigService.prototype.delete = function (url, options) {
        return this.http.delete(this.localVariables.baseUrl + url, options);
    };
    ConfigService.prototype.post = function (url, body, options) {
        return this.http.post(this.localVariables.baseUrl + url, body, options);
    };
    ConfigService.prototype.put = function (url, body, options) {
        return this.http.put(this.localVariables.baseUrl + url, body, options);
    };
    ConfigService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map