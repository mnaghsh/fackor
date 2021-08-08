import {Injectable} from '@angular/core';
import {ConfigService} from '../config.service';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthService} from "../auth/auth.service";
import {MissionService} from "../mission/mission.service";
import {Observable, Subject} from "rxjs/index";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  forms: any;
  public activeUser;
  public userMission;
  public userMissionId;
  public positionUsers = [];
  public userId;
  public localStorageSet = new Subject<any>();
  public orgForFightUsers = [];
  private usersDetails;

  constructor(private configService: ConfigService,
              private localStorage: LocalStorageService,
              private authService: AuthService,
              public http: HttpClient,
              private missionService: MissionService) {
  }

  public getSize() {
    return this.http.get('./assets/data/size.json');
  }

  public getUsers() {
    return this.configService.get('/security/users',
      {withCredentials: true});
  }

  public getOrgForFightUsers(): any {
    return this.localStorage.getJson('orgForFightUsers');
  }

  public getUserInfo(): any {
    return this.localStorage.getJson('userInfo');
  }

  public getMission(): any {
    return this.localStorage.getJson('userMission');
  }

  public getOrgForFight(): any {
    return this.localStorage.getJson('missionOrgForFight');
  }

  public translateOrgForFight(orgForFight) {
    let translate = new Subject<any>();
    let translatedOrgForFight = orgForFight;
    this.getSize().subscribe(
      (size: any) => {
        translatedOrgForFight.forEach(record => {
          size.forEach(s => {
            if (s.name === record.orgForFight.unit.size) {
              record.orgForFight.unit.text = s.translate + ' ';
            }
          });
        });
        translate.next(translatedOrgForFight);
      }, err => {
        console.log('خطا');
      }
    );
    return translate;
  }

  public getOrgForFightById(id) {
    let user;
    const orgForFightUsers: Array<any> = this.getOrgForFightUsers();
    orgForFightUsers.forEach(
      (orgForFightUser) => {
        if (orgForFightUser.user.id == id) {
          user = orgForFightUser;
        }
      }
    );
    return user;
  }

  public getUserPosition(userId) {
    const userDetails = this.getOrgForFightById(userId);
    return ' (' + 'فرمانده: ' + userDetails['orgForFight'].unit.text +
      ' - ' +
      userDetails['orgForFight'].unit.name + ') ';
  }

  public setOrgForFightUsers(orgForFight, user?) {
    this.positionUsers = [];
    this.initOrgForFightUsers(orgForFight, user);
  }

  public getPositionOrgForFight(id): Observable<any> {
    let gettingDone = new Subject<any>();
    this.missionService.getOrgForFightUser(id).subscribe(
      (position) => {
        this.positionUsers.push(position);
        gettingDone.next(position);
      }
    );
    return gettingDone;
  }

  public initOrgForFightUsers(orgForFight, user?) {
    orgForFight.forEach((record) => {
      if (record.children.length > 0) {
        this.initOrgForFightUsers(record.children, user);
      }
      this.getPositionOrgForFight(record.id).subscribe(
        (position) => {
          this.translateOrgForFight(this.positionUsers).subscribe(
            (data) => {
              this.localStorage.set('orgForFightUsers', JSON.stringify(data));
              this.setOldMissions();
            }
          );
        }
      );
    });
  }

  public userHasMission() {
    let mission;
    if (this.getMission() !== null) {
      mission = this.getMission();
      return mission.enable;
    } else {
      return false;
    }
  }

  public setInfo(user) {
    this.userId = undefined;
    this.authService.getUserInfo().subscribe(
      data => {
        this.localStorage.set('userInfo', JSON.stringify(data));
        this.userId = data['id'];
      },
      (error) => {
        if (error.status === 0) {
          this.setInfoOffline('userInfo');
          this.setInfoOffline('userMission');
          this.setInfoOffline('missionOrgForFight');
          this.setInfoOffline('orgForFightUsers');
          let that = this;
          that.localStorageSet.next();
        }
      },
      () => {
        this.setMission(user);
        // this.setOldMissions(user);
      }
    );
  }

  public setInfoOffline(info: string) {
    this.localStorage.set(info, JSON.stringify(this.getInfoOffline(info)));
  }

  public setMission(user) {
    this.missionService.getCurrentUserMission().subscribe(
      data => {
        this.localStorage.set('userMission', JSON.stringify(data[0]));
        this.setOrgForFight(user, data[0]['id']);
      },
      (error) => {
        if (error.status === 0) {
        }
      }
    );
  }

  public setOrgForFight(user, id) {
    this.missionService.getOrgForFightByMissionId(id).subscribe(
      data => {
        this.localStorage.set('missionOrgForFight', JSON.stringify(data));
        this.setOrgForFightUsers([data], user);
      },
      (error) => {
        if (error.status === 0) {
        }
      }
    );
  }

  public getInfoOffline(info: string) {
    let username = this.authService.getActiveUser();
    let oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
    for (let i = 0; i < oldMissions.length; i++) {
      if (oldMissions[i].username === username) {
        if (info === 'orgForFightUsers') {
          return oldMissions[i].orgForFightUsers;
        } else if (info === 'userMission') {
          return oldMissions[i].userMission;
        } else if (info === 'missionOrgForFight') {
          return oldMissions[i].missionOrgForFight;
        } else if (info === 'userInfo') {
          return oldMissions[i].userInfo;
        }
      }
    }
    return null;
  }

  public setOldMissions() {
    let s = new Subject<any>();
    let userName = this.authService.getActiveUser();
    let orgForFightUsers = this.getOrgForFightUsers();
    let userInfo = this.getUserInfo();
    let userMission = this.getMission();
    let missionOrgForFight = this.getOrgForFight();
    let oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
    if (!oldMissions) {
      oldMissions = [];
    }
    let isExist = false;

    for (let i = 0; i < oldMissions.length; i++) {
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
    let that = this;
    that.localStorageSet.next();
  }

  public hasOldMission() {
    let userName = this.authService.getActiveUser();
    let oldMissions = JSON.parse(this.localStorage.get('oldMissions'));
    for (let i = 0; i < oldMissions.length; i++) {
      if (oldMissions[i].username === userName
        && oldMissions[i].userMission !== null) {
        return true;
      }
    }
    return false;
  }

  public getMissionUsers(id) {
    return this.configService.get(`/mission/${id}/users`,
      {withCredentials: true});
  }

  public hasEnableMission() {
    return this.getMission() !== null;
  }

  public getRecentActivity(userId) {
    return this.configService.get(`/message/recentactivity/${userId}`,
      {withCredentials: true});
  }

  public setToLocalStorageGroupByUser(value, label: string) {

    let currentUserId: string = this.getUserInfo().id;
    let temp = JSON.parse(this.localStorage.get(label));
    if (!temp) {
      temp = [];
    }
    let isExist = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].currentUserId === currentUserId) {

        temp[i][label] = value;
        isExist = true;
      }
    }
    if (!isExist) {

      const mhd = {

        'currentUserId': currentUserId,
      }
      mhd[label] = value;
      temp.push(mhd);
    }
    this.localStorage.set(label, JSON.stringify(temp));
  }

  public setRowOfReportToLocalStorageGroupByUser(value, label: string, inputId) {

    let currentUserId: string = this.getUserInfo().id;
    let temp = JSON.parse(this.localStorage.get(label));
    if (!temp) {
      temp = [];
    }
    let isExist = false;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].currentUserId === currentUserId
        && temp[i].inputId === inputId) {

        temp[i][label] = value;
        isExist = true;
      }
    }
    if (!isExist) {

      const mhd = {
        'inputId': inputId,
        'currentUserId': currentUserId,
      }
      mhd[label] = value;
      temp.push(mhd);
    }
    this.localStorage.set(label, JSON.stringify(temp));
  }

  public getFromLocalStorageGroupByUser(label: string) {
    // ;
    let currentUserId = this.getUserInfo().id;
    let temp = JSON.parse(this.localStorage.get(label));
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].currentUserId === currentUserId) {
          return temp[i][label];
        }
      }
    }
    return null;
  }

  public getRowOfReportFromLocalStorageGroupByUser(label: string, inputId) {

    let currentUserId = this.getUserInfo().id;
    let temp = JSON.parse(this.localStorage.get(label));

    if (label == "sentReportRowList") {
      if (temp) {


        for (let i = 0; i < temp.length; i++) {
          let mhd = temp[i].inputId.inputId

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
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].currentUserId === currentUserId && temp[i].inputId === inputId) {
            console.log('tempi', temp[i][label]);
            return temp[i][label];
          }
        }
      }
    }
    return null;
  }


}
