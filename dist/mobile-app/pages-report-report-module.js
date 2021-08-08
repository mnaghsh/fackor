(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-report-report-module"],{

/***/ "./src/mobile-app/pages/report/component/content/content.component.css":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/report/component/content/content.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".contact{\r\n    color: green;\r\n    text-align: center;\r\n    font-weight: bold;\r\n}\r\nquill-editor.ql-container.ql-snow {\r\n    border: 0px solid #ccc !important;\r\n}\r\n.success-text{\r\n  color: green;\r\n}\r\n.info-text{\r\n  color: #007bff;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/component/content/content.component.html":
/*!******************************************************************************!*\
  !*** ./src/mobile-app/pages/report/component/content/content.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<i class=\"fa fa-window-close \" size=\"2x\" mat-raised-button (click)=\"onNoClick()\">&nbsp;</i>\r\n<mat-card *ngIf=\"type=='reports'\" class=\"contact\">\r\n  فرستنده:{{senderOfReport.firstname}} {{senderOfReport.lastname}}({{reportSendDate | jalali }})\r\n  {{usersService.getUserPosition(senderOfReport.id)}}\r\n\r\n</mat-card>\r\n<mat-card *ngIf=\"type=='sent-reports'\" [ngClass]=\"(seenTime) ? 'success-text' : 'info-text'\">\r\n  <div class=\"row\">\r\n    <div class=\"col col-6\">\r\n      <span>\r\n        گیرنده: {{receiverOfReport.firstname}} {{receiverOfReport.lastname}} {{usersService.getUserPosition(receiverOfReport.id)}}\r\n        <span *ngIf=\"seenTime\">\r\n          مشاهده شده\r\n        </span>\r\n        <span *ngIf=\"!seenTime\">\r\n          مشاهده نشده\r\n        </span>\r\n      </span>\r\n    </div>\r\n    <div class=\"col col-6\">\r\n      <span>\r\n        (زمان ارسال گزارش: {{reportSendDate | jalali}})\r\n        <span *ngIf=\"seenTime\">\r\n        (زمان خواندن گزارش: {{seenTime| jalali}})\r\n        </span>\r\n      </span>\r\n    </div>\r\n  </div>\r\n</mat-card>\r\n\r\n<div *ngFor=\"let detail of details\">\r\n  <mat-card *ngIf=\"detail.type != 'button' && detail.type != 'textarea'\">\r\n    {{detail.label}}:{{detail.value}}\r\n  </mat-card>\r\n\r\n  <mat-card *ngIf=\"detail.type != 'button' && detail.type == 'textarea'\" class=\"html-binder\">\r\n    {{detail.label}}:\r\n    <quill-editor\r\n      [modules]='{toolbar: false}'\r\n      [readOnly]=\"true\"\r\n      dir=\"rtl\"\r\n      [(ngModel)]=\"detail.value\"\r\n      placeholder=\"\"\r\n    >\r\n    </quill-editor>\r\n  </mat-card>\r\n\r\n  <mat-divider></mat-divider>\r\n</div>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/component/content/content.component.ts":
/*!****************************************************************************!*\
  !*** ./src/mobile-app/pages/report/component/content/content.component.ts ***!
  \****************************************************************************/
/*! exports provided: ContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentComponent", function() { return ContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/reports/reports.service */ "./src/services/reports/reports.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ContentComponent = /** @class */ (function () {
    function ContentComponent(dialogRef, usersService, reportService, data) {
        this.dialogRef = dialogRef;
        this.usersService = usersService;
        this.reportService = reportService;
        this.data = data;
        console.log('when open dialog', data);
        this.isSeen();
        this.type = data.type;
        this.senderOfReport = data.reportData.creator;
        this.receiverOfReport = data.reportData.receiver;
        this.reportSendDate = data.reportData.datez;
        // this.details = JSON.parse(data.reportData.value.replace(/'/g, "\""));
        this.details = data.reportData.value;
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
    ContentComponent.prototype.isSeen = function () {
        var _this = this;
        this.reportService.getReport(this.data.reportData.id).subscribe(function (data) {
            _this.showTime = data;
        });
    };
    ContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-content',
            template: __webpack_require__(/*! ./content.component.html */ "./src/mobile-app/pages/report/component/content/content.component.html"),
            styles: [__webpack_require__(/*! ./content.component.css */ "./src/mobile-app/pages/report/component/content/content.component.css")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__["ReportsService"], Object])
    ], ContentComponent);
    return ContentComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/index/index.component.css":
