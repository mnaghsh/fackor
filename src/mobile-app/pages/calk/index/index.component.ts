import { Component, OnDestroy, OnInit, Injector, ViewChild } from '@angular/core';
import { FavaMap } from 'fava-map';
import { CalkService } from '../../../../services/calk/calk.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Observable, Subject } from 'rxjs';
import { ConfigStyleService } from "../../../../services/config-style.service";
import { Select } from 'ol/interaction.js';
import { MatDrawer, MatSidenav, MatSidenavContent } from "@angular/material";


// const vectorLayer = new VectorLayer({
//   source: new VectorSource({
//     wrapX: false
//   }),
//   // style:this.calkService.Style,
//   layerss: 'salam',
//   zIndex: 100000,
// })

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  selectedMode;
  activeFeature: any;
  select = new Select({
    wrapX: false
  });
  treeLayers: any;
  dbLayerId: any;
  newFeatures;
  calkFeatureChange;
  drawedFeatures = [];
  drawInteractions: any;
  mhd: any;
  FeatureCollection;
  vectorLayers = [];
  private allLayers;
  activeLayer;
  rightMenuItems = [];
  private favaLayer;
  private leftList = [];
  public label = 'کالک';
  test = 'fas fa-align-justify';
  @ViewChild('rightDrawer') rightSideNav: MatSidenav;
  @ViewChild('drawer') leftSideNav: MatSidenav;
  @ViewChild('dragRightBox') dragRightBox: MatSidenav;
  @ViewChild('dragLeftBox') dragLeftBox: MatSidenav;

  constructor(private injector: Injector,
    private mapService: FavaMap,
    private calkService: CalkService,
    private configStyleService: ConfigStyleService) {

  }

  ngOnInit() {
    this.initLayers();
    this.calkService.activeFeatureCahnge.subscribe(
      (data) => {
        this.activeFeature = this.calkService.activeFeature;
      }
    );
    this.updateMapSize();
    this.draggableMenu('right-side-nav', this.dragRightBox, '-');
    this.draggableMenu('left-side-nav', this.dragLeftBox, '+');
  }

  private initLayers() {

    this.calkService.getCalkPositionLayers().subscribe(
      (response) => {
        this.treeLayers = [response[0]];
        //res[0]
        // this.rightMenuItems = response;
        response.forEach(element => {
          console.log('tree', element);
          if (element.dtype == 'layer') {
            const vectorLayer = new VectorLayer({
              source: new VectorSource(),
              style: this.calkService.style,
              layerId: element.id,
              zIndex: 100000,
              visible: false
            });
            this.mapService.addLayer(vectorLayer);
            this.vectorLayers.push(vectorLayer);
            this.calkService.refreshLayerFeatures(vectorLayer);
          }

        });
        console.log('this.vectorLayersWhenFill', this.vectorLayers);
      });
  }


  ngOnDestroy() {
    this.calkService.removeInteractions(this.drawInteractions);
    this.removeAllFeatures();
    this.calkService.handMode();

    // this.configStyleService.showNavBar.next();
  }

  private removeAllFeatures(): Observable<any> {
    let sub = new Subject<any>();
    this.vectorLayers.forEach(eachVectorLayer => {
      let eachVectorLayerFeatures = eachVectorLayer.getSource().getFeatures();
      eachVectorLayerFeatures.forEach(eachFeature => {
        eachVectorLayer.getSource().removeFeature(eachFeature);
      });
    });
    sub.next();
    return sub;
  }

  //////// layers ///////////      
  private removeAllLayers() {
    this.mapService.getMap().getLayers().forEach(element => {
      this.mapService.getMap().removeLayer(element);
    });
    this.vectorLayers = [];
  }

  private modifyFeatures() {
    // this.calkService.removeInteractions(select)

  }

  updateMapSize() {
    this.leftSideNav.openedChange.subscribe(
      () => {
        this.mapService.getMap().updateSize();
      }
    );
    this.rightSideNav.openedChange.subscribe(
      () => {
        this.mapService.getMap().updateSize();
      }
    );
  }

  draggableMenu(elementId, dragBox, side) {
    const that = this;
    const style = document.getElementById(elementId).style;

    // const dragByTouch = function (evt) {
    //   console.log(evt)
    //   let dif = 0;
    //   let newWidth;
    //   const sideNavWidth = sideNav._width;
    //   if (recentPosition != undefined) {
    //     dif = evt.touches[0].clientX - recentPosition;
    //     if (side == '-') {
    //       newWidth = sideNavWidth - dif;
    //     } else if (side == '+') {
    //       newWidth = sideNavWidth + dif;
    //     }
    //     if (newWidth < 500 && newWidth > 145) {
    //       style.setProperty('width',
    //         (newWidth) + 'px', 'important');
    //     }
    //   }
    //   recentPosition = evt.touches[0].clientX;
    // };

    const dragByTouch = function (evt) {
      let dif = evt.view.outerWidth - evt.touches[0].clientX;
      dif = (dif < 0 ? -dif : dif) / evt.view.outerWidth * 100;
      if (side == '+') {
        dif = 100 - dif;
      }
      if (dif > 10 && dif < 50)
        style.setProperty('width', dif + '%', 'important');
    };

    const ResetMenuStates = function () {
      setTimeout(() => {
        that.mapService.getMap().updateSize();
        style.setProperty('box-shadow', '#0000006b ' + side + '8px 0px 20px');
      }, 200);
    };

    dragBox['nativeElement'].addEventListener('touchmove', dragByTouch);
    dragBox['nativeElement'].addEventListener('touchend', ResetMenuStates);
    dragBox['nativeElement'].addEventListener('touchstart', (evt) => {
      style.setProperty('box-shadow', side + '8px 0px 20px #4c442c');
    });
  }

}

