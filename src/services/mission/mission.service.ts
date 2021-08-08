import {Injectable} from '@angular/core';
import {ConfigService} from "../config.service";
import {HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  public hasAvticeMission = {
    status: true,
    message: ''
  }

  constructor(private configService: ConfigService) {
  }


  public login() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
    let body = 'username=' + 'admin' + '&password=' + '123456';
    let url = '/security/login';

    return this.configService.post(
      url,
      body,
      httpOptions
    );
  }

  public getMissions() {
    return this.configService
      .get('/missions');
  }

  public logout() {
    return this.configService
      .get('/security/logout',
        {withCredentials: true});
  }

  public getCurrentUserMission() {
    return this.configService
    // .get('/mission/' + id,
      .get('/missions');
  }

  public getOrgForFightByMissionId(id) {
    return this.configService
      .get('/mission/' + id + '/orgForFight',
        {withCredentials: true});
  }

  public getOrgForFightUser(orgForFightId) {
    return this.configService
      .get('/position/orgforfight-' + orgForFightId,
        {withCredentials: true});
  }

  public getUsersByMissionId(id) {
    return this.configService
      .get('/mission/' + id + '/users',
        {withCredentials: true});
  }


}