/*!***************************************************************!*\
  !*** ./src/mobile-app/pages/report/index/index.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-bar {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #eee\r\n}\r\n\r\n.mat-tab-link {\r\n  color: black;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 65px;\r\n}\r\n\r\nmat-sidenav {\r\n  /* width: 15%; */\r\n  direction: rtl;\r\n  background-color: rgba(0, 0, 0, 0.45);\r\n}\r\n\r\nfa {\r\n  float: left;\r\n  padding: 1%;\r\n  color: orange;\r\n}\r\n\r\n.button {\r\n  /* color: rgba(0, 0, 0, 0.45); */\r\n}\r\n\r\nmat-sidenav-content {\r\n  padding-right: 0%;\r\n}\r\n\r\nmat-list-item {\r\n  cursor: pointer;\r\n  direction: ltr;\r\n}\r\n\r\n/* .button{ */\r\n\r\n/* z-index: 11; */\r\n\r\n/* color: azure; */\r\n\r\n/* position: absolute; */\r\n\r\n/* } */\r\n\r\n.label {\r\n  color: azure;\r\n  padding-left: 10px;\r\n  white-space: nowrap;\r\n}\r\n\r\n.sidNavTitle {\r\n  background: orange;\r\n}\r\n\r\n.toggle {\r\n  color: black\r\n}\r\n\r\n.mat-expansion-panel-spacing {\r\n  margin: 0;\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel {\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel-header-title {\r\n  color: #fff;\r\n}\r\n\r\n.mat-expansion-indicator {\r\n  color: orange !important;\r\n}\r\n\r\nmat-sidenav-content {\r\n  background-image: url('pencil-alt-solid.png');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/index/index.component.html":
/*!****************************************************************!*\
  !*** ./src/mobile-app/pages/report/index/index.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- disabledClose:booledan -->\r\n<mat-sidenav-container class=\"example-container\" autosize hasBackdrop=\"true\">\r\n  <mat-sidenav opened=true position=\"end\" #drawer mode=\"over\">\r\n    <mat-list role=\"list\">\r\n      <mat-list-item class=\"sidNavTitle\">\r\n        <fa name=\"fas fa-align-justify\" size=\"1x\" (click)=\"drawer.toggle()\" class=\"toggle\"></fa>\r\n        <span class=\"label\">گزارش وضعیت</span>\r\n      </mat-list-item>\r\n      <mat-accordion>\r\n        <mat-expansion-panel (opened)=\"panelOpenState = true\"\r\n                             (closed)=\"panelOpenState = false\"\r\n                             *ngFor=\"let link of forms\">\r\n          <mat-expansion-panel-header>\r\n            <mat-panel-title>\r\n              {{link.name}}\r\n            </mat-panel-title>\r\n          </mat-expansion-panel-header>\r\n          <div dir=\"rtl\">\r\n          <mat-list-item *ngIf=\"isNotMainCommander()\" routerLink=\"new-form//{{link.id}}\">\r\n            <span class=\"label\">ایجاد گزارش </span>\r\n          </mat-list-item>\r\n          <mat-list-item routerLink=\"reports//{{link.id}}\">\r\n            <span class=\"label\">گزارش‌های ورودی</span>\r\n          </mat-list-item>\r\n          <mat-list-item *ngIf=\"isNotMainCommander()\" routerLink=\"sent-reports//{{link.id}}\">\r\n            <span class=\"label\">گزارش‌های خروجی</span>\r\n          </mat-list-item>\r\n        </div>\r\n        </mat-expansion-panel>\r\n      </mat-accordion>\r\n      <!-- <mat-list-item (click)=\"openForm(link.id)\" role=\"listitem\" *ngFor=\"let link of forms\" routerLink=\"reports//{{link.id}}\">\r\n        <fa [name]=link.icon size=\"1x\" class=\"icon\"></fa>\r\n        <div class=\"label\">{{link.name}}</div>\r\n\r\n        <mat-divider>\r\n        </mat-divider>\r\n\r\n      </mat-list-item> -->\r\n    </mat-list>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <fa name=\"fas fa-align-justify\" class=\"button\" size=\"1x\" (click)=\"drawer.toggle()\"></fa>\r\n    <router-outlet></router-outlet>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/index/index.component.ts":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/report/index/index.component.ts ***!
  \**************************************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IndexComponent = /** @class */ (function () {
    function IndexComponent(userService, myRoute) {
        // this.navlinks = [
        //   { label: ' گزارش یک', path: "reports", icon: "fas fa-archive" },
        //   { label: 'گزارش دو', path: "reports", icon: "fas fa-archive" }
        this.userService = userService;
        this.myRoute = myRoute;
        this.panelOpenState = false;
        // ];
    }
    IndexComponent.prototype.openForm = function (id) {
        //  this.myRoute.navigate(['report/reports',id]);
    };
    IndexComponent.prototype.ngOnInit = function () {
        // ;
        this.forms = this.userService.getFromLocalStorageGroupByUser('reportForms');
        console.log('tip5', this.forms);
    };
    IndexComponent.prototype.isNotMainCommander = function () {
        var user = this.userService.getUserInfo();
        var commanderId = this.userService.getOrgForFight().id;
        var userDetails = this.userService.getOrgForFightById(user.id);
        if (commanderId === userDetails.orgForFight.id) {
            return false;
        }
        return true;
    };
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/mobile-app/pages/report/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/mobile-app/pages/report/index/index.component.css")]
        }),
        __metadata("design:paramtypes", [_services_users_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/new-form/new-form.component.css":
/*!*********************************************************************!*\
  !*** ./src/mobile-app/pages/report/new-form/new-form.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container{\r\n    display: flex;\r\n    flex-direction:column;\r\n}\r\n.container >*{\r\n    width: 100%;\r\n    padding: 1%;\r\n}\r\n.input-form{\r\n    min-width:150px;\r\n    max-width: 500px;\r\n    width: 100%;\r\n}\r\n.input-full-width{\r\n    width:100%;\r\n}\r\n.titr{\r\n    text-align: center;\r\n    font-weight: bold;\r\n  \r\n}\r\n.titrCard{\r\n    position: static;\r\n    background-color: rgba(244,168,54,0.1)\r\n   \r\n}\r\n.addBtn{\r\n    /* color: orange; */\r\n    background-color:  orange;\r\n    margin: 0 1px;\r\n \r\n    \r\n  }\r\n\r\n "

/***/ }),

/***/ "./src/mobile-app/pages/report/new-form/new-form.component.html":
/*!**********************************************************************!*\
  !*** ./src/mobile-app/pages/report/new-form/new-form.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"titrCard\">\r\n    <h5 class=\"titr\">\r\n        ایجاد گزارش {{nameOfReport}}\r\n    </h5>\r\n</mat-card>\r\n\r\n\r\n<div class=\"container\" *ngFor=\"let field of form.value\" [ngSwitch]=\"field.type\">\r\n    <mat-form-field *ngSwitchCase=\"'text'\">\r\n        <input type=\"text\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n    </mat-form-field>\r\n    <mat-form-field *ngSwitchCase=\"'number'\">\r\n        <input type=\"number\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n    </mat-form-field>\r\n\r\n    <div *ngSwitchCase=\"'textarea'\" class=\"myEditor\">\r\n        <quill-editor [modules]='textEditorModule' [style]=\"{height: '150px'}\" [placeholder]=\"field['label']+'...'\" dir=\"rtl\" [(ngModel)]=\"field['value']\">\r\n        </quill-editor>\r\n        <!-- <textarea style=\"visibility: hidden\" [(ngModel)]=\"field['value']\" matInput placeholder=\"{{field.label}}\"></textarea> -->\r\n    </div>\r\n\r\n    <mat-select *ngSwitchCase=\"'select'\" placeholder=\"{{field.label}}\" [(ngModel)]=\"field['value']\">\r\n        <mat-option *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n            {{op.label}}\r\n        </mat-option>\r\n    </mat-select>\r\n    <dp-date-picker *ngSwitchCase=\"'date'\" dir=\"rtl\" [(ngModel)]=\"field['value']\" theme=\"dp-material\" mode=\"day\" placeholder=\"{{field.label}}\"\r\n        class=\"datePicker\">\r\n    </dp-date-picker>\r\n\r\n    <mat-radio-group *ngSwitchCase=\"'radio-group'\" class=\"example-radio-group\" [(ngModel)]=\"field['value']\">\r\n        {{field.label}}:\r\n        <mat-radio-button class=\"example-radio-button\" *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n            {{op.label}}\r\n        </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n    <div *ngSwitchCase=\"'checkbox'\">\r\n        {{field.label}}:\r\n        <mat-checkbox *ngFor=\"let op of field.values\" class=\"example-margin\" [(ngModel)]=\"op['selected']\">{{op.label}}</mat-checkbox>\r\n    </div>\r\n\r\n\r\n</div>\r\n<div class=\"text-center\">\r\n    <button class=\"fa fa-space-shuttle addBtn\" mat-button (click)=\"submit()\"> ارسال گزارش وضعیت</button>\r\n    <button class=\"fa fa-plus-circle addBtn\" mat-button (click)=\"reset()\"> بازنشانی</button>\r\n</div>"

/***/ }),

