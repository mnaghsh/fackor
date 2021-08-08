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
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var reports_service_1 = require("../../../../services/reports/reports.service");
var local_storage_service_1 = require("../../../../services/local-storage/local-storage.service");
var common_service_1 = require("../../../../services/common/common.service");
var users_service_1 = require("../../../../services/users/users.service");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var content_component_1 = require("src/mobile-app/pages/report/component/content/content.component");
var accessible_service_1 = require("../../../../services/accessible/accessible.service");
var ReportsComponent = /** @class */ (function () {
    function ReportsComponent(route, myRoute, reportsService, commonService, userService, localStorageService, dialog, accessibleService) {
        this.route = route;
        this.myRoute = myRoute;
        this.reportsService = reportsService;
        this.commonService = commonService;
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.displayedColumns = ['select', 'id', 'name', 'date', 'details'];
        this.selection = new collections_1.SelectionModel(true, []);
    }
    ReportsComponent.prototype.ngOnChanges = function () {
    };
    ReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.inputId = data.id;
                _this.findNameOfReport();
                var mhd = _this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', _this.inputId);
                console.log('reportRowList', mhd);
                _this.reportHistory().subscribe(function (data) {
                    _this.dataSource = new material_1.MatTableDataSource(_this.forms);
                    _this.dataSource.paginator = _this.paginator;
                    _this.dataSource.sort = _this.sort;
                    console.log('reportService', _this.dataSource);
                    console.log('2', _this.forms);
                });
            }
        });
    };
    ReportsComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId)
                this.nameOfReport = mhd[i].name;
        }
    };
    ReportsComponent.prototype.newForm = function () {
        this.myRoute.navigate(['report/new-form/', this.inputId]);
    };
    ReportsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ReportsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ReportsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            console.log('row', row);
            if (row['value'].indexOf(filter) >= 0 ||
                row['receiver'].firstname.indexOf(filter) >= 0 ||
                row['receiver'].lastname.indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ReportsComponent.prototype.reportHistory = function () {
        var _this = this;
        var sub = new rxjs_1.Subject();
        this.reportsService.inboxReportUrl(this.inputId).subscribe(function (data) {
            _this.forms = data;
            _this.userService.setRowOfReportToLocalStorageGroupByUser(data, 'reportRowList', _this.inputId);
            console.log('online', _this.forms);
            sub.next();
        }, function (error) {
            _this.forms = _this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', _this.inputId);
            console.log('offline', _this.forms);
            sub.next();
        });
        return sub;
    };
    ReportsComponent.prototype.showContent = function (row) {
        console.log('rr');
        var dialogRef = this.dialog.open(content_component_1.ContentComponent, {
            data: {
                reportData: row,
                type: "reports"
            },
            width: "90%",
            height: "80%"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                console.log('dataa', data);
            }
        });
    };
    ReportsComponent.prototype.outboxReports = function () {
        this.myRoute.navigate(['report/sent-reports/', this.inputId]);
    };
    ReportsComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        this.accessibleService.showConfirm().subscribe((function (data) {
            if (data == 1) {
                _this.selection.selected.forEach(function (row) {
                    //delete from server
                    _this.reportsService.deleteList(row.id).subscribe(function (data) {
                        for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                            if (row.id == _this.dataSource.data[i].id) {
                                _this.dataSource.data.splice(i, 1);
                                _this.paginator._changePageSize(_this.paginator.pageSize);
                                //delete from local storage
                                _this.reportsService.deleteLocalList(_this.dataSource.data, 'reportRowList');
                            }
                        }
                    }, function (error) {
                        console.log('حذف انجام نشد');
                    });
                });
            }
        }));
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ReportsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ReportsComponent.prototype, "sort", void 0);
    ReportsComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-reports',
            templateUrl: './reports.component.html',
            styleUrls: ['./reports.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            reports_service_1.ReportsService,
            common_service_1.CommonService,
            users_service_1.UsersService,
            local_storage_service_1.LocalStorageService,
            material_1.MatDialog,
            accessible_service_1.AccessibleService])
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=reports.component.js.map