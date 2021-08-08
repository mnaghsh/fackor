import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";


export interface NewMessages {
  userId: number;
  user: string;
  messages: Array<Object>;
}

@Component({
  selector: 'mobile-app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public newMessages: NewMessages,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }

  openChat(userId, name) {
    console.log('awdawd', userId, name);
  }


}
