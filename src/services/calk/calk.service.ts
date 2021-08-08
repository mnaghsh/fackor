import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from 'src/services/config.service';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Fill from 'ol/style/fill';
import Text from 'ol/style/text';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Feature from 'ol/Feature';
import CircleStyle from 'ol/style/Circle';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CommonService } from '../common/common.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Draw from 'ol/interaction/Draw';
import { defaults as defaultInteractions, Modify, Select } from 'ol/interaction.js';
import View from 'ol/View.js';
import PointerInteraction from 'ol/interaction/Pointer';
import RegularShape from 'ol/style/RegularShape';

var textFill = new Fill({
  color: '#fff'
});
import { FavaMap } from 'fava-map';
import { StyleService } from './styles.service';
import LineString from 'ol/geom/LineString';
import Polygon from 'ol/geom/Polygon';
import MultiLineString from 'ol/geom/MultiLineString';

@Injectable({
  providedIn: 'root'
})
export class CalkService {

  activeFeature: Feature;
  activeFeatureCahnge = new Subject<any>();
  pointerStatus = true;
  modifyStatus = false;
  handStatus = false;
  movmentStatus = false;
  canModify = false;
  movement: any;
  select = new Select({
    wrapX: false,
    // style:function (feature, resolution) {
    //   console.log('Hi All');
    //   return this.style(feature, resolution);
    // }
  });
  modify = new Modify({
    features: this.select.getFeatures(),
  });


  vectorState: string;
  featureTypeId: { "id": string; };
  featuresValue: any;

  constructor(
    private mapService: FavaMap,
    private configService: ConfigService,
    private localStorage: LocalStorageService,
    private commonService: CommonService,
    private stylesService: StyleService) {
    // console.log('this.mapService.getMap().getLayers()',this.mapService.getMap().getLayers()); 

  }
  public style = (feature: Feature) => {

    var stroke = new Stroke({ color: 'black', width: 2 });
    if (feature.get('status') == 'delete')
      return null;
    let color;
    let fill;
    let radius;
    let width;
    let text;
    let offsetY;

    console.log('****************', feature);
    // if (feature.get('value')) {
    //   // feature.set('value', feature.get('value').replace(/'/g, "\""));
    //   this.featuresValue = JSON.parse(feature.get('value'));
    // }

    if (feature.get('value'))
      feature.get('value').forEach(eachFeatureValues => {
        // console.log('eachFeatureValues', eachFeatureValues)

        switch (eachFeatureValues.label) {
          case "رنگ":
            fill = eachFeatureValues.value
            break;
          case "ضخامت حاشیه":
            width = eachFeatureValues.value
            break;
          case "رنگ حاشیه":
            color = eachFeatureValues.value
            break;
          case "شعاع":
            radius = eachFeatureValues.value
            break;
          case "برچسب":
            text = eachFeatureValues.value
            break;
          default:
            break;
        }
      });
    let featureType

    featureType = feature.get('name');
    console.log('Name:', feature.get('name'));
    let returned
    switch (featureType) {
      case 'Point':
        returned = this.stylesService.pointStyle(color, width, fill, radius, text);
        break;
      case 'LineString':
        returned = this.stylesService.lineStringStyle(color, width, fill, text);
        break;
      case 'Polygon':
        returned = this.stylesService.polygonStyle(color, width, fill, text);
        break;
      case 'watchOut':
        returned = this.stylesService.watchOutStyle(fill, text, color, width, feature)
        break;
      case 'UnitFeature':
        returned = this.stylesService.UnitFeatureStyle(text, 5, offsetY, 0, 1, feature)
        break;
      case 'LimitLine':
        console.log('Limit Line', color, width, fill);
        returned = this.stylesService.LimitLine(color, width, fill);
        break;
    }
    return returned;
  };

  public removeInteractions(interactions) {
    let temp = this.mapService.getMap().getInteractions();
    temp.array_.forEach(element => {
      this.mapService.getMap().removeInteraction(interactions);
    });
  }

  public removeLayer(positionId): Observable<any> {
    return this.configService.delete('/deletepositionlayer-' + positionId);
  }

  public getCalkLayers(): Observable<any> {

    return this.configService.get('/favaclientlayer'
      , { withCredentials: true });
  }

  public getCalkPositionLayers(): Observable<any> {

    return this.configService.get('/getAllPositionLayer');
  }

  public getLayersFeature(id): Observable<any> {
    return this.configService.get('/getfavalayerfeatures-' + id
      , { withCredentials: true });
  }

