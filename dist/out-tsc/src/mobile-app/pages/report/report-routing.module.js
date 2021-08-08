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
var reports_component_1 = require("./reports/reports.component");
var new_form_component_1 = require("./new-form/new-form.component");
var sent_reports_component_1 = require("src/mobile-app/pages/report/sent-reports/sent-reports.component");
var routes = [{
        path: '',
        component: index_component_1.IndexComponent,
        children: [
            {
                path: 'reports',
                component: reports_component_1.ReportsComponent
            },
            {
                path: 'reports/:id',
                component: reports_component_1.ReportsComponent
            },
            {
                path: 'sent-reports',
                component: sent_reports_component_1.SentReportsComponent
            },
            {
                path: 'sent-reports/:id',
                component: sent_reports_component_1.SentReportsComponent
            },
            {
                path: 'new-form/:inputId',
                component: new_form_component_1.NewFormComponent
            },
            {
                path: 'new-form',
                component: new_form_component_1.NewFormComponent
            }
        ]
    }
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());
exports.ReportRoutingModule = ReportRoutingModule;
//# sourceMappingURL=report-routing.module.js.map