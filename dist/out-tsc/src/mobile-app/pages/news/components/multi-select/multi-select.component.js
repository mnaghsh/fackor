"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var core_2 = require("@angular/core");
var MultiSelectComponent = /** @class */ (function () {
    function MultiSelectComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    MultiSelectComponent.prototype.onNoClick = function () {
        this.dialogRef.close(this.data);
    };
    MultiSelectComponent.prototype.ngOnInit = function () {
    };
    MultiSelectComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-multi-select',
            templateUrl: './multi-select.component.html',
            styleUrls: ['./multi-select.component.css']
        }),
        __param(1, core_2.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object])
    ], MultiSelectComponent);
    return MultiSelectComponent;
}());
exports.MultiSelectComponent = MultiSelectComponent;
//# sourceMappingURL=multi-select.component.js.map