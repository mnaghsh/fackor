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
var org_for_fight_component_1 = require("./org-for-fight/org-for-fight.component");
var index_component_1 = require("./index/index.component");
var users_component_1 = require("./users/users.component");
var news_list_component_1 = require("./news-list/news-list.component");
var message_list_component_1 = require("./message-list/message-list.component");
var report_list_component_1 = require("./report-list/report-list.component");
var routes = [
    {
        path: '',
        component: index_component_1.IndexComponent,
        children: [
            {
                path: 'org-for-fight',
                component: org_for_fight_component_1.MissionTreeComponent
            },
            {
                path: 'users',
                component: users_component_1.MissionUsersComponent
            },
            {
                path: 'report/news',
                component: news_list_component_1.NewsListComponent
            },
            {
                path: 'report/message',
                component: message_list_component_1.MessageListComponent
            },
            {
                path: 'report/form',
                component: report_list_component_1.ReportListComponent
            },
        ]
    },
];
var MissionDetailsRoutingModule = /** @class */ (function () {
    function MissionDetailsRoutingModule() {
    }
    MissionDetailsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MissionDetailsRoutingModule);
    return MissionDetailsRoutingModule;
}());
exports.MissionDetailsRoutingModule = MissionDetailsRoutingModule;
//# sourceMappingURL=mission-details-routing.module.js.map