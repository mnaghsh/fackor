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
var news_service_1 = require("../../../../../services/news/news.service");
var users_service_1 = require("src/services/users/users.service");
var forms_1 = require("@angular/forms");
var messages_service_1 = require("../../../../../services/messages/messages.service");
var material_1 = require("@angular/material");
var multi_select_component_1 = require("../multi-select/multi-select.component");
var core_2 = require("@angular/core");
var socket_service_1 = require("src/services/socket/socket.service");
var dashboard_component_1 = require("../../../dashboard/dashboard.component");
var CrudComponent = /** @class */ (function () {
    // @ViewChild('subject') subjectt;
    function CrudComponent(newsService, dashboard, usersService, formBuilder, messagesService, dialog, socket) {
        // this.form = formBuilder.group({
        //   subjectt: ['', Validators.required]
        // });
        this.newsService = newsService;
        this.dashboard = dashboard;
        this.usersService = usersService;
        this.formBuilder = formBuilder;
        this.messagesService = messagesService;
        this.dialog = dialog;
        this.socket = socket;
    }
    CrudComponent.prototype.ngOnInit = function () {
        this.crudCreator = {};
        this.crudCreator.receivers = [];
        this.crudModel = {};
        this.crudModel.sourceNews = {};
        this.crudModel.importantNews = {};
        this.crudModel.urgentNews = {};
        this.crudModel.newsTruth = {};
        // this.crudModel.userNews = [];
        this.getReceivers();
        this.getSourceNews();
        if (this.crudModelData)
            this.crudModel = this.crudModelData;
        var activeUserInfo = this.usersService.getUserInfo();
        this.currentUserId = activeUserInfo.id;
        this.currentUserFullName = activeUserInfo.firstname + activeUserInfo.lastname;
    };
    CrudComponent.prototype.getReceivers = function () {
        this.crudCreator.receivers = this.newsService.getOfflineMailbox('newsReceiver');
        // this.newsService.getNewsRecivers().subscribe(
        //   (data) => {
        //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
        //     // this.newsService.setMailbox(data, 'ReciversOfNews');
        //     this.crudCreator.receivers = data;
        //   },
        //   (error) => {
        //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
        //     console.log(error);
        //   });
    };
    CrudComponent.prototype.openReceiversDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(multi_select_component_1.MultiSelectComponent, {
            data: this.crudCreator.receivers
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                console.log('dataa', data);
                _this.crudModel.userNews = [];
                data.forEach(function (element) {
                    if (element.checked == true) {
                        //this.comboItems.push(element);
                        _this.crudModel.userNews.push({
                            receiver: element
                        });
                    }
                });
            }
        });
    };
    CrudComponent.prototype.removeReceivers = function (u, userIndex) {
        this.crudCreator.receivers.forEach(function (element) {
            if (element.id == u.receiver.id)
                element['checked'] = false;
        });
        this.crudModel.userNews.splice(userIndex, 1);
    };
    CrudComponent.prototype.getSourceNews = function () {
        this.crudCreator.sourceNews = this.newsService.getOfflineSources('sourceNews');
        this.crudCreator.urgentNews = this.newsService.getOfflineSources('urgentNews');
        this.crudCreator.importantNews = this.newsService.getOfflineSources('importantNews');
        this.crudCreator.newsTruth = this.newsService.getOfflineSources('truthNews');
    };
    CrudComponent.prototype.saveAsDraft = function () {
        this.crudModel.sender_time = Date.now();
        console.log(this.crudModel);
        this.newsService.saveDraft(this.crudModel);
        this.dashboard.showEventMessage("خبر در پیش نویس ها ذخیره شد");
    };
    CrudComponent.prototype.send = function () {
        var _this = this;
        // debugger
        +new Date;
        //for getting userMission and append in to crudModel
        this.userMission = this.usersService.getMission();
        this.crudModel.mission = { "id": this.userMission.id };
        this.crudModel.sender_time = Date.now();
        var temp = this.crudModel.id;
        delete this.crudModel.id;
        if (this.crudModel.localAttachment)
            this.crudModel.attachment = this.crudModel.localAttachment.toString();
        this.newsService.putNews(this.crudModel).subscribe(function (data) {
            _this.socket.sendNews(_this.crudModel.userNews, _this.crudModel.subject, 'news', _this.crudModel.importantNews.id);
            _this.dashboard.showEventMessage("خبر با موفقیت ارسال شد");
            if (temp) {
                _this.newsService.removeListRow(temp, 'draft');
            }
            _this.newsService.addListRow(data, 'outbox');
            _this.crudModel = {};
            _this.crudModel.sourceNews = {};
            _this.crudModel.importantNews = {};
            _this.crudModel.urgentNews = {};
            _this.crudModel.newsTruth = {};
        }, function (error) {
            _this.dashboard.showEventMessage("خبر ارسال نشد و در پیش نویس ها ذخیره شد");
            _this.saveAsDraft();
        });
    };
    CrudComponent.prototype.fileChange = function (event) {
        var _this = this;
        //debugger;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('file', file, file.name);
            console.log('file.name', file.name);
            var headers = new Headers();
            this.messagesService.uploadFile(formData).subscribe(function (res) {
                if (!_this.crudModel.localAttachment)
                    _this.crudModel.localAttachment = [];
                _this.crudModel.localAttachment.push(res[0]);
            });
        }
    };
    __decorate([
        core_2.Input(),
        __metadata("design:type", Object)
    ], CrudComponent.prototype, "crudModelData", void 0);
    CrudComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-crud',
            templateUrl: './crud.component.html',
            styleUrls: ['./crud.component.css']
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService,
            dashboard_component_1.DashboardComponent,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            messages_service_1.MessagesService,
            material_1.MatDialog,
            socket_service_1.SocketService])
    ], CrudComponent);
    return CrudComponent;
}());
exports.CrudComponent = CrudComponent;
//# sourceMappingURL=crud.component.js.map