import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";
import {LocalStorageService} from "../../../../services/local-storage/local-storage.service";
import {MissionService} from "../../../../services/mission/mission.service";
import {ConfigService} from "../../../../services/config.service";
import {Observable} from "rxjs/internal/Observable";
import {AuthService} from "../../../../services/auth/auth.service";
import {Subject} from "rxjs/internal/Subject";
import {DialogComponent} from "../../../../components/dialog/dialog.component";
import {MessagesService} from "../../../../services/messages/messages.service";
import {any} from "codelyzer/util/function";
import {NewsService} from "../../../../services/news/news.service";
import {ReportsService} from "../../../../services/reports/reports.service";
import {AccessibleService} from "../../../../services/accessible/accessible.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'mobile-app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  currentUser: any;
  resultMessage: string;
  orgForFightUsers;
  selectedUsers = new FormControl();
  newsOptions = [
    {id: 1, label: 'اجزای ایجاد'},
    {id: 2, label: 'صندوق ورودی'}
  ];
  selectedNewsOptions = new FormControl();

  constructor(private usersService: UsersService,
              private localStorageService: LocalStorageService,
              private missionService: MissionService,
              private configService: ConfigService,
              private authService: AuthService,
              private messageService: MessagesService,
              private newsService: NewsService,
              private reportsService: ReportsService,
              private accessibleService: AccessibleService) {
  }

  ngOnInit() {
    this.currentUser = this.usersService.getUserInfo();
    this.initUsers();
  }

  initUsers() {
    this.orgForFightUsers = this.usersService.getOrgForFightUsers();
  }

  updateDialog(element) {
      this.accessibleService.showConfirm(" آیا تمایل به بروزرسانی " + element + " دارید؟ ").subscribe(
        (data) => {
          if (data === 1) {
            switch (element) {
              case 'کاربران':
                this.updateOrgForFightUsers();
                break;
              case 'عملیات':
                this.updateMission();
                break;
              case 'پیام ها':
                this.updateUsersMessages();
                break;
              case 'خبر':
                this.updateNews();
                break;
              case 'فرم های گزارش':
                this.updateReportForms();
                break;
            }
          }
        }
      );
  }

  updateMission() {
    this.updateInfo(this.missionService.getCurrentUserMission(), 'userMission', true);
  }

  updateUserInfo() {
    this.updateInfo(this.authService.getUserInfo(), 'userInfo');
  }

  updateOrgForFightUsers() {
    this.updateInfo(this.missionService.getOrgForFightByMissionId(297), 'missionOrgForFight').subscribe(
      (data) => {
        this.usersService.setOrgForFightUsers([data], this.currentUser.username);
        this.usersService.localStorageSet.subscribe(
          () => {
            this.initUsers();
          }
        );
      }
    );
  }

  updateUsersMessages() {
    let users: any = this.selectedUsers.value;
    for (let index in users) {
      this.updateMessages(String(users[index]));
    }
  }

  updateNews() {
    console.log(this.selectedNewsOptions.value);
    const selectedNewsOptions: any = this.selectedNewsOptions.value;
    for (let index in selectedNewsOptions) {
      console.log(selectedNewsOptions[index])
      switch (selectedNewsOptions[index]) {
        case 1:
          this.updateSourceNews();
          this.updateImportantNews();
          this.updateNewsReceivers();
          this.updateClassification();
          this.updateUrgentNews();
          break;
        case 2:
          break;

      }
    }
  }

  updateMessages(id: string) {
    let messages = [];
    this.messageService.setOldMessages(id, messages);
    this.messageService.getAllMessagesOfContact(id).subscribe(
      (data: any) => {
        const that = this;
        data.forEach(
          (message) => {
            if (message.seen_time || message.receiver.id == id)
              messages.push(this.localStorageStandardMessage(message));
          }
        );
        if (this.messageService.getMessagesOfUserOffline(id).length > 0) {
          this.updateMessages(id);
        } else {
          that.messageService.setOldMessages(id, messages);
        }
      }
    );
  }

  updateSourceNews() {
    this.updateNewsInfo(this.newsService.getSourceNews(), 'sourceNews');
  }

  updateImportantNews() {
    this.updateNewsInfo(this.newsService.getImportantNews(), 'importantNews');
  }

  updateClassification() {
    this.updateNewsInfo(this.newsService.getClassification(), 'archiveNews');
  }

  updateUrgentNews() {
    this.updateNewsInfo(this.newsService.getUrgentNews(), 'urgentNews');
  }

  updateReportForms() {
    this.reportsService.getForms().subscribe(
      (data) => {
        this.usersService.setToLocalStorageGroupByUser(data, 'reportForms');
      },
      (error) => {
        this.unsuccessfulUpdate(error);
      });
  }

  updateNewsReceivers() {
    this.newsService.getNewsRecivers().subscribe(
      (data) => {
        this.newsService.setMailbox(data, 'newsReceiver');
      },
      (error) => {
        this.unsuccessfulUpdate(error);
      });
  }

  localStorageStandardMessage(message) {
    let temp = {dir: 'ltr', color: "dcf8c6", class: "leftChips"};
    if (this.currentUser.id == message.sender.id) {
      temp.color = "green";
      temp.dir = "rtl";
      temp.class = "rightChips";
    }
    return {
      userId: message.id,
      message: message.text,
      dir: temp.dir,
      class: temp.class,
      color: temp.color,
      type: message.type,
      receiveTime: message.receiver_time,
      seenTime: message.seen_time,
      serverTime: message.server_time,
      sendTime: message.sender_time,
      command: message.command
    };
  }

  updateNewsInfo(fn: Observable<any>, key: string) {
    fn.subscribe(
      (data) => {
        this.newsService.setCommonField(data, key);
      },
      (error) => {
        this.unsuccessfulUpdate(error);
      }
    );
  }

  updateInfo(fn: Observable<any>, key: string, needFirst = false): Observable<any> {
    const updated = new Subject<any>();
    fn.subscribe(
      data => {
        if (needFirst) {
          data = data[0];
        }
        this.updateLocalStorage(key, data);
        updated.next(data);
      },
      (error) => {
        this.unsuccessfulUpdate(error);
      }
    );
    return updated;
  }

  updateLocalStorage(key, value) {
    this.localStorageService.set(key, JSON.stringify(value));
    let oldMissions = JSON.parse(this.localStorageService.get('oldMissions'));
    if (!oldMissions) {
      oldMissions = [];
    }
    let isExist = false;

    for (let i = 0; i < oldMissions.length; i++) {
      if (oldMissions[i].username === this.currentUser.username) {
        oldMissions[i][key] = value;
        isExist = true;
      }
    }
    if (!isExist) {
      let temp = {'username': this.currentUser.username};
      temp[key] = value;
      oldMissions.push(temp);
    }
    this.localStorageService.set('oldMissions', JSON.stringify(oldMissions));
  }

  unsuccessfulUpdate(error) {
    if (error.status === 0) {
      this.resultMessage = this.configService.messages.persian.disconnected;
    }
  }

}
