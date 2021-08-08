import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'mobile-app-add-layer',
  templateUrl: './add-layer.component.html',
  styleUrls: ['./add-layer.component.css']
})
export class AddLayerComponent implements OnInit {

  public layerName;
  public layerTypeTxt = "لایه";
  constructor(
    private dialogRef: MatDialogRef<AddLayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any    
  ) { }

  ngOnInit() {
    if(this.data == 'groupLayer')
      this.layerTypeTxt = "گروه";
  }

  onAddLayer(){
    this.dialogRef.close(this.layerName)
  }
}
