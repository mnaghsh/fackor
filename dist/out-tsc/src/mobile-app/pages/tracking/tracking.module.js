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
var tracking_routing_module_1 = require("./tracking-routing.module");
var index_component_1 = require("./index/index.component");
var map_component_1 = require("./map/map.component");
var TrackingModule = /** @class */ (function () {
    function TrackingModule() {
    }
    TrackingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                tracking_routing_module_1.TrackingRoutingModule, material_1.MatProgressBarModule,
                material_1.MatSidenavModule, material_1.MatSelectModule, material_1.MatFormFieldModule,
                material_1.MatTabsModule, material_1.MatButtonModule, material_1.MatListModule, angular_font_awesome_1.AngularFontAwesomeModule
            ],
            declarations: [index_component_1.IndexComponent, map_component_1.MapComponent]
        })
    ], TrackingModule);
    return TrackingModule;
}());
exports.TrackingModule = TrackingModule;
//# sourceMappingURL=tracking.module.js.map