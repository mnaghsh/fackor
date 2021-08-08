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
var users_service_1 = require("../../../../../services/users/users.service");
var ContentComponent = /** @class */ (function () {
    function ContentComponent(dialogRef, userService, data) {
        this.dialogRef = dialogRef;
        this.userService = userService;
        this.data = data;
        console.log('when open dialog', data);
        //  this.details= (data)
        this.type = data.type;
        this.senderOfReport = data.reportData.creator;
        this.receiverOfReport = data.reportData.receiver;
        this.reportSendDate = data.reportData.date;
        this.details = JSON.parse(data.reportData.value.replace(/'/g, "\""));
        //  this.senderOfReport=dat
        // data.forEach(element => {
        //   this.details=JSON.parse(element.value.replace(/'/g, "\""))
        //   // console.log('when open dialog', this.details)
        // });
        console.log('details', this.details);
        // console.log('when get from ls', mhd)
    }
    ContentComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ContentComponent.prototype.ngOnInit = function () {
    };
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-content',
            templateUrl: './content.component.html',
            styleUrls: ['./content.component.css']
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef,
            users_service_1.UsersService, Object])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
//# sourceMappingURL=content.component.js.map