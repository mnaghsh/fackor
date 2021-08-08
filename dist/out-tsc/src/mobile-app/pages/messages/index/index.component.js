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
var users_service_1 = require("../../../../services/users/users.service");
var local_storage_service_1 = require("../../../../services/local-storage/local-storage.service");
var socket_service_1 = require("../../../../services/socket/socket.service");
var messages_service_1 = require("../../../../services/messages/messages.service");
var material_1 = require("@angular/material");
var IndexComponent = /** @class */ (function () {
    // private des: ReplaySubject<boolean> = new ReplaySubject(1);
    function IndexComponent(userService, localStorage, socketService, messageService, bottomSheet) {
        this.userService = userService;
        this.localStorage = localStorage;
        this.socketService = socketService;
        this.messageService = messageService;
        this.bottomSheet = bottomSheet;
        this.orgForFightUsers = [];
    }
    IndexComponent.prototype.ngOnInit = function () {
        this.activeUserInfo = this.userService.getUserInfo();
        this.getUsers();
        this.initNewMessages();
        this.scrollToBottom();
        this.getNumberOfNewMessage();
        this.resetNumberOfNewMessages();
    };
    IndexComponent.prototype.ngOnDestroy = function () {
        // this.socketService.socketEvent.unsubscribe();
        // this.messageService.newMessages.unsubscribe();
    };
    IndexComponent.prototype.initNewMessages = function () {
        this.newMessages = this.messageService.getSortNewMessages();
    };
    IndexComponent.prototype.getUsers = function () {
        var _this = this;
        this.orgForFightUsers = this.userService.getOrgForFightUsers();
        console.log('this.orgForFightUsers', this.orgForFightUsers);
        this.userService.getSize().subscribe(function (size) {
            _this.orgForFightUsers.forEach(function (record) {
                size.forEach(function (s) {
                    if (s.name === record.orgForFight.unit.size) {
                        record.orgForFight.unit.text = s.translate + ' ';
                    }
                });
                console.log(record);
            });
        }, function (err) {
            console.log('خطا');
        });
    };
    IndexComponent.prototype.scrollToBottom = function () {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }
        catch (err) {
        }
    };
    IndexComponent.prototype.ngAfterViewChecked = function () {
        this.scrollToBottom();
    };
    IndexComponent.prototype.contactClick = function (userId) {
    };
    IndexComponent.prototype.getUserStatus = function (id) {
        return this.socketService.userIsOnline(id);
    };
    IndexComponent.prototype.getNumberOfNewMessage = function () {
        var messages = this.newMessages;
        if (this.orgForFightUsers) {
            this.orgForFightUsers.forEach(function (orgForFight) {
                var count = 0;
                if (messages) {
                    messages.forEach(function (element) {
                        console.log(element.messages.length);
                        if (element.userId === orgForFight.user.id) {
                            count = element.messages.length;
                        }
                    });
                }
                orgForFight.numberOfNewMessages = count;
            });
        }
        console.log(this.newMessages);
        console.log(this.orgForFightUsers);
    };
    IndexComponent.prototype.resetNumberOfNewMessages = function () {
        var _this = this;
        var messages = this.newMessages;
        this.messageService.resetNewMessageNumberEvent.subscribe(function (userId) {
            _this.orgForFightUsers.forEach(function (orgForFight) {
                if (orgForFight.user.id == userId) {
                    orgForFight.numberOfNewMessages = 0;
                }
            });
            if (messages) {
                messages.forEach(function (userMessages, i) {
                    if (userMessages.userId == userId)
                        messages.splice(i, 1);
                });
            }
            _this.messageService.setSortNewMessages(messages);
        });
    };
    __decorate([
        core_1.ViewChild('scrollMe'),
        __metadata("design:type", core_1.ElementRef)
    ], IndexComponent.prototype, "myScrollContainer", void 0);
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            local_storage_service_1.LocalStorageService,
            socket_service_1.SocketService,
            messages_service_1.MessagesService,
            material_1.MatDialog])
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map