  //<MN> برای گرفتن همه لایه ها
  public getLayersFeatures(): Observable<any> {
    return this.configService.get('/getfavalayerfeatures'
      , { withCredentials: true });
  }

  //<MN> برای ایجاد لایه
  public addLayer(body) {
    return this.configService.post('/positionlayer', body);
  }

  //<MN> برای ایجاد فیچر
  public postFeature(body) {
    return this.configService.post('/favalayerfeatures', body
      ,
      { withCredentials: true });
  }

  public getAllFeatureTypes(): Observable<any> {

    return this.configService.get('/getAllFeatureTypes'
    );
  }

  //برای ذخیره فیچر ها
  public saveFeatures(drawInteractions, vectorLayers) {
    this.groupingFeatures(vectorLayers);
    this.removeInteractions(drawInteractions);
  }
  public getAllUnit(): Observable<any> {
    return this.configService.get('/getAllUnit'
    );
  }
  //برای دسته بندی فیچر ها
  private groupingFeatures(vectorLayers) {

    let body = [];
    vectorLayers.forEach(eachVectorLayer => {
      let eachVectorLayerFeatures = eachVectorLayer.getSource().getFeatures();
      eachVectorLayerFeatures.forEach(eachNewFeature => {

        switch (eachNewFeature.getGeometry().getType()) {
          case "Point":
            this.featureTypeId = {
              "id": "1"
            };
            break;
          case "LineString":
            this.featureTypeId = {
              "id": "2"
            };
            break;
          case "Polygon":
            this.featureTypeId = {
              "id": "3"
            };
            break;
        }

        let positionLayer = {
          "id": eachVectorLayer.get('layerId')
        };

        let geometry = {};
        let mhd = {};

        mhd['positionLayer'] = positionLayer;
        if (eachNewFeature.get('name') == "Point" ||eachNewFeature.get('name') == "LineString" ||eachNewFeature.get('name') == "Polygon"){
          mhd['value'] = eachNewFeature.get('value');
        
        }
        else {
          mhd['value'] = eachNewFeature.get('valueForSaveThisFeature');
        }
        switch (eachNewFeature.get('status')) {
          case "add":
            mhd['type'] = "add";
            mhd['name'] = eachNewFeature.get('name')
            mhd['featureTypeId'] = this.featureTypeId;
            geometry['type'] = eachNewFeature.getGeometry().getType();
            geometry['coordinates'] = eachNewFeature.getGeometry().getCoordinates();
            mhd['geometry'] = geometry;
            body.push(mhd);
            eachNewFeature.set('status', undefined);
            break;

          case "update":
            mhd['id'] = eachNewFeature.get('id');
            mhd['type'] = "update";
            mhd['name'] = eachNewFeature.get('featureName')
            mhd['featureTypeId'] = this.featureTypeId;
            geometry['type'] = eachNewFeature.getGeometry().getType();
            geometry['coordinates'] = eachNewFeature.getGeometry().getCoordinates();
            mhd['geometry'] = geometry;
            body.push(mhd);
            eachNewFeature.set('status', undefined);
            break;

          case "delete":
            mhd['id'] = eachNewFeature.get('id');
            mhd['type'] = "delete";
            mhd['featureTypeId'] = this.featureTypeId;
            geometry['type'] = eachNewFeature.getGeometry().getType();
            geometry['coordinates'] = eachNewFeature.getGeometry().getCoordinates();
            mhd['geometry'] = geometry;
            body.push(mhd);
            eachVectorLayer.getSource().removeFeature(eachNewFeature);
            eachNewFeature.set('status', undefined);
            break;
        }
      });
    });
    if (body.length > 0) {
      this.requestToServer(body).subscribe(
        (data) => {
          vectorLayers.forEach(vectorLayer => {
          });
        }
      );
    } else {
      this.commonService.showEventMessage("هیچ تغییری برای ذخیره کردن وجود ندارد!", 5000);
    }

  }

  //ارسال ریکوئست لایه ها به سرور
  private requestToServer(body): Observable<any> {
    let sub = new Subject<any>();

    this.postFeature(body).subscribe(
      (data) => {
        // debugger
        this.commonService.showEventMessage("تغییرات با موفقیت ذخیره شد...");
        sub.next();
      },
      (error) => {
        // debugger
        console.log('error');
      }
    );
    return sub;
  }

