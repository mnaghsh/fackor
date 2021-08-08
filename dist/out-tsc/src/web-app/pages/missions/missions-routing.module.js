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
var missions_list_component_1 = require("./missions-list/missions-list.component");
var index_component_1 = require("./index/index.component");
var add_mission_component_1 = require("./add-mission/add-mission.component");
var routes = [
    {
        path: '',
        component: index_component_1.IndexComponent,
        children: [
            {
                path: 'list',
                component: missions_list_component_1.MissionsListComponent
            },
            {
                path: 'add',
                component: add_mission_component_1.AddMissionComponent
            },
        ]
    },
];
var MissionsRoutingModule = /** @class */ (function () {
    function MissionsRoutingModule() {
    }
    MissionsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], MissionsRoutingModule);
    return MissionsRoutingModule;
}());
exports.MissionsRoutingModule = MissionsRoutingModule;
//# sourceMappingURL=missions-routing.module.js.map