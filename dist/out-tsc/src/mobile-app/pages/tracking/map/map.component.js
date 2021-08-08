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
var fava_map_1 = require("fava-map");
var MousePosition_js_1 = require("ol/control/MousePosition.js");
var MapComponent = /** @class */ (function () {
    function MapComponent(mapService) {
        this.mapService = mapService;
    }
    MapComponent.prototype.ngOnInit = function () {
        console.log('map', this.mapService.getMap());
        this.map = this.mapService.getMap();
        this.map.setTarget('map');
        this.initLayers();
        this.mousePosition();
        this.mapService.tileLoadEvent.subscribe(this.initProgressBarValue());
    };
    MapComponent.prototype.mousePosition = function () {
        var mousePositionControl = new MousePosition_js_1.default({
            //coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            // comment the following two lines to have the mouse position
            // be placed within the map.
            className: 'custom-mouse-position',
            // target: document.getElementById('mouse-position'),
            undefinedHTML: 'نشانگر در نقشه نیست'
        });
        console.log(this.map, 'gg');
        this.map.addControl(mousePositionControl);
    };
    MapComponent.prototype.initProgressBarValue = function () {
        var _this = this;
        return function (data) {
            if (data['loading'] === 0)
                _this.mapLoaded = 100;
            else
                _this.mapLoaded = (data['loaded'] / data['loading']) * 100;
        };
    };
    MapComponent.prototype.initLayers = function () {
        var me = this;
        var myLayer = this.mapService.addBaseLayer({
            name: 'Bing',
            preview: 'resources/images/preview-bing.png',
            description: '',
            resolutions: [156543.03392804097, 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487, 0.07464553543474244, 0.03732276771737122, 0.01866138385868561, 0.009330691929342804, 0.004665345964671402, 0.002332672982335701, 0.0011663364911678506, 0.0005831682455839253],
            source: {
                attributions: '',
                url: 'http://192.168.3.10:8080/TileServer/tile/vesat?x={x}&y={y}&z={z}'
            },
            title: 'Bing',
            visible: false
        });
        var twice = this.mapService.addBaseLayer({
            name: 'Bing',
            preview: 'resources/images/preview-bing.png',
            description: '',
            resolutions: [156543.03392804097, 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487, 0.07464553543474244, 0.03732276771737122, 0.01866138385868561, 0.009330691929342804, 0.004665345964671402, 0.002332672982335701, 0.0011663364911678506, 0.0005831682455839253],
            source: {
                attributions: '',
                url: 'http://192.168.3.10:8080/TileServer/tile/osm?x={x}&y={y}&z={z}'
            },
            title: 'Bing',
            visible: true
        });
        // setTimeout(function ()
        // {
        //     me.mapService.changeBaseLayer(twice);
        // }, 3000);
        // setTimeout(function ()
        // {
        //     me.mapService.changeBaseLayer(myLayer);
        // }, 5000);
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: 'mobile-app-map',
            templateUrl: './map.component.html',
            styleUrls: ['./map.component.css']
        }),
        __metadata("design:paramtypes", [fava_map_1.FavaMap])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map