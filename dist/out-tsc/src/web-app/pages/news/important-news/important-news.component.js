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
var data_service_1 = require("../../../services/data/data.service");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var ImportantNewsComponent = /** @class */ (function () {
    function ImportantNewsComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['number', 'name', 'update'];
        this.dataService.getImportantNews().subscribe(function (data) {
            _this.importantNews = data;
            _this.importantNews = data;
            _this.dataSource = new material_1.MatTableDataSource(_this.importantNews);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    }
    ImportantNewsComponent.prototype.ngOnInit = function () {
        this.importantNews = {};
    };
    ImportantNewsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ImportantNewsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ImportantNewsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            // debugger;
            console.log('row', row);
            console.log('filter', filter);
            if (row.name.indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ImportantNewsComponent.prototype.addMission = function () {
        var _this = this;
        if (this.importantNews.name != null) {
            console.log(this.importantNews, 'this.importantNews');
            var mhd_1 = Object.assign({}, this.importantNews);
            this.dataService.putImportantNews(this.importantNews.name).subscribe(function (data) {
                debugger;
                _this.dataSource.data.unshift(mhd_1);
                _this.paginator._changePageSize(_this.paginator.pageSize);
                _this.importantNews.name = null;
            }, function (error) {
                _this.mhd = error.error.text;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای افزودن ماموریت باید همه مقادیر را تکمیل کنید";
        }
    };
    ImportantNewsComponent.prototype.editMission = function (e) {
        var _this = this;
        console.log('this.userModel', e);
        if (e.name != null && e.id != null) {
            this.importantNews.id = e.id;
            this.importantNews.name = e.name;
            console.log('model for edit', this.importantNews);
            debugger;
            this.dataService.editImportantNews(this.importantNews.id, this.importantNews.name).subscribe(function (data) {
                _this.paginator._changePageSize(_this.paginator.pageSize);
                _this.importantNews.name = null;
            }, function (error) {
                _this.mhd = error.error.text;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای ویرایش ماموریت باید همه مقادیر را تکمیل کنید";
        }
    };
    ImportantNewsComponent.prototype.rename = function (row) {
        row.edit = !row.edit;
        if (row.edit == false) {
            this.editMission(row);
        }
    };
    ImportantNewsComponent.prototype.cancel = function (row) {
        row.edit = !row.edit;
        this.mhd = "";
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ImportantNewsComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ImportantNewsComponent.prototype, "sort", void 0);
    ImportantNewsComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-important-news',
            templateUrl: './important-news.component.html',
            styleUrls: ['./important-news.component.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], ImportantNewsComponent);
    return ImportantNewsComponent;
}());
exports.ImportantNewsComponent = ImportantNewsComponent;
//# sourceMappingURL=important-news.component.js.map