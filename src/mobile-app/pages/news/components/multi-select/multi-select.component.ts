import {Component, OnInit} from '@angular/core';
import {ComboItems} from '../crud/crud.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UsersService} from "../../../../../services/users/users.service";

@Component({
  selector: 'mobile-app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  multiSelectCreator: ComboItems[];

  constructor(private dialogRef: MatDialogRef<MultiSelectComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public usersService: UsersService) {
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  }

  // close(){

  // }


}
