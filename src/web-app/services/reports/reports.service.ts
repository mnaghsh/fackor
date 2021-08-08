import { Injectable } from '@angular/core';
import { ConfigService } from "../config.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public configService: ConfigService, public http: HttpClient) { }

  public getUsersByMissionId(mId) {
    return this.configService.get('/security/users',
      { withCredentials: true });
  }
  // public getUsersByMissionId(mId) {
  //   return this.configService.get('/mission/' + mId + '/users',
  //     { withCredentials: true });
  // }


  public getNewsByMissionId(params) {
    return this.configService.put('/searchnews',
      params, { withCredentials: true });
  }

  public getMessageByMissionId(params) {
    return this.configService.put('/searchmessage',
      params, { withCredentials: true });
  }

  public getReportByMissionId(params) {
    return this.configService.put('/searchformdata',
      params, { withCredentials: true });
  }

  public getFormsByMissionId() {
    return this.configService.get('/forms',
      { withCredentials: true });
  }
}
