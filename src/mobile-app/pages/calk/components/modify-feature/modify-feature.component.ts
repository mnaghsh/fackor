import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';
import { CalkService } from '../../../../../services/calk/calk.service';

@Component({
  selector: 'mobile-app-modify-feature',
  templateUrl: './modify-feature.component.html',
  styleUrls: ['./modify-feature.component.css']
})
export class ModifyFeatureComponent implements OnInit, OnChanges, DoCheck {

  @Input() activeFeature;
  @Output() activeFeatureChange = new EventEmitter();
  featureType;
  featureProperties;
  oldFeatureProps;
  constructor(
    private dialog: MatDialog,
    private calkService: CalkService
  ) { }

  ngOnInit() {
  }
  ngDoCheck() {

    if (this.activeFeature && this.oldFeatureProps && this.oldFeatureProps != JSON.stringify(this.featureProperties)) {
      this.oldFeatureProps = this.featureProperties;
      this.activeFeature.set('value', this.oldFeatureProps);
      // console.log('this.oldFeatureProps', this.oldFeatureProps)
      this.calkService.handMode();
      if (this.activeFeature.get('status') != 'add') {
        this.activeFeature.set('status', 'update');
        this.calkService.pointerMode();
      }
    }
  }
  ngOnChanges(changes): void {
    if (this.activeFeature && this.activeFeature.get('value')) {
      let type = this.activeFeature.getGeometry().getType();
      if (type == 'Point')
        this.featureType = 'نقطه';
      else if (type == 'LineString')
        this.featureType = 'خط';
      else if (type == 'Polygon')
        this.featureType = 'چند ضلعی';
      
      this.featureType =  this.activeFeature.get('translate')
      this.featureProperties = this.activeFeature.get('value');
      this.oldFeatureProps = this.activeFeature.get('value');
    } else {
      this.featureProperties = null;
      this.featureType = '';
    }
  }

  public onRemoveFeature() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        Dialog: 'آیا مطمین هستید؟',
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data == 1) {
          this.activeFeature.set('status', 'delete');
          this.activeFeature = null;
          this.featureProperties = null;
          this.featureType = '';
          this.calkService.handMode();
          this.calkService.pointerMode();
        }
        
      }
    )
  }
}
