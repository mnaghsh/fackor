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
var config_service_1 = require("src/services/config.service");
var ContentComponent = /** @class */ (function () {
    function ContentComponent(configService, dialogRef, data) {
        this.configService = configService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ContentComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ContentComponent.prototype.ngOnInit = function () {
        this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/message/download/';
        if (this.data.newsData.attachment)
            this.data.newsData['localAttachment'] = this.data.newsData.attachment.split(",");
    };
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-content',
            templateUrl: './content.component.html',
            styleUrls: ['./content.component.css']
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            material_1.MatDialogRef, Object])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
//# sourceMappingURL=content.component.js.map