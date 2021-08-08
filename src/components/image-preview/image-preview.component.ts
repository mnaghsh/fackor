import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MessagesService} from "../../services/messages/messages.service";

@Component({
  selector: 'app-loader',
  templateUrl: './Image-preview.component.html',
  styleUrls: ['./Image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  public url;
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private messagesService: MessagesService) {
  }

  ngOnInit() {
    this.url =  this.messagesService.downloadFileURL(this.data.name);
  }

  download(nameOfFile) {
    let a = document.createElement("a");
    a.download = nameOfFile;
    a.href = this.messagesService.downloadFileURL(nameOfFile);
    a.click();
  }

}
