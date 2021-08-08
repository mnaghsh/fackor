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
var rxjs_1 = require("rxjs");
var config_service_1 = require("../config.service");
var users_service_1 = require("../users/users.service");
var news_service_1 = require("../news/news.service");
var SocketService = /** @class */ (function () {
    function SocketService(configService, newsService, usersService) {
        this.configService = configService;
        this.newsService = newsService;
        this.usersService = usersService;
        this.disableAutoSend = true;
        this.contacts = [];
        this.sendRequestToOpen = false;
        this.webSocketStatus = {
            isOnline: false
        };
        this.autoSender = false;
        this.onlineUsers = [];
    }
    SocketService.prototype.initSocketEvent = function () {
        this.socketEvent = new rxjs_1.Subject();
        this.webSocketOpenEvent = new rxjs_1.Subject();
        this.webSocketCloseSocket = new rxjs_1.Subject();
    };
    SocketService.prototype.completeEvents = function () {
        this.webSocketOpenEvent.complete();
        this.webSocketCloseSocket.complete();
        this.socketEvent.complete();
    };
    SocketService.prototype.openSocket = function (userId) {
        if (this.webSocket !== undefined && this.webSocket.readyState !== WebSocket.CLOSED) {
            console.log("WebSocket is already opened.");
            return;
        }
        // Create a new instance of the websocket
        this.webSocket = new WebSocket('ws:' + this.configService.localVariables.socketUrl + '/echo?id=' +
            userId);
        var that = this;
        this.webSocket.onmessage = function (event) {
            that.socketEvent.next(event);
        };
        this.webSocket.onclose = function (event) {
            that.webSocketCloseSocket.next(event);
        };
        this.webSocket.onopen = function (event) {
            that.webSocketOpenEvent.next(event);
        };
    };
    SocketService.prototype.usersWatcher = function () {
        var _this = this;
        this.socketEvent.subscribe(function (event) {
            var x = event.data.split("|");
            if (x[3] && x[3].indexOf("news") >= 0)
                _this.newsService.buildInbox();
            console.log(event.data);
            if (x[0] === "newUser") {
                _this.initNewUsersOnline(x);
            }
            if (x[0] === "removeUser") {
                _this.updateUsersOnline(x[1]);
            }
        });
    };
    SocketService.prototype.initNewUsersOnline = function (data) {
        var _this = this;
        if (data.length > 2) {
            this.onlineUsers = [];
            data.forEach(function (value) {
                if (value !== 'newUser') {
                    _this.onlineUsers.push(value);
                }
            });
        }
        else {
            var isExist_1 = false;
            this.onlineUsers.forEach(function (value) {
                if (value == data[1]) {
                    isExist_1 = true;
                }
            });
            if (!isExist_1) {
                this.onlineUsers.push(data[1]);
            }
        }
    };
    SocketService.prototype.updateUsersOnline = function (userId) {
        var _this = this;
        this.onlineUsers.forEach(function (value, index) {
            if (value == userId) {
                _this.onlineUsers.splice(index, 1);
            }
        });
    };
    SocketService.prototype.userIsOnline = function (id) {
        var isOnline = false;
        this.onlineUsers.forEach(function (value) {
            if (value == id) {
                isOnline = true;
            }
        });
        if (isOnline) {
            return isOnline;
        }
    };
    SocketService.prototype.sendMessage = function (userId, senderInput, type) {
        if (this.userIsOnline(userId)) {
            this.webSocket.send(userId + '|' + senderInput + '|' + type);
        }
    };
    SocketService.prototype.sendNews = function (users, senderInput, type, importantNews) {
        var _this = this;
        // debugger;
        this.contacts = [];
        users.forEach(function (element) {
            if (_this.userIsOnline(element.receiver.id)) {
                _this.contacts.push(element.receiver.id);
            }
        });
        console.log(this.contacts + '|' + senderInput + '|' + type + '|' + importantNews);
        if (this.contacts.length > 0)
            this.webSocket.send(this.contacts + '|' + senderInput + '|' + type + '-' + importantNews);
    };
    SocketService.prototype.sendFile = function (value) {
        this.webSocket.send(value);
    };
    SocketService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            news_service_1.NewsService,
            users_service_1.UsersService])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map