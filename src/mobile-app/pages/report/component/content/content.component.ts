import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UsersService} from '../../../../../services/users/users.service';
import {ReportsService} from "../../../../../services/reports/reports.service";


@Component({
  selector: 'mobile-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  reportSendDate: any;
  receiverOfReport: any;
  type: any;
  senderOfReport: any;
  details: {};
  seenTime: any;
  showTime: any;

  constructor(private dialogRef: MatDialogRef<ContentComponent>,
              public usersService: UsersService,
              private reportService: ReportsService,
              @Inject(MAT_DIALOG_DATA) public data) {
    console.log('when open dialog', data)
    this.isSeen();
    this.type = data.type;
    this.senderOfReport = data.reportData.creator
    this.receiverOfReport = data.reportData.receiver
    this.reportSendDate = data.reportData.datez
    // this.details = JSON.parse(data.reportData.value.replace(/'/g, "\""));
    this.details = data.reportData.value;

    //  this.senderOfReport=dat
    // data.forEach(element => {
    //   this.details=JSON.parse(element.value.replace(/'/g, "\""))
    //   // console.log('when open dialog', this.details)
    // });

    console.log('details', this.details)
    // console.log('when get from ls', mhd)

  }

  onNoClick(): void {
    this.dialogRef.close()

  }

  ngOnInit() {

  }

  isSeen() {
    this.reportService.getReport(this.data.reportData.id).subscribe(
      (data) => {
        this.showTime = data;
      }
    );
  }

}
