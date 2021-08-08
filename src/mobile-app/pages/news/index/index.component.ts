import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../services/users/users.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  navlinks: Array<{ label: string, path: any, icon: any }>;
  public label = 'خبر';

  constructor() {
    this.navlinks = [
      {label: ' ایجاد خبر', path: "compose", icon: "fas fa-pencil-square-o"},
      {label: 'صندوق ورودی', path: "inbox", icon: "fas fa-inbox"},
      {label: ' صندوق خروجی', path: "outbox", icon: "fas fa-paper-plane-o"},
      {label: '  پیش نویس ها', path: "draft", icon: "fas fa-envelope-open-o"},

    ];
  }

  ngOnInit() {
  }

  setLabel(label: string) {
    this.label = label;
  }
  ngOn

}
