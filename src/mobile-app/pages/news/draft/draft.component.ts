import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users/users.service';
import { NewsService } from 'src/services/news/news.service';
import { JalaliPipe } from 'src/web-app/pipes/jalali.pipe';

@Component({
  selector: 'mobile-app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {
  mailBoxList;
  constructor(private newsService: NewsService,
    private usersService: UsersService) { }
  draftColumns = [
    {
      columnDef: 'id',
      label: 'ردیف',
      cell: (row, index) => { return index + 1 }
    },
    {
      columnDef: 'sender_time',
      label: 'آخرین ویرایش',
      cell: (row) => { return new JalaliPipe().transform(row.sender_time) }
    },
    {
      columnDef: 'subject',
      label: 'موضوع',
      cell: (row) => { return row.subject }
    }
  ];
  ngOnInit() {
    this.draft();
  }

  private draft() {
    this.mailBoxList = this.newsService.getOfflineMailbox('draft');
  }

}
