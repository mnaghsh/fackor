import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../../services/news/news.service';
import { JalaliPipe } from 'src/web-app/pipes/jalali.pipe';

@Component({
  selector: 'mobile-app-out-box',
  templateUrl: './out-box.component.html',
  styleUrls: ['./out-box.component.css']
})
export class OutBoxComponent implements OnInit {

  constructor(private newsService: NewsService) {
    this.outBox()
  }
  mailBoxList;
  outboxColumns = [
    {
      columnDef: 'id',
      label: 'ردیف',
      cell: (row, index) => { return index + 1 }
    },
    {
      columnDef: 'subject',
      label: 'موضوع',
      cell: (row) => { return row.subject }
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
      columnDef: 'attachment',
      label: 'الصاق',
      cell: (row) => {
        if (row.attachment!= null)
          return "<i class='fa fa-paperclip'></i>"
      }
    },
    {
      columnDef: 'sender_time',
      label: 'تاریخ',
      cell: (row) => { return new JalaliPipe().transform(row.sender_time) }
    },
    {
      columnDef: 'details',
      label: 'جزئیات',
      cell: (row) => "<h3>...</h3>"
    }
    // {
    //   columnDef: 'receiver',
    //   label: 'گیرندگان',
    //   cell: (row) => { return row.userNews.seen_time + ' ' + row.userNews.receiver.lastname }
    // }
    // ,
    // {
    //   columnDef: 'receiver_time',
    //   label: 'زمان رسیدن به دست گیرنده',
    //   cell: (row) => {
    //     if (row.userNews.receiver_time != null)
    //       return new JalaliPipe().transform(row.userNews.receiver_time)
    //     return row.userNews.receiver_time
    //   }
    // }
    // ,
    // {
    //   columnDef: 'seen_time',
    //   label: ' زمان خواندن خبر ',
    //   cell: (row) => {
    //     if (row.userNews.seen_time != null)
    //       return new JalaliPipe().transform(row.userNews.seen_time)
    //     return row.userNews.seen_time
    //   }
    // }

  ];
  ngOnInit() {
  }
  private outBox() {
    this.newsService.getOutBox().subscribe(
      (data) => {
        this.mailBoxList = data;
        this.newsService.setMailbox(data, 'outbox');
        console.log('online', this.mailBoxList);
      },
      (error) => {
        this.mailBoxList = this.newsService.getOfflineMailbox('outbox');
        console.log('offline', this.mailBoxList);
      });
  }
}
