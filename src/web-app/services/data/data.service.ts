import {Injectable} from '@angular/core';
import {ConfigService} from "../config.service";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public configService: ConfigService, public http: HttpClient) {
  }

  public getType() {
    return this.http.get('./assets/data/type.json');
  }

  public getSize() {
    return this.http.get('./assets/data/size.json');
  }

  public getUsers() {
    return this.configService.get('/security/users',
      {withCredentials: true});
  }

  public getSourceNews(): Observable<any> {
    return this.configService.get('/sourcenews'
      , {withCredentials: true});
  }

  public getUrgentNews(): Observable<any> {
    return this.configService.get('/urgentnews'
      , {withCredentials: true});
  }

  public getImportantNews(): Observable<any> {
    return this.configService.get('/importantnews'
      , {withCredentials: true});
  }

  public getArchiveNews(): Observable<any> {
    return this.configService.get('/archivenews'
      , {withCredentials: true});
  }

  public getTruthNews(): Observable<any> {
    return this.configService.get('/newstruth'
      , {withCredentials: true});
  }

  public putUsers(model) {
    return this.configService.put('/security/users',
      model
      //  {
      // "id":20386,
      // "firstname":"sample",
      // "lastname":"نقش",
      // "password":"1234",
      // "roles":[{"id":282}],
      // "username":"sahani"

      // }
      ,
      {withCredentials: true});
  }

  public editUsers(model) {
    return this.configService.put('/security/users/update',
      model
      ,
      {withCredentials: true});
  }

  public deleteUsers(id) {
    return this.configService.delete('/security/users-' + id,
      {withCredentials: true});
  }

  public editImportantNews(id, name): Observable<any> {

    return this.configService.put('/importantnewsEdit',

      {
        "id": id,
        "name": name,
      },
      {withCredentials: true});
  }

  public putImportantNews(name) {
    return this.configService.put('/importantnews',
      {
        "name": name,
      },
      {withCredentials: true});
  }

  public putArchiveNews(name) {
    return this.configService.put('/archivenews',
      {
        "name": name,
      },
      {withCredentials: true});
  }

  public putFieldNews(fieldUrl, name) {
    return this.configService.put('/' + fieldUrl,
      {
        "name": name,
      },
      {withCredentials: true});
  }

  public editTruthNews(id, name): Observable<any> {
    return this.configService.put('/truthnewsEdit',
      {
        "id": id,
        "name": name,
      },
      {withCredentials: true});
  }

  public newsFieldEdit(url, id, name): Observable<any> {
    return this.configService.put('/' + url,
      {
        "id": id,
        "name": name,
      },
      {withCredentials: true});
  }

  public putTruthNews(name) {
    return this.configService.put('/truthnews',
      {
        "name": name,
      },
      {withCredentials: true});
  }

  public editSourceNews(id, name): Observable<any> {
    return this.configService.put('/sourcenewsEdit',
      {
        "id": id,
        "name": name,
      },
      {withCredentials: true});
  }

  public putSourceNews(name) {
    return this.configService.put('/sourcenews',
      {
        "name": name,
      },
      {withCredentials: true});
  }
}
