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
var users_service_1 = require("../../services/users/users.service");
var mission_service_1 = require("../../services/mission/mission.service");
var MissionGuard = /** @class */ (function () {
    function MissionGuard(usersService, myRoute, missionService) {
        this.usersService = usersService;
        this.myRoute = myRoute;
        this.missionService = missionService;
    }
    MissionGuard.prototype.canActivate = function (next, state) {
        if (!this.usersService.userHasMission()) {
            this.missionService.hasAvticeMission.status = false;
            this.missionService.hasAvticeMission.message =
                "شما ماموریت فعالی ندارید";
            this.myRoute.navigate(['login']);
            return false;
        }
        this.missionService.hasAvticeMission.status = true;
        return true;
    };
    MissionGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            router_1.Router,
            mission_service_1.MissionService])
    ], MissionGuard);
    return MissionGuard;
}());
exports.MissionGuard = MissionGuard;
//# sourceMappingURL=mission.guard.js.map