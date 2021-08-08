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
var users_service_1 = require("src/services/users/users.service");
var news_service_1 = require("src/services/news/news.service");
var jalali_pipe_1 = require("src/web-app/pipes/jalali.pipe");
var DraftComponent = /** @class */ (function () {
    function DraftComponent(newsService, usersService) {
        this.newsService = newsService;
        this.usersService = usersService;
        this.draftColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) { return index + 1; }
            },
            {
                columnDef: 'sender_time',
                label: 'آخرین ویرایش',
                cell: function (row) { return new jalali_pipe_1.JalaliPipe().transform(row.sender_time); }
            },
            {
                columnDef: 'subject',
                label: 'موضوع',
                cell: function (row) { return row.subject; }
            }
        ];
    }
    DraftComponent.prototype.ngOnInit = function () {
        this.draft();
    };
    DraftComponent.prototype.draft = function () {
        this.mailBoxList = this.newsService.getOfflineMailbox('draft');
    };
    DraftComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-draft',
            templateUrl: './draft.component.html',
            styleUrls: ['./draft.component.css']
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService,
            users_service_1.UsersService])
    ], DraftComponent);
    return DraftComponent;
}());
exports.DraftComponent = DraftComponent;
//# sourceMappingURL=draft.component.js.map