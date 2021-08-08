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
var material_1 = require("@angular/material");
var angular_font_awesome_1 = require("angular-font-awesome");
var ng2_jalali_date_picker_1 = require("ng2-jalali-date-picker");
var report_routing_module_1 = require("./report-routing.module");
var index_component_1 = require("./index/index.component");
var reports_component_1 = require("./reports/reports.component");
var forms_1 = require("@angular/forms");
var new_form_component_1 = require("./new-form/new-form.component");
var content_component_1 = require("src/mobile-app/pages/report/component/content/content.component");
var sent_reports_component_1 = require("./sent-reports/sent-reports.component");
var pipes_module_1 = require("src/pipes/pipes.module");
var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        core_1.NgModule({
            imports: [
                // HttpClientModule,
                // BrowserModule,
                pipes_module_1.PipesModule,
                common_1.CommonModule,
                report_routing_module_1.ReportRoutingModule,
                material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatFormFieldModule, material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatInputModule, forms_1.ReactiveFormsModule, material_1.MatCheckboxModule,
                material_1.MatFormFieldModule, material_1.MatCardModule, material_1.MatTabsModule, forms_1.FormsModule, material_1.MatIconModule,
                material_1.MatButtonModule, material_1.MatListModule, material_1.MatCheckboxModule, material_1.MatTableModule, material_1.MatNativeDateModule,
                angular_font_awesome_1.AngularFontAwesomeModule, material_1.MatDialogModule, material_1.MatPaginatorModule, material_1.MatRadioModule, material_1.MatDatepickerModule,
                material_1.MatTabsModule, material_1.MatButtonModule, material_1.MatListModule, material_1.MatDialogModule, material_1.MatExpansionModule,
                ng2_jalali_date_picker_1.DpDatePickerModule
            ],
            entryComponents: [content_component_1.ContentComponent],
            declarations: [index_component_1.IndexComponent, reports_component_1.ReportsComponent, new_form_component_1.NewFormComponent, content_component_1.ContentComponent, sent_reports_component_1.SentReportsComponent]
        })
    ], ReportModule);
    return ReportModule;
}());
exports.ReportModule = ReportModule;
//# sourceMappingURL=report.module.js.map