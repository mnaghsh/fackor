import {Injectable} from '@angular/core';
import {ConfigService} from '../config.service';
import {Observable, Subject} from 'rxjs';
import {ComboItems, CrudModel} from '../../mobile-app/pages/news/components/crud/crud.model';
import {UsersService} from '../users/users.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {delay} from 'q';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  content;
  userMission: any;

  constructor(private configService: ConfigService,
              public localStorage: LocalStorageService,
              public usersService: UsersService) {
  }

  // getNewsById(id){
  //   var news: CrudModel;
  //   news = this.newsData[12];
  //   news.subject =
  //   return news;
  // }

  public getInbox(): Observable<any> {

    return this.configService.get('/news/inbox'
      , {withCredentials: true});
  }

  public getOutBox(): Observable<any> {

    return this.configService.get('/news/outbox'
      , {withCredentials: true});
  }

  public getNewsRecivers(): Observable<any> {
    this.userMission = this.usersService.getMission();

    return this.configService.get('/mission-' + this.userMission.id + '/news/users'
      , {withCredentials: true});
  }

  public getSourceNews(): Observable<any> {
    return this.configService.get('/sourcenews'
      , {withCredentials: true});
  }

  public getClassification(): Observable<any> {
    return this.configService.get('/archivenews'
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

  public getTruthNews(): Observable<any> {
    return this.configService.get('/newstruth'
      , {withCredentials: true});
  }

  public putNews(crudModel) {
    return this.configService.post('/news', crudModel
      // {
      //   "text": "اصغر",
      //   "subject": "تست",
      //   "mission": {
      //     "id": 297
      //   },
      //   "sourceNews": {
      //     "id": 1
      //   },
      //   "importantNews": {
      //     "id": 3
      //   },
      //   "urgentNews": {
      //     "id": 1
      //   },
      //   "receiver": [{ "id": 283 }, { "id": 304 }],
      //   "sender_time": 1527762287187
      // }
      ,
      {withCredentials: true});
  }

  public setMailbox(mailboxNews, label: string) {
    let currentUserId: string = this.usersService.getUserInfo().id;
    let mailbox = JSON.parse(this.localStorage.get(label));
    if (!mailbox) {
      mailbox = [];
    }
    let isExist = false;
    for (let i = 0; i < mailbox.length; i++) {
      if (mailbox[i].currentUserId === currentUserId) {
        mailbox[i][label + 'News'] = mailboxNews;
        isExist = true;
      }
    }
    if (!isExist) {
      const temp = {
        'currentUserId': currentUserId,
      }
      temp[label + 'News'] = mailboxNews
      mailbox.push(temp);
    }
    this.localStorage.set(label, JSON.stringify(mailbox));
  }

  public setCommonField(value, label: string) {
    let temp = JSON.parse(this.localStorage.get(label));
    if (!temp) {
      temp = [];
    }
    let isExist = false;
    for (let i = 0; i < temp.length; i++) {
      temp[i][label] = value;
      isExist = true;
    }
    if (!isExist) {
      const mhd = {};
      mhd[label] = value;
      temp.push(mhd);
    }
    this.localStorage.set(label, JSON.stringify(temp));
  }

  public getOfflineMailbox(label: string) {
    let currentUserId = this.usersService.getUserInfo().id;
    let mailBox = JSON.parse(this.localStorage.get(label));
    if (mailBox) {
      for (let i = 0; i < mailBox.length; i++) {
        if (mailBox[i].currentUserId === currentUserId) {
          return mailBox[i][label + 'News'];
        }
      }
    }
    return [];
  }

  public getOfflineSources(label: string) {

    let temp = JSON.parse(this.localStorage.get(label));
    if (temp) {
      for (let i = 0; i < temp.length; i++) {
        return temp[i][label];
      }
    }
    return null;
  }

  public getNewsDraftById(newsId) {
    let currentUserId = this.usersService.getUserInfo().id;
    let drafts = JSON.parse(this.localStorage.get('draft'));
    if (drafts) {
      for (let i = 0; i < drafts.length; i++) {
        if (drafts[i].currentUserId === currentUserId) {
          const userDrafts = drafts[i]['draftNews'];
          for (let j = 0; j < userDrafts.length; j++) {
            if (userDrafts[j].id == newsId) {
              return userDrafts[j];
            }
          }
        }
      }
    }
    return null;
  }

  public deleteLocalList(newList, label) {
    this.setMailbox(newList, label);
  }

  public saveDraft(crudModel) {
    var drafts = this.getOfflineMailbox('draft');
    if (!drafts) {
      this.setMailbox([], 'draft');
      drafts = this.getOfflineMailbox('draft');
    }

    if (crudModel.id) {
      for (let i = 0; i < drafts.length; i++) {
        if (drafts[i].id === crudModel.id) {
          drafts[i] = crudModel;
          break;
        }
      }
    } else {
      crudModel.id = Date.now();
      drafts.push(crudModel);
    }
    this.setMailbox(drafts, 'draft');
  }

  public seen(id) {
    return this.configService.get('/news/seen/' + id
      , {withCredentials: true});
  }

  public deleteList(id, label) {
    switch (label) {
      case 'inbox':
        return this.configService.get('/news/' + id + '/receiver_deleted',
          {withCredentials: true});

      case 'outbox':
        return this.configService.get('/news/' + id + '/sender_deleted',
          {withCredentials: true});

    }
  }

  public deleteOutbox(id) {
    return this.configService.get('/news/' + id + '/sender_deleted',
      {withCredentials: true});
  }

  public removeListRow(value, label) {
    let draft = this.getOfflineMailbox(label);
    for (let i = draft.length - 1; i >= 0; i--) {
      if (draft[i].id == value)
        draft.splice(i, 1);
      this.deleteLocalList(draft, label)
    }
  }

  public addListRow(value, label) {
    let mailBoxList = this.getOfflineMailbox(label);
    if (!mailBoxList) {
      this.setMailbox([], label);
      mailBoxList = this.getOfflineMailbox(label);
    }
    mailBoxList.splice(0, 0, value);
    this.setMailbox(mailBoxList, 'outbox');
  }

  public buildInbox(): Observable<any> {

    let mailBoxList = this.getOfflineMailbox('inbox');
    let sub = new Subject<any>();

    this.getInbox().subscribe(
      (data) => {
        mailBoxList = data.concat(mailBoxList);
        this.setMailbox(mailBoxList, 'inbox');
        sub.next();
      },
      (error) => {
        sub.next();
      });

    return sub;
  }


}
