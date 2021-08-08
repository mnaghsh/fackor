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
var angular_font_awesome_1 = require("angular-font-awesome");
var news_routing_module_1 = require("./news-routing.module");
var index_component_1 = require("./index/index.component");
var inbox_component_1 = require("./inbox/inbox.component");
var material_1 = require("@angular/material");
var draft_component_1 = require("./draft/draft.component");
var out_box_component_1 = require("./out-box/out-box.component");
var list_component_1 = require("./components/list/list.component");
var compose_component_1 = require("./compose/compose.component");
var crud_component_1 = require("./components/crud/crud.component");
var forms_1 = require("@angular/forms");
var multi_select_component_1 = require("./components/multi-select/multi-select.component");
var pipes_module_1 = require("../../../pipes/pipes.module");
var content_component_1 = require("./components/content/content.component");
var NewsModule = /** @class */ (function () {
    function NewsModule() {
    }
    NewsModule = __decorate([
        core_1.NgModule({
            imports: [
                pipes_module_1.PipesModule,
                common_1.CommonModule,
                material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatInputModule, forms_1.ReactiveFormsModule, material_1.MatCheckboxModule,
                material_1.MatFormFieldModule, material_1.MatCardModule, material_1.MatTabsModule, forms_1.FormsModule, material_1.MatIconModule,
                material_1.MatButtonModule, material_1.MatListModule, news_routing_module_1.NewsRoutingModule, material_1.MatCheckboxModule, material_1.MatTableModule,
                angular_font_awesome_1.AngularFontAwesomeModule, material_1.MatDialogModule, material_1.MatPaginatorModule
            ],
            entryComponents: [multi_select_component_1.MultiSelectComponent, content_component_1.ContentComponent],
            declarations: [index_component_1.IndexComponent, inbox_component_1.InboxComponent, draft_component_1.DraftComponent, out_box_component_1.OutBoxComponent, list_component_1.ListComponent,
                compose_component_1.ComposeComponent, crud_component_1.CrudComponent, content_component_1.ContentComponent, multi_select_component_1.MultiSelectComponent, content_component_1.ContentComponent],
            exports: []
        })
    ], NewsModule);
    return NewsModule;
}());
exports.NewsModule = NewsModule;
//# sourceMappingURL=news.module.js.map