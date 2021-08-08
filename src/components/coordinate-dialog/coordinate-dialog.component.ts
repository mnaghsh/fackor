import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AccessibleService} from "../../services/accessible/accessible.service";

@Component({
  selector: 'mobile-app-coordinate-dialog',
  templateUrl: './coordinate-dialog.component.html',
  styleUrls: ['./coordinate-dialog.component.css']
})
export class CoordinateDialogComponent implements OnInit {
  coordinateForm;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CoordinateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private accessibleService: AccessibleService) {
    this.coordinateForm = fb.group({
        lon: ['', [Validators.min(-180), Validators.required, Validators.max(180)]],
        lat: ['', [Validators.min(-80), Validators.required, Validators.max(84)]],
        zoom: ['', [Validators.min(2), Validators.required, Validators.max(11)]],
      }
    );
  }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  moveToCoordinate() {
    if (this.coordinateForm.valid) {
      this.dialogRef.close({
        lon: this.coordinateForm.value.lon,
        lat: this.coordinateForm.value.lat,
        zoom: this.coordinateForm.value.zoom,
      });
    } else {

    }
  }

}
