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
var DialogComponent = /** @class */ (function () {
    function DialogComponent(dialogRef, newMessages, dialog) {
        this.dialogRef = dialogRef;
        this.newMessages = newMessages;
        this.dialog = dialog;
    }
    DialogComponent.prototype.ngOnInit = function () {
    };
    DialogComponent.prototype.ngOnDestroy = function () {
        this.dialogRef.close();
    };
    DialogComponent.prototype.openChat = function (userId, name) {
        console.log('awdawd', userId, name);
    };
    DialogComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-dialog',
            templateUrl: './dialog.component.html',
            styleUrls: ['./dialog.component.css']
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, material_1.MatDialog])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
//# sourceMappingURL=dialog.component.js.map