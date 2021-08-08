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
var rxjs_1 = require("rxjs");
var users_service_1 = require("../users/users.service");
var local_storage_service_1 = require("../local-storage/local-storage.service");
var NewsService = /** @class */ (function () {
    function NewsService(configService, localStorage, usersService) {
        this.configService = configService;
        this.localStorage = localStorage;
        this.usersService = usersService;
    }
    // getNewsById(id){
    //   var news: CrudModel;
    //   news = this.newsData[12];
    //   news.subject =
    //   return news;
    // }
    NewsService.prototype.getInbox = function () {
        return this.configService.get('/news/inbox', { withCredentials: true });
    };
    NewsService.prototype.getOutBox = function () {
        return this.configService.get('/news/outbox', { withCredentials: true });
    };
    NewsService.prototype.getNewsRecivers = function () {
        this.userMission = this.usersService.getMission();
        return this.configService.get('/mission-' + this.userMission.id + '/news/users', { withCredentials: true });
    };
    NewsService.prototype.getSourceNews = function () {
        return this.configService.get('/sourcenews', { withCredentials: true });
    };
    NewsService.prototype.getUrgentNews = function () {
        return this.configService.get('/urgentnews', { withCredentials: true });
    };
    NewsService.prototype.getImportantNews = function () {
        return this.configService.get('/importantnews', { withCredentials: true });
    };
    NewsService.prototype.getTruthNews = function () {
        return this.configService.get('/newstruth', { withCredentials: true });
    };
    NewsService.prototype.putNews = function (crudModel) {
        return this.configService.put('/news', crudModel
        // {
        //   "text": "اصغر",
        //   "subject": "تست",
        //   "mission": {
        //     "id": 297
        //   },
        //   "sourceNews": {
        //     "id": 1
        //   },
        //   "importantNews": {
        //     "id": 3
        //   },
        //   "urgentNews": {
        //     "id": 1
        //   },
        //   "receiver": [{ "id": 283 }, { "id": 304 }],
        //   "sender_time": 1527762287187
        // }
        , { withCredentials: true });
    };
    NewsService.prototype.setMailbox = function (mailboxNews, label) {
        var currentUserId = this.usersService.getUserInfo().id;
        var mailbox = JSON.parse(this.localStorage.get(label));
        if (!mailbox) {
            mailbox = [];
        }
        var isExist = false;
        for (var i = 0; i < mailbox.length; i++) {
            if (mailbox[i].currentUserId === currentUserId) {
                mailbox[i][label + 'News'] = mailboxNews;
                isExist = true;
            }
        }
        if (!isExist) {
            var temp = {
                'currentUserId': currentUserId,
            };
            temp[label + 'News'] = mailboxNews;
            mailbox.push(temp);
        }
        this.localStorage.set(label, JSON.stringify(mailbox));
    };
    NewsService.prototype.setCommonField = function (value, label) {
        var currentUserId = this.usersService.getUserInfo().id;
        var temp = JSON.parse(this.localStorage.get(label));
        if (!temp) {
            temp = [];
        }
        var isExist = false;
        for (var i = 0; i < temp.length; i++) {
            temp[i][label] = value;
            isExist = true;
        }
        if (!isExist) {
            var mhd = {};
            mhd[label] = value;
            temp.push(mhd);
        }
        this.localStorage.set(label, JSON.stringify(temp));
    };
    NewsService.prototype.getOfflineMailbox = function (label) {
        var currentUserId = this.usersService.getUserInfo().id;
        var mailBox = JSON.parse(this.localStorage.get(label));
        if (mailBox) {
            for (var i = 0; i < mailBox.length; i++) {
                if (mailBox[i].currentUserId === currentUserId) {
                    return mailBox[i][label + 'News'];
                }
            }
        }
        return [];
    };
    NewsService.prototype.getOfflineSources = function (label) {
        var temp = JSON.parse(this.localStorage.get(label));
        if (temp) {
            for (var i = 0; i < temp.length; i++) {
                return temp[i][label];
            }
        }
        return null;
    };
    NewsService.prototype.getNewsDraftById = function (newsId) {
        var currentUserId = this.usersService.getUserInfo().id;
        var drafts = JSON.parse(this.localStorage.get('draft'));
        if (drafts) {
            for (var i = 0; i < drafts.length; i++) {
                if (drafts[i].currentUserId === currentUserId) {
                    var userDrafts = drafts[i]['draftNews'];
                    for (var j = 0; j < userDrafts.length; j++) {
                        if (userDrafts[j].id == newsId) {
                            return userDrafts[j];
                        }
                    }
                }
            }
        }
        return null;
    };
    NewsService.prototype.deleteLocalList = function (newList, label) {
        this.setMailbox(newList, label);
    };
    NewsService.prototype.saveDraft = function (crudModel) {
        var drafts = this.getOfflineMailbox('draft');
        if (!drafts) {
            this.setMailbox([], 'draft');
            drafts = this.getOfflineMailbox('draft');
        }
        if (crudModel.id) {
            for (var i = 0; i < drafts.length; i++) {
                if (drafts[i].id === crudModel.id) {
                    drafts[i] = crudModel;
                    break;
                }
            }
        }
        else {
            crudModel.id = Date.now();
            drafts.push(crudModel);
        }
        this.setMailbox(drafts, 'draft');
    };
    NewsService.prototype.seen = function (id) {
        return this.configService.get('/news/seen/' + id, { withCredentials: true });
    };
    NewsService.prototype.deleteList = function (id, label) {
        switch (label) {
            case 'inbox':
                return this.configService.get('/news/' + id + '/receiver_deleted', { withCredentials: true });
            case 'outbox':
                return this.configService.get('/news/' + id + '/sender_deleted', { withCredentials: true });
        }
    };
    NewsService.prototype.deleteOutbox = function (id) {
        return this.configService.get('/news/' + id + '/sender_deleted', { withCredentials: true });
    };
    NewsService.prototype.removeListRow = function (value, label) {
        var draft = this.getOfflineMailbox(label);
        for (var i = draft.length - 1; i >= 0; i--) {
            if (draft[i].id == value)
                draft.splice(i, 1);
            this.deleteLocalList(draft, label);
        }
    };
    NewsService.prototype.addListRow = function (value, label) {
        var mailBoxList = this.getOfflineMailbox(label);
        if (!mailBoxList) {
            this.setMailbox([], label);
            mailBoxList = this.getOfflineMailbox(label);
        }
        mailBoxList.splice(0, 0, value);
        this.setMailbox(mailBoxList, 'outbox');
    };
    NewsService.prototype.buildInbox = function () {
        var _this = this;
        var mailBoxList = this.getOfflineMailbox('inbox');
        var sub = new rxjs_1.Subject();
        this.getInbox().subscribe(function (data) {
            debugger;
            mailBoxList = data.concat(mailBoxList);
            _this.setMailbox(mailBoxList, 'inbox');
            sub.next();
        }, function (error) {
            sub.next();
        });
        return sub;
    };
    NewsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            local_storage_service_1.LocalStorageService,
            users_service_1.UsersService])
    ], NewsService);
    return NewsService;
}());
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map