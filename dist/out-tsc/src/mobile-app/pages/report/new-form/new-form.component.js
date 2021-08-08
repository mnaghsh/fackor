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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var users_service_1 = require("../../../../services/users/users.service");
var reports_service_1 = require("../../../../services/reports/reports.service");
var dashboard_component_1 = require("../../dashboard/dashboard.component");
var NewFormComponent = /** @class */ (function () {
    function NewFormComponent(route, dashboard, userService, reportService) {
        this.route = route;
        this.dashboard = dashboard;
        this.userService = userService;
        this.reportService = reportService;
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
    NewFormComponent.prototype.reset = function () {
        this.form.value.forEach(function (element) {
            element.value = null;
        });
    };
    NewFormComponent.prototype.findNameOfReport = function () {
        var mhd = this.userService.getFromLocalStorageGroupByUser('reportForms');
        for (var i = 0; i < mhd.length; i++) {
            if (mhd[i].id == this.inputId.inputId)
                this.nameOfReport = mhd[i].name;
        }
    };
    NewFormComponent.prototype.submit = function () {
        var _this = this;
        //ارسال فرم که در زیر بصورت استرینگ درآمده است
        console.log(this.form);
        var mhd = JSON.stringify(this.form.value).replace(/"/g, "'");
        console.log('temp', mhd);
        var id = {
            id: this.form.id
        };
        this.formId = id;
        2;
        var sendReportTemp = {
            forms: this.formId, value: mhd
        };
        this.temp = sendReportTemp;
        console.log('temp', this.temp);
        this.reportService.putNews(this.temp).subscribe(function (data) {
            console.log('before add to ls', data);
            // debugger;
            _this.reportService.addListRow(data, 'sentReportRowList', _this.inputId);
            var mhd = _this.userService.getFromLocalStorageGroupByUser("sentReportRowList");
            console.log('after add to ls', mhd);
            _this.dashboard.showEventMessage("گزارش با موفقیت ارسال شد");
        });
    };
    NewFormComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-new-form',
            templateUrl: './new-form.component.html',
            styleUrls: ['./new-form.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            dashboard_component_1.DashboardComponent,
            users_service_1.UsersService,
            reports_service_1.ReportsService])
    ], NewFormComponent);
    return NewFormComponent;
}());
exports.NewFormComponent = NewFormComponent;
//# sourceMappingURL=new-form.component.js.map