  //پس از ذخیره فیچر ها در سرور یک بار همه فیچر ها گرفته میشوند.
  public refreshLayerFeatures(layer: VectorLayer) {
    this.getLayersFeature(layer.get('layerId')).subscribe(
      (data) => {

        var format = new GeoJSON({
          // dataProjection: 'EPSG:4326',
          // featureProjection: 'EPSG:3857'
        });

        var newFeatures = format.readFeatures(data);
        const source = layer.getSource();
        source.addFeatures(newFeatures);
      });
  }

  public pointerMode() {
    this.movement.setActive(false);
    this.modify.setActive(false);
    this.select.setActive(true);
    this.handStatus = false;
    this.pointerStatus = true;
    const that = this;
    this.select.on('select', function (evt) {

      console.log('************ evtsalar **************', evt);
      //یعنی اگر در جایی که کلیک شده بود فیچری وجود داشت
      if (evt.selected.length > 0) {
        that.movement.setActive(true);
        //یعنی اگر لاین و پولیگون بود
        if (evt.selected[0].getGeometry().getType() && evt.selected[0].getGeometry().getType() != "Point") {
          that.canModify = true;
        }//یعنی اگر نقطه بود  یا هیچی نبود
        else {

          that.modifyStatus = false;
          that.canModify = false;
        }
      }
      // یعنی اگه الان و قبل از الان روی فیچری  کلیک نشده
      else if (evt.deselected.length > 0) {
        that.movement.setActive(false);
        that.modifyStatus = false;
        that.modify.setActive(false);
        that.canModify = false;
        console.log('deselected');
        this.activeFeature = null;
        that.activeFeatureCahnge.next();
      }
    });
  }

  public handMode() {
    this.handStatus = true;
    this.modifyStatus = false;
    this.pointerStatus = false;
    this.movement.setActive(false);

    this.select.getFeatures().clear();
    this.select.setActive(false);
    this.modify.setActive(false);
    // console.log('ggg', this.mapService.getMap().getInteractions());

  }

  public modifyFeature() {
    this.modifyStatus = true;
    this.modify.setActive(true);
    this.movement.setActive(false);
    this.activeFeature.set('status', 'update');

  }

  public initializeInteractions() {
    this.mapService.getMap().addInteraction(this.modify);
    this.mapService.getMap().addInteraction(this.select);
    console.log('select interaction', this.select);
    const that = this;


    this.select.on('select', function (evt) {
      that.activeFeature = evt.selected[0];
      that.activeFeatureCahnge.next();

    });
    this.movement = new PointerInteraction({
      handleDownEvent: function (event) {
        that.handleDownEvent(event, that);
        return true;
      },
      handleDragEvent: function (event) {
        that.handleDragEvent(event, that);
      },
      //            handleUpEvent: handleUpEvent
    });
    that.mapService.getMap().addInteraction(that.movement);
    this.modify.setActive(false);

  }

  private handleDownEvent(event, that) {

    if (this.select.getFeatures().getArray().length == 0)
      return;
    that.startCoor = event.coordinate;
  }

  private handleDragEvent(event, that) {

    if (this.select.getFeatures().getArray().length == 0)
      return;

    console.log(event);
    let isChanged = true;
    var coor = event.coordinate;
    var deltaX = coor[0] - that.startCoor[0];
    var deltaY = coor[1] - that.startCoor[1];
    console.log('deltaX', deltaX, deltaY);
    that.startCoor = event.coordinate;
    console.log(that.activeFeature);
    if (that.activeFeature)
      that.activeFeature.getGeometry().translate(deltaX, deltaY);
    that.activeFeature.set('status', 'update');
  }

  // tension = 0.5;
  // numOfSegments = 15;

  refreshSmooth(source, feature, xy, isClosed, isMulti) {
    isMulti = isMulti || false;
    const curvedPoints = this.mmGetCurvePoints(xy, 0.5, isClosed, 6);

    console.log(curvedPoints);
    let i = 0;
    const coordinates = new Array();
    while (i < curvedPoints.length) {
      coordinates.push(new Array(curvedPoints[i], curvedPoints[i + 1]));
      i += 2;
    }

    const geometry = this.getGeometryByClosedAndMulti(coordinates, isClosed, isMulti);

    // console.log(xy.length, geometry.getCoordinates().length, coordinates.length, curvedPoints);

    if (feature) {
      feature.set('geometry', geometry);
      return feature;
    }

    feature = new Feature({
      geometry: geometry
    });
    feature.setGeometryName('geometry');
    feature.setGeometry(geometry);

    if (source)
      source.addFeature(feature);
    console.log(source, feature);
    return feature;
  };

