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
var reports_service_1 = require("src/web-app/services/reports/reports.service");
var router_1 = require("@angular/router");
var content_component_1 = require("./content/content.component");
var ReportListComponent = /** @class */ (function () {
    function ReportListComponent(reportsService, route, dialog) {
        this.reportsService = reportsService;
        this.route = route;
        this.dialog = dialog;
        this.reportParams = {
            "value": "",
            "mission": { "id": null },
            "creator": { "id": null },
            "receiver": { "id": null },
            "forms": { "id": null },
            "start_time": null,
            "end_time": null
        };
        this.loading = true;
        this.displayedColumns = ['number', 'creator', 'receiver', 'date'];
    }
    ReportListComponent.prototype.ngOnInit = function () {
        this.misssionId = this.route.parent.snapshot.paramMap.get('id');
        this.reportParams.mission.id = this.misssionId;
        this.getUsersByMissionId();
        this.getFormsByMissionId();
    };
    ReportListComponent.prototype.showContent = function (row) {
        console.log('rr');
        var dialogRef = this.dialog.open(content_component_1.FormContentComponent, {
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
    ReportListComponent.prototype.getReportByMissionId = function () {
        var _this = this;
        this.loading = true;
        this.reportsService.getReportByMissionId(this.reportParams).subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.loading = false;
        });
    };
    ReportListComponent.prototype.getUsersByMissionId = function () {
        var _this = this;
        this.reportsService.getUsersByMissionId(this.misssionId).subscribe(function (data) {
            _this.missionUsers = data['records'];
        });
    };
    ReportListComponent.prototype.getFormsByMissionId = function () {
        var _this = this;
        this.reportsService.getFormsByMissionId().subscribe(function (data) {
            _this.reportForms = data;
            _this.reportParams.forms = _this.reportForms[0];
            _this.getReportByMissionId();
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ReportListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ReportListComponent.prototype, "sort", void 0);
    ReportListComponent = __decorate([
        core_1.Component({
            selector: 'web-app-report-list',
            templateUrl: './report-list.component.html',
            styleUrls: ['./report-list.component.css']
        }),
        __metadata("design:paramtypes", [reports_service_1.ReportsService,
            router_1.ActivatedRoute,
            material_1.MatDialog])
    ], ReportListComponent);
    return ReportListComponent;
}());
exports.ReportListComponent = ReportListComponent;
//# sourceMappingURL=report-list.component.js.map