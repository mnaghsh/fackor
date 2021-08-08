import {Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  username;

  constructor(private localStorage: LocalStorageService,
              private authService: AuthService) {
  }

  public setInfo(username) {
    this.username = username;
    this.setInfoOffline('messengerActivities');
    this.setInfoOffline('newsActivities');
    let that = this;
    // that.localStorageSet.next();
  }

  public setInfoOffline(info: string) {
    this.localStorage.setJson(info, this.getInfoFromOldActivities(info));
  }

  public getInfoFromOldActivities(info: string) {
    let oldActivities = JSON.parse(this.localStorage.get('oldActivities'));
    for (let i = 0; i < oldActivities.length; i++) {
      if (oldActivities[i].username === this.username) {
        if (info === 'messengerActivities') {
          return oldActivities[i].messengerActivities;
        } else if (info === 'newsActivities') {
          return oldActivities[i].newsActivities;
        }
      }
    }
    return null;
  }

  public setOldActivities() {
    let messengerActivities = this.getInfoOffline('messengerActivities');
    let newsActivities = this.getInfoOffline('newsActivities');
    let oldActivities = this.getInfoOffline('oldActivities');
    if (!oldActivities) {
      oldActivities = [];
    }
    let isExist = false;
    for (let i = 0; i < oldActivities.length; i++) {
      if (oldActivities[i].username === this.username) {
        oldActivities[i].newsActivities = newsActivities;
        oldActivities[i].messengerActivities = messengerActivities;
        isExist = true;
      }
    }
    if (!isExist) {
      oldActivities.push({
        'username': this.username,
        'newsActivities': newsActivities,
        'messengerActivities': messengerActivities
      });
    }
    this.localStorage.setJson('oldActivities', oldActivities);
  }

  public getInfoOffline(info): any {
    return this.localStorage.getJson(info);
  }
}
