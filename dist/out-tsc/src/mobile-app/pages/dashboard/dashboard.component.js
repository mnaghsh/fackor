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
var auth_service_1 = require("../../../services/auth/auth.service");
var router_1 = require("@angular/router");
var users_service_1 = require("../../../services/users/users.service");
var material_1 = require("@angular/material");
var socket_service_1 = require("../../../services/socket/socket.service");
var messages_service_1 = require("../../../services/messages/messages.service");
var dialog_component_1 = require("../../../components/dialog/dialog.component");
var common_service_1 = require("src/services/common/common.service");
var android_1 = require("resource/android");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authService, snackBar, usersService, socketService, myRoute, messageService, bottomSheet, androidAPI, commonService) {
        this.authService = authService;
        this.snackBar = snackBar;
        this.usersService = usersService;
        this.socketService = socketService;
        this.myRoute = myRoute;
        this.messageService = messageService;
        this.bottomSheet = bottomSheet;
        this.androidAPI = androidAPI;
        this.commonService = commonService;
        this.pages = [
            { label: ' پیام  ', path: "/messages", icon: "fal fa-comments" },
            { label: ' خبر ', path: "/news", icon: "far fa-envelope" },
            { label: ' ردگیری ', path: "/tracking", icon: "fal fa-compass" },
            { label: '  گزارش وضعیت ', path: "/report", icon: "fas fa-pencil" },
            { label: ' داشبورد ', path: "", icon: "fas fa-tachometer" },
        ];
        this.singlePages = [
            { label: ' پروفایل من ', path: "/user-info", icon: "fas fa-user" },
            { label: ' عملیات ', path: "/mission-info", icon: "fas fa-opera" },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // jsInterfaceNotification('00', 'senderUsername')
        this.commonService.getfields();
        this.setUserInfo();
        this.socketService.initSocketEvent();
        this.messageService.initMessagesEvent();
        this.socketService.autoSender = true;
        this.socketService.openSocket(this.activeUserInfo['id']);
        this.messageSocketWatcher();
        this.openSocketWatcher();
        this.closeSocketWatcher();
        this.localStorageWatcher();
        this.socketService.usersWatcher();
        this.messageService.sendOfflineMessages();
        this.showNewMessages();
    };
    DashboardComponent.prototype.logout = function () {
        var _this = this;
        // this.socketService.sendMessage(this.activeUserInfo['id'], 'logout', 'logout');
        this.socketService.autoSender = false;
        this.socketService.updateUsersOnline(this.activeUserInfo['id']);
        this.authService.logout().subscribe(function () {
        }, function (error) {
            if (error.status === 0) {
                _this.authService.removeActiveUserData();
                _this.myRoute.navigate(['login']);
            }
        }, function () {
            _this.authService.removeActiveUserData();
            _this.myRoute.navigate(['login']);
            _this.socketService.webSocket.close();
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        this.socketService.completeEvents();
        this.messageService.completeMessagesEvent();
    };
    DashboardComponent.prototype.messageSocketWatcher = function () {
        var _this = this;
        var that = this;
        this.socketService.socketEvent.subscribe(function (event) {
            var y = event.data.split("-");
            var x = y[0].split("|");
            var senderUsername = _this.initUserName(x[1]);
            if (x[0] === "message" &&
                (x[3] === "news" || x[3] === "text")) {
                that.showEventMessage(senderUsername + ': ' + x[2]);
                _this.messageService.addNumberOfNewMessages(x[1], x[2]);
                console.log('x', x);
                _this.androidAPI.jsInterfaceNotification(x[2], senderUsername, y);
            }
        });
    };
    DashboardComponent.prototype.initUserName = function (userId) {
        var user = userId;
        this.users = this.usersService.getOrgForFightUsers();
        if (this.users) {
            this.users.forEach(function (element) {
                if (String(element.user.id) === userId) {
                    user = element.user.firstname + ' ' + element.user.lastname;
                }
            });
        }
        return user;
    };
    DashboardComponent.prototype.openSocketWatcher = function () {
        var _this = this;
        this.socketService.webSocketOpenEvent.subscribe(function (e) {
            if (!_this.socketService.webSocketStatus.isOnline) {
                _this.authService.autoLogin().subscribe(function () {
                    _this.usersService.setInfo(_this.authService.activeUser);
                    _this.activeUserInfo = _this.usersService.getUserInfo();
                    _this.userMission = _this.usersService.getMission();
                    _this.socketService.webSocketStatus.isOnline = true;
                    _this.showEventMessage('شما با موفقیت به شبکه متصل شدید.');
                }, function (er) {
                }, function () {
                    _this.messageService.sendOfflineMessages();
                });
            }
        });
    };
    DashboardComponent.prototype.closeSocketWatcher = function () {
        var _this = this;
        this.socketService.webSocketCloseSocket.subscribe(function (e) {
            if (_this.socketService.webSocketStatus.isOnline) {
                _this.showEventMessage('ارتباط شما قطع است.');
            }
            _this.socketService.webSocketStatus.isOnline = false;
            setTimeout(function () {
                if (_this.socketService.autoSender && !_this.socketService.webSocketStatus.isOnline) {
                    _this.socketService.openSocket(_this.activeUserInfo['id']);
                }
            }, 3000);
        });
    };
    DashboardComponent.prototype.showEventMessage = function (message) {
        this.snackBar.open(message, '', {
            direction: 'rtl',
            duration: 3000,
        });
    };
    DashboardComponent.prototype.localStorageWatcher = function () {
        var _this = this;
        this.usersService.localStorageSet.subscribe(function () {
            _this.setUserInfo();
        });
    };
    DashboardComponent.prototype.setUserInfo = function () {
        this.activeUserInfo = this.usersService.getUserInfo();
        this.userMission = this.usersService.getMission();
    };
    DashboardComponent.prototype.showNewMessages = function () {
        var _this = this;
        +new Date;
        this.messageService.setNewMessages();
        this.messageService.newMessagesEvent.subscribe(function () {
            _this.newMessages = _this.messageService.getSortNewMessages();
            if (_this.newMessages.length > 0) {
                _this.newMessages.forEach(function (userMessages) {
                    _this.messageService.putReceiveTime(userMessages.userId);
                });
                _this.bottomSheet.closeAll();
                _this.bottomSheet.open(dialog_component_1.DialogComponent, {
                    width: '60%',
                    data: _this.newMessages
                });
            }
        });
    };
    DashboardComponent.prototype.addNumberOfNewMessage = function (userId) {
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            material_1.MatSnackBar,
            users_service_1.UsersService,
            socket_service_1.SocketService,
            router_1.Router,
            messages_service_1.MessagesService,
            material_1.MatDialog,
            android_1.AndroidAPI,
            common_service_1.CommonService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map