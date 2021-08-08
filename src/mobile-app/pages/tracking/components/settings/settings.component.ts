import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UsersService } from 'src/services/users/users.service';
import { TrackingService } from '../../../../../services/tracking/tracking.service';
import { Observable, Subject } from 'rxjs';
//<MN>

@Component({
  selector: 'mobile-app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  mhd: number;
  selectedItem = "sit"
  value;
  refreshTime = {
    hour: undefined,
    miniute: undefined,
    sit: undefined
  }

  constructor(private dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public usersService: UsersService,
    public trackingService: TrackingService) {
    this.getRefreshTime().subscribe();
  }
  ok() {
    if (this.refreshTime[this.selectedItem] >= 0) {
      switch (this.selectedItem) {
        case "miniute": {
          this.mhd = this.refreshTime[this.selectedItem] * 60
          this.dialogRef.close(this.mhd);
          break;
        }
        case "hour": {
          this.mhd = this.refreshTime[this.selectedItem] * 3600
          this.dialogRef.close(this.mhd);
          break;
        }
        default: {
          this.mhd = this.refreshTime[this.selectedItem] 
          this.dialogRef.close(this.mhd);
          break;
        }
       
      }
      this.trackingService.updateRefreshTime(this.data,this.mhd).subscribe()
    }
    else {
      console.log('خطا')
    }


  }
  cancel(): void {
    this.dialogRef.close();
  }
  getRefreshTime(): Observable<any> {
    let mhd = new Subject<any>();
    this.trackingService.getRefreshTime(this.data).subscribe(
      (response) => {
        console.log('response', response)
        this.refreshTime.sit = response['refreshtime'];
        mhd.next();
      }
    )
    return mhd;
  }
}

