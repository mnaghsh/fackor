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
var users_routing_module_1 = require("./users-routing.module");
var index_component_1 = require("./index/index.component");
var list_component_1 = require("./list/list.component");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var angular_font_awesome_1 = require("angular-font-awesome");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                users_routing_module_1.UsersRoutingModule,
                material_1.MatTableModule,
                material_1.MatCheckboxModule,
                material_1.MatIconModule,
                forms_1.FormsModule,
                material_1.MatPaginatorModule,
                material_1.MatFormFieldModule,
                material_1.MatInputModule,
                material_1.MatDialogModule,
                material_1.MatCardModule,
                angular_font_awesome_1.AngularFontAwesomeModule
            ],
            entryComponents: [],
            declarations: [index_component_1.IndexComponent, list_component_1.ListComponent,]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map