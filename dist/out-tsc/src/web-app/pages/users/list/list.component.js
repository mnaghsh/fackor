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
var data_service_1 = require("src/web-app/services/data/data.service");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var accessible_service_1 = require("src/services/accessible/accessible.service");
var ListComponent = /** @class */ (function () {
    function ListComponent(dataService, accessibleService) {
        this.dataService = dataService;
        this.accessibleService = accessibleService;
        this.enable = true;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['select', 'number', 'username', 'firstname', 'lastname', 'password', 'enabled', 'update'];
        this.getUsers = function () {
            var _this = this;
            this.dataService.getUsers().subscribe(function (data) {
                _this.users = data.records;
                _this.userModel.roles = [{ id: 282 }];
                console.log('users', _this.users);
                _this.dataSource = new material_1.MatTableDataSource(_this.users);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            });
        };
    }
    ListComponent.prototype.ngOnInit = function () {
        this.userModel = {};
        this.getUsers();
        // ['0']['id']=282;
    };
    ListComponent.prototype.rename = function (row) {
        row.edit = !row.edit;
        if (row.edit == false) {
            this.editUser(row);
        }
    };
    ListComponent.prototype.cancel = function (row) {
        row.edit = !row.edit;
        this.mhd = "";
    };
    ListComponent.prototype.ngOnChanges = function () {
        console.log('kk');
    };
    ListComponent.prototype.addUser = function () {
        var _this = this;
        if (this.userModel.firstname != null && this.userModel.lastname != null && this.userModel.username != null) {
            console.log(this.userModel, 'this.userModel');
            this.userModel.enabled = true;
            console.log(this.userModel, 'this.userModel2');
            var mhd_1 = Object.assign({}, this.userModel);
            this.dataService.putUsers(this.userModel).subscribe(function (data) {
                _this.dataSource.data.unshift(mhd_1);
                _this.paginator._changePageSize(_this.paginator.pageSize);
                delete _this.userModel.enabled;
                _this.userModel.username = null;
                _this.userModel.firstname = null;
                _this.userModel.lastname = null;
                _this.userModel.password = null;
            }, function (error) {
                _this.mhd = error.error.text;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای افزودن کاربر باید همه مقادیر را تکمیل کنید";
        }
    };
    ListComponent.prototype.editUser = function (e) {
        var _this = this;
        console.log('this.userModel', e);
        if (e.firstname != null && e.lastname != null && e.username != null) {
            this.userModel.id = e.id;
            this.userModel.username = e.username;
            this.userModel.firstname = e.firstname;
            this.userModel.lastname = e.lastname;
            this.userModel.password = e.password;
            this.userModel.enabled = e.enabled;
            console.log('model for edit', this.userModel);
            this.dataService.editUsers(this.userModel).subscribe(function (data) {
                _this.paginator._changePageSize(_this.paginator.pageSize);
                // e.username = e.username;
                // e.lastname = e.lastname;
                // e.firstname = e.firstname;
                _this.userModel.username = null;
                _this.userModel.firstname = null;
                _this.userModel.lastname = null;
                _this.userModel.password = null;
                _this.userModel.enabled = null;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای ویرایش کاربر باید همه مقادیر را تکمیل کنید";
        }
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
    ListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            // debugger;
            console.log('row', row);
            console.log('filter', filter);
            if (row.username.indexOf(filter) >= 0 ||
                row.firstname.indexOf(filter) >= 0 ||
                row.lastname.indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    ListComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        // this.accessibleService.showConfirm().subscribe(
        // (data => {
        // if (data == 1) {
        this.selection.selected.forEach(function (row) {
            //Delete from server
            _this.dataService.deleteUsers(row.id).subscribe(function (data) {
                console.log('next');
                for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                    if (row.id == _this.dataSource.data[i].id) {
                        debugger;
                        _this.dataSource.data.splice(i, 1);
                    }
                }
                _this.paginator._changePageSize(_this.paginator.pageSize);
            }, function (error) {
                console.log(error);
                console.log('حذف انجام نشد');
            }, function () {
                console.log('comp');
            });
        });
        // }
        // })
        // );
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], ListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], ListComponent.prototype, "sort", void 0);
    ListComponent = __decorate([
        core_1.Component({
            selector: 'web-app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        }),
        __metadata("design:paramtypes", [data_service_1.DataService,
            accessible_service_1.AccessibleService])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map