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
var news_service_1 = require("../../../../services/news/news.service");
var users_service_1 = require("../../../../services/users/users.service");
var socket_service_1 = require("src/services/socket/socket.service");
var jalali_pipe_1 = require("../../../../web-app/pipes/jalali.pipe");
var InboxComponent = /** @class */ (function () {
    function InboxComponent(newsService, usersService, socket) {
        this.newsService = newsService;
        this.usersService = usersService;
        this.socket = socket;
        this.inboxColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) { return index + 1; }
            },
            {
                columnDef: 'sender',
                label: 'فرستنده',
                cell: function (row) { return row.sender.firstname + ' ' + row.sender.lastname; }
            },
            {
                columnDef: 'sender_time',
                label: 'تاریخ',
                cell: function (row) { return new jalali_pipe_1.JalaliPipe().transform(row.sender_time); }
            },
            {
                columnDef: 'subject',
                label: 'موضوع',
                cell: function (row) { return row.subject; }
            },
            {
                columnDef: 'details',
                label: 'جزئیات',
                cell: function (row) { return "<h3>...</h3>"; }
            }
        ];
    }
    InboxComponent.prototype.ngOnInit = function () {
        this.activeUserId = this.usersService.getUserInfo().id;
        this.inbox();
        this.watchNewsSocket();
    };
    InboxComponent.prototype.watchNewsSocket = function () {
        var _this = this;
        this.socket.socketEvent.subscribe(function (event) {
            console.log('event', event.data);
            var x = event.data.split("|");
            var receiver = x[1];
            if (x[3] && x[3].indexOf('news') >= 0) {
                _this.inbox();
            }
        });
    };
    InboxComponent.prototype.inbox = function () {
        var _this = this;
        debugger;
        // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        this.newsService.buildInbox().subscribe(function (data) {
            _this.mailBoxList = _this.newsService.getOfflineMailbox('inbox');
        });
        // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        // this.newsService.getInbox().subscribe(
        //   (data) => {
        //     // debugger;
        //     // data.push(this.mailBoxList)
        //     this.mailBoxList = data.concat(this.mailBoxList);
        //     this.newsService.setMailbox(this.mailBoxList, 'inbox');
        //   },
        //   (error) => {
        //     this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
        //     // console.log('offline', this.mailBoxList);
        //   });
    };
    InboxComponent = __decorate([
        core_1.Component({
            selector: 'app-inbox',
            templateUrl: './inbox.component.html',
            styleUrls: ['./inbox.component.css']
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService,
            users_service_1.UsersService,
            socket_service_1.SocketService])
    ], InboxComponent);
    return InboxComponent;
}());
exports.InboxComponent = InboxComponent;
//# sourceMappingURL=inbox.component.js.map