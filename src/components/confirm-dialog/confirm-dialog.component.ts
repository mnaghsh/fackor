import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


export interface NewMessages {
  userId: number;
  user: string;
  messages: Array<Object>;
}

@Component({
  selector: 'mobile-app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log("confirm when open dialog", data);
  }

  ngOnInit() {
  }


  onClose(value): void {
    this.dialogRef.close(value);
  }
}
