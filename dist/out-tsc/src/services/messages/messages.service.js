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
var config_service_1 = require("../config.service");
var users_service_1 = require("../users/users.service");
var local_storage_service_1 = require("../local-storage/local-storage.service");
var socket_service_1 = require("../socket/socket.service");
var index_1 = require("rxjs/index");
var MessagesService = /** @class */ (function () {
    function MessagesService(configService, usersService, localStorage, socket) {
        this.configService = configService;
        this.usersService = usersService;
        this.localStorage = localStorage;
        this.socket = socket;
        this.newMessages = [];
        this.contacts = [];
    }
    // public setNewMessages() {
    //
    // }
    // public getNewMessages() {
    //   return this.newMessages;
    // }
    MessagesService.prototype.getOldMessages = function () {
        return this.localStorage.getJson('oldMessages');
    };
    MessagesService.prototype.initMessagesEvent = function () {
        this.newMessagesEvent = new index_1.Subject();
        this.resetNewMessageNumberEvent = new index_1.Subject();
    };
    MessagesService.prototype.completeMessagesEvent = function () {
        this.newMessagesEvent.complete();
        this.resetNewMessageNumberEvent.complete();
    };
    MessagesService.prototype.uploadFile = function (file) {
        return this.configService.post('/message/fileinputload', file, { withCredentials: true });
    };
    MessagesService.prototype.downloadFileURL = function (fileName) {
        return this.configService.localVariables.baseUrl + '/message/download/' + fileName;
    };
    MessagesService.prototype.downloadFile = function (fileName) {
        var options = {
            responseType: 'text',
            withCredentials: true
        };
        return this.configService.get('/message/download/' + fileName, options);
    };
    MessagesService.prototype.getDidNotSeenMessages = function (userId) {
        return this.configService.get('/message/currentusermessages/' + userId, { withCredentials: true });
    };
    MessagesService.prototype.putMessage = function (body) {
        return this.configService.put('/message', body, { withCredentials: true });
    };
    MessagesService.prototype.deleteMessage = function (id) {
        return this.configService.get('/message/' + id + '/deleted', { withCredentials: true });
    };
    MessagesService.prototype.setOldMessages = function (contactId, messages) {
        var currentUserId = this.usersService.getUserInfo().id;
        var oldMessages = this.getOldMessages();
        if (!oldMessages) {
            oldMessages = [];
        }
        var isExist = false;
        for (var i = 0; i < oldMessages.length; i++) {
            if (oldMessages[i].userId === currentUserId
                && oldMessages[i].contactId === contactId) {
                oldMessages[i].contactId = contactId;
                oldMessages[i].messages = messages;
                isExist = true;
            }
        }
        if (!isExist) {
            oldMessages.push({
                'userId': currentUserId,
                'contactId': contactId,
                'messages': messages
            });
        }
        this.localStorage.set('oldMessages', JSON.stringify(oldMessages));
    };
    MessagesService.prototype.getMessagesOfUserOffline = function (userId) {
        var currentUserId = this.usersService.getUserInfo().id;
        var oldMessages = this.getOldMessages();
        if (oldMessages) {
            for (var i = 0; i < oldMessages.length; i++) {
                if (oldMessages[i].userId === currentUserId
                    && oldMessages[i].contactId === userId) {
                    return oldMessages[i].messages;
                }
            }
        }
        return null;
    };
    MessagesService.prototype.getDidNotSendMessages = function () {
        var offlineMessages = [];
        var oldMessages = this.getOldMessages();
        if (oldMessages) {
            oldMessages.forEach(function (messagesOfUser) {
                messagesOfUser['messages'].forEach(function (message) {
                    if (message['serverTime'] == null) {
                        offlineMessages.push(message);
                    }
                });
            });
        }
        return offlineMessages;
    };
    MessagesService.prototype.setDidNotSendMessages = function (item, data) {
        var oldMessages = this.getOldMessages();
        if (oldMessages) {
            oldMessages.forEach(function (messagesOfUser) {
                messagesOfUser['messages'].forEach(function (message) {
                    if (message['sendTime'] == item.sendTime) {
                        message['serverTime'] = data['server_time'];
                    }
                });
            });
            this.contacts.forEach(function (message) {
                if (message['sendTime'] == item.sendTime) {
                    message['serverTime'] = data['server_time'];
                }
            });
            this.localStorage.set('oldMessages', JSON.stringify(oldMessages));
        }
    };
    MessagesService.prototype.sendOfflineMessages = function () {
        var _this = this;
        var offlineMessages = this.getDidNotSendMessages();
        if (offlineMessages) {
            offlineMessages.forEach(function (message) {
                _this.send(message);
            });
        }
    };
    MessagesService.prototype.send = function (item) {
        var _this = this;
        var body = {
            "text": item.message,
            "mission": {
                "id": 297
            },
            "receiver": {
                "id": item.userId
            },
            "sender_time": item.sendTime,
            "type": "text"
        };
        this.putMessage(body).subscribe(function (data) {
            _this.socket.sendMessage(item.userId, item.message, "text");
            _this.setDidNotSendMessages(item, data);
        });
    };
    MessagesService.prototype.getNewMessages = function () {
        var url = '/message/allusermessages';
        return this.configService.get(url, { withCredentials: true });
    };
    MessagesService.prototype.setNewMessages = function () {
        var _this = this;
        this.getNewMessages().subscribe(function (data) {
            _this.setSortNewMessages(_this.sortNewMessages(data));
            _this.newMessagesEvent.next();
        });
    };
    MessagesService.prototype.getSortNewMessages = function () {
        return this.newMessages;
    };
    MessagesService.prototype.setSortNewMessages = function (messages) {
        this.newMessages = messages;
    };
    MessagesService.prototype.addNumberOfNewMessages = function (userId, message) {
        // if (this.newMessages.length > 0) {
        //
        //   this.newMessages.forEach(
        //     (userMessages) => {
        //       if (userMessages.userId == userId) {
        //         userMessages.messages.push({text: message});
        //       }
        //     }
        //   );
        // } else {
        //   const sortMessage = {
        //     userId: userId,
        //     user: ' ',
        //     messages: [
        //       {text: message}
        //     ]
        //   };
        //   this.newMessages.push(sortMessage);
        // }
        //
        // console.log(this.newMessages);
        this.putReceiveTime(userId);
    };
    MessagesService.prototype.sortNewMessages = function (messages) {
        var _this = this;
        var sortMessages = [];
        var sortMessage;
        if (messages) {
            messages.forEach(function (message) {
                if (sortMessage = _this.userExist(message.sender.id, sortMessages)) {
                    sortMessages[sortMessage - 1].messages.push(message);
                }
                else {
                    sortMessage = {
                        userId: message.sender.id,
                        user: message.sender.firstname + ' ' + message.sender.lastname,
                        messages: [
                            message
                        ]
                    };
                    sortMessages.push(sortMessage);
                }
            });
        }
        return sortMessages;
    };
    MessagesService.prototype.userExist = function (id, sortMessages) {
        var exist;
        if (sortMessages) {
            sortMessages.forEach(function (sortMessage, index) {
                if (sortMessage.userId == id) {
                    exist = index + 1;
                }
            });
        }
        return exist;
    };
    MessagesService.prototype.putSeenDate = function (userId) {
        var _this = this;
        +new Date;
        var url = "/messages/seenupdate/" + userId;
        this.resetNewMessageNumberEvent.next(userId);
        return this.configService.get(url, { withCredentials: true }).subscribe(function () {
            _this.socket.sendMessage(userId, Date.now(), 'seen');
        });
    };
    MessagesService.prototype.updateMessages = function (userId, data) {
        this.contacts.forEach(function (message) {
            if (data[3] === 'seen')
                message.seenTime = data[2];
            if (data[3] === 'receive')
                message.receiveTime = data[2];
        });
        this.setOldMessages(userId, this.contacts);
    };
    MessagesService.prototype.putReceiveTime = function (senderId) {
        var _this = this;
        +new Date;
        var url = "/message/receivertimeupdate/" + senderId;
        return this.configService.get(url, { withCredentials: true }).subscribe(function () {
            _this.socket.sendMessage(senderId, Date.now(), 'receive');
        });
    };
    MessagesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            users_service_1.UsersService,
            local_storage_service_1.LocalStorageService,
            socket_service_1.SocketService])
    ], MessagesService);
    return MessagesService;
}());
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map