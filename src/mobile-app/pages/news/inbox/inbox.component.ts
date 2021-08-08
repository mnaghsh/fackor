import {Component, OnInit} from '@angular/core';
import {NewsModule} from '../news.module';
import {NewsService} from '../../../../services/news/news.service';
import {UsersService} from '../../../../services/users/users.service';
import {SocketService} from 'src/services/socket/socket.service';
import {JalaliPipe} from '../../../../web-app/pipes/jalali.pipe';
import {CommonService} from '../../../../services/common/common.service';

export interface Record extends ArrayBuffer {
  id: number;
  username: string;
  firstname: any;
  lastname: any;
  enabled: boolean;
}

export interface Users extends ArrayBuffer {
  message: string;
  records: Record[];
  total: number;

}

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  mailBoxList;
  activeUserId;
  inboxColumns = [
    {
      columnDef: 'id',
      label: 'ردیف',
      cell: (row, index) => {
        return index + 1
      }
    },
    {
      columnDef: 'subject',
      label: 'موضوع',
      cell: (row) => {
        return row.subject
      }
    },
    {
      columnDef: 'sender',
      label: 'فرستنده',
      cell: (row) => {
        return row.sender.firstname +
          ' ' + row.sender.lastname +
          ' ' + this.usersService.getUserPosition(row.sender.id);
      }
    },
    {
      columnDef: 'importantNews',
      label: 'اهمیت',
      cell: (row) => {
        return row.importantNews.name
      }
    },
    {
      columnDef: 'archiveNews',
      label: 'طبقه بندی',
      cell: (row) => {
        return row.archiveNews.name
      }
    },
    {
      columnDef: 'sourceNews',
      label: 'منبع',
      cell: (row) => {
        return row.sourceNews.name
      }
    },
    {
      columnDef: 'sender_time',
      label: 'تاریخ',
      cell: (row) => {
        return new JalaliPipe().transform(row.sender_time)
      }
    },
    {
      columnDef: 'details',
      label: 'جزئیات',
      cell: (row) => "<h3>...</h3>"
    }

  ];

  constructor(private newsService: NewsService,
              private usersService: UsersService,
              private socket: SocketService) {
  }
  ngOnInit() {
    this.activeUserId = this.usersService.getUserInfo().id;
    this.inbox();
    this.watchNewsSocket();
  }

  private watchNewsSocket() {
    this.socket.socketEvent.subscribe(
      (event) => {
        console.log('event', event.data)
        let x = event.data.split("|");
        let receiver = x[1];
        if (x[3] && x[3].indexOf('news') >= 0) {
          this.inbox()
        }

      }
    )
  }

  private inbox() {
    // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
    this.newsService.buildInbox().subscribe(
      (data) => {
        this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
      }
    );


    // this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
    // this.newsService.getInbox().subscribe(

    //   (data) => {
    //     // ;
    //     // data.push(this.mailBoxList)
    //     this.mailBoxList = data.concat(this.mailBoxList);
    //     this.newsService.setMailbox(this.mailBoxList, 'inbox');
    //   },
    //   (error) => {
    //     this.mailBoxList = this.newsService.getOfflineMailbox('inbox');
    //     // console.log('offline', this.mailBoxList);
    //   });
  }

}
