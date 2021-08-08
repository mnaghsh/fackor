import {Component, OnInit} from '@angular/core';

import Graticule from 'ol/graticule';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';

import {saveAs} from 'file-saver/FileSaver';
import Text from 'ol/style/Text';

// import View from 'ol/View.js';
// import {defaults as defaultControls} from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate.js';

import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import View from 'ol/View';

import { FavaLayer } from 'fava-layer';

import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';


import Style from 'ol/style/style';

import ImageStyle from 'ol/style/image';
import CircleStyle from 'ol/style/Circle'; import Feature from 'ol/Feature';

import OlXYZ from 'ol/source/xyz';
import Map from "ol/Map";
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/View';
import OlProj from 'ol/proj';

// import OSM from 'ol/source/OSM.js';

@Component({
  selector: 'app-Map',
  templateUrl: './Map.component.html',
  styleUrls: ['./Map.component.css']
})
export class MapComponent implements OnInit {
  vectorLayer = new VectorLayer({
    source: new VectorSource({
      wrapX: false
    }),
    style: this.getStyle,
    layerss: 'salam',
    zIndex: 100000,
  })
  gratFlag;
  activeLayer = 'two';
  currentLayer: string;
  sourceOne: OlXYZ; 
  sourceTwo: OlXYZ;
  sourceThree: OlXYZ;
  map: Map;
  layer: OlTileLayer;
  view: OlView;
  server = 'http://192.168.3.10:8080/LayerServer-1.2.0.SNAPSHOT/tile/raster/';
  graticule;
  navlinks: Array<{ label: string, path: any, icon: any }>;

  constructor() {
    this.graticule = new Graticule({
      strokeStyle: new Stroke({
        color: 'rgba(255,120,0,0.9)',
        width: 1.5,
        lineDash: [0.5, 4]
      }),
      lonLabelPosition: 0.1,
      latLabelPosition: 0.01,
      showLabels: true,
    });
  }

  public mousePosition() {
    const mousePositionControl = new MousePosition({
      //coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      // className: 'custom-mouse-position',
      // target: document.getElementById('mouse-position'),
      // undefinedHTML: '&nbsp;'
    });
    console.log(this.map, 'gg');
    this.map.addControl(mousePositionControl); 
  }

  public changeBaseLayer(layer) {
    this.activeLayer = layer;
    switch (layer) {
      case 'one':
        this.layer.setSource(this.sourceTwo);
        break;
      case 'two':
        this.layer.setSource(this.sourceOne);
        break;
      case 'three':
        this.layer.setSource(this.sourceThree);
        break;
    }
  }

  public printMap() {
    this.map.once('postcompose', event => {
      let canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msSaveBlob(), 'map.png')
        console.log('if', navigator.msSaveBlob);
      } else {
        canvas.toBlob(function (blob) {
          saveAs(blob, 'map.png');
        });
      }
    })
    this.map.renderSync();
  }

  public zoomInMap() {
    // this.view.animate({zoom: this.view.getZoom() + 1}, {center: [0, 0]}, {duration: 200000000});
    this.view.animate({zoom: this.view.getZoom() + 1}, {duration: 200000000});
    // this.view.setCenter([50000, 5151010]);
  }

  public zoomOutMap() {
    this.view.animate({zoom: this.view.getZoom() - 1}, {center: [0, 0]}, {duration: 1});
  }

  public makeMapGraticule() {
    let ctrls = this.map.getControls().getArray();
    if (this.gratFlag === 0) {
      this.gratFlag = 1;
      this.map.removeControl(this.graticule);
    } else {
      this.gratFlag = 0;
      this.map.addControl(this.graticule);
    }
  }

  test() {
    this.graticule.setMap(null);
  }

  ngOnInit() {

    this.sourceOne = new OlXYZ({
      url: this.server + 'vesat?x={x}&y={y}&z={z}'
    });
    this.sourceTwo = new OlXYZ({
      url: this.server + 'osm?x={x}&y={y}&z={z}'
    });
    this.sourceThree = new OlXYZ({
      url: "http://192.168.3.10:8080/LayerServer-1.2.0.SNAPSHOT/tile/raster/land?z={z}&x={x}&y={y}"
    });
    this.layer = new OlTileLayer({
      source: this.sourceOne
    });
    this.view = new OlView({
      // center: OlProj.fromLonLat([6.661594, 50.433237]),
      center: [0,0],
      zoom: 3,
      minZoom: 2,
      maxZoom: 20
    });

    this.map = new Map({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
    this.map.addLayer(this.vectorLayer);
    this.map.setTarget('')
    this.map.setTarget('map')
    this.mousePosition();
  }
  private draw() {
    debugger
    console.log('**********************************************');
    let ss = new Draw({
      source: this.vectorLayer.getSource(),
      type: 'Point'
    });

    console.log('Is Active: ' + ss.getActive());
    // this.mapService.getMap().addInteraction(ss);
    console.log('vectorLayer', this.vectorLayer);
    console.log('ss', ss)
    console.log('map', this.map)
    this.map.addInteraction(ss);
    // ss.setActive(true);
    const rr = this;
    ss.on('drawend', function () {
      console.log('************* Hi All ******************', rr.vectorLayer.getSource().getFeatures());
        var format = new GeoJSON({
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857'
        });
        console.log(format.writeFeaturesObject(rr.vectorLayer.getSource().getFeatures()))
    })

    ss.on('drawstart', function () {
      console.log('************* Draw Start ******************');
    })
    // const snap = new Snap({
    //   source: this.vectorLayer.getSource()
    // });
    // this.mapService.getMap().addInteraction(snap);


  }
  public getStyle(feature: Feature) {

    return new Style({
      stroke: new Stroke({
        color: feature.values_.color,
        width: 3
      }),
      fill: new Fill({
        color: feature.values_.color,
      }),

      image: new CircleStyle({
        radius: 5,
        fill: new Fill({
          color: feature.values_.color,
        })
      })

    })
  }

}
