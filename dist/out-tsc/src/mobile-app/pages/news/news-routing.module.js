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
var inbox_component_1 = require("./inbox/inbox.component");
var draft_component_1 = require("./draft/draft.component");
var out_box_component_1 = require("./out-box/out-box.component");
var compose_component_1 = require("./compose/compose.component");
var crud_component_1 = require("./components/crud/crud.component");
var routes = [{
        path: '',
        component: index_component_1.IndexComponent,
        children: [
            {
                path: 'inbox',
                component: inbox_component_1.InboxComponent
            },
            {
                path: 'draft',
                component: draft_component_1.DraftComponent
            },
            {
                path: 'compose/:id',
                component: compose_component_1.ComposeComponent,
            },
            {
                path: 'compose',
                component: compose_component_1.ComposeComponent,
            },
            {
                path: 'outbox',
                component: out_box_component_1.OutBoxComponent
            },
            {
                path: 'crudForm',
                component: crud_component_1.CrudComponent
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