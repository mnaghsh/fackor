import {Injectable} from '@angular/core';
import {NewsService} from '../news/news.service';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {ReportsService} from '../reports/reports.service';
import {UsersService} from '../users/users.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public newsService: NewsService,
              public localStorageService: LocalStorageService,
              public reportsService: ReportsService,
              public usersService: UsersService,
              private snackBar: MatSnackBar,
  ) {
  }

  public getfields() {
    this.sourceNews();
    this.urgentNews();
    this.importantNews();
    this.getReceivers();
    this.truthNews();
    this.reportForms();
    this.getClassification();
  }

  public getClassification() {
    let temp = this.newsService.getOfflineSources('archiveNews');
    if (!temp) {
      this.newsService.getClassification().subscribe(
        (data) => {
          this.newsService.setCommonField(data, 'archiveNews');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public sourceNews() {

    let temp = this.newsService.getOfflineSources('sourceNews');
    if (!temp) {
      this.newsService.getSourceNews().subscribe(
        (data) => {
          this.newsService.setCommonField(data, 'sourceNews');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public urgentNews() {

    let temp = this.newsService.getOfflineSources('urgentNews');
    if (!temp) {
      this.newsService.getUrgentNews().subscribe(
        (data) => {
          this.newsService.setCommonField(data, 'urgentNews');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public importantNews() {

    let temp = this.newsService.getOfflineSources('importantNews');
    if (!temp) {
      this.newsService.getImportantNews().subscribe(
        (data) => {
          this.newsService.setCommonField(data, 'importantNews');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public getReceivers() {
    let temp = this.newsService.getOfflineMailbox('newsReceiver');
    if (temp.length == 0) {
      this.newsService.getNewsRecivers().subscribe(
        (data) => {

          let mhd = this.newsService.setMailbox(data, 'newsReceiver');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public truthNews() {
    let temp = this.newsService.getOfflineSources('truthNews');
    if (!temp) {
      this.newsService.getTruthNews().subscribe(
        (data) => {
          this.newsService.setCommonField(data, 'truthNews');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  public reportForms() {
    let temp = this.usersService.getFromLocalStorageGroupByUser('reportForms');
    if (!temp) {
      this.reportsService.getForms().subscribe(
        (data) => {
          this.usersService.setToLocalStorageGroupByUser(data, 'reportForms');
        },
        (error) => {
          console.log(error);
        });
    }
  }

  showEventMessage(message,duration=3000) {
    this.snackBar.open(message, '', {
      direction: 'rtl',
      duration: duration,
    });
  }

}