/***/ "./src/mobile-app/pages/report/new-form/new-form.component.ts":
/*!********************************************************************!*\
  !*** ./src/mobile-app/pages/report/new-form/new-form.component.ts ***!
  \********************************************************************/
/*! exports provided: NewFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewFormComponent", function() { return NewFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/reports/reports.service */ "./src/services/reports/reports.service.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dashboard/dashboard.component */ "./src/mobile-app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/config.service */ "./src/services/config.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NewFormComponent = /** @class */ (function () {
    function NewFormComponent(route, dashboard, userService, reportService, configService
    // public mapService: FavaMap
    ) {
        this.route = route;
        this.dashboard = dashboard;
        this.userService = userService;
        this.reportService = reportService;
        this.configService = configService;
        this.textEditorModule = this.configService.textEditorModule;
    }
    NewFormComponent.prototype.ngOnChanges = function () {
    };
    NewFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('map',this.mapService.getMap())
        this.route.params.subscribe(function (data) {
            _this.inputId = data;
            _this.form = _this.reportService.getFormOrderById(data.inputId);
            // console.log('before',this.form)
            _this.form.value = JSON.parse(_this.form.value.replace(/'/g, "\""));
            _this.addRequiredBadge(_this.form.value);
            _this.findNameOfReport();
            // console.log('after',this.form.value)
            //یه چک باکس به صورت استاتیک اضافه شده که برای تست استفاده شود
            // this.form.value.push({
            //   label:"checkbox",
            //   name:"checkbox-1532944907906",
            //   type:"checkbox",
            //   values:[
            //     {label: "Option 1", value: "option-1"},
            //     {label: "Option 2", value: "option-2"},
            //     {label: "Option 3", value: "option-3"}
            //   ]
            // })
        });
    };
    NewFormComponent.prototype.addRequiredBadge = function (form) {
        form.forEach(function (field) {
            if (field.required)
                field.label = field.label + ' * ';
        });
    };
    NewFormComponent.prototype.reset = function () {
        this.form.value.forEach(function (element) {
            element.value = null;
        });
    };
    NewFormComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId.inputId) {
                this.nameOfReport = mhd[i].name;
                console.log(mhd[i]);
            }
        }
    };
    NewFormComponent.prototype.submit = function () {
        var _this = this;
        if (this.formIsValid()) {
            var mhd = JSON.stringify(this.form.value).replace(/"/g, "'");
            var id = {
                id: this.form.id
            };
            this.formId = id;
            2;
            var sendReportTemp = {
                forms: this.formId, value: mhd
            };
            this.temp = sendReportTemp;
            this.reportService.putNews(this.temp).subscribe(function (data) {
                // debugger;
                _this.reportService.addListRow(data, 'sentReportRowList', _this.inputId);
                var mhd = _this.userService.getFromLocalStorageGroupByUser("sentReportRowList");
                _this.dashboard.showEventMessage("گزارش با موفقیت ارسال شد");
            });
        }
        else {
            this.dashboard.showEventMessage("لطفا مقادیر ستاره دار را پر کنید.");
        }
    };
    NewFormComponent.prototype.formIsValid = function () {
        var valid = true;
        this.form.value.forEach(function (field) {
            if (field.required && field.value == null) {
                valid = false;
            }
        });
        return valid;
    };
    NewFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-new-form',
            template: __webpack_require__(/*! ./new-form.component.html */ "./src/mobile-app/pages/report/new-form/new-form.component.html"),
            styles: [__webpack_require__(/*! ./new-form.component.css */ "./src/mobile-app/pages/report/new-form/new-form.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__["ReportsService"],
            _services_config_service__WEBPACK_IMPORTED_MODULE_5__["ConfigService"]
            // public mapService: FavaMap
        ])
    ], NewFormComponent);
    return NewFormComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/report-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/report/report-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: ReportRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportRoutingModule", function() { return ReportRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/report/index/index.component.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reports/reports.component */ "./src/mobile-app/pages/report/reports/reports.component.ts");
