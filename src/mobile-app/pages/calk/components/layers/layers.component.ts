import {Component, OnDestroy, OnInit, Injector, Input, EventEmitter, Output} from '@angular/core';
import {FavaMap} from 'fava-map';
import View from 'ol/View';
import {FavaLayer} from 'fava-layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Map from "ol/Map";
import Fill from 'ol/style/fill';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import CircleStyle from 'ol/style/Circle';
import Feature from 'ol/Feature';
import {transform} from 'ol/proj';
import {CalkService} from 'src/services/calk/calk.service';
import MousePosition from "ol/control/MousePosition";
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';

const getStyle = (feature: Feature) => {
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

  });
};
const vectorLayer = new VectorLayer({
  source: new VectorSource({
    wrapX: false
  }),
  style: getStyle,
  layerss: 'salam',
  zIndex: 100000,
});

@Component({
  selector: 'mobile-app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css']
})
export class LayersComponent implements OnInit {
  @Input() vectorLayers;
  @Output() vectorLayersChange = new EventEmitter();
  mhd: any;
  private allLayers;
  activeLayer;
  private favaLayer;
  private leftList = [];
  public label = 'کالک';

  constructor(private injector: Injector,
              private mapService: FavaMap,
              private calkService: CalkService) {
  }

  ngOnInit() {
    const refreshMap = () => {
      this.mapService.setTarget('');
      this.mapService.setTarget('calk-map');
    };
    this.mapService.getMap().on('change:view', refreshMap);
    const myMap = new Map({
      target: 'calk-map'
    });
    this.mapService.setMap(myMap);
    this.initializeMap();
    refreshMap();
    this.addMousePosition();
    this.addScaleLine();
    this.addZoomSlider();
  }

  initializeMap() {
    this.favaLayer = new FavaLayer(this.mapService, this.injector);
    this.favaLayer.run("./assets/2ndTileLayer.json").subscribe(
      () => {
        const view = new View({
          center: [0, 0],
          zoom: 3,
          minZoom: 2,
          maxZoom: 11
        });
        this.mapService.getMap().setView(view);
      }
    );
  }

  getStyle(feature: Feature) {
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
    });
  }

  addMousePosition() {
    const mousePositionCtrl = new MousePosition({
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: 'mouse-position',
      undefinedHTML: '&nbsp;'
    });
    this.mapService.getMap().addControl(mousePositionCtrl);
  }

  addScaleLine() {

    const scaleLineCtrl = new ScaleLine({
      target: 'scale-line-box',
      className: 'scale-line-box',
    });
    this.mapService.getMap().addControl(scaleLineCtrl);
  }

  addZoomSlider() {
    const myFunc = function (e) {
      const s = document.getElementsByClassName('ol-zoomslider-thumb ol-unselectable');
      s[0].innerHTML = e.map.getView().getZoom().toFixed();
    };
    const zoomSliderCtrl = new ZoomSlider();

    this.mapService.getMap().addControl(zoomSliderCtrl);
    this.mapService.getMap().on('moveend', myFunc);
  }

}
