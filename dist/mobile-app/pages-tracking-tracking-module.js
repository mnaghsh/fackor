(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-tracking-tracking-module"],{

/***/ "./src/components/track-nav-bar/track-nav-bar.component.css":
/*!******************************************************************!*\
  !*** ./src/components/track-nav-bar/track-nav-bar.component.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-toolbar.mat-primary {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 10;\r\n  padding: 30px;\r\n}\r\n.container{\r\n  background-color: rgba(0, 0, 0, 0.66)!important;\r\n}\r\n.general-tools-btn .measure-menu{\r\n  margin: auto 6px auto;\r\n}\r\n.measure-selected{\r\n  font-size: 14px;\r\n}\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n  height: 35px;\r\n  display: block;\r\n  padding-right: 40px;\r\n  padding-left: 50px;\r\n  background-color: #161a21;\r\n  color: rgb(255, 165, 0);\r\n  padding-top: 4px;\r\n}\r\n.saveBtn{\r\n  font-size: 20px;\r\n  color: rgb(255, 165, 0);\r\n  cursor: pointer;\r\n}\r\n.general-tools-btn{\r\n  margin: auto 15px auto;\r\n}\r\n.enable{\r\n  color: #d0271b !important;\r\n }\r\n::ng-deep.tooltip {\r\n  position: relative;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  border-radius: 4px;\r\n  color: white;\r\n  padding: 4px 8px;\r\n  opacity: 0.7;\r\n  white-space: nowrap;\r\n}\r\n::ng-deep.tooltip-measure {\r\n  opacity: 1;\r\n  font-weight: bold;\r\n}\r\n::ng-deep.tooltip-static {\r\n  background-color: rgb(255, 165, 0);\r\n  color: black;\r\n  border: 1px solid white;\r\n}\r\n::ng-deep.tooltip-measure:before,\r\n::ng-deep.tooltip-static:before {\r\n  border-top: 6px solid rgba(0, 0, 0, 0.5);\r\n  border-right: 6px solid transparent;\r\n  border-left: 6px solid transparent;\r\n  content: \"\";\r\n  position: absolute;\r\n  bottom: -6px;\r\n  margin-left: -7px;\r\n  left: 50%;\r\n}\r\n::ng-deep.tooltip-static:before {\r\n  border-top-color: rgb(255, 165, 0);\r\n}\r\n::ng-deep.cdk-overlay-connected-position-bounding-box{\r\n  direction: ltr;\r\n}\r\n.edit-feature-btn{\r\n  background-color: rgba(254,255,203,0);\r\n  border: 0;\r\n}\r\nbutton.mat-menu-item:focus{\r\n   outline: 0;\r\n   outline: 0;\r\n}\r\n"

/***/ }),

/***/ "./src/components/track-nav-bar/track-nav-bar.component.html":
/*!*******************************************************************!*\
  !*** ./src/components/track-nav-bar/track-nav-bar.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <!-- حالت دست -->\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-hand-paper-o saveBtn\" (click)=\"calkService.handMode(this.pointer,this.modify,this.select)\"\r\n       [ngClass]=\"{'enable': calkService.handStatus}\"></i>\r\n  </span>\r\n  <!-- حالت پوینتر -->\r\n  <span class=\" general-tools-btn\" [ngClass]=\"{'enable': calkService.pointerStatus}\">\r\n    <i class=\"fa fa-mouse-pointer \" (click)=\"calkService.pointerMode()\"></i>\r\n  </span>\r\n\r\n  <!--<span class=\" general-tools-btn\">-->\r\n    <!--<i class=\"fa fa-eye show-bars-toggle\" size=\"1x\" (click)=\"showBarsToggle()\"></i>-->\r\n  <!--</span>-->\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-th-large show-bars-toggle\" [ngClass]=\"gratFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"graticuleToggle()\"></i>\r\n  </span>\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-search show-bars-toggle\" [ngClass]=\" dragBoxFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"zoomToBox()\"></i>\r\n  </span>\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-crosshairs show-bars-toggle\" [ngClass]=\" dragBoxFlag ? '':''\" size=\"1x\"\r\n       (click)=\"zoomToCoordinate()\"></i>\r\n  </span>\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-edit show-bars-toggle\" [ngClass]=\" measureFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"toggleMeasure()\"></i>\r\n  \r\n\r\n  <span [matMenuTriggerFor]=\"menu\" class=\"measure-menu\">\r\n    <i class=\"fa show-bars-toggle measure-selected\" [ngClass]=\"measureType == 'LineString' ? 'fa-line-chart' : 'fa-crop'\" size=\"1x\"></i>\r\n  </span>\r\n  <mat-menu #menu=\"matMenu\">\r\n    <button mat-menu-item (click)=\"changeMeasureType('LineString')\"\r\n            [ngClass]=\"measureType == 'LineString' ? 'enable' : ''\">\r\n      <i  class=\"fa fa-line-chart show-bars-toggle\" size=\"1x\" ></i>\r\n      <span>خط</span>\r\n    </button>\r\n    <button mat-menu-item (click)=\"changeMeasureType('Polygon')\"\r\n            [ngClass]=\"measureType == 'Polygon' ? 'enable' : ''\">\r\n      <i  class=\"fa fa-crop show-bars-toggle\" size=\"1x\" ></i>\r\n      <span>شکل</span>\r\n    </button>\r\n  </mat-menu>\r\n\r\n</span>\r\n</mat-toolbar>\r\n"

/***/ }),

/***/ "./src/components/track-nav-bar/track-nav-bar.component.ts":
/*!*****************************************************************!*\
  !*** ./src/components/track-nav-bar/track-nav-bar.component.ts ***!
  \*****************************************************************/
