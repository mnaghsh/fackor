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
var messages_routing_module_1 = require("./messages-routing.module");
var index_component_1 = require("./index/index.component");
var users_service_1 = require("../../../services/users/users.service");
var messenger_component_1 = require("../../../components/messanger/messenger.component");
var forms_1 = require("@angular/forms");
var nav_component_1 = require("../../../components/nav/nav.component");
var pipes_module_1 = require("../../../pipes/pipes.module");
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, forms_1.FormsModule,
                material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatFormFieldModule,
                material_1.MatTabsModule, material_1.MatButtonModule, material_1.MatListModule, angular_font_awesome_1.AngularFontAwesomeModule,
                messages_routing_module_1.MessagesRoutingModule, material_1.MatCardModule, material_1.MatChipsModule, material_1.MatCheckboxModule, material_1.MatToolbarModule, material_1.MatInputModule,
                pipes_module_1.PipesModule,
            ],
            providers: [
                users_service_1.UsersService
            ],
            declarations: [index_component_1.IndexComponent, messenger_component_1.MessengerComponent, nav_component_1.NavComponent],
        })
    ], MessagesModule);
    return MessagesModule;
}());
exports.MessagesModule = MessagesModule;
//# sourceMappingURL=messages.module.js.map