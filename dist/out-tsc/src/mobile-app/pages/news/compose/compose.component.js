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
var news_service_1 = require("src/services/news/news.service");
var common_service_1 = require("../../../../services/common/common.service");
var ComposeComponent = /** @class */ (function () {
    function ComposeComponent(route, commonService, newsService) {
        this.route = route;
        this.commonService = commonService;
        this.newsService = newsService;
        this.crudModel = null;
    }
    ComposeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.crudModel = _this.newsService.getNewsDraftById(data.id);
                console.log(_this.crudModel);
            }
        });
    };
    ComposeComponent.prototype.ngOnDestroy = function () {
    };
    ComposeComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-compose',
            templateUrl: './compose.component.html',
            styleUrls: ['./compose.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, common_service_1.CommonService, news_service_1.NewsService])
    ], ComposeComponent);
    return ComposeComponent;
}());
exports.ComposeComponent = ComposeComponent;
//# sourceMappingURL=compose.component.js.map