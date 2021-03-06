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
var router_1 = require("@angular/router");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(userService, myRoute) {
        // this.navlinks = [
        //   { label: ' گزارش یک', path: "reports", icon: "fas fa-archive" },
        //   { label: 'گزارش دو', path: "reports", icon: "fas fa-archive" }
        this.userService = userService;
        this.myRoute = myRoute;
        this.panelOpenState = false;
        // ];
    }
    IndexComponent.prototype.openForm = function (id) {
        //  this.myRoute.navigate(['report/reports',id]);
    };
    IndexComponent.prototype.ngOnInit = function () {
        // debugger;
        this.forms = this.userService.getFromLocalStorageGroupByUser('reportForms');
        console.log('tip5', this.forms);
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            router_1.Router])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map