/* harmony import */ var _new_form_new_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./new-form/new-form.component */ "./src/mobile-app/pages/report/new-form/new-form.component.ts");
/* harmony import */ var src_mobile_app_pages_report_sent_reports_sent_reports_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/mobile-app/pages/report/sent-reports/sent-reports.component */ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [{
        path: '',
        component: _index_index_component__WEBPACK_IMPORTED_MODULE_2__["IndexComponent"],
        children: [
            {
                path: 'reports',
                component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__["ReportsComponent"]
            },
            {
                path: 'reports/:id',
                component: _reports_reports_component__WEBPACK_IMPORTED_MODULE_3__["ReportsComponent"]
            },
            {
                path: 'sent-reports',
                component: src_mobile_app_pages_report_sent_reports_sent_reports_component__WEBPACK_IMPORTED_MODULE_5__["SentReportsComponent"]
            },
            {
                path: 'sent-reports/:id',
                component: src_mobile_app_pages_report_sent_reports_sent_reports_component__WEBPACK_IMPORTED_MODULE_5__["SentReportsComponent"]
            },
            {
                path: 'new-form/:inputId',
                component: _new_form_new_form_component__WEBPACK_IMPORTED_MODULE_4__["NewFormComponent"]
            },
            {
                path: 'new-form',
                component: _new_form_new_form_component__WEBPACK_IMPORTED_MODULE_4__["NewFormComponent"]
            }
        ]
    }
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/report.module.ts":
/*!******************************************************!*\
  !*** ./src/mobile-app/pages/report/report.module.ts ***!
  \******************************************************/
/*! exports provided: ReportModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportModule", function() { return ReportModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-jalali-date-picker */ "./node_modules/ng2-jalali-date-picker/ng2-jalali-date-picker.es5.js");
/* harmony import */ var _report_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./report-routing.module */ "./src/mobile-app/pages/report/report-routing.module.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/report/index/index.component.ts");
/* harmony import */ var _reports_reports_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reports/reports.component */ "./src/mobile-app/pages/report/reports/reports.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _new_form_new_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./new-form/new-form.component */ "./src/mobile-app/pages/report/new-form/new-form.component.ts");
/* harmony import */ var src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/mobile-app/pages/report/component/content/content.component */ "./src/mobile-app/pages/report/component/content/content.component.ts");
/* harmony import */ var _sent_reports_sent_reports_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sent-reports/sent-reports.component */ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.ts");
/* harmony import */ var src_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/pipes/pipes.module */ "./src/pipes/pipes.module.ts");
/* harmony import */ var _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm5/ngx-quill.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                // HttpClientModule,
                // BrowserModule,
                src_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_12__["PipesModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _report_routing_module__WEBPACK_IMPORTED_MODULE_5__["ReportRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ReactiveFormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"],
                ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_4__["DpDatePickerModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_14__["QuillModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"]
            ],
            entryComponents: [src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_10__["ContentComponent"]],
            declarations: [_index_index_component__WEBPACK_IMPORTED_MODULE_6__["IndexComponent"], _reports_reports_component__WEBPACK_IMPORTED_MODULE_7__["ReportsComponent"], _new_form_new_form_component__WEBPACK_IMPORTED_MODULE_9__["NewFormComponent"], src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_10__["ContentComponent"], _sent_reports_sent_reports_component__WEBPACK_IMPORTED_MODULE_11__["SentReportsComponent"]],
            providers: [_web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_13__["JalaliPipe"]]
        })
    ], ReportModule);
    return ReportModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/reports/reports.component.css":
