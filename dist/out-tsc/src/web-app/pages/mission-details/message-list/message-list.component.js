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
var MessageListComponent = /** @class */ (function () {
    function MessageListComponent(reportsService, route) {
        this.reportsService = reportsService;
        this.route = route;
        this.messParams = {
            "text": "",
            "mission": {
                "id": null
            },
            "receiver": { "id": null },
            "sender": { "id": null },
            "start_time": null,
            "end_time": null
        };
        this.loading = true;
        this.displayedColumns = ['number', 'sender', 'receiver', 'sender_time', 'text'];
    }
    MessageListComponent.prototype.ngOnInit = function () {
        this.messParams.mission.id = this.route.parent.snapshot.paramMap.get('id');
        this.getMessageByMissionId();
        this.getUsersByMissionId();
    };
    MessageListComponent.prototype.getMessageByMissionId = function () {
        var _this = this;
        this.loading = true;
        this.reportsService.getMessageByMissionId(this.messParams).subscribe(function (data) {
            _this.dataSource = new material_1.MatTableDataSource(data);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.loading = false;
        });
    };
    MessageListComponent.prototype.getUsersByMissionId = function () {
        var _this = this;
        this.reportsService.getUsersByMissionId(297).subscribe(function (data) {
            _this.missionUsers = data['records'];
        });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], MessageListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], MessageListComponent.prototype, "sort", void 0);
    MessageListComponent = __decorate([
        core_1.Component({
            selector: 'web-app-message-list',
            templateUrl: './message-list.component.html',
            styleUrls: ['./message-list.component.css']
        }),
        __metadata("design:paramtypes", [reports_service_1.ReportsService,
            router_1.ActivatedRoute])
    ], MessageListComponent);
    return MessageListComponent;
}());
exports.MessageListComponent = MessageListComponent;
//# sourceMappingURL=message-list.component.js.map