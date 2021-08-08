import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MultiSelectComponent} from '../multi-select/multi-select.component';
import {NewsService} from 'src/services/news/news.service';
import {ConfigService} from 'src/services/config.service';
import {UsersService} from "../../../../../services/users/users.service";


@Component({
  selector: 'mobile-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  downloadBaseUrl: string;

  constructor(private newsService: NewsService,
              private configService: ConfigService
    , private dialogRef: MatDialogRef<MultiSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public usersService: UsersService) {
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  ngOnInit() {
    this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/message/download/';
    if (this.data.newsData.attachment)
      this.data.newsData['localAttachment'] = this.data.newsData.attachment.split(",");
  }
}