/*!*******************************************************************!*\
  !*** ./src/mobile-app/pages/report/reports/reports.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n    width: 100%;\r\n  white-space: nowrap;\r\n  }\r\n\r\n  .mat-form-field {\r\n    font-size: 14px;\r\n    width: 100%;\r\n  }\r\n\r\n  td, th {\r\n    width: 25%;\r\n  }\r\n\r\n  .list-table th.mat-header-cell{\r\n    text-align: right !important;\r\n    padding-right: 0.5% ;\r\n  }\r\n\r\n  th.mat-header-cell {\r\n    text-align: right;\r\n}\r\n\r\n  .addBtn{\r\n  /* color: orange; */\r\n  background-color:  rgba(0, 0, 0, 0.7);\r\n  margin: 0 1px;\r\n}\r\n\r\n  .rows{\r\n  cursor: pointer;\r\n}\r\n\r\n  .titr{\r\n  text-align: center;\r\n  font-weight: bold;\r\n\r\n}\r\n\r\n  .titrCard{\r\n  position: static;\r\n  background-color: rgba(244,168,54,0.1)\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/reports/reports.component.html":
/*!********************************************************************!*\
  !*** ./src/mobile-app/pages/report/reports/reports.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"titrCard\">\r\n  <h5 class=\"titr\">\r\n    گزارش های دریافتی وضعیت {{nameOfReport}}\r\n  </h5>\r\n</mat-card>\r\n<mat-form-field>\r\n  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"جستجو\">\r\n</mat-form-field>\r\n\r\n<fa for=\"uploadFile\"\r\n    *ngIf=\"selection.selected.length > 0\"\r\n    (click)=\"deleteSelectedNews()\"\r\n    name=\"fas fa-trash\"\r\n    class=\"float-right text-danger\" size=\"2x\">حذف\r\n</fa>\r\n\r\n\r\n<div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort (matSortChange)=\"sortData($event)\">\r\n    <ng-container matColumnDef=\"select\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <mat-checkbox (change)=\"$event ? masterToggle():null\" [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                      [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n        </mat-checkbox>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let row\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event?selection.toggle(row) :null\"\r\n                      [checked]=\"selection.isSelected(row)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.columnDef}}\">\r\n      <div *ngIf=\"column.columnDef!='details'\">\r\n        <th mat-header-cell mat-sort-header *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n      </div>\r\n      <div *ngIf=\"column.columnDef=='details'\">\r\n        <th mat-header-cell *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n      </div>\r\n\r\n      <td mat-cell *matCellDef=\"let row; let index = index\" class=\"mail-item\"\r\n          [ngClass]=\"(!row.seen_time && type == 'inbox') ? 'unreadElement' : 'readElement'\"\r\n          [innerHTML]=\"column.cell(row, index)\"></td>\r\n    </ng-container>\r\n\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n    <tr (click)=\"showContent(row)\" class=\"rows\" mat-row *matRowDef=\"let row; columns: displayedColumns;\">\r\n    </tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSizeOptions]=\"[10, 25, 100]\"></mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/reports/reports.component.ts":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/report/reports/reports.component.ts ***!
  \******************************************************************/
/*! exports provided: ReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportsComponent", function() { return ReportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/reports/reports.service */ "./src/services/reports/reports.service.ts");
/* harmony import */ var _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/local-storage/local-storage.service */ "./src/services/local-storage/local-storage.service.ts");
/* harmony import */ var _services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/common/common.service */ "./src/services/common/common.service.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/mobile-app/pages/report/component/content/content.component */ "./src/mobile-app/pages/report/component/content/content.component.ts");
/* harmony import */ var _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../services/accessible/accessible.service */ "./src/services/accessible/accessible.service.ts");
/* harmony import */ var _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ReportsComponent = /** @class */ (function () {
    function ReportsComponent(route, myRoute, reportsService, commonService, userService, localStorageService, dialog, accessibleService, jalaliPipe) {
        this.route = route;
        this.myRoute = myRoute;
        this.reportsService = reportsService;
        this.commonService = commonService;
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.jalaliPipe = jalaliPipe;
        this.showTable = false;
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__["SelectionModel"](true, []);
    }
    ReportsComponent.prototype.ngOnChanges = function () {
    };
    ReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.inputId = data.id;
                _this.findNameOfReport();
                _this.setColumns();
                var mhd = _this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', _this.inputId);
                _this.reportHistory().subscribe(function (data) {
                    var form = _this.reportsService.getFormOrderById(_this.inputId);
                    _this.setTranslateForms(form);
                    _this.setDataSource();
                });
            }
        });
    };
    ReportsComponent.prototype.setColumns = function () {
        var _this = this;
        this.columns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) {
                    return index + 1;
                }
            },
            {
                columnDef: 'name',
                label: 'نام',
                cell: function (row) {
                    return _this.getPosition(row.creator.firstname + ' ' + row.creator.lastname, row.creator.id);
                }
            },
            {
                columnDef: 'date',
                label: 'تاریخ',
                cell: function (row) {
                    return _this.jalaliPipe.transform(row.date);
                }
            }
            // },
            // {
            //   columnDef: 'details',
            //   label: 'جزئیات',
            //   cell: (row) => "<h3>...</h3>"
            // }
        ];
        this.displayedColumns = ['select', 'id', 'name', 'date'];
        this.dataSource = null;
        this.forms = null;
    };
    ReportsComponent.prototype.sortData = function (sort) {
        var _this = this;
        var temp = this.forms.slice();
        console.log(temp);
        console.log(this.forms);
        var item;
        this.columns.forEach(function (i) {
            if (i.columnDef === sort.active) {
                item = i;
            }
        });
        this.dataSource.sort = temp.sort(function (a, b) {
            var isA = sort.direction === 'asc';
            return _this.compare(item.cell(a), item.cell(b), isA);
        });
    };
    ReportsComponent.prototype.compare = function (a, b, isA) {
        return (a < b ? -1 : 1) * (isA ? 1 : -1);
    };
    ReportsComponent.prototype.getPosition = function (name, id) {
        return name + this.userService.getUserPosition(id);
    };
    ReportsComponent.prototype.setDataSource = function () {
        var _this = this;
        var x = true;
        this.forms.forEach(function (data) {
            data['value'] = JSON.parse(data['value'].replace(/'/g, "\""));
            data['value'].forEach(function (pro) {
                if (pro.show) {
                    data['label_' + pro.name] = pro.label;
                    data['value_' + pro.name] = pro.value;
                    if (x) {
                        _this.displayedColumns.push('label_' + pro.name);
                        _this.columns.push({
                            columnDef: 'label_' + pro.name,
                            label: pro.label,
                            cell: function (row) { return row['value_' + pro.name]; }
                        });
                    }
                }
            });
            x = false;
        });
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](this.forms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ReportsComponent.prototype.setTranslateForms = function (forms) {
        this.translateForms = JSON.parse(forms.value.replace(/'/g, "\""));
    };
    ReportsComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId)
                this.nameOfReport = mhd[i].name;
        }
    };
    ReportsComponent.prototype.newForm = function () {
        this.myRoute.navigate(['report/new-form/', this.inputId]);
    };
    ReportsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ReportsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ReportsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            if (JSON.stringify(row).indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ReportsComponent.prototype.reportHistory = function () {
        var _this = this;
        var sub = new rxjs__WEBPACK_IMPORTED_MODULE_8__["Subject"]();
        this.reportsService.inboxReportUrl(this.inputId).subscribe(function (data) {
            _this.forms = data;
            _this.userService.setRowOfReportToLocalStorageGroupByUser(data, 'reportRowList', _this.inputId);
            console.log('online', _this.forms);
            sub.next();
        }, function (error) {
            _this.forms = _this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', _this.inputId);
            console.log('offline', _this.forms);
            sub.next();
        });
        return sub;
    };
    ReportsComponent.prototype.showContent = function (row) {
        console.log('rr', row);
        var dialogRef = this.dialog.open(src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_9__["ContentComponent"], {
            data: {
                reportData: row,
                type: "reports"
            },
            width: "90%",
            height: "80%"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                console.log('dataa', data);
            }
        });
    };
    ReportsComponent.prototype.outboxReports = function () {
        this.myRoute.navigate(['report/sent-reports/', this.inputId]);
    };
    ReportsComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        if (this.selection.selected.length > 0) {
            this.accessibleService.showConfirm().subscribe((function (data) {
                if (data == 1) {
                    _this.selection.selected.forEach(function (row) {
                        //delete from server
                        _this.reportsService.deleteList(row.id).subscribe(function (data) {
                            for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                                if (row.id == _this.dataSource.data[i].id) {
                                    _this.dataSource.data.splice(i, 1);
                                    _this.paginator._changePageSize(_this.paginator.pageSize);
                                    //delete from local storage
                                    _this.reportsService.deleteLocalList(_this.dataSource.data, 'reportRowList');
                                }
                            }
                            _this.selection.clear();
                        }, function (error) {
                            console.log('حذف انجام نشد');
                        });
                    });
                }
            }));
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ReportsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ReportsComponent.prototype, "sort", void 0);
    ReportsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-reports',
            template: __webpack_require__(/*! ./reports.component.html */ "./src/mobile-app/pages/report/reports/reports.component.html"),
            styles: [__webpack_require__(/*! ./reports.component.css */ "./src/mobile-app/pages/report/reports/reports.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_3__["ReportsService"],
            _services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"],
            _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["LocalStorageService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_10__["AccessibleService"],
            _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_11__["JalaliPipe"]])
    ], ReportsComponent);
    return ReportsComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.css":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/report/sent-reports/sent-reports.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\r\n  width: 100%;\r\n  white-space: nowrap;\r\n}\r\n\r\n.mat-form-field {\r\n  font-size: 14px;\r\n  width: 100%;\r\n}\r\n\r\n/*td, th {*/\r\n\r\n/*width: 25%;*/\r\n\r\n/*}*/\r\n\r\n.list-table th.mat-header-cell {\r\n  text-align: right !important;\r\n  padding-right: 0.5%;\r\n}\r\n\r\nth.mat-header-cell {\r\n  text-align: right;\r\n}\r\n\r\n.addBtn {\r\n  /* color: orange; */\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  margin: 0 1px;\r\n}\r\n\r\n.rows {\r\n  cursor: pointer;\r\n}\r\n\r\n.titr {\r\n  text-align: center;\r\n  font-weight: bold;\r\n\r\n}\r\n\r\n.titrCard {\r\n  position: static;\r\n  background-color: rgba(244, 168, 54, 0.1)\r\n\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.html":
