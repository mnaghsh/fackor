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
var material_1 = require("@angular/material");
var rxjs_1 = require("rxjs");
var users_service_1 = require("../../../../services/users/users.service");
var reports_service_1 = require("../../../../services/reports/reports.service");
var common_service_1 = require("../../../../services/common/common.service");
var local_storage_service_1 = require("../../../../services/local-storage/local-storage.service");
var collections_1 = require("@angular/cdk/collections");
var content_component_1 = require("src/mobile-app/pages/report/component/content/content.component");
var confirm_dialog_component_1 = require("src/components/confirm-dialog/confirm-dialog.component");
var accessible_service_1 = require("../../../../services/accessible/accessible.service");
var SentReportsComponent = /** @class */ (function () {
    function SentReportsComponent(route, reportsService, myRoute, commonService, userService, localStorageService, dialog, accessibleService) {
        this.route = route;
        this.reportsService = reportsService;
        this.myRoute = myRoute;
        this.commonService = commonService;
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.displayedColumns = ['select', 'id', 'name', 'date', 'details'];
        this.selection = new collections_1.SelectionModel(true, []);
        this.forms = [];
    }
    SentReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.inputId = data.id;
                _this.findNameOfReport();
                _this.reportHistory();
                _this.dataSource = new material_1.MatTableDataSource(_this.forms);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                // console.log('reportService', this.dataSource)
                console.log('sentReportRowListdataSource', _this.dataSource);
            }
        });
    };
    SentReportsComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId)
                this.nameOfReport = mhd[i].name;
        }
    };
    SentReportsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    SentReportsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    SentReportsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    SentReportsComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        this.accessibleService.showConfirm().subscribe((function (data) {
            console.log(' data', data);
            if (data == 1) {
                console.log(' this.selection.selected', _this.confirmOfDelete);
                var mhd = _this.userService.getFromLocalStorageGroupByUser("sentReportRowList");
                debugger;
                for (var j = 0; j < _this.selection.selected.length; j++) {
                    var row = _this.selection.selected[j];
                    for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                        if (row.id == _this.dataSource.data[i].id) {
                            _this.dataSource.data.splice(i, 1);
                            _this.paginator._changePageSize(_this.paginator.pageSize);
                        }
                    }
                    for (var i = mhd.length - 1; i >= 0; i--) {
                        if (mhd[i].id == _this.selection.selected[j].id) {
                            mhd.splice(i, 1);
                            console.log('mhd', mhd);
                        }
                    }
                }
                _this.reportsService.deleteLocalList(mhd, "sentReportRowList");
            }
        }));
    };
    SentReportsComponent.prototype.showConfirm = function () {
        var _this = this;
        var sub = new rxjs_1.Subject();
        console.log('rr');
        var dialogRef = this.dialog.open(confirm_dialog_component_1.ConfirmDialogComponent, {
            data: {
                Dialog: "حذف انجام شود؟",
                type: "reports"
            },
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data == 1) {
                _this.confirmOfDelete = 1;
                sub.next();
                console.log('dataa', data);
            }
        });
        return sub;
    };
    SentReportsComponent.prototype.newForm = function () {
        this.myRoute.navigate(['report/new-form/', this.inputId]);
    };
    SentReportsComponent.prototype.reportHistory = function () {
        // let mhd = this.userService.getRowOfReportFromLocalStorageGroupByUser("sentReportRowList",this.inputId);
        var mhd = this.userService.getFromLocalStorageGroupByUser('sentReportRowList');
        if (!mhd)
            mhd = [];
        this.forms = [];
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].forms.id == this.inputId) {
                //  this.forms=mhd[i];وو
                this.forms.splice(0, 0, mhd[i]);
            }
        }
        console.log('this.forms', this.forms);
    };
    SentReportsComponent.prototype.showContent = function (row) {
        console.log('rr');
        var dialogRef = this.dialog.open(content_component_1.ContentComponent, {
            data: {
                reportData: row,
                type: "sent-reports"
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
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], SentReportsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], SentReportsComponent.prototype, "sort", void 0);
    SentReportsComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-sent-reports',
            templateUrl: './sent-reports.component.html',
            styleUrls: ['./sent-reports.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            reports_service_1.ReportsService,
            router_1.Router,
            common_service_1.CommonService,
            users_service_1.UsersService,
            local_storage_service_1.LocalStorageService,
            material_1.MatDialog,
            accessible_service_1.AccessibleService])
    ], SentReportsComponent);
    return SentReportsComponent;
}());
exports.SentReportsComponent = SentReportsComponent;
//# sourceMappingURL=sent-reports.component.js.map