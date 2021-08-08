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
var users_service_1 = require("../users/users.service");
var ReportsService = /** @class */ (function () {
    function ReportsService(configService, userService) {
        this.configService = configService;
        this.userService = userService;
    }
    ReportsService.prototype.getForms = function () {
        return this.configService.get('/forms', { withCredentials: true });
    };
    ReportsService.prototype.getFormOrderById = function (id) {
        this.forms = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < this.forms.length; i++) {
            if (this.forms[i].id == id) {
                console.log(this.forms[i]);
                return this.forms[i];
            }
        }
        return null;
    };
    ReportsService.prototype.inboxReportUrl = function (inputId) {
        return this.configService.get('/formdata/' + inputId, { withCredentials: true });
    };
    // public buildInboxReport(inputId): Observable<any> {
    //   let reportRowList = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList',inputId);
    //   let sub = new Subject<any>();
    //   this.inboxReportUrl(inputId).subscribe(
    //     (data) => {
    //  debugger
    //       if (reportRowList!=null)
    //         reportRowList = data.concat(reportRowList);
    //         else{
    //           reportRowList = data
    //         }
    //        this.userService.setRowOfReportToLocalStorageGroupByUser(reportRowList, 'reportRowList',inputId);
    //       sub.next();
    //     },
    //     (error) => {
    //       sub.next();
    //     });
    //   return sub;
    // }
    ReportsService.prototype.buildInboxReport = function (inputId) {
        var reportRowList = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', inputId);
        this.inboxReportUrl(inputId).subscribe(function (data) {
            if (reportRowList != null)
                reportRowList = data.concat(reportRowList);
            else {
                reportRowList = data;
            }
            //this.userService.setRowOfReportToLocalStorageGroupByUser(reportRowList, 'reportRowList',inputId);
            console.log('reportRowList', reportRowList);
            return reportRowList;
        }, function (error) {
            console.log('error', error);
        });
        return null;
    };
    ReportsService.prototype.putNews = function (Model) {
        return this.configService.put('/formdata', Model, { withCredentials: true });
    };
    ReportsService.prototype.addListRow = function (data, label, inputId) {
        var temp = this.userService.getFromLocalStorageGroupByUser(label);
        if (!temp) {
            this.userService.setToLocalStorageGroupByUser([], label);
            temp = this.userService.getFromLocalStorageGroupByUser(label);
        }
        temp.splice(0, 0, data);
        this.userService.setToLocalStorageGroupByUser(temp, label);
    };
    ReportsService.prototype.deleteList = function (id) {
        return this.configService.get('/formdata/delete-' + id, { withCredentials: true });
    };
    ReportsService.prototype.deleteLocalList = function (value, label) {
        this.userService.setToLocalStorageGroupByUser(value, label);
    };
    ReportsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            users_service_1.UsersService])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map