(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-messages-messages-module"],{

/***/ "./src/components/messanger/messenger.component.css":
/*!**********************************************************!*\
  !*** ./src/components/messanger/messenger.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".massenger {\r\n  overflow-x:hidden;\r\n}\r\n\r\nmat-chip.leftChips {\r\n  border-top-right-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: rgba(0,0,0,.14) !important;\r\n  color: black !important;\r\n  padding-right: 30px;\r\n  padding-left: 10px;\r\n}\r\n\r\n.mat-standard-chip {\r\n  border-radius: 0px;\r\n}\r\n\r\nmat-chip.rightChips {\r\n  border-top-left-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: rgba(137, 167, 40, 0.2) !important;\r\n  padding-left: 30px;\r\n  right: 10px;\r\n}\r\n\r\nspan{\r\n  color: rgba(62,65,83,0.59)\r\n}\r\n\r\n.input {\r\n  /* min-width: 150px!important;\r\n  max-width: 500px!important; */\r\n  width: 90% !important;\r\n  border: 0;\r\n  padding: 10px;\r\n}\r\n\r\n.input-full-width {\r\n  width: 100% !important;\r\n}\r\n\r\n.leftChips {\r\n  direction: rtl;\r\n  padding: 0 10px;\r\n\r\n}\r\n\r\n.rightChips {\r\n  color: black !important;\r\n  padding: 0 10px;\r\n}\r\n\r\n.sendBotton {\r\n  width: 5% !important;\r\n  float: right;\r\n\r\n}\r\n\r\n.search-full-width {\r\n  width: 100%;\r\n\r\n}\r\n\r\n.search {\r\n  min-width: 150px;\r\n  max-width: 500px;\r\n  width: 100%;\r\n}\r\n\r\n.chat-box {\r\n  overflow-y: auto;\r\n  padding: 0;\r\n  position: fixed;\r\n  top: 63px;\r\n  bottom: 120px;\r\n  background-image: url('comments-solid.png');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n\r\n.container {\r\n  max-width: 100%;\r\n}\r\n\r\n.myBox {\r\n  padding: 0px;\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  top: 0;\r\n  font-size: 15px;\r\n  background-color: #6c757d;\r\n  color: #969d97;\r\n}\r\n\r\n.mat-input-wrapper{\r\n  hight: 100px !important;\r\n}\r\n\r\n.sendBotton {\r\n  cursor: pointer;\r\n}\r\n\r\n.focusChip {\r\n  padding: 0 10px;\r\n  border-radius: 24px !important;\r\n  background-color: rgba(251, 223, 255, .7);\r\n}\r\n\r\n.chatContainer {\r\n  position: relative;\r\n}\r\n\r\n.searchUtils {\r\n  padding: 0;\r\n}\r\n\r\n.changeSearchMessageBox {\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  font-size: x-large;\r\n  padding-top: 5px;\r\n}\r\n\r\n.searchMessageButtonsBox {\r\n  padding-left: 10px;\r\n  padding-right: 10px;\r\n  font-size: x-large;\r\n}\r\n\r\n.searchMessageButtonsBox i{\r\n  padding-top: 5px;\r\n}\r\n\r\n.share-file-button{\r\n  font-size: x-large;\r\n}\r\n\r\n.userInfoBox {\r\n  padding: 20px;\r\n  padding-right: 60px;\r\n  font-size: larger;\r\n  color: #2c2563;\r\n}\r\n\r\n.onlineStatus {\r\n  color: #adff58;\r\n  font-size: 18px;\r\n}\r\n\r\n.offlineStatus {\r\n  color: #ff2e42;\r\n  font-size: 18px;\r\n}\r\n\r\n.footer {\r\n  color: #6c757d;\r\n  font-size: 10px;\r\n  margin: 0;\r\n}\r\n\r\n.chat-item {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.message {\r\n  padding-top: 15px;\r\n  padding-bottom: 15px;\r\n  padding-left: 30px;\r\n  padding-right: 30px;\r\n\r\n}\r\n\r\nmat-checkbox {\r\n  margin-right: 8px;\r\n}\r\n\r\n.writeMessageBox {\r\n  padding-top: 5px;\r\n  padding-bottom: 5px;\r\n  position: fixed;\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 65px;\r\n  z-index: 10;\r\n}\r\n\r\n.titleBar{\r\n  text-align: center;\r\n  padding-left: 0;\r\n  padding-right: 60px;\r\n  /*background-color: #3a4b4e24;*/\r\n}\r\n\r\n.seenCheckIcon{\r\n  color: #2c2563;\r\n  font-size: 12px;\r\n}\r\n\r\n.lastSeenBar{\r\n  display: block;\r\n  text-align: center;\r\n  font-size: 13px;\r\n}\r\n\r\n.labelName{\r\n  color: #dee2e6;\r\n}\r\n\r\n.labelCommander{\r\n  color: #b8bfb9;\r\n}\r\n\r\n.label{\r\n  color: #b8bfb9;\r\n}\r\n\r\n.myTextDanger{\r\n  color: #ff2e42;\r\n}\r\n\r\n.danger-text{\r\n\r\n}\r\n\r\nmat-checkbox-label .comand{\r\n  margin: 10px\r\n}\r\n\r\n.chat-tools-item{\r\n  padding: 10px;\r\n  display: block;\r\n  background-color: #28a745;\r\n  color: #fff6f6;\r\n}\r\n\r\n.mat-form-field.mat-focused .mat-form-field-label{\r\n  color: #000;\r\n}\r\n\r\n.search-tools{\r\n  color: orange;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/components/messanger/messenger.component.html":
/*!***********************************************************!*\
  !*** ./src/components/messanger/messenger.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form\">\r\n  <mat-card class=\"myBox massenger\">\r\n    <div class=\"row\">\r\n      <div class=\"col col-2\">\r\n      </div>\r\n      <div class=\"col col-5 titleBar\">\r\n        <span  [ngClass]=\"socket.userIsOnline(userId) ? 'onlineStatus' : 'offlineStatus' \">\r\n          {{userInfo['user'].firstname}} {{userInfo['user'].lastname}}\r\n        </span>\r\n        <span class=\"labelCommander\">\r\n          (\r\n          <span class=\"labelCommander\">فرمانده </span>\r\n          {{userInfo['orgForFight'].unit.text}} - {{userInfo['orgForFight'].unit.name}} )\r\n        </span>\r\n        <!--<span class=\"onlineStatus\" *ngIf=\"socket.userIsOnline(userId)\">(وصل)</span>-->\r\n        <!--<span class=\"offlineStatus\" *ngIf=\"!socket.userIsOnline(userId)\">(قطع)</span>-->\r\n        <span class=\"lastSeenBar\">\r\n          <span class=\"label\"> آخرین بازدید: </span>\r\n          <span class=\"label\" *ngIf=\"lastSeen != null\">{{lastSeen | jalali}}</span>\r\n        </span>\r\n      </div>\r\n      <div class=\"col col-1\">\r\n        <fa for=\"uploadFile\" *ngIf=\"hasSelected()\" (click)=\"deleteSelectedMessage()\" name=\"fas fa-trash\"\r\n            class=\"float-right myTextDanger padding-sm\"\r\n            size=\"2x\">حذف\r\n        </fa>\r\n      </div>\r\n      <div class=\"col col-4\">\r\n        <form class=\"search\">\r\n          <div class=\"row\">\r\n            <div class=\"col col-4 searchUtils\" dir=\"ltr\" style=\"text-align: left\">\r\n              <div class=\"row search-tools\">\r\n                <div class=\"searchMessageButtonsBox\">\r\n                  <i class=\"fa fa-search\"  size=\"2x\" *ngIf=\"!activeSearch\" aria-hidden=\"true\" (click)=\"searchMessages()\"></i>\r\n                  <i class=\"fa fa-close\" *ngIf=\"activeSearch\" (click)=\"cancelSearch() ; cleanSearchBar()\"></i>\r\n                </div>\r\n                <div class=\"changeSearchMessageBox row\">\r\n                  <i *ngIf=\"(searchArray.length - (currentSearchIndex+1))  > 0\" class=\"fa fa-arrow-down col col-3\"\r\n                     (click)=\"changeSearchMessage('next')\">\r\n                  </i>\r\n                  <i *ngIf=\"currentSearchIndex > 0\" class=\"fa fa-arrow-up col col-3\"\r\n                     (click)=\"changeSearchMessage('previous')\">\r\n                  </i>\r\n                </div>\r\n                <div *ngIf=\"searchArray.length > 0\" class=\"col col-12\">\r\n                  {{searchArray.length}}/{{currentSearchIndex+1}}\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col col-8\">\r\n              <form>\r\n                <!--<div class=\"form-group\">-->\r\n                <mat-form-field class=\"search-full-width\">\r\n                  <input name=\"search\" matInput placeholder=\"جستجو\" [(ngModel)]=\"searchMessage\"\r\n                         (keyup)=\"searchMessages()\">\r\n                </mat-form-field>\r\n                <!--</div>-->\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </mat-card>\r\n  <mat-divider>\r\n  </mat-divider>\r\n  <div style=\"background-color: white\" class=\"chat-box container\" id=\"target\">\r\n    <div *ngIf=\"searchResults === null\" class=\"chatContainer\">\r\n      <div *ngFor=\"let contact of messagesService.contacts\" [id]=\"contact.userId\" class=\"message\">\r\n        <mat-chip-list class=\"_{{contact.dir}}\" [dir]=\"contact.dir\">\r\n          <mat-checkbox [(ngModel)]=\"contact.checked\"></mat-checkbox>\r\n          <mat-chip disableRipple color=\"primary\" selected=\"true\" [class]=\"contact.class\">\r\n            <div class=\"myTextDanger\" *ngIf=\"contact.command\">دستور</div>\r\n            <p class=\"footer\">\r\n              <span *ngIf=\"contact.serverTime == null && contact.class == 'rightChips'\">\r\n                <fa name=\"fas fa-hourglass-start\"></fa>\r\n              </span>\r\n              <span *ngIf=\"isSent(contact)\">\r\n                <fa name=\"fas fa-check\"></fa>\r\n              </span>\r\n              <span *ngIf=\"isReceived(contact)\">\r\n                <fa name=\"fas fa-check\"></fa>\r\n                <fa name=\"fas fa-check\"></fa>\r\n              </span>\r\n              <span *ngIf=\"isSeen(contact)\" class=\"seenCheckIcon\">\r\n                <fa name=\"fas fa-check\"></fa>\r\n                <fa name=\"fas fa-check\"></fa>\r\n              </span>\r\n            </p>\r\n            <p class=\"chat-item\" *ngIf=\"contact.message && contact.type === 'text'\">{{contact.message}}</p>\r\n            <p class=\"chat-item\" *ngIf=\"contact.message && contact.type === 'file'\">\r\n              <!--(click)=\"showImagePreview(contact.message)\"-->\r\n              <img *ngIf=\"contact.message && isImage(contact.message)\" (click)=\"showImagePreview(contact.message)\"\r\n                   [src]=\"getFileUrl(contact.message)\"\r\n                   width=\"150px\">\r\n              <!-- <a href=\"{{downloadBaseUrl + contact.message}}\" *ngIf=\"contact.type === 'file'\">{{contact.message}}</a> -->\r\n              <br>\r\n              <label for=\"uploadFile\" class=\"float-left\" (click)=\"download(contact.message)\">\r\n                <fa for=\"uploadFile\" name=\"fas fa-download\" class=float-left size=\"1x\">send</fa>\r\n              </label>\r\n            </p>\r\n            <p class=\"footer\">\r\n              {{contact.sendTime | jalali}}\r\n            </p>\r\n          </mat-chip>\r\n        </mat-chip-list>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <mat-divider>\r\n  </mat-divider>\r\n  <mat-card class=\"writeMessageBox\">\r\n    <div class=\"row\">\r\n      <div class=\"col col-10\">\r\n        <input  class=\"input\"  matInput placeholder=\"نوشتن پیام\" [(ngModel)]=\"senderInput\"\r\n               (keyup.enter)=\"send('text', senderInput)\">\r\n        <fa name=\"fas fa-angle-double-right\" class=\"sendBotton float-right\" size=\"2x\"\r\n            (click)=\"send('text', senderInput)\" >\r\n          send\r\n        </fa>\r\n      </div>\r\n      <div class=\"col col-2 \" dir=\"ltr\">\r\n        <div class=\"row \">\r\n          <div class=\"col col-6 \">\r\n            <label for=\"uploadFile\">\r\n              <i for=\"uploadFile\" class=\"fa fa-paperclip share-file-button\"></i>\r\n            </label>\r\n            <input type=\"file\" (change)=\"fileChange($event)\" placeholder=\"Upload file\" id=\"uploadFile\" class=\"d-none\">\r\n          </div>\r\n          <div class=\"col col-6 \">\r\n            <mat-checkbox class=\"command\" [(ngModel)]=\"command\"></mat-checkbox>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./src/components/messanger/messenger.component.ts":
/*!*********************************************************!*\
  !*** ./src/components/messanger/messenger.component.ts ***!
  \*********************************************************/
/*! exports provided: MessengerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessengerComponent", function() { return MessengerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/config.service */ "./src/services/config.service.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/messages/messages.service */ "./src/services/messages/messages.service.ts");
/* harmony import */ var _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/socket/socket.service */ "./src/services/socket/socket.service.ts");
/* harmony import */ var _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/accessible/accessible.service */ "./src/services/accessible/accessible.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../image-preview/image-preview.component */ "./src/components/image-preview/image-preview.component.ts");
/* harmony import */ var _services_user_status_user_status_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/user-status/user-status.service */ "./src/services/user-status/user-status.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MessengerComponent = /** @class */ (function () {
    function MessengerComponent(route, configService, usersService, socket, messagesService, accessibleService, dialog, userStatusService) {
        this.route = route;
        this.configService = configService;
        this.usersService = usersService;
        this.socket = socket;
        this.messagesService = messagesService;
        this.accessibleService = accessibleService;
        this.dialog = dialog;
        this.userStatusService = userStatusService;
        this.activeSearch = false;
        this.senderInput = "";
        this.searchMessage = null;
        this.searchResults = null;
        this.searchArray = [];
        this.currentSearchIndex = 0;
        this.orgForFightUsers = [];
        this.scrollStatus = 0;
        this.command = false;
        this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/uploaded/';
    }
    MessengerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orgForFightUsers = this.usersService.getOrgForFightUsers();
        this.activeUserInfo = this.usersService.getUserInfo();
        this.socketEvent = this.socket.socketEvent.subscribe(this.showOnlineMessage());
        this.route.params.subscribe(function (data) {
            _this.userId = data['userId'];
            _this.messagesService.contacts = [];
            _this.getAllMessages();
            _this.searchResults = null;
            _this.searchMessage = null;
            _this.getRecentActivity(_this.userId);
            _this.getUserInfo(_this.userId);
            _this.userStatusService.resetNumberOfNewMessages(data['userId']);
        });
    };
    MessengerComponent.prototype.ngOnDestroy = function () {
        this.socketEvent.unsubscribe();
    };
    MessengerComponent.prototype.getUserInfo = function (userId) {
        this.userInfo = this.usersService.getOrgForFightById(userId);
    };
    MessengerComponent.prototype.showOnlineMessage = function () {
        var _this = this;
        return function (event) {
            var socketMessage = event.data.split("|");
            var receiver = socketMessage[1];
            if (socketMessage[0] === "message" && receiver === _this.userId) {
                _this.userStatusService.resetNumberOfNewMessages(Number(_this.userId));
                if (socketMessage[3] === 'text' || socketMessage[3] === 'file') {
                    _this.getDidNotSeenMessages();
                }
                else if (socketMessage[3] === 'seen' || socketMessage[3] === 'receive') {
                    _this.messagesService.updateMessages(_this.userId, socketMessage);
                }
            }
        };
    };
    MessengerComponent.prototype.showImagePreview = function (nameOfFile) {
        var dialogRef = this.dialog.open(_image_preview_image_preview_component__WEBPACK_IMPORTED_MODULE_8__["ImagePreviewComponent"], {
            data: {
                name: nameOfFile
            },
            width: "auto",
            height: "auto"
        });
    };
    MessengerComponent.prototype.download = function (nameOfFile) {
        var a = document.createElement("a");
        a.download = nameOfFile;
        a.href = this.messagesService.downloadFileURL(nameOfFile);
        a.click();
    };
    MessengerComponent.prototype.ngAfterViewChecked = function () {
        if (!this.activeSearch && this.scrollStatus == 1) {
            this.navigateScrollBar('end');
            this.scrollStatus = 0;
        }
    };
    MessengerComponent.prototype.deleteSelectedMessage = function () {
        var _this = this;
        if (this.hasSelected()) {
            this.accessibleService.showConfirm().subscribe(function (data) {
                if (data === 1) {
                    for (var i = _this.messagesService.contacts.length - 1; i >= 0; i--) {
                        if (_this.messagesService.contacts[i].checked) {
                            var messageId = _this.messagesService.contacts[i].id;
                            _this.messagesService.contacts.splice(i, 1);
                            console.log(_this.messagesService.contacts);
                        }
                    }
                    _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
                }
            });
        }
    };
    MessengerComponent.prototype.hasSelected = function () {
        for (var i = this.messagesService.contacts.length - 1; i >= 0; i--) {
            if (this.messagesService.contacts[i].checked) {
                return true;
            }
        }
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
            "command": this.command
        };
        var sendMessageTemp = {
            userId: this.userId, message: message, dir: "rtl",
            class: "rightChips", color: "green", sendTime: Date.now(), serverTime: null, type: type,
            receiveTime: null, seenTime: null, id: "", command: this.command
        };
        if (message.length > 0) {
            this.messagesService.putMessage(body).subscribe(function (data) {
                sendMessageTemp.serverTime = data['server_time'];
                sendMessageTemp.id = data['id'];
                //added
                sendMessageTemp.userId = data['id'];
                _this.socket.sendMessage(_this.userId, message, type);
                _this.messagesService.contacts.push(sendMessageTemp);
                _this.refresh();
            }, function (error) {
                if (_this.messagesService.contacts == null) {
                    _this.messagesService.contacts = [sendMessageTemp];
                }
                else {
                    _this.messagesService.contacts.push(sendMessageTemp);
                }
                _this.refresh();
            });
        }
    };
    MessengerComponent.prototype.refresh = function () {
        this.cancelSearch();
        this.cleanSearchBar();
        this.messagesService.setOldMessages(this.userId, this.messagesService.contacts);
        this.senderInput = "";
        this.scrollStatus = 1;
        this.command = false;
    };
    MessengerComponent.prototype.getAllMessages = function () {
        if (this.messagesService.getMessagesOfUserOffline(this.userId)) {
            this.messagesService.contacts = this.messagesService.getMessagesOfUserOffline(this.userId);
        }
        this.scrollStatus = 1;
        this.getDidNotSeenMessages();
    };
    MessengerComponent.prototype.getDidNotSeenMessages = function () {
        var _this = this;
        this.messagesService.getDidNotSeenMessages(this.userId).subscribe(function (data) {
            //
            _this.messagesService.putSeenDate(_this.userId);
            _this.showMessages(data);
            _this.messagesService.setOldMessages(_this.userId, _this.messagesService.contacts);
        });
    };
    MessengerComponent.prototype.showMessages = function (messages) {
        var _this = this;
        messages.forEach(function (element) {
            var temp = {
                userId: element.id, message: element.text, dir: "rtl", url: _this.fileUrl,
                class: "rightChips", color: "green", type: element.type,
                receiveTime: element.receiver_time,
                seenTime: element.seen_time, serverTime: element.server_time,
                sendTime: element.sender_time, command: element.command
            };
            if (element.sender.id !== _this.activeUserInfo.id) {
                temp.dir = "ltr", temp.class = "leftChips", temp.color = "dcf8c6";
            }
            _this.messagesService.contacts.push(temp);
            _this.scrollStatus = 1;
        });
    };
    MessengerComponent.prototype.getFileUrl = function (element) {
        return this.messagesService.downloadFileURL(element);
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
        //;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('file', file, file.name);
            var headers = new Headers();
            /** In Angular 5, including the header Content-Type can invalidate your request */
            //headers.append('Content-Type', 'multipart/form-data');
            //headers.append('Accept', 'application/json');
            this.messagesService.uploadFile(formData).subscribe(function (res) {
                console.log(res);
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
    MessengerComponent.prototype.isImage = function (element) {
        var result = new RegExp('img|jpg|ico|png|tif');
        return result.test(element.split('.')[1]);
    };
    MessengerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messenger',
            template: __webpack_require__(/*! ./messenger.component.html */ "./src/components/messanger/messenger.component.html"),
            styles: [__webpack_require__(/*! ./messenger.component.css */ "./src/components/messanger/messenger.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_config_service__WEBPACK_IMPORTED_MODULE_2__["ConfigService"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_3__["UsersService"],
            _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_5__["SocketService"],
            _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__["MessagesService"],
            _services_accessible_accessible_service__WEBPACK_IMPORTED_MODULE_6__["AccessibleService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"],
            _services_user_status_user_status_service__WEBPACK_IMPORTED_MODULE_9__["UserStatusService"]])
    ], MessengerComponent);
    return MessengerComponent;
}());



