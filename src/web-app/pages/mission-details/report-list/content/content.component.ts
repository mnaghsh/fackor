import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'mobile-app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class FormContentComponent implements OnInit {

  reportSendDate: any;
  receiverOfReport: any;
  type: any;
  senderOfReport: any;
  details:{};
  constructor(private dialogRef: MatDialogRef<FormContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log('when open dialog', data)
    //  this.details= (data)
    this.type=data.type;
    this.senderOfReport= data.reportData.creator
    this.receiverOfReport= data.reportData.receiver
    this.reportSendDate= data.reportData.date
     this.details=JSON.parse(data.reportData.value.replace(/'/g, "\""));
     
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

}