/*!******************************************************************************!*\
  !*** ./src/mobile-app/pages/report/sent-reports/sent-reports.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"titrCard\">\r\n  <h5 class=\"titr\">\r\n    گزارش های ارسالی وضعیت {{nameOfReport}}\r\n  </h5>\r\n</mat-card>\r\n\r\n<mat-form-field>\r\n  <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"جستجو\">\r\n</mat-form-field>\r\n<fa for=\"uploadFile\"\r\n    *ngIf=\"selection.selected.length > 0\"\r\n    (click)=\"deleteSelectedNews()\"\r\n    name=\"fas fa-trash\"\r\n    class=\"float-right text-danger\" size=\"2x\">حذف\r\n</fa>\r\n\r\n<div class=\"mat-elevation-z8\">\r\n  <!-- <button class=\"fa fa-plus-circle addBtn\" mat-raised-button color=\"primary\" (click)=\"newForm()\"> گزارش جدید</button> -->\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n    <ng-container matColumnDef=\"select\">\r\n      <th mat-header-cell *matHeaderCellDef>\r\n        <mat-checkbox (change)=\"$event ? masterToggle():null\" [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                      [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n        </mat-checkbox>\r\n      </th>\r\n      <td mat-cell *matCellDef=\"let row\">\r\n        <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event?selection.toggle(row) :null\"\r\n                      [checked]=\"selection.isSelected(row)\">\r\n        </mat-checkbox>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <ng-container *ngFor=\"let column of columns\" matColumnDef=\"{{column.columnDef}}\">\r\n      <div *ngIf=\"column.columnDef!='details'\">\r\n        <th mat-header-cell mat-sort-header *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n      </div>\r\n      <div *ngIf=\"column.columnDef=='details'\">\r\n        <th mat-header-cell *matHeaderCellDef> {{column.label}}{{column.show}}</th>\r\n      </div>\r\n\r\n      <td mat-cell *matCellDef=\"let row; let index = index\" class=\"mail-item\"\r\n          [ngClass]=\"(!row.seen_time && type == 'inbox') ? 'unreadElement' : 'readElement'\"\r\n          [innerHTML]=\"column.cell(row, index)\"></td>\r\n    </ng-container>\r\n\r\n    <ng-container *ngFor=\"let column of dataSource.data['value']\" matColumnDef=\"{{column.label}}\">\r\n      <th mat-header-cell mat-sort-header *matHeaderCellDef> {{column.label}}</th>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n    <tr (click)=\"showContent(row)\" class=\"rows\" mat-row *matRowDef=\"let row; columns: displayedColumns;\">\r\n    </tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSizeOptions]=\"[10, 25, 100]\"></mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.ts":
/*!****************************************************************************!*\
  !*** ./src/mobile-app/pages/report/sent-reports/sent-reports.component.ts ***!
  \****************************************************************************/
