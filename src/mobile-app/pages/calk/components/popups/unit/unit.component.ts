import { Component, OnInit, Inject, ErrorHandler } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { CalkService } from '../../../../../../services/calk/calk.service';

@Component({
  selector: 'mobile-app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  selectedUnit;
  listOfUnits: any;
  fields
  constructor(
    private calkService: CalkService,
    private dialogRef: MatDialogRef<UnitComponent>,
    @Inject(MAT_DIALOG_DATA) public link) {
    this.fields = link.jsonValue;
    console.log("confirm when open dialog", this.fields)
  }

  ngOnInit() {
    // this.getAllUnit();
  }
  getAllUnit(): any {
    // this.calkService.getAllUnit().subscribe(
    //   (response) => {
    //     console.log("getAllUnit", response)
    //     this.listOfUnits = response
    //   }
    // )
  }
  onClose(): void {
    console.log('fields', this.fields)
    this.dialogRef.close(this.fields);
  }

  selectUnit(op){
    op.forEach(element => {
      
    });
   op.selected = true;
   console.log('op',op)
  }

}
