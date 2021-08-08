import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ConfigService } from 'src/services/config.service';


@Component({
  selector: 'mobile-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  downloadBaseUrl: string;
  constructor(
    private configService: ConfigService,
    private dialogRef: MatDialogRef<ContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
  }

  onNoClick(): void {
    this.dialogRef.close()

  }

  ngOnInit() {
    this.downloadBaseUrl = this.configService.localVariables.baseUrl + '/message/download/';
    if (this.data.newsData.attachment)
      this.data.newsData['localAttachment'] = this.data.newsData.attachment.split(",");
  }
}
