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
var missions_routing_module_1 = require("./missions-routing.module");
var missions_list_component_1 = require("./missions-list/missions-list.component");
var mission_service_1 = require("../../services/mission/mission.service");
var http_1 = require("@angular/common/http");
var material_1 = require("@angular/material");
var index_component_1 = require("./index/index.component");
var add_mission_component_1 = require("./add-mission/add-mission.component");
var pipes_module_1 = require("src/pipes/pipes.module");
var forms_1 = require("@angular/forms");
var angular_font_awesome_1 = require("angular-font-awesome");
var ng2_jalali_date_picker_1 = require("ng2-jalali-date-picker");
var MissionsModule = /** @class */ (function () {
    function MissionsModule() {
    }
    MissionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                missions_routing_module_1.MissionsRoutingModule,
                http_1.HttpClientModule,
                material_1.MatButtonModule, material_1.MatCardModule,
                material_1.MatInputModule, material_1.MatSnackBarModule,
                material_1.MatToolbarModule, material_1.MatTableModule, material_1.MatTabsModule, material_1.MatButtonModule,
                material_1.MatListModule,
                pipes_module_1.PipesModule,
                material_1.MatCheckboxModule,
                material_1.MatIconModule,
                forms_1.FormsModule,
                material_1.MatPaginatorModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatDialogModule,
                angular_font_awesome_1.AngularFontAwesomeModule,
                ng2_jalali_date_picker_1.DpDatePickerModule
            ],
            declarations: [
                missions_list_component_1.MissionsListComponent,
                index_component_1.IndexComponent,
                add_mission_component_1.AddMissionComponent
            ],
            providers: [
                mission_service_1.MissionService
            ]
        })
    ], MissionsModule);
    return MissionsModule;
}());
exports.MissionsModule = MissionsModule;
//# sourceMappingURL=missions.module.js.map