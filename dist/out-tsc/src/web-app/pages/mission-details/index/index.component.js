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
var mission_service_1 = require("../../../services/mission/mission.service");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(route, missionService) {
        this.route = route;
        this.missionService = missionService;
        this.mission = {};
        this.detailsMenu = [
            { name: 'سازمان برای رزم', link: 'org-for-fight' },
            { name: 'لیست کاربران انتساب شده(v2)', link: 'users' },
            { name: 'انتساب کاربران(v2)', link: 'users' },
        ];
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.snapshot.paramMap.get('id');
        this.missionService.getMissionById(this.id).subscribe(function (data) {
            _this.mission = data;
        }, function (error) {
            console.log(error);
        });
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            mission_service_1.MissionService])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map