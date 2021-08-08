"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var xyz_1 = require("ol/source/xyz");
var map_1 = require("ol/map");
var graticule_1 = require("ol/graticule");
var stroke_1 = require("ol/style/stroke");
var tile_1 = require("ol/layer/tile");
var view_1 = require("ol/view");
var Proj_1 = require("ol/Proj");
var FileSaver_1 = require("file-saver/FileSaver");
// import View from 'ol/View.js';
// import {defaults as defaultControls} from 'ol/control.js';
var MousePosition_js_1 = require("ol/control/MousePosition.js");
// import OSM from 'ol/source/OSM.js';
var MapComponent = /** @class */ (function () {
    function MapComponent() {
        this.activeLayer = 'two';
        this.server = 'http://192.168.3.10:8080/TileServer/tile/';
        this.graticule = new graticule_1.default({
            strokeStyle: new stroke_1.default({
                color: 'rgba(255,120,0,0.9)',
                width: 2,
                lineDash: [0.5, 4]
            }),
            showLabels: true
        });
    }
    MapComponent.prototype.mousePosition = function () {
        var mousePositionControl = new MousePosition_js_1.default({
            //coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
        });
        console.log(this.map, 'gg');
        this.map.addControl(mousePositionControl);
    };
    MapComponent.prototype.changeBaseLayer = function (layer) {
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
    };
    MapComponent.prototype.printMap = function () {
        this.map.once('postcompose', function (event) {
            var canvas = event.context.canvas;
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(canvas.msSaveBlob(), 'map.png');
                console.log('if', navigator.msSaveBlob);
            }
            else {
                canvas.toBlob(function (blob) {
                    FileSaver_1.saveAs(blob, 'map.png');
                });
            }
        });
        this.map.renderSync();
    };
    MapComponent.prototype.zoomInMap = function () {
        // this.view.animate({zoom: this.view.getZoom() + 1}, {center: [0, 0]}, {duration: 200000000});
        this.view.animate({ zoom: this.view.getZoom() + 1 }, { duration: 200000000 });
        // this.view.setCenter([50000, 5151010]);
    };
    MapComponent.prototype.zoomOutMap = function () {
        this.view.animate({ zoom: this.view.getZoom() - 1 }, { center: [0, 0] }, { duration: 1 });
    };
    MapComponent.prototype.makeMapGraticule = function () {
        var ctrls = this.map.getControls().getArray();
        if (this.gratFlag === 0) {
            this.gratFlag = 1;
            this.map.removeControl(this.graticule);
        }
        else {
            this.gratFlag = 0;
            this.map.addControl(this.graticule);
        }
    };
    MapComponent.prototype.test = function () {
        this.graticule.setMap(null);
    };
    MapComponent.prototype.ngOnInit = function () {
        this.sourceOne = new xyz_1.default({
            url: this.server + 'vesat?x={x}&y={y}&z={z}'
        });
        this.sourceTwo = new xyz_1.default({
            url: this.server + 'osm?x={x}&y={y}&z={z}'
        });
        this.sourceThree = new xyz_1.default({
            url: 'http://192.168.3.10:8080/TileServer/tile/Map250Zone37-38?z={z}&x={x}&y={y}'
        });
        this.layer = new tile_1.default({
            source: this.sourceOne
        });
        this.view = new view_1.default({
            center: Proj_1.default.fromLonLat([6.661594, 50.433237]),
            zoom: 3,
            minZoom: 2,
            maxZoom: 20
        });
        this.map = new map_1.default({
            target: 'map',
            layers: [this.layer],
            view: this.view
        });
        this.mousePosition();
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'app-Map',
            templateUrl: './Map.component.html',
            styleUrls: ['./Map.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map