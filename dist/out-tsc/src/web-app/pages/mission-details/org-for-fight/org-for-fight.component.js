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
var router_1 = require("@angular/router");
var mission_service_1 = require("../../../services/mission/mission.service");
var angular_tree_component_1 = require("angular-tree-component");
var http_1 = require("@angular/common/http");
var data_service_1 = require("../../../services/data/data.service");
var forms_1 = require("@angular/forms");
var reports_service_1 = require("src/web-app/services/reports/reports.service");
var actionMapping = {
    mouse: {
        dblClick: angular_tree_component_1.TREE_ACTIONS.TOGGLE_EXPANDED,
    }
};
var MissionTreeComponent = /** @class */ (function () {
    function MissionTreeComponent(http, route, missionService, dataService, reportsService, fb) {
        this.http = http;
        this.route = route;
        this.missionService = missionService;
        this.dataService = dataService;
        this.reportsService = reportsService;
        this.fb = fb;
        this.activatedNodeText = 'انتخاب نشده';
        this.options = {
            rtl: true,
            isExpandedField: 'expanded',
            animateExpand: true,
            animateSpeed: 30,
            animateAcceleration: 1.2,
            useVirtualScroll: true,
            actionMapping: actionMapping
        };
        this.setUserToOrg = {
            "type": "commander",
            "user": {
                "id": null
            },
            "orgForFight": {
                "class": "unit",
                "id": null
            }
        };
        this.setUserForm = fb.group({
            username: ['', [forms_1.Validators.required]],
        });
    }
    MissionTreeComponent.prototype.onEvent = function ($event) {
        console.log($event);
    };
    MissionTreeComponent.prototype.initOrgForFight = function () {
        var _this = this;
        this.missionService.getOrgForFight(this.id).subscribe(function (data) {
            if (data) {
                _this.orgForFight = [data];
                // console.log(this.orgForFight)
                _this.initText(_this.orgForFight);
            }
        });
    };
    MissionTreeComponent.prototype.initText = function (data) {
        var _this = this;
        data.forEach(function (record) {
            console.log(record);
            var text = '';
            _this.size.forEach(function (size) {
                if (size.name === record.unit.size) {
                    text += size.translate + ' ';
                }
            });
            _this.type.forEach(function (type) {
                if (type.name === record.unit.type) {
                    text += type.translate + ' ';
                }
            });
            record.unit.text = text;
            if (record.children.length > 0) {
                _this.initText(record.children);
            }
        });
    };
    MissionTreeComponent.prototype.initOrgForFightNode = function (e) {
        this.activatedNode = e.node;
        this.activatedNodeText = e.node.data.unit.name;
        this.initOrgForFightNodeUser(this.activatedNode.data.id);
    };
    MissionTreeComponent.prototype.getUsersByMissionId = function () {
        var _this = this;
        this.reportsService.getUsersByMissionId(this.id).subscribe(function (data) {
            _this.missionUsers = data['records'];
        });
    };
    MissionTreeComponent.prototype.removeOrgForFightUser = function () {
        var _this = this;
        this.missionService.removeOrgForFightUser(this.orgForFightUsers[0].id).subscribe(function (data) {
            _this.orgForFightUsers = null;
        });
    };
    MissionTreeComponent.prototype.setOrgForFightUser = function () {
        var _this = this;
        if (this.setUserForm.status && this.activatedNode) {
            var node_1 = this.activatedNode.data;
            this.setUserToOrg.orgForFight.id = node_1.id;
            this.missionService
                .setOrgForFightUser(this.setUserToOrg).subscribe(function () {
                _this.setUserResult =
                    " \u06A9\u0627\u0631\u0628\u0631: " +
                        _this.setUserToOrg.user['firstname'] + ' ' + _this.setUserToOrg.user['lastname'] +
                        ' به گره با نام: ' +
                        node_1.unit.name +
                        ' انتساب داده شد.';
                _this.initOrgForFightNodeUser(node_1.id);
            }, function (e) {
                _this.setUserResult =
                    " \u06A9\u0627\u0631\u0628\u0631: " +
                        _this.setUserToOrg.user['firstname'] + ' ' + _this.setUserToOrg.user['lastname'] +
                        ' قبلا ' +
                        ' انتساب داده شده است.';
                console.log('خطا');
            });
        }
    };
    MissionTreeComponent.prototype.initOrgForFightNodeUser = function (orgForFightId) {
        var _this = this;
        this.missionService.getOrgForFightUser(orgForFightId)
            .subscribe(function (data) {
            _this.orgForFightUsers = [data];
            console.log(_this.orgForFightUsers);
        }, function () {
            _this.orgForFightUsers = null;
            // this.orgForFightUser = "کاربری انتساب داده نشده";
            console.log('"کاربری انتساب داده نشده"');
        });
    };
    MissionTreeComponent.prototype.expandTree = function () {
        var treeModel = this.treeComponent.treeModel;
        treeModel.expandAll();
    };
    MissionTreeComponent.prototype.collapseTree = function () {
        var treeModel = this.treeComponent.treeModel;
        treeModel.collapseAll();
    };
    MissionTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.route.parent.snapshot.paramMap.get('id');
        this.getUsersByMissionId();
        this.dataService.getType().subscribe(function (type) {
            _this.type = type;
            _this.dataService.getSize().subscribe(function (size) {
                _this.size = size;
                _this.initOrgForFight();
            }, function (err) {
                console.log('خطا');
            });
        }, function (err) {
            console.log('خطا');
        });
    };
    __decorate([
        core_1.ViewChild('tree'),
        __metadata("design:type", angular_tree_component_1.TreeComponent)
    ], MissionTreeComponent.prototype, "treeComponent", void 0);
    MissionTreeComponent = __decorate([
        core_1.Component({
            selector: 'app-mission-tree',
            templateUrl: './org-for-fight.component.html',
            styleUrls: ['./org-for-fight.component.css']
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            router_1.ActivatedRoute,
            mission_service_1.MissionService,
            data_service_1.DataService,
            reports_service_1.ReportsService,
            forms_1.FormBuilder])
    ], MissionTreeComponent);
    return MissionTreeComponent;
}());
exports.MissionTreeComponent = MissionTreeComponent;
//# sourceMappingURL=org-for-fight.component.js.map