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
var local_storage_service_1 = require("../local-storage/local-storage.service");
var auth_service_1 = require("../auth/auth.service");
var mission_service_1 = require("../mission/mission.service");
var index_1 = require("rxjs/index");
var http_1 = require("@angular/common/http");
var UsersService = /** @class */ (function () {
    function UsersService(configService, localStorage, authService, http, missionService) {
        this.configService = configService;
        this.localStorage = localStorage;
        this.authService = authService;
        this.http = http;
        this.missionService = missionService;
        this.positionUsers = [];
        this.localStorageSet = new index_1.Subject();
        this.orgForFightUsers = [];
    }
    UsersService.prototype.getSize = function () {
        return this.http.get('./assets/data/size.json');
    };
    UsersService.prototype.getUsers = function () {
        return this.configService.get('/security/users', { withCredentials: true });
    };
    UsersService.prototype.getOrgForFightUsers = function () {
        return this.localStorage.getJson('orgForFightUsers');
    };
    UsersService.prototype.getUserInfo = function () {
        return this.localStorage.getJson('userInfo');
    };
    UsersService.prototype.getMission = function () {
        return this.localStorage.getJson('userMission');
    };
    UsersService.prototype.getOrgForFight = function () {
        return this.localStorage.getJson('missionOrgForFight');
    };
    UsersService.prototype.setOrgForFightUsers = function (orgForFight, user) {
        this.positionUsers = [];
        this.initOrgForFightUsers(orgForFight, user);
    };
    UsersService.prototype.getPositionOrgForFight = function (id) {
        var _this = this;
        var gettingDone = new index_1.Subject();
        this.missionService.getOrgForFightUser(id).subscribe(function (position) {
            _this.positionUsers.push(position);
            gettingDone.next(position);
        });
        return gettingDone;
    };
    UsersService.prototype.initOrgForFightUsers = function (orgForFight, user) {
        var _this = this;
        orgForFight.forEach(function (record) {
            if (record.children.length > 0) {
                _this.initOrgForFightUsers(record.children, user);
            }
            _this.getPositionOrgForFight(record.id).subscribe(function (position) {
                _this.localStorage.set('orgForFightUsers', JSON.stringify(_this.positionUsers));
                _this.setOldMissions();
            });
        });
    };
    UsersService.prototype.userHasMission = function () {
        var mission;
        if (this.getMission() !== null) {
            mission = this.getMission();
            return mission.enable;
        }
        else {
            return false;
        }
    };
    UsersService.prototype.setInfo = function (user) {
        var _this = this;
        this.userId = undefined;
        this.authService.getUserInfo().subscribe(function (data) {
            _this.localStorage.set('userInfo', JSON.stringify(data));
            _this.userId = data['id'];
        }, function (error) {
            if (error.status === 0) {
                _this.setInfoOffline('userInfo');
                _this.setInfoOffline('userMission');
                _this.setInfoOffline('missionOrgForFight');
                _this.setInfoOffline('orgForFightUsers');
                var that = _this;
                that.localStorageSet.next();
            }
        }, function () {
            _this.setMission(user);
            // this.setOldMissions(user);
        });
    };
    UsersService.prototype.setInfoOffline = function (info) {
        this.localStorage.set(info, JSON.stringify(this.getInfoOffline(info)));
    };
    UsersService.prototype.setMission = function (user) {
        var _this = this;
        this.missionService.getCurrentUserMission().subscribe(function (data) {
            _this.localStorage.set('userMission', JSON.stringify(data[0]));
            _this.setOrgForFight(user, data[0]['id']);
        }, function (error) {
            if (error.status === 0) {
            }
        });
    };
    UsersService.prototype.setOrgForFight = function (user, id) {
        var _this = this;
        this.missionService.getOrgForFightByMissionId(id).subscribe(function (data) {
            _this.localStorage.set('missionOrgForFight', JSON.stringify(data));
            _this.setOrgForFightUsers([data], user);
        }, function (error) {
            if (error.status === 0) {
            }
        });
    };
    UsersService.prototype.getInfoOffline = function (info) {
        var username = this.authService.getActiveUser();
        var oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
        for (var i = 0; i < oldMissions.length; i++) {
            if (oldMissions[i].username === username) {
                if (info === 'orgForFightUsers') {
                    return oldMissions[i].orgForFightUsers;
                }
                else if (info === 'userMission') {
                    return oldMissions[i].userMission;
                }
                else if (info === 'missionOrgForFight') {
                    return oldMissions[i].missionOrgForFight;
                }
                else if (info === 'userInfo') {
                    return oldMissions[i].userInfo;
                }
            }
        }
        return null;
    };
    UsersService.prototype.setOldMissions = function () {
        var s = new index_1.Subject();
        var userName = this.authService.getActiveUser();
        var orgForFightUsers = this.getOrgForFightUsers();
        var userInfo = this.getUserInfo();
        var userMission = this.getMission();
        var missionOrgForFight = this.getOrgForFight();
        var oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
        if (!oldMissions) {
            oldMissions = [];
        }
        var isExist = false;
        for (var i = 0; i < oldMissions.length; i++) {
            if (oldMissions[i].username === userName) {
                oldMissions[i].userInfo = userInfo;
                oldMissions[i].userMission = userMission;
                oldMissions[i].userOrgForFight = missionOrgForFight;
                oldMissions[i].orgForFightUsers = orgForFightUsers;
                isExist = true;
            }
        }
        if (!isExist) {
            oldMissions.push({
                'username': userName,
                'userInfo': userInfo,
                'userMission': userMission,
                'missionOrgForFight': missionOrgForFight,
                'orgForFightUsers': orgForFightUsers
            });
        }
        this.localStorage.set('oldMissions', JSON.stringify(oldMissions));
        var that = this;
        that.localStorageSet.next();
    };
    UsersService.prototype.hasOldMission = function () {
        var userName = this.authService.getActiveUser();
        var oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
        for (var i = 0; i < oldMissions.length; i++) {
            if (oldMissions[i].username === userName
                && oldMissions[i].userMission !== null) {
                return true;
            }
        }
        return false;
    };
    UsersService.prototype.getMissionUsers = function (id) {
        return this.configService.get("/mission/" + id + "/users", { withCredentials: true });
    };
    UsersService.prototype.hasEnableMission = function () {
        return this.getMission() !== null;
    };
    UsersService.prototype.getRecentActivity = function (userId) {
        return this.configService.get("/message/recentactivity/" + userId, { withCredentials: true });
    };
    UsersService.prototype.setToLocalStorageGroupByUser = function (value, label) {
        var currentUserId = this.getUserInfo().id;
        var temp = JSON.parse(this.localStorage.get(label));
        if (!temp) {
            temp = [];
        }
        var isExist = false;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].currentUserId === currentUserId) {
                temp[i][label] = value;
                isExist = true;
            }
        }
        if (!isExist) {
            var mhd = {
                'currentUserId': currentUserId,
            };
            mhd[label] = value;
            temp.push(mhd);
        }
        this.localStorage.set(label, JSON.stringify(temp));
    };
    UsersService.prototype.setRowOfReportToLocalStorageGroupByUser = function (value, label, inputId) {
        var currentUserId = this.getUserInfo().id;
        var temp = JSON.parse(this.localStorage.get(label));
        if (!temp) {
            temp = [];
        }
        var isExist = false;
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].currentUserId === currentUserId
                && temp[i].inputId === inputId) {
                temp[i][label] = value;
                isExist = true;
            }
        }
        if (!isExist) {
            var mhd = {
                'inputId': inputId,
                'currentUserId': currentUserId,
            };
            mhd[label] = value;
            temp.push(mhd);
        }
        this.localStorage.set(label, JSON.stringify(temp));
    };
    UsersService.prototype.getFromLocalStorageGroupByUser = function (label) {
        // debugger;
        var currentUserId = this.getUserInfo().id;
        var temp = JSON.parse(this.localStorage.get(label));
        if (temp) {
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].currentUserId === currentUserId) {
                    return temp[i][label];
                }
            }
        }
        return null;
    };
    UsersService.prototype.getRowOfReportFromLocalStorageGroupByUser = function (label, inputId) {
        var currentUserId = this.getUserInfo().id;
        var temp = JSON.parse(this.localStorage.get(label));
        if (label == "sentReportRowList") {
            if (temp) {
                for (var i = 0; i < temp.length; i++) {
                    var mhd = temp[i].inputId.inputId;
                    if (temp[i].currentUserId === currentUserId) {
                        console.log('tempi', temp[i][label]);
                        return temp[i][label];
                    }
                }
            }
        }
        else {
            if (temp) {
                console.log('temp2', temp);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].currentUserId === currentUserId && temp[i].inputId === inputId) {
                        console.log('tempi', temp[i][label]);
                        return temp[i][label];
                    }
                }
            }
        }
        return null;
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [config_service_1.ConfigService,
            local_storage_service_1.LocalStorageService,
            auth_service_1.AuthService,
            http_1.HttpClient,
            mission_service_1.MissionService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map