/***/ }),

/***/ "./src/components/nav/nav.component.css":
/*!**********************************************!*\
  !*** ./src/components/nav/nav.component.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-toolbar.mat-primary {\r\n  background:lightgray;\r\n  color: #fff;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 10;\r\n \r\n}\r\n.container{\r\n  background-color: rgba(0, 0, 0, 0.66)!important;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/components/nav/nav.component.html":
/*!***********************************************!*\
  !*** ./src/components/nav/nav.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container\"><mat-toolbar >\r\n  <button mat-button  routerLink=\"/home\">خانه</button>\r\n\r\n</mat-toolbar>\r\n</div>"

/***/ }),

/***/ "./src/components/nav/nav.component.ts":
/*!*********************************************!*\
  !*** ./src/components/nav/nav.component.ts ***!
  \*********************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavComponent = /** @class */ (function () {
    function NavComponent() {
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/components/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.css */ "./src/components/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/messages/index/index.component.css":
/*!*****************************************************************!*\
  !*** ./src/mobile-app/pages/messages/index/index.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-bar {\r\n  position: absolute;\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #eee\r\n}\r\n\r\n.mat-tab-link {\r\n  color: black;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 65px;\r\n}\r\n\r\nmat-sidenav {\r\n  /* width: 15%; */\r\n  direction: rtl;\r\n  background-color: rgba(0, 0, 0, 0.45);\r\n\r\n}\r\n\r\nfa {\r\n  float: left;\r\n  padding: 1%;\r\n  color: orange;\r\n}\r\n\r\nmat-sidenav-content {\r\n}\r\n\r\nmat-list-item {\r\n  cursor: pointer;\r\n  direction: ltr;\r\n}\r\n\r\n.containers {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1999;\r\n}\r\n\r\n.containers > * {\r\n  width: 100%;\r\n}\r\n\r\nmat-chip.leftChips {\r\n  border-top-right-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #eee !important;\r\n  color: black !important;\r\n}\r\n\r\n.mat-standard-chip {\r\n  border-radius: 0px;\r\n}\r\n\r\nmat-chip.rightChips {\r\n  border-top-left-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #dcf8c6 !important;\r\n}\r\n\r\n.button {\r\n  direction: ltr !important;\r\n  overflow-y: auto;\r\n}\r\n\r\n.contactLabel {\r\n  /* padding: 1%; */\r\n  padding: 1%;\r\n}\r\n\r\n.label {\r\n  padding-left: 20px;\r\n  color: white;\r\n  position: absolute;\r\n  right: 20px;\r\n}\r\n\r\n.input {\r\n  /* min-width: 150px!important;\r\n  max-width: 500px!important; */\r\n  width: 92% !important;\r\n  border: 0;\r\n  padding: 10px;\r\n}\r\n\r\n.input-full-width {\r\n  width: 100% !important;\r\n}\r\n\r\n.leftChips {\r\n  direction: rtl;\r\n  padding: 0 10px;\r\n\r\n}\r\n\r\n.rightChips {\r\n  color: black !important;\r\n  padding: 0 10px;\r\n}\r\n\r\n.sendBotton {\r\n  width: 5% !important;\r\n  float: right;\r\n\r\n}\r\n\r\n.sidNavTitle {\r\n  background: orange;\r\n}\r\n\r\n.toggle {\r\n  color: black\r\n}\r\n\r\n.leftMenuButton {\r\n  position: absolute;\r\n  z-index: 19000;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n\r\n.position{\r\n  font-size: 12px;\r\n  color: yellow;\r\n  white-space: nowrap;\r\n}\r\n\r\n.containers{\r\n  background-image: url('comments-solid.png');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n  background-size: contain;\r\n}\r\n\r\ndiv .number-box{\r\n  position: absolute;\r\n  right: 2px;\r\n  top: 5px;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/messages/index/index.component.html":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/messages/index/index.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"example-container\" autosize hasBackdrop=\"true\">\r\n  <mat-sidenav opened=true position=\"end\" #drawer mode=\"over\">\r\n    <mat-list role=\"list\">\r\n      <mat-list-item class=\"sidNavTitle\">\r\n        <fa name=\"fas fa-align-justify\" size=\"1x\" (click)=\"drawer.toggle()\" class=\"toggle\"></fa>\r\n        <span class=\"label\">پیام ها</span>\r\n      </mat-list-item>\r\n      <div *ngFor=\"let orgForFight of orgForFightUsers\" routerLink=\"messanger/{{orgForFight.user.id}}\"\r\n           (click)=\"contactClick(orgForFight.user.id)\">\r\n        <mat-list-item class=\"messanger-users\" *ngIf=\"activeUserInfo.username !== orgForFight.user.username\">\r\n          <fa name=\"fa fa-user-circle-o\" class=\"contactLabel\"\r\n              [ngClass]=\"getUserStatus(orgForFight.user.id) ? 'text-success' : 'text-danger'\" size=\"1x\">\r\n\r\n          </fa>\r\n\r\n\r\n          <div *ngFor=\"let user of userStatusService.userStatus.value.message.newUsersMessages\">\r\n            <div class=\"number-box\"\r\n              *ngIf=\"user.id == orgForFight.user.id && user.number\">\r\n              <span [matBadge]=\"user.number\" matBadgeColor=\"warn\" matBadgeOverlap=\"false\"></span>\r\n              <!--{{user.number}}-->\r\n            </div>\r\n          </div>\r\n          <!-- &nbsp;&nbsp; -->\r\n          <span class=\"label\" *ngIf=\"orgForFight.user.lastname!=null\">\r\n            {{orgForFight.user.firstname}} {{orgForFight.user.lastname}}\r\n          </span>\r\n          <span class=\"label\" *ngIf=\"orgForFight.user.lastname==null\">\r\n            {{orgForFight.user.username}}\r\n          </span>\r\n          <br>\r\n          <span class=\"position\">\r\n            فرمانده:\r\n            {{orgForFight.orgForFight.unit.text}}-\r\n            {{orgForFight.orgForFight.unit.name}}\r\n          </span>\r\n\r\n\r\n          <mat-divider>\r\n          </mat-divider>\r\n        </mat-list-item>\r\n      </div>\r\n    </mat-list>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <fa name=\"fas fa-align-justify\" class=\"leftMenuButton\" size=\"1x\" (click)=\"drawer.toggle()\"></fa>\r\n    <div class=\"containers\" style=\"height: calc(100% - 30px);overflow-y: auto;\">\r\n      <router-outlet></router-outlet>\r\n    </div>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/messages/index/index.component.ts":
/*!****************************************************************!*\
  !*** ./src/mobile-app/pages/messages/index/index.component.ts ***!
  \****************************************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/local-storage/local-storage.service */ "./src/services/local-storage/local-storage.service.ts");
/* harmony import */ var _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/socket/socket.service */ "./src/services/socket/socket.service.ts");
/* harmony import */ var _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/messages/messages.service */ "./src/services/messages/messages.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_status_user_status_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../services/user-status/user-status.service */ "./src/services/user-status/user-status.service.ts");
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
    // private des: ReplaySubject<boolean> = new ReplaySubject(1);
    function IndexComponent(userService, localStorage, socketService, messageService, bottomSheet, route, userStatusService) {
        this.userService = userService;
        this.localStorage = localStorage;
        this.socketService = socketService;
        this.messageService = messageService;
        this.bottomSheet = bottomSheet;
        this.route = route;
        this.userStatusService = userStatusService;
        this.orgForFightUsers = [];
    }
    IndexComponent.prototype.ngOnInit = function () {
        this.activeUserInfo = this.userService.getUserInfo();
        this.getUsers();
        this.scrollToBottom();
        this.resetNumberOfNewMessages();
        // this.route.params.subscribe(
        //   (data) => {
        this.initNewMessages();
        //   }
        // );
    };
    IndexComponent.prototype.ngOnDestroy = function () {
        // this.socketService.socketEvent.unsubscribe();
        // this.messageService.newMessages.unsubscribe();
    };
    IndexComponent.prototype.initNewMessages = function () {
        this.newMessages = this.messageService.getSortNewMessages();
        console.log(this.newMessages);
    };
    IndexComponent.prototype.getUsers = function () {
        var _this = this;
        this.orgForFightUsers = this.userService.getOrgForFightUsers();
        this.userService.getSize().subscribe(function (size) {
            _this.orgForFightUsers.forEach(function (record) {
                size.forEach(function (s) {
                    if (s.name === record.orgForFight.unit.size) {
                        record.orgForFight.unit.text = s.translate + ' ';
                    }
                });
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
    IndexComponent.prototype.showUserPosition = function (id) {
        return this.userService.getUserPosition(id);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('scrollMe'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], IndexComponent.prototype, "myScrollContainer", void 0);
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/mobile-app/pages/messages/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/mobile-app/pages/messages/index/index.component.css")]
        }),
        __metadata("design:paramtypes", [_services_users_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"],
            _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
            _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"],
            _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__["MessagesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _services_user_status_user_status_service__WEBPACK_IMPORTED_MODULE_7__["UserStatusService"]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/messages/messages-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/messages/messages-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: MessagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesRoutingModule", function() { return MessagesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/messages/index/index.component.ts");
/* harmony import */ var _components_messanger_messenger_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/messanger/messenger.component */ "./src/components/messanger/messenger.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _index_index_component__WEBPACK_IMPORTED_MODULE_2__["IndexComponent"],
        children: [
            {
                path: 'messanger/:userId',
                component: _components_messanger_messenger_component__WEBPACK_IMPORTED_MODULE_3__["MessengerComponent"]
            }
        ]
    }
];
var MessagesRoutingModule = /** @class */ (function () {
    function MessagesRoutingModule() {
    }
    MessagesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MessagesRoutingModule);
    return MessagesRoutingModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/messages/messages.module.ts":
/*!**********************************************************!*\
  !*** ./src/mobile-app/pages/messages/messages.module.ts ***!
  \**********************************************************/
/*! exports provided: MessagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesModule", function() { return MessagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _messages_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./messages-routing.module */ "./src/mobile-app/pages/messages/messages-routing.module.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/messages/index/index.component.ts");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _components_messanger_messenger_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/messanger/messenger.component */ "./src/components/messanger/messenger.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/nav/nav.component */ "./src/components/nav/nav.component.ts");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../pipes/pipes.module */ "./src/pipes/pipes.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__["AngularFontAwesomeModule"],
                _messages_routing_module__WEBPACK_IMPORTED_MODULE_4__["MessagesRoutingModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_10__["PipesModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBadgeModule"]
            ],
            providers: [
                _services_users_users_service__WEBPACK_IMPORTED_MODULE_6__["UsersService"]
            ],
            entryComponents: [],
            declarations: [_index_index_component__WEBPACK_IMPORTED_MODULE_5__["IndexComponent"], _components_messanger_messenger_component__WEBPACK_IMPORTED_MODULE_7__["MessengerComponent"], _components_nav_nav_component__WEBPACK_IMPORTED_MODULE_9__["NavComponent"]]
        })
    ], MessagesModule);
    return MessagesModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-messages-messages-module.js.map