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
var users_service_1 = require("../../../../services/users/users.service");
var UserInfoComponent = /** @class */ (function () {
    function UserInfoComponent(usersService) {
        this.usersService = usersService;
    }
    UserInfoComponent.prototype.ngOnInit = function () {
        this.userInfo = this.usersService.getUserInfo();
    };
    UserInfoComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-user-info',
            templateUrl: './user-info.component.html',
            styleUrls: ['./user-info.component.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UserInfoComponent);
    return UserInfoComponent;
}());
exports.UserInfoComponent = UserInfoComponent;
//# sourceMappingURL=user-info.component.js.map