import {Injectable} from '@angular/core';
import {ConfigService} from '../config.service';
import {UsersService} from '../users/users.service';
import {Observable, Subject} from 'rxjs';
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  forms: any;

  constructor(private configService: ConfigService,
              private userService: UsersService,
              private localStorage: LocalStorageService) {
  }

  public getForms() {
    return this.configService.get('/forms'
      , {withCredentials: true});
  }

  public getFormOrderById(id) {

    this.forms = this.userService.getFromLocalStorageGroupByUser('reportForms');
    for (let i = 0; i < this.forms.length; i++) {
      if (this.forms[i].id == id) {
        console.log(this.forms[i])
        return this.forms[i];
      }
    }

    return null;
  }

  public inboxReportUrl(inputId): Observable<any> {
    return this.configService.get('/formdata/' + inputId
      , {withCredentials: true});
  }

  // public buildInboxReport(inputId): Observable<any> {
  //   let reportRowList = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList',inputId);
  //   let sub = new Subject<any>();

  //   this.inboxReportUrl(inputId).subscribe(

  //     (data) => {
  //  
  //       if (reportRowList!=null)
  //         reportRowList = data.concat(reportRowList);
  //         else{
  //           reportRowList = data
  //         }
  //        this.userService.setRowOfReportToLocalStorageGroupByUser(reportRowList, 'reportRowList',inputId);

  //       sub.next();

  //     },
  //     (error) => {
  //       sub.next();
  //     });

  //   return sub;
  // }
  public buildInboxReport(inputId) {

    let reportRowList = this.userService.getRowOfReportFromLocalStorageGroupByUser('reportRowList', inputId);
    this.inboxReportUrl(inputId).subscribe(
      (data) => {

        if (reportRowList != null)
          reportRowList = data.concat(reportRowList);
        else {
          reportRowList = data
        }
        //this.userService.setRowOfReportToLocalStorageGroupByUser(reportRowList, 'reportRowList',inputId);
        console.log('reportRowList', reportRowList);
        return reportRowList;
      },
      (error) => {

        console.log('error', error);
      });
    return null;
  }

  public putNews(Model) {

    return this.configService.post('/formdata', Model
      ,
      {withCredentials: true});
  }

  public addListRow(data, label, inputId) {
    let temp = this.userService.getFromLocalStorageGroupByUser(label);

    if (!temp) {
      this.userService.setToLocalStorageGroupByUser([], label);
      temp = this.userService.getFromLocalStorageGroupByUser(label);
    }
    temp.splice(0, 0, data);
    this.userService.setToLocalStorageGroupByUser(temp, label);
  }

  public deleteList(id) {

    return this.configService.get('/formdata/delete-' + id,
      {withCredentials: true});

  }

  public deleteLocalList(value, label) {
    this.userService.setToLocalStorageGroupByUser(value, label);
  }

  public seen(id) {
    return this.configService.get('/formdata/' + id + '/seen'
      , {withCredentials: true});
  }

  public setReports(mailboxNews, label: string) {
    let currentUserId: string = this.userService.getUserInfo().id;
    let reports = JSON.parse(this.localStorage.get(label));
    if (!reports) {
      reports = [];
    }
    let isExist = false;
    for (let i = 0; i < reports.length; i++) {
      if (reports[i].currentUserId === currentUserId) {
        reports[i][label + 'News'] = mailboxNews;
        isExist = true;
      }
    }
    if (!isExist) {
      const temp = {
        'currentUserId': currentUserId,
      }
      temp[label + 'News'] = mailboxNews
      reports.push(temp);
    }
    this.localStorage.set(label, JSON.stringify(reports));
  }

  getReport(id) {
    return this.configService.get('/formdata/outbox-' + id,
      {withCredentials: true});
  }

}
