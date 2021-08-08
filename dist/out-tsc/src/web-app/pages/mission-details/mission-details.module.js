"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var mission_details_routing_module_1 = require("./mission-details-routing.module");
var index_component_1 = require("./index/index.component");
var org_for_fight_component_1 = require("./org-for-fight/org-for-fight.component");
var users_component_1 = require("./users/users.component");
var material_1 = require("@angular/material");
var angular_tree_component_1 = require("angular-tree-component");
var forms_1 = require("@angular/forms");
var news_list_component_1 = require("./news-list/news-list.component");
var pipes_module_1 = require("src/pipes/pipes.module");
var ng2_jalali_date_picker_1 = require("ng2-jalali-date-picker");
var message_list_component_1 = require("./message-list/message-list.component");
var report_list_component_1 = require("./report-list/report-list.component");
var content_component_1 = require("src/web-app/pages/mission-details/news-list/content/content.component");
var content_component_2 = require("src/web-app/pages/mission-details/report-list/content/content.component");
var MissionDetailsModule = /** @class */ (function () {
    function MissionDetailsModule() {
    }
    MissionDetailsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                mission_details_routing_module_1.MissionDetailsRoutingModule,
                material_1.MatListModule,
                angular_tree_component_1.TreeModule, material_1.MatTableModule, material_1.MatPaginatorModule, material_1.MatSortModule,
                material_1.MatCardModule, material_1.MatButtonModule, material_1.MatIconModule, material_1.MatDatepickerModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule, material_1.MatFormFieldModule,
                material_1.MatInputModule, material_1.MatSelectModule, material_1.MatProgressSpinnerModule,
                pipes_module_1.PipesModule,
                ng2_jalali_date_picker_1.DpDatePickerModule
            ],
            declarations: [
                index_component_1.IndexComponent,
                org_for_fight_component_1.MissionTreeComponent,
                users_component_1.MissionUsersComponent,
                news_list_component_1.NewsListComponent,
                message_list_component_1.MessageListComponent,
                report_list_component_1.ReportListComponent,
                content_component_1.ContentComponent,
                content_component_2.FormContentComponent
            ],
            entryComponents: [
                content_component_1.ContentComponent,
                content_component_2.FormContentComponent
            ]
        })
    ], MissionDetailsModule);
    return MissionDetailsModule;
}());
exports.MissionDetailsModule = MissionDetailsModule;
//# sourceMappingURL=mission-details.module.js.map