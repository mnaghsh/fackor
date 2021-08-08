"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_component_1 = require("./index/index.component");
var source_news_component_1 = require("./source-news/source-news.component");
var important_news_component_1 = require("./important-news/important-news.component");
var truth_news_component_1 = require("./truth-news/truth-news.component");
var routes = [
    {
        path: '', component: index_component_1.IndexComponent,
        children: [{
                path: 'source-news', component: source_news_component_1.SourceNewsComponent
            },
            {
                path: 'important-news', component: important_news_component_1.ImportantNewsComponent
            },
            {
                path: 'truth-news', component: truth_news_component_1.TruthNewsComponent
            }
        ]
    }
];
var NewsRoutingModule = /** @class */ (function () {
    function NewsRoutingModule() {
    }
    NewsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], NewsRoutingModule);
    return NewsRoutingModule;
}());
exports.NewsRoutingModule = NewsRoutingModule;
//# sourceMappingURL=news-routing.module.js.map