/*! exports provided: SentReportsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SentReportsComponent", function() { return SentReportsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/reports/reports.service */ "./src/services/reports/reports.service.ts");
/* harmony import */ var _services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/common/common.service */ "./src/services/common/common.service.ts");
/* harmony import */ var _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/local-storage/local-storage.service */ "./src/services/local-storage/local-storage.service.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/mobile-app/pages/report/component/content/content.component */ "./src/mobile-app/pages/report/component/content/content.component.ts");
/* harmony import */ var src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/components/confirm-dialog/confirm-dialog.component */ "./src/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../services/accessible/accessible.service */ "./src/services/accessible/accessible.service.ts");
/* harmony import */ var _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../web-app/pipes/jalali.pipe */ "./src/web-app/pipes/jalali.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SentReportsComponent = /** @class */ (function () {
    function SentReportsComponent(route, reportsService, myRoute, commonService, userService, localStorageService, dialog, accessibleService, jalaliPipe) {
        this.route = route;
        this.reportsService = reportsService;
        this.myRoute = myRoute;
        this.commonService = commonService;
        this.userService = userService;
        this.localStorageService = localStorageService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.jalaliPipe = jalaliPipe;
        this.displayedColumns = ['select', 'id', 'name', 'date', 'details'];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_8__["SelectionModel"](true, []);
        this.forms = [];
        this.columns = [];
    }
    SentReportsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (data) {
            if (data.id) {
                _this.inputId = data.id;
                _this.findNameOfReport();
                _this.setColumns();
                _this.reportHistory();
                var form = _this.reportsService.getFormOrderById(_this.inputId);
                _this.setTranslateForms(form);
                _this.setDataSource();
            }
        });
    };
    SentReportsComponent.prototype.setColumns = function () {
        var _this = this;
        this.columns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) {
                    return index + 1;
                }
            },
            {
                columnDef: 'name',
                label: 'نام',
                cell: function (row) {
                    return _this.getPosition(row.creator.firstname + ' ' + row.creator.lastname, row.creator.id);
                }
            },
            {
                columnDef: 'date',
                label: 'تاریخ',
                cell: function (row) {
                    return _this.jalaliPipe.transform(row.date);
                }
            }
            // },
            // {
            //   columnDef: 'details',
            //   label: 'جزئیات',
            //   cell: (row) => "<h3>...</h3>"
            // }
        ];
        this.displayedColumns = ['select', 'id', 'name', 'date'];
        this.dataSource = null;
        this.forms = null;
    };
    SentReportsComponent.prototype.getPosition = function (name, id) {
        return name + this.userService.getUserPosition(id);
    };
    SentReportsComponent.prototype.setDataSource = function () {
        var _this = this;
        var x = true;
        this.forms.forEach(function (data) {
            data['value'] = JSON.parse(data['value'].replace(/'/g, "\""));
            data['value'].forEach(function (pro) {
                if (pro.show) {
                    data['label_' + pro.name] = pro.label;
                    data['value_' + pro.name] = pro.value;
                    if (x) {
                        _this.displayedColumns.push('label_' + pro.name);
                        _this.columns.push({
                            columnDef: 'label_' + pro.name,
                            label: pro.label,
                            cell: function (row) { return row['value_' + pro.name]; }
                        });
                    }
                }
            });
            x = false;
        });
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.forms);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    SentReportsComponent.prototype.setTranslateForms = function (forms) {
        this.translateForms = JSON.parse(forms.value.replace(/'/g, "\""));
    };
    SentReportsComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId)
                this.nameOfReport = mhd[i].name;
        }
    };
    SentReportsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    SentReportsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    SentReportsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            if (JSON.stringify(row).indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    SentReportsComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        if (this.selection.selected.length > 0) {
            this.accessibleService.showConfirm().subscribe((function (data) {
                if (data == 1) {
                    var mhd = _this.userService.getFromLocalStorageGroupByUser("sentReportRowList");
                    for (var j = 0; j < _this.selection.selected.length; j++) {
                        var row = _this.selection.selected[j];
                        for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                            if (row.id == _this.dataSource.data[i].id) {
                                _this.dataSource.data.splice(i, 1);
                                _this.paginator._changePageSize(_this.paginator.pageSize);
                            }
                        }
                        for (var i = mhd.length - 1; i >= 0; i--) {
                            if (mhd[i].id == _this.selection.selected[j].id) {
                                mhd.splice(i, 1);
                            }
                        }
                    }
                    _this.reportsService.deleteLocalList(mhd, "sentReportRowList");
                    _this.selection.clear();
                }
            }));
        }
    };
    SentReportsComponent.prototype.showConfirm = function () {
        var _this = this;
        var sub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        var dialogRef = this.dialog.open(src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmDialogComponent"], {
            data: {
                Dialog: "حذف انجام شود؟",
                type: "reports"
            },
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data == 1) {
                _this.confirmOfDelete = 1;
                sub.next();
            }
        });
        return sub;
    };
    SentReportsComponent.prototype.newForm = function () {
        this.myRoute.navigate(['report/new-form/', this.inputId]);
    };
    SentReportsComponent.prototype.reportHistory = function () {
        var sub = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        var mhd = this.userService.getFromLocalStorageGroupByUser('sentReportRowList');
        if (!mhd)
            mhd = [];
        this.forms = [];
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].forms.id == this.inputId) {
                //  this.forms=mhd[i];وو
                this.forms.splice(0, 0, mhd[i]);
            }
        }
        sub.next();
        return sub;
    };
    SentReportsComponent.prototype.showContent = function (row) {
        console.log(row);
        var dialogRef = this.dialog.open(src_mobile_app_pages_report_component_content_content_component__WEBPACK_IMPORTED_MODULE_9__["ContentComponent"], {
            data: {
                reportData: row,
                type: "sent-reports"
            },
            width: "90%",
            height: "80%"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], SentReportsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], SentReportsComponent.prototype, "sort", void 0);
    SentReportsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-sent-reports',
            template: __webpack_require__(/*! ./sent-reports.component.html */ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.html"),
            styles: [__webpack_require__(/*! ./sent-reports.component.css */ "./src/mobile-app/pages/report/sent-reports/sent-reports.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_reports_reports_service__WEBPACK_IMPORTED_MODULE_5__["ReportsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_4__["UsersService"],
            _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_11__["AccessibleService"],
            _web_app_pipes_jalali_pipe__WEBPACK_IMPORTED_MODULE_12__["JalaliPipe"]])
    ], SentReportsComponent);
    return SentReportsComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-report-report-module.js.map