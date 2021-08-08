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
var jalali_pipe_1 = require("src/web-app/pipes/jalali.pipe");
var OutBoxComponent = /** @class */ (function () {
    function OutBoxComponent(newsService) {
        this.newsService = newsService;
        this.outboxColumns = [
            {
                columnDef: 'id',
                label: 'ردیف',
                cell: function (row, index) { return index + 1; }
            },
            {
                columnDef: 'attachment',
                label: 'الصاق',
                cell: function (row) {
                    if (row.attachment != null)
                        return "<i class='fa fa-paperclip'></i>";
                }
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
            // {
            //   columnDef: 'receiver',
            //   label: 'گیرندگان',
            //   cell: (row) => { return row.userNews.seen_time + ' ' + row.userNews.receiver.lastname }
            // }
            // ,
            // {
            //   columnDef: 'receiver_time',
            //   label: 'زمان رسیدن به دست گیرنده',
            //   cell: (row) => {
            //     if (row.userNews.receiver_time != null)
            //       return new JalaliPipe().transform(row.userNews.receiver_time)
            //     return row.userNews.receiver_time
            //   }
            // }
            // ,
            // {
            //   columnDef: 'seen_time',
            //   label: ' زمان خواندن خبر ',
            //   cell: (row) => {
            //     if (row.userNews.seen_time != null)
            //       return new JalaliPipe().transform(row.userNews.seen_time)
            //     return row.userNews.seen_time
            //   }
            // }
        ];
        this.outBox();
    }
    OutBoxComponent.prototype.ngOnInit = function () {
    };
    OutBoxComponent.prototype.outBox = function () {
        var _this = this;
        this.newsService.getOutBox().subscribe(function (data) {
            _this.mailBoxList = data;
            _this.newsService.setMailbox(data, 'outbox');
            console.log('online', _this.mailBoxList);
        }, function (error) {
            _this.mailBoxList = _this.newsService.getOfflineMailbox('outbox');
            console.log('offline', _this.mailBoxList);
        });
    };
    OutBoxComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-out-box',
            templateUrl: './out-box.component.html',
            styleUrls: ['./out-box.component.css']
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService])
    ], OutBoxComponent);
    return OutBoxComponent;
}());
exports.OutBoxComponent = OutBoxComponent;
//# sourceMappingURL=out-box.component.js.map