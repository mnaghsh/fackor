import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ConfigService} from '../config.service';


@Injectable()
export class MissionService {

  constructor(private configService: ConfigService) {
  }

  public login() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      withCredentials: true
    };
    let body = 'username=' + 'm.khodadadi' + '&password=' + '123456';
    let url = '/security/login';

    return this.configService.post(
      url,
      body,
      httpOptions
    );
  }

  public getAllMissions() {
    return this.configService
      .get('/allmissions',
      {withCredentials: true});
  }
  public getMissions() {
    return this.configService
      .get('/missions',
      {withCredentials: true});
  }
  public putMissions(model) {
    return this.configService.post('/mission',
       model
    
          ,
      { withCredentials: true });
  }
  public editMissions(model) {
    return this.configService.put('/mission',
    model
      ,
      { withCredentials: true });
  }
  public deleteMissions(id) {
    return this.configService.delete('/mission/' + id,
      { withCredentials: true });
  }

  public logout() {
    return this.configService
      .get('/security/logout',
      {withCredentials: true});
  }

  public getMissionById(id) {
    return this.configService
      .get('/mission/' + id,
      {withCredentials: true});
  }

  public getOrgForFight(id) {
    return this.configService
      .get('/mission/' + id + '/orgForFight',
      {withCredentials: true});
  }

  public setOrgForFightUser(body) {
    let httpOptions = {
      withCredentials: true
    };
    
    let url = '/position';

    return this.configService.put(
      url,
      body,
      httpOptions
    );
  }
  public removeOrgForFightUser(id){
    return this.configService.delete('/position/' + id);
  }

  public getOrgForFightUser(orgForFightId) {
    return this.configService
      .get('/position/orgforfight-' + orgForFightId,
      {withCredentials: true});
  }


}
