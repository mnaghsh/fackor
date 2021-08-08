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
var mission_service_1 = require("../../../services/mission/mission.service");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(missionProvider) {
        this.missionProvider = missionProvider;
        this.navLinks = [
            // {lable: 'عملیات های فعال', path: 'list', icon: 'git-network'},
            // {lable: 'عملیات های غیر فعال', path: 'list', icon: 'contacts'},
            { lable: 'اضافه کردن عملیات', path: 'add', icon: 'add-circle' },
        ];
        this.getMission();
    }
    IndexComponent.prototype.ngOnInit = function () {
        console.log('mission-tree loaded');
        this.link = 'list';
    };
    IndexComponent.prototype.showMainView = function (view) {
        this.mainDetailComponent = view.component;
    };
    IndexComponent.prototype.getMission = function () {
        // this.missionProvider.getMissionById(this.missionId).subscribe(
        //   (data: Details) => {
        //     this.id = data.id;
        //     this.name = data.name;
        //     this.startTime = data.startTime;
        //     this.endTime = data.endTime;
        //   }
        // );
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        }),
        __metadata("design:paramtypes", [mission_service_1.MissionService])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map