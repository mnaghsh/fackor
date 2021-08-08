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
var news_service_1 = require("../../../../../services/news/news.service");
var material_1 = require("@angular/material");
var content_component_1 = require("../content/content.component");
var users_service_1 = require("../../../../../services/users/users.service");
var router_1 = require("@angular/router");
var collections_1 = require("@angular/cdk/collections");
var accessible_service_1 = require("src/services/accessible/accessible.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(newsService, myRoute, usersService, dialog, accessibleService) {
        this.newsService = newsService;
        this.myRoute = myRoute;
        this.usersService = usersService;
        this.dialog = dialog;
        this.accessibleService = accessibleService;
        this.selection = new collections_1.SelectionModel(true, []);
    }
    ListComponent.prototype.ngOnInit = function () {
        this.crudCreator = {};
        this.paginator._intl.itemsPerPageLabel = 'تعداد خبر در صفحه';
        this.paginator._intl.nextPageLabel = 'بعدی';
        this.paginator._intl.previousPageLabel = 'قبلی';
        this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
            return "";
        };
        this.activeUserId = this.usersService.getUserInfo().id;
        this.displayedColumns = this.columns.map(function (c) { return c.columnDef; });
        this.displayedColumns.splice(0, 0, 'select');
        this.dataSource = new material_1.MatTableDataSource(this.mailBoxList);
        this.dataSource.paginator = this.paginator;
        this.getNewsFilters('sourceNews');
        this.getNewsFilters('importantNews');
        this.getNewsFilters('newsTruth');
        this.getNewsFilters('urgentNews');
    };
    ListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ListComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ListComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        this.accessibleService.showConfirm().subscribe((function (data) {
            if (data == 1) {
                _this.selection.selected.forEach(function (row) {
                    if (_this.type == "drafts") {
                        _this.splice(row.id);
                    }
                    else {
                        //delete from server
                        _this.newsService.deleteList(row.id, _this.type).subscribe(function (data) {
                            _this.splice(row.id);
                        }, function (error) {
                            console.log('حذف انجام نشد');
                        });
                    }
                });
            }
        }));
    };
    ListComponent.prototype.splice = function (id) {
        for (var i = this.dataSource.data.length - 1; i >= 0; i--) {
            if (id == this.dataSource.data[i].id) {
                this.dataSource.data.splice(i, 1);
                this.paginator._changePageSize(this.paginator.pageSize);
                //delete from local storage
                this.newsService.deleteLocalList(this.dataSource.data, this.type);
            }
        }
    };
    ListComponent.prototype.getNewsFilters = function (label) {
        this.crudCreator[label] = this.newsService.getOfflineSources(label);
    };
    ListComponent.prototype.ngOnChanges = function () {
        if (this.dataSource) {
            this.dataSource.data = this.mailBoxList;
            this.dataSource.paginator = this.paginator;
        }
        //this.paginator._changePageSize(this.paginator.pageSize);
    };
    ListComponent.prototype.applyFilter = function (label, id) {
        this.dataSource.filterPredicate = function (row, filter) {
            if (filter == 'all')
                return true;
            return row[label].id == filter;
        };
        this.dataSource.filter = id;
    };
    ListComponent.prototype.applySearch = function (value) {
        this.dataSource.filterPredicate = function (row, filter) {
            if (row['subject'].indexOf(filter) >= 0 ||
                row['text'].indexOf(filter) >= 0 ||
                row['sender'].lastname.indexOf(filter) >= 0 ||
                row['sender'].firstname.indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = value.trim().toLowerCase();
    };
    ListComponent.prototype.showContent = function (row) {
        var _this = this;
        if (this.type === 'drafts') {
            this.myRoute.navigate(['news/compose', row.id]);
        }
        else {
            if (this.type == "inbox" && !row['seen_time']) {
                // debugger;
                this.newsService.seen(row.id).subscribe(function (data) {
                    row['seen_time'] = data['seen_time'];
                    _this.newsService.setMailbox(_this.dataSource.data, 'inbox');
                });
            }
            var dialogRef = this.dialog.open(content_component_1.ContentComponent, {
                data: {
                    newsData: row,
                    type: this.type
                },
                width: "90%",
                height: "80%"
            });
            dialogRef.afterClosed().subscribe(function (data) {
                if (data) {
                    row = data;
                }
            });
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "mailBoxList", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ListComponent.prototype, "columns", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [news_service_1.NewsService,
            router_1.Router,
            users_service_1.UsersService,
            material_1.MatDialog,
            accessible_service_1.AccessibleService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map