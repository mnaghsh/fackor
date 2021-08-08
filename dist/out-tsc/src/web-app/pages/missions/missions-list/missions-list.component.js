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
var mission_service_1 = require("../../../services/mission/mission.service");
var material_1 = require("@angular/material");
var collections_1 = require("@angular/cdk/collections");
var MissionsListComponent = /** @class */ (function () {
    function MissionsListComponent(missionProvider) {
        this.missionProvider = missionProvider;
        this.selection = new collections_1.SelectionModel(true, []);
        this.displayedColumns = ['select', 'number', 'name', 'startTime', 'endTime', 'showMission', 'update'];
        this.getMissions();
    }
    MissionsListComponent.prototype.ngOnInit = function () {
        this.missionModel = {};
        this.missionModel.orgForFight = { id: 8 };
    };
    MissionsListComponent.prototype.getMissions = function () {
        var _this = this;
        this.missionProvider.getAllMissions()
            .subscribe(function (data) {
            _this.missions = data;
            _this.dataSource = new material_1.MatTableDataSource(_this.missions);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        }, function (error) {
            console.log(error);
        });
    };
    MissionsListComponent.prototype.addMission = function () {
        var _this = this;
        this.missionModel.orgForFight = { id: 8 };
        if (this.missionModel.name != null && this.missionModel.startTime != null && this.missionModel.endTime != null) {
            console.log(this.missionModel.startTime, 'this.missionModel');
            var mhd_1 = Object.assign({}, this.missionModel);
            this.missionProvider.putMissions(this.missionModel).subscribe(function (data) {
                _this.dataSource.data.unshift(mhd_1);
                _this.paginator._changePageSize(_this.paginator.pageSize);
                _this.missionModel.name = null;
                _this.missionModel.startTime = null;
                _this.missionModel.endTime = null;
            }, function (error) {
                _this.mhd = error.error.text;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای افزودن ماموریت باید همه مقادیر را تکمیل کنید";
        }
    };
    MissionsListComponent.prototype.editMission = function (e) {
        var _this = this;
        this.missionModel.orgForFight = { id: 8, class: "unit" };
        this.missionModel.enable = false;
        console.log('this.userModel', e);
        if (e.editedname != null && e.editedstartTime != null && e.editedendTime != null) {
            this.missionModel.id = e.id;
            this.missionModel.name = e.editedname;
            this.missionModel.startTime = e.editedstartTime;
            this.missionModel.endTime = e.editedendTime;
            // this.missionModel.enable = e.editedlastname;
            console.log('model for edit', this.missionModel);
            this.missionProvider.editMissions(this.missionModel).subscribe(function (data) {
                _this.paginator._changePageSize(_this.paginator.pageSize);
                e.name = e.editedname;
                e.startTime = e.editedstartTime;
                e.endTime = e.editedendTime;
                _this.missionModel.name = null;
                _this.missionModel.startTime = null;
                _this.missionModel.endTime = null;
            }, function (error) {
                _this.mhd = error.error.text;
            });
            this.mhd = "";
        }
        else {
            this.mhd = "برای ویرایش ماموریت باید همه مقادیر را تکمیل کنید";
        }
    };
    MissionsListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    MissionsListComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    MissionsListComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filterPredicate = function (row, filter) {
            // ;
            console.log('row', row);
            console.log('filter', filter);
            if (row.name.indexOf(filter) >= 0)
                return true;
            return false;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    };
    MissionsListComponent.prototype.deleteSelectedNews = function () {
        var _this = this;
        // this.accessibleService.showConfirm().subscribe(
        // (data => {
        // if (data == 1) {
        this.selection.selected.forEach(function (row) {
            //Delete from server
            _this.missionProvider.deleteMissions(row.id).subscribe(function (data) {
                console.log('next');
                for (var i = _this.dataSource.data.length - 1; i >= 0; i--) {
                    if (row.id == _this.dataSource.data[i].id) {
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
    MissionsListComponent.prototype.rename = function (row) {
        row.edit = !row.edit;
        if (row.edit == false) {
            this.editMission(row);
        }
    };
    MissionsListComponent.prototype.cancel = function (row) {
        row.edit = !row.edit;
        this.mhd = "";
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], MissionsListComponent.prototype, "paginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], MissionsListComponent.prototype, "sort", void 0);
    MissionsListComponent = __decorate([
        core_1.Component({
            selector: 'app-missions-list',
            templateUrl: './missions-list.component.html',
            styleUrls: ['./missions-list.component.css']
        }),
        __metadata("design:paramtypes", [mission_service_1.MissionService])
    ], MissionsListComponent);
    return MissionsListComponent;
}());
exports.MissionsListComponent = MissionsListComponent;
//# sourceMappingURL=missions-list.component.js.map