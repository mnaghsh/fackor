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
var NewsListComponent = /** @class */ (function () {
    function NewsListComponent(reportsService, route, dialog) {
        this.reportsService = reportsService;
        this.route = route;
        this.dialog = dialog;
        this.newsParams = {
            "text": "",
            "subject": "",
            "mission": {
                "id": null
            },
            "userNews": [
                {
                    "receiver": { "id": null }
                }
            ],
            "sender": { "id": null },
            "start_time": null,
            "end_time": null
        };
        this.loading = true;
        this.displayedColumns = ['number', 'sender', 'sender_time', 'subject'];
    }
    NewsListComponent.prototype.ngOnInit = function () {
        this.newsParams.mission.id = this.route.parent.snapshot.paramMap.get('id');
        this.getNewsByMissionId();
        this.getUsersByMissionId();
    };
    NewsListComponent.prototype.showContent = function (row) {
        var dialogRef = this.dialog.open(content_component_1.ContentComponent, {
            data: {
                newsData: row
            },
            width: "90%",
            height: "80%"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                row = data;
            }
        });
    };
    NewsListComponent.prototype.getNewsByMissionId = function () {
        var _this = this;
        this.loading = true;
        this.reportsService.getNewsByMissionId(this.newsParams).subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.loading = false;
        });
    };
    NewsListComponent.prototype.getUsersByMissionId = function () {
        var _this = this;
        this.reportsService.getUsersByMissionId(297).subscribe(function (data) {
            _this.missionUsers = data['records'];
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], NewsListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], NewsListComponent.prototype, "sort", void 0);
    NewsListComponent = __decorate([
        core_1.Component({
            selector: 'web-app-news-list',
            templateUrl: './news-list.component.html',
            styleUrls: ['./news-list.component.css']
        }),
        __metadata("design:paramtypes", [reports_service_1.ReportsService,
            router_1.ActivatedRoute,
            material_1.MatDialog])
    ], NewsListComponent);
    return NewsListComponent;
}());
exports.NewsListComponent = NewsListComponent;
//# sourceMappingURL=news-list.component.js.map