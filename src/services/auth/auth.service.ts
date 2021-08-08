import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from '../config.service';
import {HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  constructor(private myRoute: Router,
              private localStorage: LocalStorageService,
              private configService: ConfigService) {
  }

  public activeUser;

  public setLoginEntryItems(loginValues) {

    let oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
    if (!oldUsers) {
      oldUsers = [];
    }
    let isExist = false;
    for (let i = 0; i < oldUsers.length; i++) {
      if (oldUsers[i].username === loginValues.username) {
        oldUsers[i].password = loginValues.password;
        isExist = true;
      }
    }
    if (!isExist) {
      oldUsers.push({
        'username': loginValues.username,
        'password': loginValues.password
      });
    }

    this.localStorage.set('oldUsers', JSON.stringify(oldUsers));
  }

  public checkLoginEntryItems(loginValues): Object {
    let oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
    for (let i = 0; i < oldUsers.length; i++) {
      if (oldUsers[i].username === loginValues.username
        && oldUsers[i].password === loginValues.password) {
        return true;
      }
    }
    return false;
  }

  public refreshToken(){
    return this.configService.post('/auth/refresh', null);
  }

  public login(username: string, password: string) {

    let body = {'username': username, 'password': password}
    let url = '/users';

    return this.configService.post(
      url,
      body
    );
  }

  public autoLogin() {
    let oldUsers = JSON.parse(this.localStorage.get('oldUsers'));
    let activeUser = this.getActiveUser();
    for (let i = 0; i < oldUsers.length; i++) {
      if (oldUsers[i].username === activeUser) {
        return this.login(oldUsers[i].username, oldUsers[i].password);
      }
    }
  }

  public logout() {
    return this.configService.get('/security/logout',
      {withCredentials: true});
  }

  public getUserInfo() {
    return this.configService.get('/api/whoami',
      {withCredentials: true});
  }

  public setActiveUser(username: string) {
    this.localStorage.set('activeUser', username);
    this.activeUser = username;
  }

  public removeActiveUserData() {
    this.localStorage.remove('activeUser');
    this.localStorage.remove('userMission');
    this.localStorage.remove('userInfo');
    this.localStorage.remove('missionOrgForFight');
    this.localStorage.remove('orgForFightUsers');
  }

  public getActiveUser(): string {
    return this.localStorage.get('activeUser');
  }

  public isLoggednIn() {
    return this.getActiveUser() !== null;
  }

  public getHashCode(str: string): Number {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }

}
