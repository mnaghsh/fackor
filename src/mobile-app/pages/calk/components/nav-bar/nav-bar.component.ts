import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {ConfigStyleService} from "../../../../../services/config-style.service";
import {FavaMap} from "fava-map";
import {CalkService} from '../../../../../services/calk/calk.service';
import Graticule from 'ol/graticule';
import DragZoom from 'ol/interaction/DragZoom';
import Stroke from 'ol/style/stroke';
import Draw, {createBox} from 'ol/interaction/Draw';
import ExtentInteraction from 'ol/interaction/Extent';
import {ContentComponent} from "../../../report/component/content/content.component";
import {MatDialog, MatSort} from "@angular/material";
import * as OlProj from 'ol/proj';
import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import Fill from 'ol/style/Fill';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import {unByKey} from 'ol/Observable.js';
import {getArea, getLength} from 'ol/sphere.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import Overlay from 'ol/Overlay.js';
import {CoordinateDialogComponent} from "../../../../../components/coordinate-dialog/coordinate-dialog.component";


@Component({
  selector: 'mobile-app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  myControls;
  @Input() drawInteractions;
  @Output() drawInteractionsChange = new EventEmitter();
  @Input() vectorLayers;
  @Output() vectorLayersChange = new EventEmitter();
  @Input() select;
  @Output() selectChange = new EventEmitter();
  @Input() activeFeature;
  @Output() activeFeatureChange = new EventEmitter();
  @Input() selectedMode;
  @Output() selectedModeChange = new EventEmitter();
  @Input() calkFeature;
  @Output() calkFeatureChange = new EventEmitter();


  measureFlag = false;
  measureSource;
  measureLayer;
  sketch;
  helpTooltipElement;
  helpTooltip;
  measureTooltipElement;
  measureTooltip;
  measureDraw;
  overLays = [];
  measureType = 'LineString';

  graticule;
  gratFlag = false;
  dragBoxFlag = false;


  constructor(private configStyleService: ConfigStyleService,
              private mapService: FavaMap,
              private calkService: CalkService,
              private dialog: MatDialog) {
    this.graticule = new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.9)',
        width: 1.5,
        lineDash: [0.5, 4]
      }),
      lonLabelPosition: 0.18,
      latLabelPosition: 0.88,
      showLabels: true,
    });

  }

  ngOnInit() {
  }


  showBarsToggle() {
    this.configStyleService.showNavBar.next();
    // const map = this.mapService.getMap();
    // if (this.myControls == null) {
    //   this.myControls = map.getControls();
    //   this.myControls.forEach(
    //     (control) => {
    //       map.removeControl(control);
    //     }
    //   );
    // } else {
    //   this.myControls.forEach(
    //     (control) => {
    //       map.addControl(control);
    //     }
    //   );
    // }
  }

  private saveFeatures() {
    this.calkService.saveFeatures(this.drawInteractions, this.vectorLayers);
  }

  graticuleToggle() {
    if (this.gratFlag === true) {
      this.gratFlag = false;
      this.mapService.getMap().removeControl(this.graticule);
    } else {
      this.gratFlag = true;
      this.mapService.getMap().addControl(this.graticule);
    }
  }

  zoomToBox() {
    this.dragBoxFlag = true;
    const map = this.mapService.getMap();
    const interActionsStatus = [];
    map.getInteractions().forEach(
      (interAction) => {
        interActionsStatus.push({value: interAction, status: interAction.getActive()});
      }
    );
    const drag = new Draw({
      geometryFunction: createBox(),
      type: 'Circle'
    });
    map.addInteraction(drag);
    drag.on('drawend', (evt) => {
      this.dragBoxFlag = false;
      const extent = evt.feature.getGeometry().getExtent();
      map.getView().fit(extent);
      map.removeInteraction(drag);
      interActionsStatus.forEach(
        (interAction) => {
          interAction.value.setActive(interAction.status);
        }
      );
    });
  }

  zoomToCoordinate() {
    const dialogRef = this.dialog.open(CoordinateDialogComponent, {
      data: {},
      width: "40%",
      height: "auto"
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.mapService.getMap().getView().animate
          ({zoom: data.zoom}, {center: OlProj.fromLonLat([data.lon, data.lat])});
        }
      }
    );
  }

  addMeasureLayer() {
    const map = this.mapService.getMap();

    this.measureSource = new VectorSource();

    this.measureLayer = new VectorLayer({
      source: this.measureSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });

    map.addLayer(this.measureLayer);
  }

  initMeasureTool() {
    this.addMeasureLayer();
    // map.getViewport().addEventListener('mouseout', function () {
    //   that.helpTooltipElement.classList.add('hidden');
    // });
    this.addInteraction(this.measureType);
  }

  createHelpTooltip() {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.mapService.getMap().addOverlay(this.helpTooltip);
  }

  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'tooltip tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.mapService.getMap().addOverlay(this.measureTooltip);
    this.overLays.push(this.measureTooltip);
  }

  formatLength(line) {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'کیلومتر';
    } else {
      output = (Math.round(length * 100) / 100) +
        ' ' + 'متر';
    }
    return output;
  }

  formatArea(polygon) {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'کیلومتر مربع';
    } else {
      output = (Math.round(area * 100) / 100) +
        ' ' + 'متر مربع';
    }
    return output;
  }

  addInteraction(type) {
    const that = this;
    that.measureDraw = new Draw({
      source: that.measureSource,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });
    this.mapService.getMap().addInteraction(that.measureDraw);

    that.createMeasureTooltip();
    that.createHelpTooltip();

    let listener;
    that.measureDraw.on('drawstart',
      function (evt) {
        // set sketch
        that.sketch = evt.feature;

        /** @type {module:ol/coordinate~Coordinate|undefined} */
        let tooltipCoord = evt.coordinate;

        listener = that.sketch.getGeometry().on('change', function (evt) {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = that.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = that.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          that.measureTooltipElement.innerHTML = output;
          that.measureTooltip.setPosition(tooltipCoord);
        });
      }, this);

    that.measureDraw.on('drawend',
      function () {
        that.measureTooltipElement.className = 'tooltip tooltip-static';
        that.measureTooltip.setOffset([0, -7]);
        // unset sketch
        that.sketch = null;
        // unset tooltip so that a new one can be created
        that.measureTooltipElement = null;
        that.createMeasureTooltip();
        unByKey(listener);
      }, this);
  }

  toggleMeasure() {
    if (this.measureFlag == false) {
      this.initMeasureTool();
    } else {
      this.mapService.getMap().removeInteraction(this.measureDraw);
      this.mapService.getMap().removeLayer(this.measureLayer);
      this.overLays.forEach(
        (overLay) => {
          this.mapService.getMap().removeOverlay(overLay);
        }
      );
    }
    this.measureFlag = !this.measureFlag;
  }

  changeMeasureType(type) {
    this.measureType = type;
    if (this.measureFlag) {
      this.mapService.getMap().removeInteraction(this.measureDraw);
      this.addInteraction(type);
    }
  }

}
