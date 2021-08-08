import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class AccessibleService {


  constructor(
    public dialog: MatDialog
  ) {

  }

  public showConfirm(message = "حذف انجام شود؟"): Observable<any> {
    let sub = new Subject<any>();
    let confirmOfDelete: number;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        Dialog: message,
        type: "reports"
      },
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data === 1) {
          confirmOfDelete = 1;
          sub.next(confirmOfDelete);
        }
      }
    );
    return sub;
  }

}