/*! exports provided: TrackNavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackNavBarComponent", function() { return TrackNavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_config_style_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/config-style.service */ "./src/services/config-style.service.ts");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var ol_graticule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/graticule */ "./node_modules/ol/graticule.js");
/* harmony import */ var ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/stroke */ "./node_modules/ol/style/stroke.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var _coordinate_dialog_coordinate_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../coordinate-dialog/coordinate-dialog.component */ "./src/components/coordinate-dialog/coordinate-dialog.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/style/Circle */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/Observable.js */ "./node_modules/ol/Observable.js");
/* harmony import */ var ol_sphere_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/sphere.js */ "./node_modules/ol/sphere.js");
/* harmony import */ var ol_layer_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/layer.js */ "./node_modules/ol/layer.js");
/* harmony import */ var ol_source_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/source.js */ "./node_modules/ol/source.js");
/* harmony import */ var ol_Overlay_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ol/Overlay.js */ "./node_modules/ol/Overlay.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var TrackNavBarComponent = /** @class */ (function () {
    function TrackNavBarComponent(configStyleService, mapService, calkService, dialog) {
        this.configStyleService = configStyleService;
        this.mapService = mapService;
        this.calkService = calkService;
        this.dialog = dialog;
        this.measureFlag = false;
        this.overLays = [];
        this.measureType = 'LineString';
        this.gratFlag = false;
        this.dragBoxFlag = false;
        this.graticule = new ol_graticule__WEBPACK_IMPORTED_MODULE_4__["default"]({
            strokeStyle: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                color: 'rgba(255,120,0,0.9)',
                width: 1.5,
                lineDash: [0.5, 4]
            }),
            lonLabelPosition: 0.18,
            latLabelPosition: 0.88,
            showLabels: true,
        });
    }
    TrackNavBarComponent.prototype.ngOnInit = function () {
    };
    TrackNavBarComponent.prototype.graticuleToggle = function () {
        if (this.gratFlag === true) {
            this.gratFlag = false;
            this.mapService.getMap().removeControl(this.graticule);
        }
        else {
            this.gratFlag = true;
            this.mapService.getMap().addControl(this.graticule);
        }
    };
    TrackNavBarComponent.prototype.zoomToBox = function () {
        var _this = this;
        this.dragBoxFlag = true;
        var map = this.mapService.getMap();
        var interActionsStatus = [];
        map.getInteractions().forEach(function (interAction) {
            interActionsStatus.push({ value: interAction, status: interAction.getActive() });
        });
        var drag = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__["default"]({
            geometryFunction: Object(ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__["createBox"])(),
            type: 'Circle'
        });
        map.addInteraction(drag);
        drag.on('drawend', function (evt) {
            _this.dragBoxFlag = false;
            var extent = evt.feature.getGeometry().getExtent();
            map.getView().fit(extent);
            map.removeInteraction(drag);
            interActionsStatus.forEach(function (interAction) {
                interAction.value.setActive(interAction.status);
            });
        });
    };
    TrackNavBarComponent.prototype.zoomToCoordinate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_coordinate_dialog_coordinate_dialog_component__WEBPACK_IMPORTED_MODULE_7__["CoordinateDialogComponent"], {
            data: {},
            width: "40%",
            height: "auto"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.mapService.getMap().getView().animate({ zoom: data.zoom }, { center: ol_proj__WEBPACK_IMPORTED_MODULE_9__["fromLonLat"]([data.lon, data.lat]) });
            }
        });
    };
    TrackNavBarComponent.prototype.addMeasureLayer = function () {
        var map = this.mapService.getMap();
        this.measureSource = new ol_source_js__WEBPACK_IMPORTED_MODULE_18__["Vector"]();
        this.measureLayer = new ol_layer_js__WEBPACK_IMPORTED_MODULE_17__["Vector"]({
            source: this.measureSource,
            style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_13__["default"]({
                fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_12__["default"]({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_14__["default"]({
                    radius: 7,
                    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_12__["default"]({
                        color: '#ffcc33'
                    })
                })
            })
        });
        map.addLayer(this.measureLayer);
    };
    TrackNavBarComponent.prototype.initMeasureTool = function () {
        this.addMeasureLayer();
        // map.getViewport().addEventListener('mouseout', function () {
        //   that.helpTooltipElement.classList.add('hidden');
        // });
        this.addInteraction(this.measureType);
    };
    TrackNavBarComponent.prototype.createHelpTooltip = function () {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new ol_Overlay_js__WEBPACK_IMPORTED_MODULE_19__["default"]({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.mapService.getMap().addOverlay(this.helpTooltip);
    };
    TrackNavBarComponent.prototype.createMeasureTooltip = function () {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new ol_Overlay_js__WEBPACK_IMPORTED_MODULE_19__["default"]({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.mapService.getMap().addOverlay(this.measureTooltip);
        this.overLays.push(this.measureTooltip);
    };
    TrackNavBarComponent.prototype.formatLength = function (line) {
        var length = Object(ol_sphere_js__WEBPACK_IMPORTED_MODULE_16__["getLength"])(line);
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'کیلومتر';
        }
        else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'متر';
        }
        return output;
    };
    TrackNavBarComponent.prototype.formatArea = function (polygon) {
        var area = Object(ol_sphere_js__WEBPACK_IMPORTED_MODULE_16__["getArea"])(polygon);
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'کیلومتر مربع';
        }
        else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'متر مربع';
        }
        return output;
    };
    TrackNavBarComponent.prototype.addInteraction = function (type) {
        var that = this;
        that.measureDraw = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__["default"]({
            source: that.measureSource,
            type: type,
            style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_13__["default"]({
                fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_12__["default"]({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_14__["default"]({
                    radius: 5,
                    stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_12__["default"]({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
        this.mapService.getMap().addInteraction(that.measureDraw);
        that.createMeasureTooltip();
        that.createHelpTooltip();
        var listener;
        that.measureDraw.on('drawstart', function (evt) {
            // set sketch
            that.sketch = evt.feature;
            /** @type {module:ol/coordinate~Coordinate|undefined} */
            var tooltipCoord = evt.coordinate;
            listener = that.sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_10__["default"]) {
                    output = that.formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                }
                else if (geom instanceof ol_geom_LineString__WEBPACK_IMPORTED_MODULE_11__["default"]) {
                    output = that.formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                that.measureTooltipElement.innerHTML = output;
                that.measureTooltip.setPosition(tooltipCoord);
            });
        }, this);
        that.measureDraw.on('drawend', function () {
            that.measureTooltipElement.className = 'tooltip tooltip-static';
            that.measureTooltip.setOffset([0, -7]);
            // unset sketch
            that.sketch = null;
            // unset tooltip so that a new one can be created
            that.measureTooltipElement = null;
            that.createMeasureTooltip();
            Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_15__["unByKey"])(listener);
        }, this);
    };
    TrackNavBarComponent.prototype.toggleMeasure = function () {
        var _this = this;
        if (this.measureFlag == false) {
            this.initMeasureTool();
        }
        else {
            this.mapService.getMap().removeInteraction(this.measureDraw);
            this.mapService.getMap().removeLayer(this.measureLayer);
            this.overLays.forEach(function (overLay) {
                _this.mapService.getMap().removeOverlay(overLay);
            });
        }
        this.measureFlag = !this.measureFlag;
    };
    TrackNavBarComponent.prototype.changeMeasureType = function (type) {
        this.measureType = type;
        if (this.measureFlag) {
            this.mapService.getMap().removeInteraction(this.measureDraw);
            this.addInteraction(type);
        }
    };
    TrackNavBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-track-nav-bar',
            template: __webpack_require__(/*! ./track-nav-bar.component.html */ "./src/components/track-nav-bar/track-nav-bar.component.html"),
            styles: [__webpack_require__(/*! ./track-nav-bar.component.css */ "./src/components/track-nav-bar/track-nav-bar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_config_style_service__WEBPACK_IMPORTED_MODULE_1__["ConfigStyleService"],
            fava_map__WEBPACK_IMPORTED_MODULE_2__["FavaMap"],
            _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__["CalkService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"]])
    ], TrackNavBarComponent);
    return TrackNavBarComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/tracking/components/settings/settings.component.css":
/*!**********************************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/components/settings/settings.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/mobile-app/pages/tracking/components/settings/settings.component.html":
/*!***********************************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/components/settings/settings.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<i class=\"fa fa-window-close \" size=\"3x\" mat-raised-button (click)=\"cancel()\">\r\n\r\n  &nbsp;</i>\r\n<p>تنظیمات مربوط به زمان ردگیری</p>\r\n<mat-divider></mat-divider>\r\n<br>\r\n<mat-radio-group [(ngModel)]=\"selectedItem\">\r\n  <div class=\"row\">\r\n    <mat-radio-button class=\"col-1\" value=\"hour\"></mat-radio-button>\r\n    <mat-form-field class=\"col-10\">\r\n      <input type=\"number\" [disabled]=\"selectedItem!='hour'\" matInput [(ngModel)]=\"refreshTime.hour\" placeholder=\" زمان به ساعت \" />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"row\">\r\n    <mat-radio-button class=\"col-1\" value=\"miniute\"></mat-radio-button>\r\n    <mat-form-field class=\"col-10\">\r\n      <input type=\"number\" [disabled]=\"selectedItem!='miniute'\" matInput [(ngModel)]=\"refreshTime.miniute\" placeholder=\" زمان به دقیقه \"\r\n      />\r\n    </mat-form-field>\r\n  </div>\r\n  <div class=\"row\">\r\n    <mat-radio-button class=\"col-1\" value=\"sit\"></mat-radio-button>\r\n    <mat-form-field class=\"col-10\">\r\n      <input type=\"number\" [disabled]=\"selectedItem!='sit'\" matInput [(ngModel)]=\"refreshTime.sit\" placeholder=\" زمان به ثانیه \" />\r\n    </mat-form-field>\r\n  </div>\r\n</mat-radio-group>\r\n<i class=\"fa fa-check \" size=\"2x\" (click)=\"ok()\"> </i>"

/***/ }),

/***/ "./src/mobile-app/pages/tracking/components/settings/settings.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/components/settings/settings.component.ts ***!
  \*********************************************************************************/
/*! exports provided: SettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsComponent", function() { return SettingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_services_users_users_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_tracking_tracking_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/tracking/tracking.service */ "./src/services/tracking/tracking.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





//<MN>
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dialogRef, data, usersService, trackingService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.usersService = usersService;
        this.trackingService = trackingService;
        this.selectedItem = "sit";
        this.refreshTime = {
            hour: undefined,
            miniute: undefined,
            sit: undefined
        };
        this.getRefreshTime().subscribe();
    }
    SettingsComponent.prototype.ok = function () {
        if (this.refreshTime[this.selectedItem] >= 0) {
            switch (this.selectedItem) {
                case "miniute": {
                    this.mhd = this.refreshTime[this.selectedItem] * 60;
                    this.dialogRef.close(this.mhd);
                    break;
                }
                case "hour": {
                    this.mhd = this.refreshTime[this.selectedItem] * 3600;
                    this.dialogRef.close(this.mhd);
                    break;
                }
                default: {
                    this.mhd = this.refreshTime[this.selectedItem];
                    this.dialogRef.close(this.mhd);
                    break;
                }
            }
            this.trackingService.updateRefreshTime(this.data, this.mhd).subscribe();
        }
        else {
            console.log('خطا');
        }
    };
    SettingsComponent.prototype.cancel = function () {
        this.dialogRef.close();
    };
    SettingsComponent.prototype.getRefreshTime = function () {
        var _this = this;
        var mhd = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.trackingService.getRefreshTime(this.data).subscribe(function (response) {
            console.log('response', response);
            _this.refreshTime.sit = response['refreshtime'];
            mhd.next();
        });
        return mhd;
    };
    SettingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-settings',
            template: __webpack_require__(/*! ./settings.component.html */ "./src/mobile-app/pages/tracking/components/settings/settings.component.html"),
            styles: [__webpack_require__(/*! ./settings.component.css */ "./src/mobile-app/pages/tracking/components/settings/settings.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, src_services_users_users_service__WEBPACK_IMPORTED_MODULE_2__["UsersService"],
            _services_tracking_tracking_service__WEBPACK_IMPORTED_MODULE_3__["TrackingService"]])
    ], SettingsComponent);
    return SettingsComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/tracking/index/index.component.css":
/*!*****************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/index/index.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-bar {\r\n  /*position: absolute;*/\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #eee;\r\n}\r\n\r\n.mat-tab-link {\r\n  color: black;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\nmat-sidenav {\r\n  /* width: 15%; */\r\n  direction: rtl;\r\n  background-color: rgba(0, 0, 0, 0.45);\r\n  z-index: 3;\r\n  position: absolute;\r\n\r\n}\r\n\r\nfa {\r\n  float: left;\r\n  padding: 1%;\r\n  color: orange;\r\n}\r\n\r\n/*\r\nmat-sidenav-content {\r\n} */\r\n\r\nmat-list-item {\r\n  cursor: pointer;\r\n  direction: ltr;\r\n}\r\n\r\n.containers {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1999;\r\n}\r\n\r\n.containers > * {\r\n  width: 100%;\r\n}\r\n\r\nmat-chip.leftChips {\r\n  border-top-right-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #eee !important;\r\n  color: black !important;\r\n}\r\n\r\n.mat-standard-chip {\r\n  border-radius: 0px;\r\n}\r\n\r\nmat-chip.rightChips {\r\n  border-top-left-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #dcf8c6 !important;\r\n}\r\n\r\n.button {\r\n  direction: ltr !important;\r\n  overflow-y: auto;\r\n}\r\n\r\n.contactLabel {\r\n  /* padding: 1%; */\r\n  padding: 1%;\r\n}\r\n\r\n.label {\r\n  padding-left: 20px;\r\n  color: white;\r\n  font-size: 12px;\r\n  display: block;\r\n}\r\n\r\n.userDetails {\r\n  white-space: nowrap;\r\n}\r\n\r\n.userDetailsss {\r\n  display: block;\r\n}\r\n\r\n.input {\r\n  /* min-width: 150px!important;\r\n  max-width: 500px!important; */\r\n  width: 92% !important;\r\n  border: 0;\r\n  padding: 10px;\r\n}\r\n\r\n.input-full-width {\r\n  width: 100% !important;\r\n}\r\n\r\n.leftChips {\r\n  direction: rtl;\r\n  padding: 0 10px;\r\n\r\n}\r\n\r\n.rightChips {\r\n  color: black !important;\r\n  padding: 0 10px;\r\n}\r\n\r\n.sendBotton {\r\n  width: 5% !important;\r\n  float: right;\r\n\r\n}\r\n\r\n.sidNavTitle {\r\n  background: orange;\r\n}\r\n\r\n.toggle {\r\n  color: black\r\n}\r\n\r\n.leftMenuButton {\r\n  position: absolute;\r\n  z-index: 19000;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n\r\n.showBarsToggle{\r\n  position: absolute;\r\n  z-index: 19000;\r\n  left: 50px;\r\n  top: 0;\r\n}\r\n\r\n.position {\r\n  font-size: 12px;\r\n  color: yellow;\r\n  white-space: nowrap;\r\n}\r\n\r\n.mat-expansion-panel-spacing {\r\n  margin: 0;\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel {\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel-header-title {\r\n  color: #fff;\r\n}\r\n\r\n.mat-expansion-indicator {\r\n  color: orange !important;\r\n}\r\n\r\n.mat-chip.mat-standard-chip {\r\n  background-color: inherit\r\n}\r\n\r\n.mat-tab-link {\r\n  color: white;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  /* margin: 10px; */\r\n  /* border: 1px solid #555; */\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.custom-mouse-position {\r\n\r\n}\r\n\r\nmat-sidenav {\r\n  width: 85vw !important;\r\n  min-width: 200px !important;\r\n  max-width: 300px !important;\r\n  /*direction: rtl;*/\r\n}\r\n\r\n.label {\r\n  padding-right: 10px;\r\n}\r\n\r\nnav {\r\n  /*direction: rtl !important;*/\r\n}\r\n\r\n.map {\r\n  position: fixed;\r\n  top: 35px;\r\n  bottom: 0px;\r\n  right: 0;\r\n  left: 0;\r\n}\r\n\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n  height: 45px;\r\n  display: block;\r\n}\r\n\r\n.mat-button {\r\n  padding-top: 2px;\r\n}\r\n\r\n.mat-menu-content {\r\n  padding-top: 0px;\r\n  padding-bottom: 0px;\r\n}\r\n\r\nbutton.mat-menu-item {\r\n  width: 100%;\r\n  height: 100%;\r\n  text-align: center;\r\n}\r\n\r\n.menu-header {\r\n  text-align: center;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n}\r\n\r\n.activeLayer {\r\n  background-color: #e9e3ff;\r\n}\r\n\r\n.layerButton {\r\n  outline: 0px dotted;\r\n  outline: 0px auto -webkit-focus-ring-color;\r\n}\r\n\r\n.toolbar {\r\n  /*background-color: rgba(0, 0, 0, 0.7) !important;*/\r\n  background-color: #161a21;\r\n  z-index: 11;\r\n  color: orange;\r\n  position: absolute;\r\n  padding-right: 3.5%;\r\n  padding-top: 0.5%;\r\n  /* margin-right: 1.5% */\r\n}\r\n\r\ndp-date-picker.dp-material .dp-picker-input{\r\n  width: 0 !important;\r\n}\r\n\r\n.iBtn{\r\n  color:white;\r\n  font-size:18px;\r\n}\r\n\r\n.summery{\r\n  position: absolute;\r\n}\r\n\r\n.calk-map {\r\n  position: absolute;\r\n  top: 35px;\r\n  bottom: 0px;\r\n  right: 0;\r\n  left: 0;\r\n}\r\n\r\n#scale-line-box{\r\n  top: 43px;\r\n  left: 42px;\r\n  border-bottom: 5px #ffa500 dashed;\r\n  text-align: left !important;\r\n  border-top-left-radius: 8px;\r\n  border-top-right-radius: 8px;\r\n\r\n}\r\n\r\n#mouse-position{\r\n  bottom: 72px;\r\n  left: 5px;\r\n  padding-right: 5px;\r\n  padding-left: 5px;\r\n  border-radius: 8px;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/tracking/index/index.component.html":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/index/index.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"example-container tracking\" autosize hasBackdrop=\"true\">\r\n  <mat-sidenav opened=true position=\"end\" #drawer mode=\"over\">\r\n    <mat-list role=\"list\">\r\n      <mat-list-item class=\"sidNavTitle\">\r\n        <fa name=\"fas fa-align-justify\" size=\"1x\" (click)=\"drawer.toggle()\" class=\"toggle\"></fa>\r\n        <span class=\"label\">ردگیری</span>\r\n      </mat-list-item>\r\n      <mat-accordion>\r\n        <mat-expansion-panel (opened)=\"panelOpenState = true\" (closed)=\"panelOpenState = false\"\r\n                             *ngFor=\"let orgForFight of orgForFightUsers\">\r\n          <mat-expansion-panel-header *ngIf=\"activeUserInfo.username !== orgForFight.user.username\">\r\n            <mat-panel-title class=\"messanger-users\">\r\n              <fa name=\"fa fa-user-circle-o\" class=\"contactLabel\"\r\n                  [ngClass]=\"getUserStatus(orgForFight.user.id) ? 'text-success' : 'text-danger'\"\r\n                  size=\"1x\"></fa>\r\n              &nbsp;\r\n              <span class=\"label .iBtn\" *ngIf=\"orgForFight.user.lastname!=null\">\r\n                {{orgForFight.user.firstname}} {{orgForFight.user.lastname}}\r\n              </span>\r\n              <span class=\"label\" *ngIf=\"orgForFight.user.lastname==null\">\r\n                {{orgForFight.user.username}}\r\n              </span>\r\n              <span class=\"position\">\r\n                <span class=\"commander\">فرمانده: </span>\r\n                {{orgForFight.orgForFight.unit.text}} - {{orgForFight.orgForFight.unit.name}}\r\n              </span>\r\n\r\n            </mat-panel-title>\r\n          </mat-expansion-panel-header>\r\n          <div dir=\"rtl\">\r\n            <mat-list-item>\r\n              <mat-chip class=\"col col-2\" *ngIf=\"!orgForFight.play\">\r\n                <i matTooltip=\"شروع ردگیری\" class=\"fa fa-play float-right iBtn\" (click)=\"startTrack(orgForFight)\"[ngClass]=\"getUserStatus(orgForFight.user.id) ? 'text-success' : 'text-danger'\" ></i>\r\n              </mat-chip>\r\n              <mat-chip class=\"col col-2\" *ngIf=\"orgForFight.play\">\r\n                <i matTooltip=\"توقف ردگیری\" class=\"fa fa-pause iBtn\" (click)=\"stopTrack(orgForFight)\"></i>\r\n              </mat-chip>\r\n              <mat-chip class=\"col col-2\">\r\n                <i matTooltip=\"پاکسازی\" class=\"fa fa-eraser iBtn\" (click)=\"clear(orgForFight)\"></i>\r\n              </mat-chip>\r\n              <mat-chip class=\"col col-2\">\r\n                <i matTooltip=\"سابقه ردگیری\" class=\"fa fa-history iBtn\" (click)=\"showInputs(orgForFight)\"></i>\r\n              </mat-chip>\r\n              <mat-chip class=\"col col-2\">\r\n                <i matTooltip=\"تنظیمات\" class=\"fa fa-cog iBtn\" (click)=\"settings(orgForFight)\"></i>\r\n              </mat-chip>\r\n              <div class=\"col col-2\">\r\n                <mat-slide-toggle (change)=\"changeVisibilityLayer(orgForFight)\"\r\n                                  [(ngModel)]=\"orgForFight.visibilityLayer\">\r\n\r\n                </mat-slide-toggle>\r\n              </div>\r\n            </mat-list-item>\r\n            <mat-list-item *ngIf=\"orgForFight.inputs\">\r\n              <dp-date-picker dir=\"rtl\" theme=\"dp-material\" [(ngModel)]=\"orgForFight['start']\" mode=\"daytime\"\r\n                              placeholder=\" از ساعت\" class=\"datePicker\">\r\n              </dp-date-picker>\r\n            </mat-list-item>\r\n            <mat-list-item *ngIf=\"orgForFight.inputs\">\r\n              <dp-date-picker dir=\"rtl\" theme=\"dp-material\" [(ngModel)]=\"orgForFight['end']\" mode=\"daytime\"\r\n                              placeholder=\"تا ساعت \" class=\"datePicker\">\r\n              </dp-date-picker>\r\n            </mat-list-item>\r\n            <mat-list-item *ngIf=\"orgForFight.inputs\">\r\n              <i matTooltip=\"تایید\" class=\"fa fa-check iBtn \" (click)=\"enableHistory(orgForFight)\"></i>\r\n\r\n            </mat-list-item>\r\n          </div>\r\n        </mat-expansion-panel>\r\n      </mat-accordion>\r\n    </mat-list>\r\n  </mat-sidenav>\r\n  <mat-sidenav-content>\r\n    <!-- <mat-toolbar class=\"toolbar\">\r\n      <button mat-button [matMenuTriggerFor]=\"menus\">\r\n        <fa name=\"fas fa-clone\"></fa>\r\n      </button>\r\n      <mat-menu #menus='matMenu' class=\"layersMenu\">\r\n        <div class=\"menu-header\">لایه ها</div>\r\n        <button mat-menu-item [ngClass]=\"{'activeLayer': activeLayer === 'one'}\" (click)=\"changeBaseLayer('one')\" class=\"layerButton\">\r\n          <img src=\"./assets/img/preview-vegetation.png\" width=\"60px\">\r\n        </button>\r\n        <button mat-menu-item [ngClass]=\"{'activeLayer': activeLayer === 'two'}\" (click)=\"changeBaseLayer('two')\" class=\"layerButton\">\r\n          <img src=\"./assets/img/preview-bing.png\" width=\"60px\">\r\n        </button>\r\n        <button mat-menu-item [ngClass]=\"{'activeLayer': activeLayer === 'three'}\" (click)=\"changeBaseLayer('three')\" class=\"layerButton\">\r\n          <img src=\"./assets/img/preview-google.png\" width=\"60px\">\r\n        </button>\r\n      </mat-menu>\r\n      <button mat-button (click)=\"printMap()\">\r\n        <fa name=\"fas fa-print\"></fa>\r\n      </button>\r\n      <button mat-button (click)=\"zoomInMap()\">\r\n        <fa name=\"fas fa-search-plus\"></fa>\r\n      </button>\r\n      <button mat-button (click)=\"zoomOutMap()\">\r\n        <fa name=\"fas fa-search-minus\"></fa>\r\n      </button>\r\n      <button mat-button (click)=\"makeMapGraticule()\">\r\n        <fa name=\"fas fa-th-large\"></fa>\r\n      </button>\r\n      <div [ngStyle]=\"{left: fromLeft + 'px', top: fromTop + 'px'}\" *ngIf=\"visibility\" class=\"summery\">{{summery | jalali}}</div>\r\n -->\r\n\r\n    <mobile-app-track-nav-bar></mobile-app-track-nav-bar>\r\n    <fa name=\"fas fa-align-justify\" class=\"leftMenuButton\" size=\"1x\" (click)=\"drawer.toggle()\"></fa>\r\n    <fa name=\"fas fa-eye\" class=\"showBarsToggle\" size=\"1x\" (click)=\"showBarsToggle()\"></fa>\r\n    <div id=\"calk-map\" class=\"calk-map\"></div>\r\n    <div id=\"mouse-position\" class=\"mouse-position calk-control\"></div>\r\n    <div id=\"scale-line-box\" class=\"scale-line-box calk-control\"></div>\r\n  </mat-sidenav-content>\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/tracking/index/index.component.ts":
/*!****************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/index/index.component.ts ***!
  \****************************************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_users_users_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/users/users.service */ "./src/services/users/users.service.ts");
/* harmony import */ var _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/local-storage/local-storage.service */ "./src/services/local-storage/local-storage.service.ts");
/* harmony import */ var _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/socket/socket.service */ "./src/services/socket/socket.service.ts");
/* harmony import */ var _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/messages/messages.service */ "./src/services/messages/messages.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var fava_layer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! fava-layer */ "./node_modules/fava-layer/fesm5/fava-layer.js");
/* harmony import */ var _services_tracking_tracking_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../services/tracking/tracking.service */ "./src/services/tracking/tracking.service.ts");
/* harmony import */ var _services_config_style_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../services/config-style.service */ "./src/services/config-style.service.ts");
/* harmony import */ var src_mobile_app_pages_tracking_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/mobile-app/pages/tracking/components/settings/settings.component */ "./src/mobile-app/pages/tracking/components/settings/settings.component.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var ol_control_MousePosition__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/control/MousePosition */ "./node_modules/ol/control/MousePosition.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_control_ZoomSlider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/control/ZoomSlider */ "./node_modules/ol/control/ZoomSlider.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var _services_config_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../services/config.service */ "./src/services/config.service.ts");
/* harmony import */ var _services_common_common_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../services/common/common.service */ "./src/services/common/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var mousePositionControl = new ol_control_MousePosition__WEBPACK_IMPORTED_MODULE_14__["default"]({
    undefinedHTML: 'نشانگر در نقشه نیست'
});
var IndexComponent = /** @class */ (function () {
    function IndexComponent(userService, dialog, localStorage, socketService, messageService, bottomSheet, mapService, route, usersService, myRoute, configService, injector, commonService, trackService, configStyleService) {
        this.userService = userService;
        this.dialog = dialog;
        this.localStorage = localStorage;
        this.socketService = socketService;
        this.messageService = messageService;
        this.bottomSheet = bottomSheet;
        this.mapService = mapService;
        this.route = route;
        this.usersService = usersService;
        this.myRoute = myRoute;
        this.configService = configService;
        this.injector = injector;
        this.commonService = commonService;
        this.trackService = trackService;
        this.configStyleService = configStyleService;
        this.trackTime = 99999999999999;
        this.visibility = false;
        this.intervals = [];
        this.orgForFightUsers = [];
        this.mode = true;
        this.currentUserId = this.usersService.getUserInfo().id;
        this.CurrentUserActiveMission = this.usersService.getMission().id;
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        var refreshMap = function () {
            _this.mapService.setTarget('');
            _this.mapService.setTarget('calk-map');
        };
        this.mapService.getMap().on('change:view', refreshMap);
        this.activeUserInfo = this.userService.getUserInfo();
        this.getUsers();
        // if (this.trackService.canInitLayers) {
        this.trackService.moduleMap = new Map();
        this.initializeMap();
        this.initializeUsersLayer();
        this.trackService.canInitLayers = false;
        // }
        // const iconFeature = new Feature(new Point([31, 54]));
        // const temp = new VectorLayer({
        //   zIndex: 2000000,
        //   source: new VectorSource({features: [iconFeature]})
        // })
        // this.mapService.getMap().addLayer(temp)
        var myMap = new ol_Map__WEBPACK_IMPORTED_MODULE_17__["default"]({
            target: 'calk-map'
        });
        this.mapService.setMap(myMap);
        refreshMap();
        console.log(this.mapService.getMap().getInteractions());
        var me = this;
        this.addMousePosition();
        this.addScaleLine();
        this.addZoomSlider();
        // this.mapService.getMap().on('click', function (evt) {
        //   // me.displayFeatureInfo(evt.pixel, evt);
        // });
    };
    IndexComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.orgForFightUsers.forEach(function (orgForFightUser) {
            var trackModule = _this.trackService.moduleMap.get(orgForFightUser.user.id);
            trackModule.stopTrack();
            clearInterval(orgForFightUser.myIntervalId);
            trackModule.trackLayer.setVisible(true);
            trackModule.historyLayer.setVisible(true);
            _this.clear(orgForFightUser).subscribe();
        });
    };
    IndexComponent.prototype.initializeMap = function () {
        var _this = this;
        this.favaLayer = new fava_layer__WEBPACK_IMPORTED_MODULE_9__["FavaLayer"](this.mapService, this.injector);
        this.favaLayer.run("../assets/2ndTileLayer.json").subscribe(function () {
            var view = new ol_View__WEBPACK_IMPORTED_MODULE_7__["default"]({
                center: [0, 0],
                zoom: 3,
                minZoom: 2,
                maxZoom: 11
            });
            _this.mapService.getMap().setView(view);
        });
    };
    IndexComponent.prototype.initializeUsersLayer = function () {
        var _this = this;
        this.orgForFightUsers.forEach(function (orgForFightUser) {
            var mhd = _this.favaLayer.addLayer({
                type: ".TrackLayer",
                liveUrl: _this.configService.localVariables.baseUrl + "/lastuserposition",
                liveBody: {
                    id: orgForFightUser.user.id
                },
                historyUrl: _this.configService.localVariables.baseUrl + "/searchtrackdata",
                historyBody: {}
            });
            _this.trackService.moduleMap.set(orgForFightUser.user.id, mhd);
        });
    };
    // findLivePointTime(trackModule, orgForFight) {
    // }
    //<MN>
    IndexComponent.prototype.startTrack = function (orgForFight) {
        if (!this.getUserStatus(orgForFight.user.id)) {
            debugger;
            this.commonService.showEventMessage("شخص مورد نظر به شبکه متصل نیست!");
            return;
        }
        this.commonService.showEventMessage("شروع ردگیری...");
        orgForFight.play = !orgForFight.play;
        this.refreshtime = Number(orgForFight.refreshtime);
        var trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
        trackModule.startTrack([{
                "sender": { "id": orgForFight.user.id }
            }], this.refreshtime);
        this.callHistory(trackModule, orgForFight); //set interval for geting history with refreshTime
    };
    //<MN>
    IndexComponent.prototype.callHistory = function (trackModule, orgForFight) {
        var _this = this;
        console.log('trackModule.trackLayer.getSource()', trackModule.trackLayer.getSource());
        console.log('trackModule.trackLayer.getSource()', trackModule.historyLayer.getSource());
        orgForFight.myIntervalId = setInterval(function () {
            _this.updateMinestTime(trackModule.trackLayer.getSource());
            _this.updateMinestTime(trackModule.historyLayer.getSource());
            trackModule.enableHistory([{
                    sender: {
                        id: orgForFight.user.id
                    },
                    mission: {
                        id: _this.CurrentUserActiveMission
                    },
                    start_time: _this.trackTime
                }]);
        }, Number(this.refreshtime) * 1000);
    };
    IndexComponent.prototype.updateMinestTime = function (source) {
        var _this = this;
        debugger;
        //find minimum time between liveTrack and historyTrack.
        var features = source.getFeatures();
        // debugger
        // if (features.length > 0) {
        features.forEach(function (element) {
            console.log('element', element.values_.time);
            console.log('mhdtracktimeBefore', _this.trackTime);
            if (element.values_.time && _this.trackTime > element.values_.time)
                _this.trackTime = element.values_.time;
            console.log('mhdtracktimeAfter', _this.trackTime);
        });
        // }
    };
    //<MN>
    IndexComponent.prototype.stopTrack = function (orgForFight) {
        var trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
        //stop kardane interval dakhele fava layer
        trackModule.stopTrack();
        //stop kardane interval dakhele fakur
        clearInterval(orgForFight.myIntervalId);
        orgForFight.play = !orgForFight.play;
    };
    IndexComponent.prototype.enableHistory = function (orgForFight) {
        var s = new Date(orgForFight['start']);
        var e = new Date(orgForFight['end']);
        var trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
        console.log(' history', trackModule.historyLayer.getSource().getFeatures());
        trackModule.enableHistory([{
                sender: {
                    id: orgForFight.user.id
                },
                mission: {
                    id: this.CurrentUserActiveMission
                },
                start_time: s.getTime(),
                end_time: e.getTime()
            }]);
    };
    //<MN>
    IndexComponent.prototype.clear = function (orgForFight) {
        var sub = new rxjs__WEBPACK_IMPORTED_MODULE_13__["Subject"]();
        var trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
        //call disableHistory in fava layer.remove all historyLayer feature.
        trackModule.disableHistory();
        trackModule.removeFeatures(trackModule.trackLayer);
        //set track time largest for it not be undefined.
        this.trackTime = 99999999999999;
        console.log(' this.trackTime', this.trackTime);
        sub.next();
        return sub;
    };
    IndexComponent.prototype.changeVisibilityLayer = function (orgForFight) {
        var trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
        trackModule.trackLayer.setVisible(orgForFight.visibilityLayer);
        trackModule.historyLayer.setVisible(orgForFight.visibilityLayer);
    };
    IndexComponent.prototype.getUsers = function () {
        this.orgForFightUsers = this.userService.getOrgForFightUsers();
        console.log('this.orgForFightUsers', this.orgForFightUsers);
        this.orgForFightUsers.forEach(function (orgForFightUser) {
            orgForFightUser.visibilityLayer = true;
        });
    };
    IndexComponent.prototype.showBarsToggle = function () {
        this.configStyleService.showNavBar.next();
    };
    IndexComponent.prototype.getUserStatus = function (id) {
        return this.socketService.userIsOnline(id);
    };
    IndexComponent.prototype.navigate = function (element) {
        element.play = !element.play;
        console.log('element', element);
    };
    IndexComponent.prototype.showInputs = function (element) {
        element.inputs = !element.inputs;
    };
    IndexComponent.prototype.settings = function (orgForFight) {
        var _this = this;
        console.log('orgForFight', orgForFight);
        var dialogRef = this.dialog.open(src_mobile_app_pages_tracking_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_12__["SettingsComponent"], {
            data: orgForFight.user.id
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                console.log('dataa', data);
                orgForFight.refreshtime = data;
                _this.clear(orgForFight).subscribe(function (data) {
                    _this.startTrack(orgForFight);
                });
            }
        });
    };
    IndexComponent.prototype.displayFeatureInfo = function (pixel, evt) {
        var me = this;
        var feature = this.mapService.getMap().forEachFeatureAtPixel(pixel, function (feature) {
            return feature;
        });
        if (feature) {
            console.log('ha ha', feature);
            console.log('feature.values_.senderId.lastname', feature.values_);
            this.visibility = true;
            this.fromLeft = evt.pointerEvent.clientX;
            this.fromTop = evt.pointerEvent.clientY;
            // this.summery = feature.values_.senderId.lastname;
            this.summery = feature.values_.time;
            var mmhd = feature.values_.mission.lastname;
        }
        else {
            console.log('&nbsp;');
            this.visibility = false;
        }
        // if (feature !== me.highlight) {
        //   if (me.highlight) {
        //     if (me.highlight.getGeometry().getType() == 'Point')
        //       me.highlight.setStyle(pointStyle);
        //     else
        //       me.highlight.setStyle(style);
        //   }
        //   if (feature) {
        //     if (feature.getGeometry().getType() == 'Point')
        //       feature.setStyle(pointStyle);
        //     else
        //       feature.setStyle(highlightStyle);
        //   }
        //   me.highlight = feature;
        // }
    };
    IndexComponent.prototype.addMousePosition = function () {
        var mousePositionCtrl = new ol_control_MousePosition__WEBPACK_IMPORTED_MODULE_14__["default"]({
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: 'mouse-position',
            undefinedHTML: '&nbsp;'
        });
        this.mapService.getMap().addControl(mousePositionCtrl);
    };
    IndexComponent.prototype.addScaleLine = function () {
        var scaleLineCtrl = new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_15__["default"]({
            target: 'scale-line-box',
            className: 'scale-line-box',
        });
        this.mapService.getMap().addControl(scaleLineCtrl);
    };
    IndexComponent.prototype.addZoomSlider = function () {
        var myFunc = function (e) {
            var s = document.getElementsByClassName('ol-zoomslider-thumb ol-unselectable');
            s[0].innerHTML = e.map.getView().getZoom().toFixed();
        };
        var zoomSliderCtrl = new ol_control_ZoomSlider__WEBPACK_IMPORTED_MODULE_16__["default"]();
        this.mapService.getMap().addControl(zoomSliderCtrl);
        this.mapService.getMap().on('moveend', myFunc);
    };
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/mobile-app/pages/tracking/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/mobile-app/pages/tracking/index/index.component.css")]
        }),
        __metadata("design:paramtypes", [_services_users_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _services_local_storage_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"],
            _services_socket_socket_service__WEBPACK_IMPORTED_MODULE_3__["SocketService"],
            _services_messages_messages_service__WEBPACK_IMPORTED_MODULE_4__["MessagesService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            fava_map__WEBPACK_IMPORTED_MODULE_6__["FavaMap"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"],
            _services_users_users_service__WEBPACK_IMPORTED_MODULE_1__["UsersService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"],
            _services_config_service__WEBPACK_IMPORTED_MODULE_18__["ConfigService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _services_common_common_service__WEBPACK_IMPORTED_MODULE_19__["CommonService"],
            _services_tracking_tracking_service__WEBPACK_IMPORTED_MODULE_10__["TrackingService"],
            _services_config_style_service__WEBPACK_IMPORTED_MODULE_11__["ConfigStyleService"]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/tracking/tracking-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/mobile-app/pages/tracking/tracking-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: TrackingRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackingRoutingModule", function() { return TrackingRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/tracking/index/index.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _index_index_component__WEBPACK_IMPORTED_MODULE_2__["IndexComponent"],
        children: []
    }
];
var TrackingRoutingModule = /** @class */ (function () {
    function TrackingRoutingModule() {
    }
    TrackingRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TrackingRoutingModule);
    return TrackingRoutingModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/tracking/tracking.module.ts":
/*!**********************************************************!*\
  !*** ./src/mobile-app/pages/tracking/tracking.module.ts ***!
  \**********************************************************/
/*! exports provided: TrackingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackingModule", function() { return TrackingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _tracking_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tracking-routing.module */ "./src/mobile-app/pages/tracking/tracking-routing.module.ts");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/tracking/index/index.component.ts");
/* harmony import */ var fava_layer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fava-layer */ "./node_modules/fava-layer/fesm5/fava-layer.js");
/* harmony import */ var ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-jalali-date-picker */ "./node_modules/ng2-jalali-date-picker/ng2-jalali-date-picker.es5.js");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../pipes/pipes.module */ "./src/pipes/pipes.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_mobile_app_pages_tracking_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/mobile-app/pages/tracking/components/settings/settings.component */ "./src/mobile-app/pages/tracking/components/settings/settings.component.ts");
/* harmony import */ var _components_track_nav_bar_track_nav_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/track-nav-bar/track-nav-bar.component */ "./src/components/track-nav-bar/track-nav-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var TrackingModule = /** @class */ (function () {
    function TrackingModule() {
    }
    TrackingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _tracking_routing_module__WEBPACK_IMPORTED_MODULE_4__["TrackingRoutingModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTooltipModule"], ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_7__["DpDatePickerModule"], _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ReactiveFormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatNativeDateModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_3__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatRadioModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTabsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSlideToggleModule"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"], fava_layer__WEBPACK_IMPORTED_MODULE_6__["FavaLayerModule"]
            ],
            entryComponents: [src_mobile_app_pages_tracking_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_10__["SettingsComponent"], _components_track_nav_bar_track_nav_bar_component__WEBPACK_IMPORTED_MODULE_11__["TrackNavBarComponent"]],
            declarations: [_index_index_component__WEBPACK_IMPORTED_MODULE_5__["IndexComponent"], src_mobile_app_pages_tracking_components_settings_settings_component__WEBPACK_IMPORTED_MODULE_10__["SettingsComponent"], _components_track_nav_bar_track_nav_bar_component__WEBPACK_IMPORTED_MODULE_11__["TrackNavBarComponent"]]
        })
    ], TrackingModule);
    return TrackingModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-tracking-tracking-module.js.map