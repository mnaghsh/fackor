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
var config_service_1 = require("../../services/config.service");
var users_service_1 = require("../../services/users/users.service");
var messages_service_1 = require("../../services/messages/messages.service");
var socket_service_1 = require("../../services/socket/socket.service");
var http_1 = require("@angular/common/http");
var MessangerComponent = /** @class */ (function () {
    function MessangerComponent(route, configService, usersService, socket, messagesService, http) {
        this.route = route;
        this.configService = configService;
        this.usersService = usersService;
        this.socket = socket;
        this.messagesService = messagesService;
        this.http = http;
        this.activeSearch = false;
        this.senderInput = "";
        this.searchMessage = null;
        this.Result = null;
        this.searchResults = null;
        this.searchArray = [];
        this.currentSearchIndex = 0;
        this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/uploaded/';
    }
    MessangerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeUserInfo = JSON.parse(this.usersService.getUserInfo());
        this.socketEvent = this.socket.socketEvent.subscribe(function (event) {
            _this.showMessage(event);
        });
        this.route.params.subscribe(function (data) {
            _this.userId = data['id'];
            _this.userInfo = data['userInfo'];
            _this.messagesService.contacts = [];
            _this.getAllMessages();
            _this.searchResults = null;
            _this.searchMessage = null;
        });
    };
    MessangerComponent.prototype.ngOnDestroy = function () {
        this.socketEvent.unsubscribe();
    };
    MessangerComponent.prototype.showMessage = function (event) {
        var socketMessage = event.data.split("|");
        var receiver = socketMessage[1];
        if (socketMessage[0] === "message" && receiver === this.userId) {
            if (socketMessage[3] === 'text' || socketMessage[3] === 'file') {
                var temp = {
                    userId: "301", message: socketMessage[2], dir: "ltr",
                    class: "leftChips", color: "green", type: socketMessage[3]
                };
                this.messagesService.contacts.push(temp);
                this.messagesService.setOldMessages(this.userId, this.messagesService.contacts);
                this.messagesService.putSeenDate(this.userId);
            }
            else if (socketMessage[3] === 'seen' || socketMessage[3] === 'receive') {
                this.messagesService.updateMessages(socketMessage);
            }
        }
    };
    MessangerComponent.prototype.download = function (nameOfFile) {
        var a = document.createElement("a");
        a.download = nameOfFile;
        a.href = this.messagesService.downloadFileURL(nameOfFile);
        a.click();
    };
    MessangerComponent.prototype.ngAfterViewChecked = function () {
        if (!this.activeSearch) {
            this.navigateScrollBar('end');
        }
    };
    MessangerComponent.prototype.deleteSelectedMessage = function () {
        var _this = this;
        var _loop_1 = function (i) {
            if (this_1.messagesService.contacts[i].checked) {
                var messageId = this_1.messagesService.contacts[i].userId;
                this_1.messagesService.deleteMessage(messageId).subscribe(function (data) {
                    _this.messagesService.contacts.splice(i, 1);
                }, function (error) {
                    console.log('حذف از سرور انجام نشد');
                });
            }
        };
        var this_1 = this;
        for (var i = this.messagesService.contacts.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
    };
    MessangerComponent.prototype.send = function (type, message) {
        var _this = this;
        +new Date;
        var body = {
            "text": message,
            "type": type,
            "mission": {
                "id": 297
            },
            "receiver": {
                "id": this.userId
            },
            "sender_time": Date.now(),
        };
        var sendMessageTemp = {
            userId: this.userId, message: message, dir: "rtl",
            class: "rightChips", color: "green", sendTime: Date.now(), serverTime: null, type: type,
            receiveTime: null, seenTime: null
        };
        this.messagesService.putMessage(body).subscribe(function (data) {
            sendMessageTemp.serverTime = data['server_time'];
            if (_this.socket.userIsOnline(_this.userId)) {
                _this.socket.sendMessage(_this.userId, message, type);
            }
            _this.messagesService.contacts.push(sendMessageTemp);
            _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
            _this.senderInput = "";
        }, function (error) {
            if (_this.messagesService.contacts == null) {
                _this.messagesService.contacts = [sendMessageTemp];
            }
            else {
                _this.messagesService.contacts.push(sendMessageTemp);
            }
            _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
            _this.senderInput = "";
        });
    };
    MessangerComponent.prototype.getAllMessages = function () {
        var _this = this;
        this.messagesService.getAllMessagesOfUser(this.userId).subscribe(function (data) {
            _this.messagesService.putSeenDate(_this.userId);
            _this.Result = data;
            var oldMessages = _this.messagesService.getMessagesOffline2();
            if (!oldMessages) {
                oldMessages = [];
            }
            _this.messagesService.messages = data;
            oldMessages.push(_this.messagesService.messages);
            //
            _this.Result.forEach(function (element) {
                _this.fileUrl = _this.messagesService.downloadFileURL(element.text);
                var temp = {
                    userId: element.id, message: element.text, dir: "rtl", url: _this.fileUrl,
                    class: "rightChips", color: "green", type: element.type, receiveTime: element.receiver_time,
                    seenTime: element.seen_time, serverTime: element.server_time, sendTime: element.sender_time
                };
                if (element.sender.id !== _this.activeUserInfo.id) {
                    temp.dir = "ltr", temp.class = "leftChips", temp.color = "dcf8c6";
                }
                _this.messagesService.contacts.push(temp);
            });
            //inam nemikhad
            _this.messagesService.messages.forEach(function (message) {
                message.class = "rightChips";
                message.dir = "rtl";
                message.color = "green";
                if (message.sender.id !== _this.activeUserInfo.id) {
                    message.class = "leftChips";
                    message.dir = "ltr";
                    message.color = "dcf8c6";
                }
            });
            //
            _this.messagesService.setOldMessages2(oldMessages);
            _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
        }, function (error) {
            if (error.status === 0) {
                _this.messagesService.contacts = _this.messagesService.getMessagesOfUserOffline(_this.userId);
                // this.messagesService.messages = this.messagesService.getMessagesOfUserOffline2(this.userId);
                console.log(_this.messagesService.messages);
            }
        });
    };
    MessangerComponent.prototype.searchMessages = function () {
        var _this = this;
        this.cancelSearch();
        if (this.searchMessage !== '' || this.searchMessage !== undefined) {
            this.messagesService.contacts.forEach(function (record) {
                if (record.message && record.message.includes(_this.searchMessage)) {
                    _this.searchArray.push(record);
                }
            });
        }
        if (this.searchArray.length > this.currentSearchIndex) {
            this.currentSearchItem = this.searchArray[this.currentSearchIndex];
            this.previousSearchItem = this.currentSearchItem.class;
            this.currentSearchItem.class = 'focusChip';
            this.navigateScrollBar('message');
            this.activeSearch = true;
        }
    };
    MessangerComponent.prototype.changeSearchMessage = function (step) {
        if ((this.searchArray.length - 1) > this.currentSearchIndex && step === 'next') {
            this.currentSearchIndex++;
        }
        else if (this.currentSearchIndex > 0 && step === 'previous') {
            this.currentSearchIndex--;
        }
        this.changePreviousSearchClass();
        this.initSearchItem();
        this.navigateScrollBar('message');
    };
    MessangerComponent.prototype.cancelSearch = function () {
        if (this.searchArray.length > 0) {
            this.changePreviousSearchClass();
        }
        this.searchArray = [];
        this.currentSearchIndex = 0;
        this.navigateScrollBar('end');
    };
    MessangerComponent.prototype.changePreviousSearchClass = function () {
        this.currentSearchItem.class = this.previousSearchItem;
    };
    MessangerComponent.prototype.initSearchItem = function () {
        this.currentSearchItem = this.searchArray[this.currentSearchIndex];
        this.previousSearchItem = this.currentSearchItem.class;
        this.currentSearchItem.class = 'focusChip';
    };
    MessangerComponent.prototype.cleanSearchBar = function () {
        this.searchMessage = null;
        this.activeSearch = false;
    };
    MessangerComponent.prototype.navigateScrollBar = function (position) {
        // let el = document.getElementById('target');
        // if (position === 'end') {
        //   el.scroll({behavior: "auto", top: el.scrollHeight});
        // } else if (position === 'message') {
        //   let ele = document.getElementById(this.currentSearchItem.userId);
        //   el.scroll({behavior: "smooth", top: ele.offsetTop});
        // }
        var el = document.getElementById('target');
        if (position === 'end') {
            // el.scroll({behavior: "auto", top: el.scrollHeight});
            el.scrollTop = el.scrollHeight;
        }
        else if (position === 'message') {
            var ele = document.getElementById(this.currentSearchItem.userId);
            // el.scroll({behavior: "smooth", top: ele.offsetTop});
            el.scrollTop = ele.offsetTop;
        }
    };
    MessangerComponent.prototype.fileChange = function (event) {
        var _this = this;
        //debugger;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('file', file, file.name);
            console.log('file.name', file.name);
            var headers = new Headers();
            /** In Angular 5, including the header Content-Type can invalidate your request */
            //headers.append('Content-Type', 'multipart/form-data');
            //headers.append('Accept', 'application/json');
            this.messagesService.uploadFile(formData).subscribe(function (res) {
                _this.send('file', res[0]);
            });
        }
    };
    MessangerComponent = __decorate([
        core_1.Component({
            selector: 'app-Messanger',
            templateUrl: './Messanger.component.html',
            styleUrls: ['./Messanger.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            config_service_1.ConfigService,
            users_service_1.UsersService,
            socket_service_1.SocketService,
            messages_service_1.MessagesService,
            http_1.HttpClient])
    ], MessangerComponent);
    return MessangerComponent;
}());
exports.MessangerComponent = MessangerComponent;
//# sourceMappingURL=messanger.component.js.map