  mmGetCurvePoints(ptsa, tension, isClosed, numOfSegments, ) {
    if (ptsa.length <= 2)
      return ptsa;

    tension = typeof tension === 'number' ? tension : 0.5;
    isClosed = typeof isClosed === 'boolean' ? isClosed : false;
    numOfSegments = typeof numOfSegments === 'number' ? numOfSegments : 16;

    const ptsaClone = ptsa.slice(0);
    let n = 0;
    if (isClosed) {
      ptsaClone.push(ptsa[0], ptsa[1], ptsa[2], ptsa[3]);
      n = 2;
      if (ptsa.length > 4) {
        ptsaClone.push(ptsa[4], ptsa[5]);
        n = 4;
      }
    }
    let _pts, res = [], /// clone array
      x, y, /// our x,y coords
      t1x, t2x, t1y, t2y, /// tension vectors
      c1, c2, c3, c4, /// cardinal points
      st, t, i, /// steps based on num. of segments
      pow3, pow2, /// cache powers
      pow32, pow23,
      p0, p1, p2, p3, /// cache points
      pl = ptsaClone.length;

    /// clone array so we don't change the original content
    _pts = ptsaClone.concat();

    _pts.unshift(ptsaClone[1]);					/// copy 1. point and insert at beginning
    _pts.unshift(ptsaClone[0]);
    _pts.push(ptsaClone[pl - 2], ptsaClone[pl - 1]);	/// copy last point and append

    /// 1. loop goes through point array
    /// 2. loop goes through each segment between the two points + one point before and after
    for (i = 2; i < pl; i += 2) {

      p0 = _pts[i];
      p1 = _pts[i + 1];
      p2 = _pts[i + 2];
      p3 = _pts[i + 3];

      /// calc tension vectors
      t1x = (p2 - _pts[i - 2]) * tension;
      t2x = (_pts[i + 4] - p0) * tension;

      t1y = (p3 - _pts[i - 1]) * tension;
      t2y = (_pts[i + 5] - p1) * tension;

      for (t = 0; t <= numOfSegments; t++) {
        /// calc step
        st = t / numOfSegments;

        pow2 = Math.pow(st, 2);
        pow3 = pow2 * st;
        pow23 = pow2 * 3;
        pow32 = pow3 * 2;

        /// calc cardinals
        c1 = pow32 - pow23 + 1;
        c2 = pow23 - pow32;
        c3 = pow3 - 2 * pow2 + st;
        c4 = pow3 - pow2;

        /// calc x and y cords with common control vectors
        x = c1 * p0 + c2 * p2 + c3 * t1x + c4 * t2x;
        y = c1 * p1 + c2 * p3 + c3 * t1y + c4 * t2y;

        /// store points in array
        res.push(x, y);
      }
    }

    if (isClosed) {
      const pivot = res.length - n * numOfSegments - n;
      const pivot2 = res.length - (n - 2) * numOfSegments - n;

      const newFirstlevelSegments = res.slice(pivot, pivot2);
      let returned = newFirstlevelSegments;
      returned = returned.concat(res.slice((n - 2) * numOfSegments, pivot));
      returned.push(returned[0], returned[1]);
      if (n === 2)
        returned = returned.slice((2 * numOfSegments), returned.length);

      return returned;
    }

    return res;
  };

  smoothFeature(layer, isClosed) {

    let pointWin,
      xy = [],
      feature;

    // this.handMode();
    let source = new VectorSource({ wrapX: false });

    let ct = 0;
    let that = this;
    let drawInteraction = new Draw({
      //  style: style,
      source: source,
      // source: layer.getSource(), 
      type: 'LineString',
      geometryFunction: function (coordinate, geometry) {
        if (geometry instanceof LineString)
          geometry.setCoordinates(coordinate);
        else
          geometry = new LineString(coordinate);

        xy.push(coordinate[coordinate.length - 1][0]);
        xy.push(coordinate[coordinate.length - 1][1]);

        feature = that.refreshSmooth(layer.getSource(), feature, xy, isClosed, false);

        if (coordinate.length > ct)
          ct = coordinate.length;
        else {
          xy.pop();
          xy.pop();
        }

        return geometry;
      }
    });

    return drawInteraction;
  };

  getGeometryByClosedAndMulti(coordinates, isClosed, isMulti) {
    if (isClosed && isMulti)
      return new Polygon([[coordinates]]);

    if (isClosed && !isMulti)
      return new Polygon([coordinates]);

    if (!isClosed && isMulti)
      return new MultiLineString([coordinates]);

    return new LineString(coordinates);
  };
}


