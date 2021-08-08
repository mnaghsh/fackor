import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CalkService } from 'src/services/calk/calk.service';
import { FavaMap } from 'fava-map';
import Draw from 'ol/interaction/Draw';
import { defaults as defaultInteractions, Modify, Select } from 'ol/interaction.js';
import View from 'ol/View.js';
import PointerInteraction from 'ol/interaction/Pointer';
import { CommonService } from '../../../../../services/common/common.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UnitComponent } from '../popups/unit/unit.component';

@Component({
  selector: 'mobile-app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})

export class FeaturesComponent implements OnInit {

  editFeature: boolean;
  pointer: any;
  startCoor: any;
  modify: any;
  vectorState: string;
  activeFeatureType;
  @Input() activeLayer;
  @Input() drawInteractions;
  @Output() drawInteractionsChange = new EventEmitter();
  @Input() activeFeature;
  @Output() activeFeatureChange = new EventEmitter();
  @Input() select;
  @Output() selectChange = new EventEmitter();
  @Input() calkFeature;
  @Output() calkFeatureChange = new EventEmitter();

  leftList = [];
  constructor(
    private calkService: CalkService,
    private mapService: FavaMap,
    private commonService: CommonService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {

    this.calkService.initializeInteractions();
    this.calkService.pointerMode();
    this.getFeaturesType();
  }

  private getFeaturesType() {
    this.calkService.getAllFeatureTypes().subscribe(
      (response) => {
        console.log('getAllFeatureTypes', response);
        this.leftList = response;
      }
    )
  }
  private draw(link) {

    this.calkService.pointerMode();
    this.activeFeatureType = link.id;
    this.calkService.removeInteractions(this.drawInteractions);

    this.calkFeatureChange.emit(link.icon);
    if (this.activeLayer) {
      if (link.name == "LimitLine") {
        const myLayer = this.activeLayer;
        this.drawInteractions = this.calkService.smoothFeature(this.activeLayer, false);
        this.smoothDrawEvent(link, myLayer);
      }
      else {
        this.drawInteractions = new Draw({
          source: this.activeLayer.getSource(),
          type: link.type
        });
        this.commonDrawEvent(link)
      }
    }
    this.mapService.getMap().addInteraction(this.drawInteractions);
  }

  private smoothDrawEvent(link, myLayer) {
    const that = this;
    this.drawInteractions.on('drawstart', function (event) {
      //فیچر جدید را نمایش میدهد
      console.log('awdawd new features |||||||||||||', myLayer);
      const features = myLayer.getSource().getFeatures();
      const length = features.length;
      const feature = features[length - 1];

      feature.set('status', 'add');
      // debugger
      console.log('%%%%%%%%%%%%%%%%%%%', link.name)
      feature.set('name', link.name)
      feature.set('translate', link.translate)
      feature.set('value', link.jsonValue);
      console.log('ooooooo', event.feature);
      // console.log('that.activeFeature ',that.activeLayer);
      that.drawInteractionsChange.emit(that.drawInteractions);
      that.activeFeature = undefined;
    })
    this.drawInteractions.on('drawend', function (event) {

      that.calkService.removeInteractions(that.drawInteractions)
    })
  }
  private commonDrawEvent(link) {


    const that = this;
    this.drawInteractions.on('drawstart', function (event) {
      console.log('@@@**************', link)

      // console.log('evvent',event);
      event.feature.set('name', link.name)
      event.feature.set('translate', link.translate)
      that.activeFeature = undefined;
    })


    this.drawInteractions.on('drawend', function (event) {
      //فیچر جدید را نمایش میدهد
      console.log('awdawd new features |||||||||||||', event.feature)
      event.feature.set('status', 'add');

      event.feature.set('value', link.jsonValue);
      that.drawInteractionsChange.emit(that.drawInteractions);
      that.calkService.removeInteractions(that.drawInteractions)
      if (link.name != "Polygon" && link.name != "LineString" && link.name != "Point") {
        const dialogRef = that.dialog.open(UnitComponent, {
          data: link,
          width: '20%',
        })
        dialogRef.afterClosed().subscribe(
          (returnedData) => {
            returnedData.forEach(field => {
              if (field.type == "checkbox-group" && field.label == "یگان") {
                field.values.forEach(op => {
                  if (field.value == op.value) {
                    event.feature.set('valueForSaveThisFeature', op);
                    op.selected = true
                    event.feature.set('size', op.unit_size)
                    event.feature.set('type', op.unit_type)
                    event.feature.set('label', op.label)
                  }
                });
              }
              if (field.type == "checkbox-group" && field.label == "خودی/دشمن") {
                field.values.forEach(eachSelectedOption => {
                  if (field.value == eachSelectedOption.value) {
                    eachSelectedOption.selected = true
                    event.feature.set('featureColor', eachSelectedOption.color)
                  }
                });
              }
            });
            console.log('selectedUnit', returnedData)
            console.log(' that.event', event)


          }
        )
      }
    })
  }


}
