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
var accessible_service_1 = require("../../services/accessible/accessible.service");
var MessengerComponent = /** @class */ (function () {
    function MessengerComponent(route, configService, usersService, socket, messagesService, accessibleService) {
        this.route = route;
        this.configService = configService;
        this.usersService = usersService;
        this.socket = socket;
        this.messagesService = messagesService;
        this.accessibleService = accessibleService;
        this.activeSearch = false;
        this.senderInput = "";
        this.searchMessage = null;
        this.searchResults = null;
        this.searchArray = [];
        this.currentSearchIndex = 0;
        this.orgForFightUsers = [];
        this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/uploaded/';
    }
    MessengerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orgForFightUsers = this.usersService.getOrgForFightUsers();
        this.activeUserInfo = this.usersService.getUserInfo();
        this.socketEvent = this.socket.socketEvent.subscribe(this.showOnlineMessage());
        this.route.params.subscribe(function (data) {
            _this.userId = data['id'];
            _this.userInfo = data['userInfo'];
            _this.messagesService.contacts = [];
            _this.getAllMessages();
            _this.searchResults = null;
            _this.searchMessage = null;
            _this.getRecentActivity(data['id']);
        });
        console.log('uu', this.messagesService.contacts);
    };
    MessengerComponent.prototype.ngOnDestroy = function () {
        this.socketEvent.unsubscribe();
    };
    MessengerComponent.prototype.showOnlineMessage = function () {
        var _this = this;
        return function (event) {
            var socketMessage = event.data.split("|");
            var receiver = socketMessage[1];
            if (socketMessage[0] === "message" && receiver === _this.userId) {
                if (socketMessage[3] === 'text' || socketMessage[3] === 'file') {
                    _this.getDidNotSeenMessages();
                }
                else if (socketMessage[3] === 'seen' || socketMessage[3] === 'receive') {
                    _this.messagesService.updateMessages(_this.userId, socketMessage);
                }
            }
        };
    };
    MessengerComponent.prototype.download = function (nameOfFile) {
        var a = document.createElement("a");
        a.download = nameOfFile;
        a.href = this.messagesService.downloadFileURL(nameOfFile);
        a.click();
    };
    MessengerComponent.prototype.ngAfterViewChecked = function () {
        if (!this.activeSearch) {
            this.navigateScrollBar('end');
        }
    };
    MessengerComponent.prototype.deleteSelectedMessage = function () {
        var _this = this;
        this.accessibleService.showConfirm().subscribe(function (data) {
            if (data == 1) {
                for (var i = _this.messagesService.contacts.length - 1; i >= 0; i--) {
                    if (_this.messagesService.contacts[i].checked) {
                        var messageId = _this.messagesService.contacts[i].id;
                        _this.messagesService.contacts.splice(i, 1);
                        // this.messagesService.deleteMessage(messageId).subscribe(
                        //   (data) => {
                        //     this.messagesService.contacts.splice(i, 1);
                        //   },
                        //   (error) => {
                        //     console.log('حذف از سرور انجام نشد');
                        //   }
                        // );
                        console.log(_this.messagesService.contacts);
                    }
                }
                _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
            }
        });
    };
    MessengerComponent.prototype.send = function (type, message) {
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
            receiveTime: null, seenTime: null, id: ""
        };
        this.messagesService.putMessage(body).subscribe(function (data) {
            sendMessageTemp.serverTime = data['server_time'];
            sendMessageTemp.id = data['id'];
            _this.socket.sendMessage(_this.userId, message, type);
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
    MessengerComponent.prototype.getAllMessages = function () {
        if (this.messagesService.getMessagesOfUserOffline(this.userId)) {
            this.messagesService.contacts = this.messagesService.getMessagesOfUserOffline(this.userId);
        }
        this.getDidNotSeenMessages();
    };
    MessengerComponent.prototype.getDidNotSeenMessages = function () {
        var _this = this;
        this.messagesService.getDidNotSeenMessages(this.userId).subscribe(function (data) {
            // debugger
            _this.messagesService.putSeenDate(_this.userId);
            _this.showMessages(data);
            _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
        });
    };
    MessengerComponent.prototype.showMessages = function (messages) {
        var _this = this;
        messages.forEach(function (element) {
            // debugger;
            _this.fileUrl = _this.messagesService.downloadFileURL(element.text);
            console.log('yy', _this.fileUrl);
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
    };
    MessengerComponent.prototype.searchMessages = function () {
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
    MessengerComponent.prototype.changeSearchMessage = function (step) {
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
    MessengerComponent.prototype.cancelSearch = function () {
        if (this.searchArray.length > 0) {
            this.changePreviousSearchClass();
        }
        this.searchArray = [];
        this.currentSearchIndex = 0;
        this.navigateScrollBar('end');
    };
    MessengerComponent.prototype.changePreviousSearchClass = function () {
        this.currentSearchItem.class = this.previousSearchItem;
    };
    MessengerComponent.prototype.initSearchItem = function () {
        this.currentSearchItem = this.searchArray[this.currentSearchIndex];
        this.previousSearchItem = this.currentSearchItem.class;
        this.currentSearchItem.class = 'focusChip';
    };
    MessengerComponent.prototype.cleanSearchBar = function () {
        this.searchMessage = null;
        this.activeSearch = false;
    };
    MessengerComponent.prototype.navigateScrollBar = function (position) {
        var element = document.getElementById('target');
        if (position === 'end') {
            element.scrollTop = element.scrollHeight;
        }
        else if (position === 'message') {
            var ele = document.getElementById(this.currentSearchItem.userId);
            element.scrollTop = ele.offsetTop;
        }
    };
    MessengerComponent.prototype.fileChange = function (event) {
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
                _this.messagesService.contacts['type'] = res[0];
            });
        }
    };
    MessengerComponent.prototype.getRecentActivity = function (userId) {
        var _this = this;
        this.usersService.getRecentActivity(userId).subscribe(function (data) {
            _this.lastSeen = data['maxSeenTime'];
            _this.lastReceive = data['maxReceiverTime'];
        });
    };
    MessengerComponent.prototype.isReceived = function (message) {
        if (message.class == 'rightChips' && !this.isSeen(message)) {
            if (message.seenTime == null &&
                message.receiveTime != null &&
                !(message.serverTime <= this.lastSeen)) {
                return true;
            }
            if (message.serverTime <= this.lastReceive &&
                !(message.serverTime <= this.lastSeen)) {
                return true;
            }
        }
        return false;
    };
    MessengerComponent.prototype.isSeen = function (message) {
        if (message.class == 'rightChips') {
            if (message.seenTime != null &&
                !(message.serverTime <= this.lastReceive)) {
                return true;
            }
            if (message.serverTime <= this.lastSeen) {
                return true;
            }
        }
        return false;
    };
    MessengerComponent.prototype.isSent = function (message) {
        if (message.class == 'rightChips') {
            if (!this.isSeen(message) && !this.isReceived(message)) {
                if (message.serverTime != null)
                    return true;
            }
        }
        return false;
    };
    MessengerComponent = __decorate([
        core_1.Component({
            selector: 'app-messenger',
            templateUrl: './messenger.component.html',
            styleUrls: ['./messenger.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            config_service_1.ConfigService,
            users_service_1.UsersService,
            socket_service_1.SocketService,
            messages_service_1.MessagesService,
            accessible_service_1.AccessibleService])
    ], MessengerComponent);
    return MessengerComponent;
}());
exports.MessengerComponent = MessengerComponent;
//# sourceMappingURL=messenger.component.js.map