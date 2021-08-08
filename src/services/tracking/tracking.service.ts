import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  moduleMap: Map<string, any>;
  canInitLayers = true;
  constructor(public configService: ConfigService) { }
  public getLiveTrack(crudModel) {
    console.log('saham')
    return this.configService.put('/lastuserposition',
      //  crudModel
      [{ "id": 305 },
      ]
      ,
      { withCredentials: true });
  }


  public getRefreshTime(user_id): Observable<any> {
    return this.configService.get('/position/user-'+ user_id
      , {withCredentials: true});
  }


  public updateRefreshTime(user_id,refreshTime): Observable<any> {
    return this.configService.get('/position/user-' + user_id + '/'+ refreshTime
      , {withCredentials: true});
  }
}
