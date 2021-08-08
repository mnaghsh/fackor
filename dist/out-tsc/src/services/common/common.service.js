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
var news_service_1 = require("../news/news.service");
var local_storage_service_1 = require("../local-storage/local-storage.service");
var reports_service_1 = require("../reports/reports.service");
var users_service_1 = require("../users/users.service");
var CommonService = /** @class */ (function () {
    function CommonService(newsService, localStorageService, reportsService, usersService) {
        this.newsService = newsService;
        this.localStorageService = localStorageService;
        this.reportsService = reportsService;
        this.usersService = usersService;
    }
    CommonService.prototype.getfields = function () {
        this.sourceNews();
        this.urgentNews();
        this.importantNews();
        this.getReceivers();
        this.truthNews();
        this.reportForms();
    };
    CommonService.prototype.sourceNews = function () {
        var _this = this;
        var temp = this.newsService.getOfflineSources('sourceNews');
        if (!temp) {
            this.newsService.getSourceNews().subscribe(function (data) {
                _this.newsService.setCommonField(data, 'sourceNews');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService.prototype.urgentNews = function () {
        var _this = this;
        var temp = this.newsService.getOfflineSources('urgentNews');
        if (!temp) {
            this.newsService.getUrgentNews().subscribe(function (data) {
                _this.newsService.setCommonField(data, 'urgentNews');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService.prototype.importantNews = function () {
        var _this = this;
        var temp = this.newsService.getOfflineSources('importantNews');
        if (!temp) {
            this.newsService.getImportantNews().subscribe(function (data) {
                _this.newsService.setCommonField(data, 'importantNews');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService.prototype.getReceivers = function () {
        var _this = this;
        var temp = this.newsService.getOfflineMailbox('newsReceiver');
        if (temp.length == 0) {
            this.newsService.getNewsRecivers().subscribe(function (data) {
                var mhd = _this.newsService.setMailbox(data, 'newsReceiver');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService.prototype.truthNews = function () {
        var _this = this;
        var temp = this.newsService.getOfflineSources('truthNews');
        if (!temp) {
            this.newsService.getTruthNews().subscribe(function (data) {
                _this.newsService.setCommonField(data, 'truthNews');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService.prototype.reportForms = function () {
        var _this = this;
        var temp = this.usersService.getFromLocalStorageGroupByUser('reportForms');
        if (!temp) {
            this.reportsService.getForms().subscribe(function (data) {
                _this.usersService.setToLocalStorageGroupByUser(data, 'reportForms');
            }, function (error) {
                console.log(error);
            });
        }
    };
    CommonService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService,
            local_storage_service_1.LocalStorageService,
            reports_service_1.ReportsService,
            users_service_1.UsersService])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map