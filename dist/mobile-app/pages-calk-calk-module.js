(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-calk-calk-module"],{

/***/ "./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js":
/*!********************************************************************!*\
  !*** ./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js ***!
  \********************************************************************/
/*! exports provided: Cmyk, Hsla, Hsva, Rgba, TextDirective, SliderDirective, ColorPickerComponent, ColorPickerDirective, ColorPickerModule, ColorPickerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cmyk", function() { return Cmyk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hsla", function() { return Hsla; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hsva", function() { return Hsva; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgba", function() { return Rgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDirective", function() { return TextDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderDirective", function() { return SliderDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerComponent", function() { return ColorPickerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerDirective", function() { return ColorPickerDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerModule", function() { return ColorPickerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPickerService", function() { return ColorPickerService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ColorFormats = {
    HEX: 0,
    RGBA: 1,
    HSLA: 2,
};
ColorFormats[ColorFormats.HEX] = 'HEX';
ColorFormats[ColorFormats.RGBA] = 'RGBA';
ColorFormats[ColorFormats.HSLA] = 'HSLA';
var Cmyk = /** @class */ (function () {
    function Cmyk(c, m, y, k) {
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
    }
    return Cmyk;
}());
var Hsla = /** @class */ (function () {
    function Hsla(h, s, l, a) {
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
    }
    return Hsla;
}());
var Hsva = /** @class */ (function () {
    function Hsva(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return Hsva;
}());
var Rgba = /** @class */ (function () {
    function Rgba(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    return Rgba;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function detectIE() {
    /** @type {?} */
    var ua = '';
    if (typeof navigator !== 'undefined') {
        ua = navigator.userAgent.toLowerCase();
    }
    /** @type {?} */
    var msie = ua.indexOf('msie ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    // Other browser
    return false;
}
var TextDirective = /** @class */ (function () {
    function TextDirective() {
        this.newValue = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    TextDirective.prototype.inputChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var value = event.target.value;
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            /** @type {?} */
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    TextDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[text]'
                },] }
    ];
    TextDirective.propDecorators = {
        rg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        text: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        newValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        inputChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['input', ['$event'],] }]
    };
    return TextDirective;
}());
var SliderDirective = /** @class */ (function () {
    function SliderDirective(elRef) {
        var _this = this;
        this.elRef = elRef;
        this.dragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.dragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.newValue = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.listenerMove = function (event) { return _this.move(event); };
        this.listenerStop = function () { return _this.stop(); };
    }
    /**
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.mouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.start(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.touchStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.start(event);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.move = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.start = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setCursor(event);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        this.dragStart.emit();
    };
    /**
     * @private
     * @return {?}
     */
    SliderDirective.prototype.stop = /**
     * @private
     * @return {?}
     */
    function () {
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        this.dragEnd.emit();
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.getX = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var position = this.elRef.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var pageX = (event.pageX !== undefined) ? event.pageX : event.touches[0].pageX;
        return pageX - position.left - window.pageXOffset;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.getY = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var position = this.elRef.nativeElement.getBoundingClientRect();
        /** @type {?} */
        var pageY = (event.pageY !== undefined) ? event.pageY : event.touches[0].pageY;
        return pageY - position.top - window.pageYOffset;
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    SliderDirective.prototype.setCursor = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var width = this.elRef.nativeElement.offsetWidth;
        /** @type {?} */
        var height = this.elRef.nativeElement.offsetHeight;
        /** @type {?} */
        var x = Math.max(0, Math.min(this.getX(event), width));
        /** @type {?} */
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / height, rgY: this.rgY });
        }
        else if (this.rgX !== undefined && this.rgY === undefined) {
            this.newValue.emit({ v: x / width, rgX: this.rgX });
        }
    };
    SliderDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[slider]'
                },] }
    ];
    /** @nocollapse */
    SliderDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
    ]; };
    SliderDirective.propDecorators = {
        rgX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        rgY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        slider: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        dragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        dragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        newValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        mouseDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['mousedown', ['$event'],] }],
        touchStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['touchstart', ['$event'],] }]
    };
    return SliderDirective;
}());
var SliderPosition = /** @class */ (function () {
    function SliderPosition(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderPosition;
}());
var SliderDimension = /** @class */ (function () {
    function SliderDimension(h, s, v, a) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.a = a;
    }
    return SliderDimension;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColorPickerService = /** @class */ (function () {
    function ColorPickerService() {
        this.active = null;
    }
    /**
     * @param {?} active
     * @return {?}
     */
    ColorPickerService.prototype.setActive = /**
     * @param {?} active
     * @return {?}
     */
    function (active) {
        if (this.active && this.active !== active && this.active.cpDialogDisplay !== 'inline') {
            this.active.closeDialog();
        }
        this.active = active;
    };
    /**
     * @param {?} hsva
     * @return {?}
     */
    ColorPickerService.prototype.hsva2hsla = /**
     * @param {?} hsva
     * @return {?}
     */
    function (hsva) {
        /** @type {?} */
        var h = hsva.h;
        /** @type {?} */
        var s = hsva.s;
        /** @type {?} */
        var v = hsva.v;
        /** @type {?} */
        var a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            /** @type {?} */
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    };
    /**
     * @param {?} hsla
     * @return {?}
     */
    ColorPickerService.prototype.hsla2hsva = /**
     * @param {?} hsla
     * @return {?}
     */
    function (hsla) {
        /** @type {?} */
        var h = Math.min(hsla.h, 1);
        /** @type {?} */
        var s = Math.min(hsla.s, 1);
        /** @type {?} */
        var l = Math.min(hsla.l, 1);
        /** @type {?} */
        var a = Math.min(hsla.a, 1);
        if (l === 0) {
            return new Hsva(h, 0, 0, a);
        }
        else {
            /** @type {?} */
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return new Hsva(h, 2 * (v - l) / v, v, a);
        }
    };
    /**
     * @param {?} hsva
     * @return {?}
     */
    ColorPickerService.prototype.hsvaToRgba = /**
     * @param {?} hsva
     * @return {?}
     */
    function (hsva) {
        /** @type {?} */
        var r;
        /** @type {?} */
        var g;
        /** @type {?} */
        var b;
        /** @type {?} */
        var h = hsva.h;
        /** @type {?} */
        var s = hsva.s;
        /** @type {?} */
        var v = hsva.v;
        /** @type {?} */
        var a = hsva.a;
        /** @type {?} */
        var i = Math.floor(h * 6);
        /** @type {?} */
        var f = h * 6 - i;
        /** @type {?} */
        var p = v * (1 - s);
        /** @type {?} */
        var q = v * (1 - f * s);
        /** @type {?} */
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
            default:
                r = 0, g = 0, b = 0;
        }
        return new Rgba(r, g, b, a);
    };
    /**
     * @param {?} rgba
     * @return {?}
     */
    ColorPickerService.prototype.rgbaToCmyk = /**
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        /** @type {?} */
        var k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
        if (k === 1) {
            return new Cmyk(0, 0, 0, 1);
        }
        else {
            /** @type {?} */
            var c = (1 - rgba.r - k) / (1 - k);
            /** @type {?} */
            var m = (1 - rgba.g - k) / (1 - k);
            /** @type {?} */
            var y = (1 - rgba.b - k) / (1 - k);
            return new Cmyk(c, m, y, k);
        }
    };
    /**
     * @param {?} rgba
     * @return {?}
     */
    ColorPickerService.prototype.rgbaToHsva = /**
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        /** @type {?} */
        var h;
        /** @type {?} */
        var s;
        /** @type {?} */
        var r = Math.min(rgba.r, 1);
        /** @type {?} */
        var g = Math.min(rgba.g, 1);
        /** @type {?} */
        var b = Math.min(rgba.b, 1);
        /** @type {?} */
        var a = Math.min(rgba.a, 1);
        /** @type {?} */
        var max = Math.max(r, g, b);
        /** @type {?} */
        var min = Math.min(r, g, b);
        /** @type {?} */
        var v = max;
        /** @type {?} */
        var d = max - min;
        s = (max === 0) ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
                default:
                    h = 0;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    };
    /**
     * @param {?} rgba
     * @param {?=} allowHex8
     * @return {?}
     */
    ColorPickerService.prototype.rgbaToHex = /**
     * @param {?} rgba
     * @param {?=} allowHex8
     * @return {?}
     */
    function (rgba, allowHex8) {
        /* tslint:disable:no-bitwise */
        /** @type {?} */
        var hex = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);
        if (allowHex8) {
            hex += ((1 << 8) | Math.round(rgba.a * 255)).toString(16).substr(1);
        }
        /* tslint:enable:no-bitwise */
        return hex;
    };
    /**
     * @param {?} rgba
     * @return {?}
     */
    ColorPickerService.prototype.denormalizeRGBA = /**
     * @param {?} rgba
     * @return {?}
     */
    function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    /**
     * @param {?=} colorString
     * @param {?=} allowHex8
     * @return {?}
     */
    ColorPickerService.prototype.stringToHsva = /**
     * @param {?=} colorString
     * @param {?=} allowHex8
     * @return {?}
     */
    function (colorString, allowHex8) {
        if (colorString === void 0) { colorString = ''; }
        if (allowHex8 === void 0) { allowHex8 = false; }
        /** @type {?} */
        var hsva = null;
        colorString = (colorString || '').toLowerCase();
        /** @type {?} */
        var stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2], 10) / 255, parseInt(execResult[3], 10) / 255, parseInt(execResult[4], 10) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            }, {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2], 10) / 360, parseInt(execResult[3], 10) / 100, parseInt(execResult[4], 10) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            }
        ];
        if (allowHex8) {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})?$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, parseInt(execResult[4] || 'FF', 16) / 255);
                }
            });
        }
        else {
            stringParsers.push({
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            });
        }
        stringParsers.push({
            re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
            parse: function (execResult) {
                return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
            }
        });
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                /** @type {?} */
                var parser = stringParsers[key];
                /** @type {?} */
                var match = parser.re.exec(colorString);
                /** @type {?} */
                var color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    };
    /**
     * @param {?} hsva
     * @param {?} outputFormat
     * @param {?} alphaChannel
     * @return {?}
     */
    ColorPickerService.prototype.outputFormat = /**
     * @param {?} hsva
     * @param {?} outputFormat
     * @param {?} alphaChannel
     * @return {?}
     */
    function (hsva, outputFormat, alphaChannel) {
        if (outputFormat === 'auto') {
            outputFormat = hsva.a < 1 ? 'rgba' : 'hex';
        }
        switch (outputFormat) {
            case 'hsla':
                /** @type {?} */
                var hsla = this.hsva2hsla(hsva);
                /** @type {?} */
                var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                if (hsva.a < 1 || alphaChannel === 'always') {
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' +
                        hslaText.a + ')';
                }
                else {
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                }
            case 'rgba':
                /** @type {?} */
                var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                if (hsva.a < 1 || alphaChannel === 'always') {
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' +
                        Math.round(rgba.a * 100) / 100 + ')';
                }
                else {
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                }
            default:
                /** @type {?} */
                var allowHex8 = (alphaChannel === 'always' || alphaChannel === 'forced');
                return this.rgbaToHex(this.denormalizeRGBA(this.hsvaToRgba(hsva)), allowHex8);
        }
    };
    ColorPickerService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    /** @nocollapse */
    ColorPickerService.ctorParameters = function () { return []; };
    return ColorPickerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColorPickerComponent = /** @class */ (function () {
    function ColorPickerComponent(elRef, cdRef, service) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.service = service;
        this.isIE10 = false;
        this.dialogArrowSize = 10;
        this.dialogArrowOffset = 15;
        this.dialogInputFields = [
            ColorFormats.HEX,
            ColorFormats.RGBA,
            ColorFormats.HSLA
        ];
        this.useRootViewContainer = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerComponent.prototype.handleEsc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.show && this.cpDialogDisplay === 'popup') {
            this.onCancelColor(event);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerComponent.prototype.handleEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.show && this.cpDialogDisplay === 'popup') {
            this.onAcceptColor(event);
        }
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.slider = new SliderPosition(0, 0, 0, 0);
        /** @type {?} */
        var hueWidth = this.hueSlider.nativeElement.offsetWidth || 140;
        /** @type {?} */
        var alphaWidth = this.alphaSlider.nativeElement.offsetWidth || 140;
        this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
        if (this.cpOutputFormat === 'rgba') {
            this.format = ColorFormats.RGBA;
        }
        else if (this.cpOutputFormat === 'hsla') {
            this.format = ColorFormats.HSLA;
        }
        else {
            this.format = ColorFormats.HEX;
        }
        this.listenerMouseDown = function (event) { _this.onMouseDown(event); };
        this.listenerResize = function () { _this.onResize(); };
        this.openDialog(this.initialColor, false);
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.closeDialog();
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.cpWidth !== 230 || this.cpDialogDisplay === 'inline') {
            /** @type {?} */
            var hueWidth = this.hueSlider.nativeElement.offsetWidth || 140;
            /** @type {?} */
            var alphaWidth = this.alphaSlider.nativeElement.offsetWidth || 140;
            this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
            this.updateColorPicker(false);
            this.cdRef.detectChanges();
        }
    };
    /**
     * @param {?} color
     * @param {?=} emit
     * @return {?}
     */
    ColorPickerComponent.prototype.openDialog = /**
     * @param {?} color
     * @param {?=} emit
     * @return {?}
     */
    function (color, emit) {
        if (emit === void 0) { emit = true; }
        this.service.setActive(this);
        if (!this.width) {
            this.cpWidth = this.directiveElementRef.nativeElement.offsetWidth;
        }
        if (!this.height) {
            this.height = 320;
        }
        this.setInitialColor(color);
        this.setColorFromString(color, emit);
        this.openColorPicker();
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.closeDialog = /**
     * @return {?}
     */
    function () {
        this.closeColorPicker();
    };
    /**
     * @param {?} instance
     * @param {?} elementRef
     * @param {?} color
     * @param {?} cpWidth
     * @param {?} cpHeight
     * @param {?} cpDialogDisplay
     * @param {?} cpFallbackColor
     * @param {?} cpColorMode
     * @param {?} cpAlphaChannel
     * @param {?} cpOutputFormat
     * @param {?} cpDisableInput
     * @param {?} cpIgnoredElements
     * @param {?} cpSaveClickOutside
     * @param {?} cpUseRootViewContainer
     * @param {?} cpPosition
     * @param {?} cpPositionOffset
     * @param {?} cpPositionRelativeToArrow
     * @param {?} cpPresetLabel
     * @param {?} cpPresetColors
     * @param {?} cpMaxPresetColorsLength
     * @param {?} cpPresetEmptyMessage
     * @param {?} cpPresetEmptyMessageClass
     * @param {?} cpOKButton
     * @param {?} cpOKButtonClass
     * @param {?} cpOKButtonText
     * @param {?} cpCancelButton
     * @param {?} cpCancelButtonClass
     * @param {?} cpCancelButtonText
     * @param {?} cpAddColorButton
     * @param {?} cpAddColorButtonClass
     * @param {?} cpAddColorButtonText
     * @param {?} cpRemoveColorButtonClass
     * @return {?}
     */
    ColorPickerComponent.prototype.setupDialog = /**
     * @param {?} instance
     * @param {?} elementRef
     * @param {?} color
     * @param {?} cpWidth
     * @param {?} cpHeight
     * @param {?} cpDialogDisplay
     * @param {?} cpFallbackColor
     * @param {?} cpColorMode
     * @param {?} cpAlphaChannel
     * @param {?} cpOutputFormat
     * @param {?} cpDisableInput
     * @param {?} cpIgnoredElements
     * @param {?} cpSaveClickOutside
     * @param {?} cpUseRootViewContainer
     * @param {?} cpPosition
     * @param {?} cpPositionOffset
     * @param {?} cpPositionRelativeToArrow
     * @param {?} cpPresetLabel
     * @param {?} cpPresetColors
     * @param {?} cpMaxPresetColorsLength
     * @param {?} cpPresetEmptyMessage
     * @param {?} cpPresetEmptyMessageClass
     * @param {?} cpOKButton
     * @param {?} cpOKButtonClass
     * @param {?} cpOKButtonText
     * @param {?} cpCancelButton
     * @param {?} cpCancelButtonClass
     * @param {?} cpCancelButtonText
     * @param {?} cpAddColorButton
     * @param {?} cpAddColorButtonClass
     * @param {?} cpAddColorButtonText
     * @param {?} cpRemoveColorButtonClass
     * @return {?}
     */
    function (instance, elementRef, color, cpWidth, cpHeight, cpDialogDisplay, cpFallbackColor, cpColorMode, cpAlphaChannel, cpOutputFormat, cpDisableInput, cpIgnoredElements, cpSaveClickOutside, cpUseRootViewContainer, cpPosition, cpPositionOffset, cpPositionRelativeToArrow, cpPresetLabel, cpPresetColors, cpMaxPresetColorsLength, cpPresetEmptyMessage, cpPresetEmptyMessageClass, cpOKButton, cpOKButtonClass, cpOKButtonText, cpCancelButton, cpCancelButtonClass, cpCancelButtonText, cpAddColorButton, cpAddColorButtonClass, cpAddColorButtonText, cpRemoveColorButtonClass) {
        this.setInitialColor(color);
        this.setColorMode(cpColorMode);
        this.isIE10 = (detectIE() === 10);
        this.directiveInstance = instance;
        this.directiveElementRef = elementRef;
        this.cpDisableInput = cpDisableInput;
        this.cpAlphaChannel = cpAlphaChannel;
        this.cpOutputFormat = cpOutputFormat;
        this.cpDialogDisplay = cpDialogDisplay;
        this.cpIgnoredElements = cpIgnoredElements;
        this.cpSaveClickOutside = cpSaveClickOutside;
        this.useRootViewContainer = cpUseRootViewContainer;
        this.width = this.cpWidth = parseInt(cpWidth, 10);
        this.height = this.cpHeight = parseInt(cpHeight, 10);
        this.cpPosition = cpPosition;
        this.cpPositionOffset = parseInt(cpPositionOffset, 10);
        this.cpOKButton = cpOKButton;
        this.cpOKButtonText = cpOKButtonText;
        this.cpOKButtonClass = cpOKButtonClass;
        this.cpCancelButton = cpCancelButton;
        this.cpCancelButtonText = cpCancelButtonText;
        this.cpCancelButtonClass = cpCancelButtonClass;
        this.fallbackColor = cpFallbackColor || '#fff';
        this.setPresetConfig(cpPresetLabel, cpPresetColors);
        this.cpMaxPresetColorsLength = cpMaxPresetColorsLength;
        this.cpPresetEmptyMessage = cpPresetEmptyMessage;
        this.cpPresetEmptyMessageClass = cpPresetEmptyMessageClass;
        this.cpAddColorButton = cpAddColorButton;
        this.cpAddColorButtonText = cpAddColorButtonText;
        this.cpAddColorButtonClass = cpAddColorButtonClass;
        this.cpRemoveColorButtonClass = cpRemoveColorButtonClass;
        if (!cpPositionRelativeToArrow) {
            this.dialogArrowOffset = 0;
        }
        if (cpDialogDisplay === 'inline') {
            this.dialogArrowSize = 0;
            this.dialogArrowOffset = 0;
        }
        if (cpOutputFormat === 'hex' &&
            cpAlphaChannel !== 'always' && cpAlphaChannel !== 'forced') {
            this.cpAlphaChannel = 'disabled';
        }
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    ColorPickerComponent.prototype.setColorMode = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        switch (mode.toString().toUpperCase()) {
            case '1':
            case 'C':
            case 'COLOR':
                this.cpColorMode = 1;
                break;
            case '2':
            case 'G':
            case 'GRAYSCALE':
                this.cpColorMode = 2;
                break;
            case '3':
            case 'P':
            case 'PRESETS':
                this.cpColorMode = 3;
                break;
            default:
                this.cpColorMode = 1;
        }
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorPickerComponent.prototype.setInitialColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this.initialColor = color;
    };
    /**
     * @param {?} cpPresetLabel
     * @param {?} cpPresetColors
     * @return {?}
     */
    ColorPickerComponent.prototype.setPresetConfig = /**
     * @param {?} cpPresetLabel
     * @param {?} cpPresetColors
     * @return {?}
     */
    function (cpPresetLabel, cpPresetColors) {
        this.cpPresetLabel = cpPresetLabel;
        this.cpPresetColors = cpPresetColors;
    };
    /**
     * @param {?} value
     * @param {?=} emit
     * @param {?=} update
     * @return {?}
     */
    ColorPickerComponent.prototype.setColorFromString = /**
     * @param {?} value
     * @param {?=} emit
     * @param {?=} update
     * @return {?}
     */
    function (value, emit, update) {
        if (emit === void 0) { emit = true; }
        if (update === void 0) { update = true; }
        /** @type {?} */
        var hsva;
        if (this.cpAlphaChannel === 'always' || this.cpAlphaChannel === 'forced') {
            hsva = this.service.stringToHsva(value, true);
            if (!hsva && !this.hsva) {
                hsva = this.service.stringToHsva(value, false);
            }
        }
        else {
            hsva = this.service.stringToHsva(value, false);
        }
        if (!hsva && !this.hsva) {
            hsva = this.service.stringToHsva(this.fallbackColor, false);
        }
        if (hsva) {
            this.hsva = hsva;
            this.sliderH = this.hsva.h;
            this.updateColorPicker(emit, update);
        }
    };
    /**
     * @return {?}
     */
    ColorPickerComponent.prototype.onResize = /**
     * @return {?}
     */
    function () {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
        else if (this.cpDialogDisplay !== 'inline') {
            this.closeColorPicker();
        }
    };
    /**
     * @param {?} slider
     * @return {?}
     */
    ColorPickerComponent.prototype.onDragEnd = /**
     * @param {?} slider
     * @return {?}
     */
    function (slider) {
        this.directiveInstance.sliderDragEnd({ slider: slider, color: this.outputColor });
    };
    /**
     * @param {?} slider
     * @return {?}
     */
    ColorPickerComponent.prototype.onDragStart = /**
     * @param {?} slider
     * @return {?}
     */
    function (slider) {
        this.directiveInstance.sliderDragStart({ slider: slider, color: this.outputColor });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isIE10 && this.cpDialogDisplay === 'popup' &&
            event.target !== this.directiveElementRef.nativeElement &&
            !this.isDescendant(this.elRef.nativeElement, event.target) &&
            !this.isDescendant(this.directiveElementRef.nativeElement, event.target) &&
            this.cpIgnoredElements.filter(function (item) { return item === event.target; }).length === 0) {
            if (!this.cpSaveClickOutside) {
                this.setColorFromString(this.initialColor, false);
                this.directiveInstance.colorChanged(this.initialColor);
            }
            this.closeColorPicker();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerComponent.prototype.onAcceptColor = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        if (this.cpDialogDisplay === 'popup') {
            this.closeColorPicker();
        }
        if (this.outputColor) {
            this.directiveInstance.colorSelected(this.outputColor);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerComponent.prototype.onCancelColor = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this.setColorFromString(this.initialColor, true);
        if (this.cpDialogDisplay === 'popup') {
            this.directiveInstance.colorChanged(this.initialColor, true);
            this.closeColorPicker();
        }
        this.directiveInstance.colorCanceled();
    };
    /**
     * @param {?} change
     * @return {?}
     */
    ColorPickerComponent.prototype.onFormatToggle = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        /** @type {?} */
        var availableFormats = this.dialogInputFields.length;
        /** @type {?} */
        var nextFormat = (((this.dialogInputFields.indexOf(this.format) + change) %
            availableFormats) + availableFormats) % availableFormats;
        this.format = this.dialogInputFields[nextFormat];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onColorChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.s = value.s / value.rgX;
        this.hsva.v = value.v / value.rgY;
        this.updateColorPicker();
        this.directiveInstance.sliderChanged({
            slider: 'lightness',
            value: this.hsva.v,
            color: this.outputColor
        });
        this.directiveInstance.sliderChanged({
            slider: 'saturation',
            value: this.hsva.s,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onHueChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.h = value.v / value.rgX;
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.sliderChanged({
            slider: 'hue',
            value: this.hsva.h,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onValueChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.v = value.v / value.rgX;
        this.updateColorPicker();
        this.directiveInstance.sliderChanged({
            slider: 'value',
            value: this.hsva.v,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onAlphaChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.a = value.v / value.rgX;
        this.updateColorPicker();
        this.directiveInstance.sliderChanged({
            slider: 'alpha',
            value: this.hsva.a,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onHexInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value === null) {
            this.updateColorPicker();
        }
        else {
            if (value && value[0] !== '#') {
                value = '#' + value;
            }
            /** @type {?} */
            var validHex = /^#([a-f0-9]{3}|[a-f0-9]{6})$/gi;
            if (this.cpAlphaChannel === 'always') {
                validHex = /^#([a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})$/gi;
            }
            if (validHex.test(value)) {
                if (value.length < 5) {
                    value = '#' + value.substring(1)
                        .split('')
                        .map(function (c) { return c + c; })
                        .join('');
                }
                if (this.cpAlphaChannel === 'forced') {
                    value += Math.round(this.hsva.a * 255).toString(16);
                }
                this.setColorFromString(value, true, false);
                this.directiveInstance.inputChanged({
                    input: 'hex',
                    value: value,
                    color: this.outputColor
                });
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onRedInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = value.v / value.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'red',
            value: rgba.r,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onBlueInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = value.v / value.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'blue',
            value: rgba.b,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onGreenInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = value.v / value.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'green',
            value: rgba.g,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onHueInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.h = value.v / value.rg;
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'hue',
            value: this.hsva.h,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onValueInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.v = value.v / value.rg;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'value',
            value: this.hsva.v,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onAlphaInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.hsva.a = value.v / value.rg;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'alpha',
            value: this.hsva.a,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onLightnessInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = value.v / value.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'lightness',
            value: hsla.l,
            color: this.outputColor
        });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onSaturationInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = value.v / value.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.sliderH = this.hsva.h;
        this.updateColorPicker();
        this.directiveInstance.inputChanged({
            input: 'saturation',
            value: hsla.s,
            color: this.outputColor
        });
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onAddPresetColor = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.stopPropagation();
        if (!this.cpPresetColors.filter(function (color) { return (color === value); }).length) {
            this.cpPresetColors = this.cpPresetColors.concat(value);
            this.directiveInstance.presetColorsChanged(this.cpPresetColors);
        }
    };
    /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    ColorPickerComponent.prototype.onRemovePresetColor = /**
     * @param {?} event
     * @param {?} value
     * @return {?}
     */
    function (event, value) {
        event.stopPropagation();
        this.cpPresetColors = this.cpPresetColors.filter(function (color) { return (color !== value); });
        this.directiveInstance.presetColorsChanged(this.cpPresetColors);
    };
    // Private helper functions for the color picker dialog status
    // Private helper functions for the color picker dialog status
    /**
     * @private
     * @return {?}
     */
    ColorPickerComponent.prototype.openColorPicker = 
    // Private helper functions for the color picker dialog status
    /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.show) {
            this.show = true;
            this.hidden = true;
            setTimeout(function () {
                _this.hidden = false;
                _this.setDialogPosition();
                _this.cdRef.detectChanges();
            }, 0);
            this.directiveInstance.stateChanged(true);
            if (!this.isIE10) {
                document.addEventListener('mousedown', this.listenerMouseDown);
            }
            window.addEventListener('resize', this.listenerResize);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ColorPickerComponent.prototype.closeColorPicker = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.show) {
            this.show = false;
            this.directiveInstance.stateChanged(false);
            if (!this.isIE10) {
                document.removeEventListener('mousedown', this.listenerMouseDown);
            }
            window.removeEventListener('resize', this.listenerResize);
            if (!this.cdRef['destroyed']) {
                this.cdRef.detectChanges();
            }
        }
    };
    /**
     * @private
     * @param {?=} emit
     * @param {?=} update
     * @return {?}
     */
    ColorPickerComponent.prototype.updateColorPicker = /**
     * @private
     * @param {?=} emit
     * @param {?=} update
     * @return {?}
     */
    function (emit, update) {
        if (emit === void 0) { emit = true; }
        if (update === void 0) { update = true; }
        if (this.sliderDimMax) {
            if (this.cpColorMode === 2) {
                this.hsva.s = 0;
            }
            /** @type {?} */
            var lastOutput = this.outputColor;
            /** @type {?} */
            var hsla = this.service.hsva2hsla(this.hsva);
            /** @type {?} */
            var rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
            /** @type {?} */
            var hue = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.sliderH || this.hsva.h, 1, 1, 1)));
            if (update) {
                this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
                /** @type {?} */
                var allowHex8 = this.cpAlphaChannel === 'always';
                this.hexText = this.service.rgbaToHex(rgba, allowHex8);
                this.hexAlpha = this.rgbaText.a;
            }
            if (this.cpOutputFormat === 'auto') {
                if (this.hsva.a < 1) {
                    this.format = this.hsva.a < 1 ? ColorFormats.RGBA : ColorFormats.HEX;
                }
            }
            this.hueSliderColor = 'rgb(' + hue.r + ',' + hue.g + ',' + hue.b + ')';
            this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
            this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel);
            this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', null);
            this.slider = new SliderPosition((this.sliderH || this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8);
            if (emit && lastOutput !== this.outputColor) {
                this.directiveInstance.colorChanged(this.outputColor);
            }
        }
    };
    // Private helper functions for the color picker dialog positioning
    // Private helper functions for the color picker dialog positioning
    /**
     * @private
     * @return {?}
     */
    ColorPickerComponent.prototype.setDialogPosition = 
    // Private helper functions for the color picker dialog positioning
    /**
     * @private
     * @return {?}
     */
    function () {
        if (this.cpDialogDisplay === 'inline') {
            this.position = 'relative';
        }
        else {
            /** @type {?} */
            var position = 'static';
            /** @type {?} */
            var transform = '';
            /** @type {?} */
            var style = void 0;
            /** @type {?} */
            var parentNode = null;
            /** @type {?} */
            var transformNode = null;
            /** @type {?} */
            var node = this.directiveElementRef.nativeElement.parentNode;
            /** @type {?} */
            var dialogHeight = this.dialogElement.nativeElement.offsetHeight;
            while (node !== null && node.tagName !== 'HTML') {
                style = window.getComputedStyle(node);
                position = style.getPropertyValue('position');
                transform = style.getPropertyValue('transform');
                if (position !== 'static' && parentNode === null) {
                    parentNode = node;
                }
                if (transform && transform !== 'none' && transformNode === null) {
                    transformNode = node;
                }
                if (position === 'fixed') {
                    parentNode = transformNode;
                    break;
                }
                node = node.parentNode;
            }
            /** @type {?} */
            var boxDirective = this.createDialogBox(this.directiveElementRef.nativeElement, (position !== 'fixed'));
            if (this.useRootViewContainer || (position === 'fixed' &&
                (!parentNode || parentNode instanceof HTMLUnknownElement))) {
                this.top = boxDirective.top;
                this.left = boxDirective.left;
            }
            else {
                if (parentNode === null) {
                    parentNode = node;
                }
                /** @type {?} */
                var boxParent = this.createDialogBox(parentNode, (position !== 'fixed'));
                this.top = boxDirective.top - boxParent.top;
                this.left = boxDirective.left - boxParent.left;
            }
            if (position === 'fixed') {
                this.position = 'fixed';
            }
            if (this.cpPosition === 'left') {
                this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
                this.left -= this.cpWidth + this.dialogArrowSize - 2;
            }
            else if (this.cpPosition === 'top') {
                this.arrowTop = dialogHeight - 1;
                this.top -= dialogHeight + this.dialogArrowSize;
                this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            }
            else if (this.cpPosition === 'bottom') {
                this.top += boxDirective.height + this.dialogArrowSize;
                this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            }
            else {
                this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
                this.left += boxDirective.width + this.dialogArrowSize - 2;
            }
        }
    };
    // Private helper functions for the color picker dialog positioning and opening
    // Private helper functions for the color picker dialog positioning and opening
    /**
     * @private
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    ColorPickerComponent.prototype.isDescendant = 
    // Private helper functions for the color picker dialog positioning and opening
    /**
     * @private
     * @param {?} parent
     * @param {?} child
     * @return {?}
     */
    function (parent, child) {
        /** @type {?} */
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * @private
     * @param {?} element
     * @param {?} offset
     * @return {?}
     */
    ColorPickerComponent.prototype.createDialogBox = /**
     * @private
     * @param {?} element
     * @param {?} offset
     * @return {?}
     */
    function (element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };
    ColorPickerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'color-picker',
                    template: "<div #dialogPopup class=\"color-picker\" [style.visibility]=\"hidden || !show ? 'hidden' : 'visible'\" [style.top.px]=\"top\" [style.left.px]=\"left\" [style.position]=\"position\" [style.height.px]=\"cpHeight\" [style.width.px]=\"cpWidth\" (click)=\"$event.stopPropagation()\">\n  <div *ngIf=\"cpDialogDisplay=='popup'\" class=\"arrow arrow-{{cpPosition}}\" [style.top.px]=\"arrowTop\"></div>\n\n  <div *ngIf=\"(cpColorMode ||\u00A01) === 1\" class=\"saturation-lightness\" [slider] [rgX]=\"1\" [rgY]=\"1\" [style.background-color]=\"hueSliderColor\" (newValue)=\"onColorChange($event)\" (dragStart)=\"onDragStart('saturation-lightness')\" (dragEnd)=\"onDragEnd('saturation-lightness')\">\n    <div class=\"cursor\" [style.top.px]=\"slider?.v\" [style.left.px]=\"slider?.s\"></div>\n  </div>\n\n  <div class=\"hue-alpha box\">\n    <div class=\"left\">\n      <div class=\"selected-color-background\"></div>\n\n      <div class=\"selected-color\" [style.background-color]=\"selectedColor\"></div>\n\n      <button *ngIf=\"cpAddColorButton\" class=\"{{cpAddColorButtonClass}}\" [disabled]=\"cpPresetColors && cpPresetColors.length >= cpMaxPresetColorsLength\" (click)=\"onAddPresetColor($event, selectedColor)\">\n        {{cpAddColorButtonText}}\n      </button>\n    </div>\n\n    <div class=\"right\">\n      <div *ngIf=\"cpAlphaChannel==='disabled'\" style=\"height: 16px;\"></div>\n\n      <div #hueSlider class=\"hue\" [slider] [rgX]=\"1\" [style.display]=\"(cpColorMode ||\u00A01) === 1 ? 'block' : 'none'\" (newValue)=\"onHueChange($event)\" (dragStart)=\"onDragStart('hue')\" (dragEnd)=\"onDragEnd('hue')\">\n        <div class=\"cursor\" [style.left.px]=\"slider?.h\"></div>\n      </div>\n\n      <div #valueSlider class=\"value\" [slider] [rgX]=\"1\" [style.display]=\"(cpColorMode ||\u00A01) === 2 ? 'block': 'none'\" (newValue)=\"onValueChange($event)\" (dragStart)=\"onDragStart('value')\" (dragEnd)=\"onDragEnd('value')\">\n        <div class=\"cursor\" [style.right.px]=\"slider?.v\"></div>\n      </div>\n\n      <div #alphaSlider class=\"alpha\" [slider] [rgX]=\"1\" [style.display]=\"cpAlphaChannel === 'disabled' ? 'none' : 'block'\" [style.background-color]=\"alphaSliderColor\" (newValue)=\"onAlphaChange($event)\" (dragStart)=\"onDragStart('alpha')\" (dragEnd)=\"onDragEnd('alpha')\">\n        <div class=\"cursor\" [style.left.px]=\"slider?.a\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!cpDisableInput && (cpColorMode ||\u00A01) === 1 \" class=\"hsla-text\" [style.display]=\"format !== 2 ? 'none' : 'block'\">\n    <div class=\"box\">\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [text] [rg]=\"360\" [value]=\"hslaText?.h\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onHueInput($event)\" />\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [text] [rg]=\"100\" [value]=\"hslaText?.s\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onSaturationInput($event)\" />\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [text] [rg]=\"100\" [value]=\"hslaText?.l\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onLightnessInput($event)\" />\n      <input *ngIf=\"cpAlphaChannel!=='disabled'\" type=\"number\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [text] [rg]=\"1\" [value]=\"hslaText?.a\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onAlphaInput($event)\" />\n    </div>\n\n    <div class=\"box\">\n      <div>H</div><div>S</div><div>L</div><div *ngIf=\"cpAlphaChannel!=='disabled'\">A</div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!cpDisableInput && (cpColorMode ||\u00A01) === 1 \" [style.display]=\"format !== 1 ? 'none' : 'block'\" class=\"rgba-text\">\n    <div class=\"box\">\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [text] [rg]=\"255\" [value]=\"rgbaText?.r\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onRedInput($event)\" />\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [text] [rg]=\"255\" [value]=\"rgbaText?.g\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onGreenInput($event)\" />\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [text] [rg]=\"255\" [value]=\"rgbaText?.b\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onBlueInput($event)\" />\n      <input *ngIf=\"cpAlphaChannel!=='disabled'\" type=\"number\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [text] [rg]=\"1\" [value]=\"rgbaText?.a\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onAlphaInput($event)\" />\n    </div>\n\n    <div class=\"box\">\n      <div>R</div><div>G</div><div>B</div><div *ngIf=\"cpAlphaChannel!=='disabled'\" >A</div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!cpDisableInput && (cpColorMode ||\u00A01) === 1\" class=\"hex-text\" [class.hex-alpha]=\"cpAlphaChannel==='forced'\"\n    [style.display]=\"format !== 0 ? 'none' : 'block'\">\n    <div class=\"box\">\n      <input [text] [value]=\"hexText\" (blur)=\"onHexInput(null)\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onHexInput($event)\"/>\n      <input *ngIf=\"cpAlphaChannel==='forced'\" type=\"number\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [text] [rg]=\"1\" [value]=\"hexAlpha\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onAlphaInput($event)\"/>\n    </div>\n\n    <div class=\"box\">\n      <div>Hex</div>\n      <div *ngIf=\"cpAlphaChannel==='forced'\">A</div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!cpDisableInput && (cpColorMode ||\u00A01) === 2\" class=\"value-text\">\n    <div class=\"box\">\n      <input type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [text] [rg]=\"100\" [value]=\"hslaText?.l\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onValueInput($event)\" />\n      <input *ngIf=\"cpAlphaChannel!=='disabled'\" type=\"number\" pattern=\"[0-9]+([\\.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\"  [text] [rg]=\"1\" [value]=\"hslaText?.a\" (keyup.enter)=\"onAcceptColor($event)\" (newValue)=\"onAlphaInput($event)\" />\n    </div>\n\n    <div class=\"box\">\n      <div>V</div><div>A</div>\n    </div>\n  </div>\n\n  <div *ngIf=\"!cpDisableInput && (cpColorMode ||\u00A01) === 1\" class=\"type-policy\">\n    <span class=\"type-policy-arrow\" (click)=\"onFormatToggle(1)\"></span>\n    <span class=\"type-policy-arrow\" (click)=\"onFormatToggle(-1)\"></span>\n  </div>\n\n  <div *ngIf=\"cpPresetColors?.length || cpAddColorButton\" class=\"preset-area\">\n    <hr>\n\n    <div class=\"preset-label\">{{cpPresetLabel}}</div>\n\n    <div *ngIf=\"cpPresetColors?.length\">\n      <div *ngFor=\"let color of cpPresetColors\" class=\"preset-color\" [style.backgroundColor]=\"color\" (click)=\"setColorFromString(color)\">\n        <span *ngIf=\"cpAddColorButton\" class=\"{{cpRemoveColorButtonClass}}\" (click)=\"onRemovePresetColor($event, color)\"></span>\n      </div>\n    </div>\n\n    <div *ngIf=\"!cpPresetColors?.length && cpAddColorButton\" class=\"{{cpPresetEmptyMessageClass}}\">{{cpPresetEmptyMessage}}</div>\n  </div>\n\n  <div *ngIf=\"cpOKButton || cpCancelButton\" class=\"button-area\">\n    <button *ngIf=\"cpCancelButton\" type=\"button\" class=\"{{cpCancelButtonClass}}\" (click)=\"onCancelColor($event)\">{{cpCancelButtonText}}</button>\n\n    <button *ngIf=\"cpOKButton\" type=\"button\" class=\"{{cpOKButtonClass}}\" (click)=\"onAcceptColor($event)\">{{cpOKButtonText}}</button>\n  </div>\n</div>\n",
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                    styles: [".color-picker {\n  position: absolute;\n  z-index: 100000;\n\n  width: 230px;\n  height: auto;\n  border: #777 solid 1px;\n\n  cursor: default;\n\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n\n  user-select: none;\n  background-color: #fff;\n}\n\n.color-picker * {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n\n  box-sizing: border-box;\n  margin: 0;\n\n  font-size: 11px;\n}\n\n.color-picker input {\n  width: 0;\n  height: 26px;\n  min-width: 0;\n\n  font-size: 13px;\n  text-align: center;\n  color: #000;\n}\n\n.color-picker input:invalid,\n.color-picker input:-moz-ui-invalid,\n.color-picker input:-moz-submit-invalid {\n  box-shadow: none;\n}\n\n.color-picker input::-webkit-inner-spin-button,\n.color-picker input::-webkit-outer-spin-button {\n  margin: 0;\n\n  -webkit-appearance: none;\n}\n\n.color-picker .arrow {\n  position: absolute;\n  z-index: 999999;\n\n  width: 0;\n  height: 0;\n  border-style: solid;\n}\n\n.color-picker .arrow.arrow-top {\n  left: 8px;\n\n  border-width: 10px 5px;\n  border-color: #777 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);\n}\n\n.color-picker .arrow.arrow-left {\n  top: 8px;\n  left: 100%;\n\n  border-width: 5px 10px;\n  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #777;\n}\n\n.color-picker .arrow.arrow-right {\n  top: 8px;\n  left: -20px;\n\n  border-width: 5px 10px;\n  border-color: rgba(0, 0, 0, 0) #777 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);\n}\n\n.color-picker .arrow.arrow-bottom {\n  top: -20px;\n  left: 8px;\n\n  border-width: 10px 5px;\n  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #777 rgba(0, 0, 0, 0);\n}\n\n.color-picker .cursor {\n  position: relative;\n\n  width: 16px;\n  height: 16px;\n  border: #222 solid 2px;\n  border-radius: 50%;\n\n  cursor: default;\n}\n\n.color-picker .box {\n  display: flex;\n  padding: 4px 8px;\n}\n\n.color-picker .left {\n  position: relative;\n\n  padding: 16px 8px;\n}\n\n.color-picker .right {\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n\n  padding: 12px 8px;\n}\n\n.color-picker .button-area {\n  padding: 0 16px 16px;\n\n  text-align: right;\n}\n\n.color-picker .preset-area {\n  padding: 4px 15px;\n}\n\n.color-picker .preset-area .preset-label {\n  overflow: hidden;\n  width: 100%;\n  padding: 4px;\n\n  font-size: 11px;\n  white-space: nowrap;\n  text-align: left;\n  text-overflow: ellipsis;\n  color: #555;\n}\n\n.color-picker .preset-area .preset-color {\n  position: relative;\n\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  margin: 4px 6px 8px;\n  border: #a9a9a9 solid 1px;\n  border-radius: 25%;\n\n  cursor: pointer;\n}\n\n.color-picker .preset-area .preset-empty-message {\n  min-height: 18px;\n  margin-top: 4px;\n  margin-bottom: 8px;\n\n  font-style: italic;\n  text-align: center;\n}\n\n.color-picker .hex-text {\n  width: 100%;\n  padding: 4px 8px;\n\n  font-size: 11px;\n}\n\n.color-picker .hex-text .box {\n  padding: 0 24px 8px 8px;\n}\n\n.color-picker .hex-text .box div {\n  float: left;\n\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n\n  text-align: center;\n  color: #555;\n  clear: left;\n}\n\n.color-picker .hex-text .box input {\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n  padding: 1px;\n  border: #a9a9a9 solid 1px;\n}\n\n.color-picker .hex-alpha .box div:first-child,\n.color-picker .hex-alpha .box input:first-child {\n  flex-grow: 3;\n  margin-right: 8px;\n}\n\n.color-picker .hsla-text,\n.color-picker .rgba-text,\n.color-picker .value-text {\n  width: 100%;\n  padding: 4px 8px;\n\n  font-size: 11px;\n}\n\n.color-picker .hsla-text .box,\n.color-picker .rgba-text .box {\n  padding: 0 24px 8px 8px;\n}\n\n.color-picker .value-text .box {\n  padding: 0 8px 8px;\n}\n\n.color-picker .hsla-text .box div,\n.color-picker .rgba-text .box div,\n.color-picker .value-text .box div {\n  -webkit-flex: 1 1 auto;\n  -ms-flex: 1 1 auto;\n\n  flex: 1 1 auto;\n  margin-right: 8px;\n\n  text-align: center;\n  color: #555;\n}\n\n.color-picker .hsla-text .box div:last-child,\n.color-picker .rgba-text .box div:last-child,\n.color-picker .value-text .box div:last-child {\n  margin-right: 0;\n}\n\n.color-picker .hsla-text .box input,\n.color-picker .rgba-text .box input,\n.color-picker .value-text .box input {\n  float: left;\n\n  -webkit-flex: 1;\n  -ms-flex: 1;\n\n  flex: 1;\n  padding: 1px;\n  margin: 0 8px 0 0;\n  border: #a9a9a9 solid 1px;\n}\n\n.color-picker .hsla-text .box input:last-child,\n.color-picker .rgba-text .box input:last-child,\n.color-picker .value-text .box input:last-child {\n  margin-right: 0;\n}\n\n.color-picker .hue-alpha {\n  align-items: center;\n  margin-bottom: 3px;\n}\n\n.color-picker .hue {\n  direction: ltr;\n\n  width: 100%;\n  height: 16px;\n  margin-bottom: 16px;\n  border: none;\n\n  cursor: pointer;\n  background-size: 100% 100%;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC');\n}\n\n.color-picker .value {\n  direction: rtl;\n\n  width: 100%;\n  height: 16px;\n  margin-bottom: 16px;\n  border: none;\n\n  cursor: pointer;\n  background-size: 100% 100%;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAACTklEQVR42u3SYUcrABhA4U2SkmRJMmWSJklKJiWZZpKUJJskKUmaTFImKZOUzMySpGRmliRNJilJSpKSJEtmSpIpmWmSdO736/6D+x7OP3gUCoWCv1cqlSQlJZGcnExKSgqpqamkpaWRnp5ORkYGmZmZqFQqsrKyyM7OJicnh9zcXNRqNXl5eeTn56PRaCgoKKCwsJCioiK0Wi3FxcWUlJRQWlpKWVkZ5eXlVFRUUFlZiU6no6qqiurqampqaqitraWurg69Xk99fT0GgwGj0UhDQwONjY00NTXR3NxMS0sLra2ttLW10d7ejslkwmw209HRQWdnJ11dXXR3d9PT00Nvby99fX309/czMDDA4OAgFouFoaEhrFYrw8PDjIyMMDo6ytjYGDabjfHxcSYmJpicnGRqagq73c709DQzMzPMzs4yNzfH/Pw8DocDp9OJy+XC7XazsLDA4uIiS0tLLC8vs7KywurqKmtra3g8HrxeLz6fD7/fz/r6OhsbG2xubrK1tcX29jaBQICdnR2CwSC7u7vs7e2xv7/PwcEBh4eHHB0dcXx8zMnJCaenp5ydnXF+fs7FxQWXl5dcXV1xfX3Nzc0Nt7e33N3dEQqFuL+/5+HhgXA4TCQS4fHxkaenJ56fn3l5eeH19ZVoNMrb2xvv7+98fHwQi8WIx+N8fn6SSCT4+vri+/ubn58ffn9/+VcKgSWwBJbAElgCS2AJLIElsASWwBJYAktgCSyBJbAElsASWAJLYAksgSWwBJbAElgCS2AJLIElsP4/WH8AmJ5Z6jHS4h8AAAAASUVORK5CYII=');\n}\n\n.color-picker .alpha {\n  direction: ltr;\n\n  width: 100%;\n  height: 16px;\n  border: none;\n\n  cursor: pointer;\n  background-size: 100% 100%;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==');\n}\n\n.color-picker .type-policy {\n  position: absolute;\n  top: 218px;\n  right: 12px;\n\n  width: 16px;\n  height: 24px;\n\n  background-size: 8px 16px;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n.color-picker .type-policy .type-policy-arrow {\n  display: block;\n\n  width: 100%;\n  height: 50%;\n}\n\n.color-picker .selected-color {\n  position: absolute;\n  top: 16px;\n  left: 8px;\n\n  width: 40px;\n  height: 40px;\n  border: 1px solid #a9a9a9;\n  border-radius: 50%;\n}\n\n.color-picker .selected-color-background {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYR+2W0QlAMQgD60zdfwOdqa8TmI/wQMr5K0I5bZLIzLOa2nt37VVVbd+dDx5obgCC3KBLwJ2ff4PnVidkf+ucIhw80HQaCLo3DMH3CRK3iFsmAWVl6hPNDwt8EvNE5q+YuEXcMgkonVM6SdyCoEvAnZ8v1Hjx817MilmxSUB5rdLJDycZgUAZUch/AAAAAElFTkSuQmCC');\n}\n\n.color-picker .saturation-lightness {\n  direction: ltr;\n\n  width: 100%;\n  height: 130px;\n  border: none;\n\n  cursor: pointer;\n  background-size: 100% 100%;\n  background-image: url('data:image/png;base64,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');\n}\n\n.color-picker .cp-add-color-button-class {\n  position: absolute;\n\n  display: inline;\n  padding: 0;\n  margin: 3px -3px;\n  border: 0;\n\n  cursor: pointer;\n  background: transparent;\n}\n\n.color-picker .cp-add-color-button-class:hover {\n  text-decoration: underline;\n}\n\n.color-picker .cp-add-color-button-class:disabled {\n  cursor: not-allowed;\n  color: #999;\n}\n\n.color-picker .cp-add-color-button-class:disabled:hover {\n  text-decoration: none;\n}\n\n.color-picker .cp-remove-color-button-class {\n  position: absolute;\n  top: -5px;\n  right: -5px;\n\n  display: block;\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n\n  cursor: pointer;\n  text-align: center;\n  background: #fff;\n\n  box-shadow: 1px 1px 5px #333;\n}\n\n.color-picker .cp-remove-color-button-class::before {\n  content: 'x';\n\n  position: relative;\n  bottom: 3.5px;\n\n  display: inline-block;\n\n  font-size: 10px;\n}\n"]
                }] }
    ];
    /** @nocollapse */
    ColorPickerComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] },
        { type: ColorPickerService }
    ]; };
    ColorPickerComponent.propDecorators = {
        dialogElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['dialogPopup',] }],
        hueSlider: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['hueSlider',] }],
        alphaSlider: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['alphaSlider',] }],
        handleEsc: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:keyup.esc', ['$event'],] }],
        handleEnter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['document:keyup.enter', ['$event'],] }]
    };
    return ColorPickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColorPickerDirective = /** @class */ (function () {
    function ColorPickerDirective(injector, cfr, appRef, vcRef, elRef, _service) {
        this.injector = injector;
        this.cfr = cfr;
        this.appRef = appRef;
        this.vcRef = vcRef;
        this.elRef = elRef;
        this._service = _service;
        this.dialogCreated = false;
        this.ignoreChanges = false;
        this.cpWidth = '230px';
        this.cpHeight = 'auto';
        this.cpToggle = false;
        this.cpDisabled = false;
        this.cpIgnoredElements = [];
        this.cpFallbackColor = '';
        this.cpColorMode = 'color';
        this.cpOutputFormat = 'auto';
        this.cpAlphaChannel = 'enabled';
        this.cpDisableInput = false;
        this.cpDialogDisplay = 'popup';
        this.cpSaveClickOutside = true;
        this.cpUseRootViewContainer = false;
        this.cpPosition = 'right';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOKButton = false;
        this.cpOKButtonText = 'OK';
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpCancelButton = false;
        this.cpCancelButtonText = 'Cancel';
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpPresetLabel = 'Preset colors';
        this.cpMaxPresetColorsLength = 6;
        this.cpPresetEmptyMessage = 'No colors added';
        this.cpPresetEmptyMessageClass = 'preset-empty-message';
        this.cpAddColorButton = false;
        this.cpAddColorButtonText = 'Add color';
        this.cpAddColorButtonClass = 'cp-add-color-button-class';
        this.cpRemoveColorButtonClass = 'cp-remove-color-button-class';
        this.cpInputChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.cpToggleChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.cpSliderChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.cpSliderDragEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.cpSliderDragStart = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.colorPickerOpen = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.colorPickerClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.colorPickerCancel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.colorPickerSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
        this.colorPickerChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
        this.cpPresetColorsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](true);
    }
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.handleClick = /**
     * @return {?}
     */
    function () {
        this.inputFocus();
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        this.inputFocus();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.handleInput = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.inputChange(event);
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.cmpRef !== undefined) {
            this.cmpRef.destroy();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ColorPickerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.cpToggle && !this.cpDisabled) {
            if (changes.cpToggle.currentValue) {
                this.openDialog();
            }
            else if (!changes.cpToggle.currentValue) {
                this.closeDialog();
            }
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
                if (this.cpUseRootViewContainer && this.cpDialogDisplay !== 'inline') {
                    this.cmpRef.changeDetectorRef.detectChanges();
                }
            }
            this.ignoreChanges = false;
        }
        if (changes.cpPresetLabel || changes.cpPresetColors) {
            if (this.dialog) {
                this.dialog.setPresetConfig(this.cpPresetLabel, this.cpPresetColors);
            }
        }
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.openDialog = /**
     * @return {?}
     */
    function () {
        if (!this.dialogCreated) {
            /** @type {?} */
            var vcRef = this.vcRef;
            this.dialogCreated = true;
            if (this.cpUseRootViewContainer && this.cpDialogDisplay !== 'inline') {
                /** @type {?} */
                var classOfRootComponent = this.appRef.componentTypes[0];
                /** @type {?} */
                var appInstance = this.injector.get(classOfRootComponent);
                vcRef = appInstance.vcRef || appInstance.viewContainerRef || this.vcRef;
                if (vcRef === this.vcRef) {
                    console.warn('You are using cpUseRootViewContainer, ' +
                        'but the root component is not exposing viewContainerRef!' +
                        'Please expose it by adding \'public vcRef: ViewContainerRef\' to the constructor.');
                }
            }
            /** @type {?} */
            var compFactory = this.cfr.resolveComponentFactory(ColorPickerComponent);
            /** @type {?} */
            var injector = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ReflectiveInjector"].fromResolvedProviders([], vcRef.parentInjector);
            this.cmpRef = vcRef.createComponent(compFactory, 0, injector, []);
            this.cmpRef.instance.setupDialog(this, this.elRef, this.colorPicker, this.cpWidth, this.cpHeight, this.cpDialogDisplay, this.cpFallbackColor, this.cpColorMode, this.cpAlphaChannel, this.cpOutputFormat, this.cpDisableInput, this.cpIgnoredElements, this.cpSaveClickOutside, this.cpUseRootViewContainer, this.cpPosition, this.cpPositionOffset, this.cpPositionRelativeToArrow, this.cpPresetLabel, this.cpPresetColors, this.cpMaxPresetColorsLength, this.cpPresetEmptyMessage, this.cpPresetEmptyMessageClass, this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpAddColorButton, this.cpAddColorButtonClass, this.cpAddColorButtonText, this.cpRemoveColorButtonClass);
            this.dialog = this.cmpRef.instance;
            if (this.vcRef !== vcRef) {
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.closeDialog = /**
     * @return {?}
     */
    function () {
        if (this.dialog && this.cpDialogDisplay === 'popup') {
            this.dialog.closeDialog();
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ColorPickerDirective.prototype.stateChanged = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.cpToggleChange.emit(state);
        if (state) {
            this.colorPickerOpen.emit(this.colorPicker);
        }
        else {
            this.colorPickerClose.emit(this.colorPicker);
        }
    };
    /**
     * @param {?} value
     * @param {?=} ignore
     * @return {?}
     */
    ColorPickerDirective.prototype.colorChanged = /**
     * @param {?} value
     * @param {?=} ignore
     * @return {?}
     */
    function (value, ignore) {
        if (ignore === void 0) { ignore = true; }
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value);
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.colorCanceled = /**
     * @return {?}
     */
    function () {
        this.colorPickerCancel.emit();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerDirective.prototype.colorSelected = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.colorPickerSelect.emit(value);
    };
    /**
     * @return {?}
     */
    ColorPickerDirective.prototype.inputFocus = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var element = this.elRef.nativeElement;
        /** @type {?} */
        var ignored = this.cpIgnoredElements.filter(function (item) { return item === element; });
        if (!this.cpDisabled && !ignored.length) {
            if (typeof document !== 'undefined' && element === document.activeElement) {
                this.openDialog();
            }
            else if (!this.dialog || !this.dialog.show) {
                this.openDialog();
            }
            else {
                this.closeDialog();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.inputChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.dialog) {
            this.dialog.setColorFromString(event.target.value, true);
        }
        else {
            this.colorPicker = event.target.value;
            this.colorPickerChange.emit(this.colorPicker);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.inputChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cpInputChange.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.sliderChanged = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cpSliderChange.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.sliderDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cpSliderDragEnd.emit(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ColorPickerDirective.prototype.sliderDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.cpSliderDragStart.emit(event);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorPickerDirective.prototype.presetColorsChanged = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.cpPresetColorsChange.emit(value);
    };
    ColorPickerDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[colorPicker]',
                    exportAs: 'ngxColorPicker'
                },] }
    ];
    /** @nocollapse */
    ColorPickerDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ApplicationRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: ColorPickerService }
    ]; };
    ColorPickerDirective.propDecorators = {
        colorPicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpHeight: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpToggle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpDisabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpIgnoredElements: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpFallbackColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpColorMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpOutputFormat: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpAlphaChannel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpDisableInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpDialogDisplay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpSaveClickOutside: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpUseRootViewContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPositionOffset: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPositionRelativeToArrow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpOKButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpOKButtonText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpOKButtonClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpCancelButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpCancelButtonText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpCancelButtonClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPresetLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPresetColors: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpMaxPresetColorsLength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPresetEmptyMessage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpPresetEmptyMessageClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpAddColorButton: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpAddColorButtonText: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpAddColorButtonClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpRemoveColorButtonClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cpInputChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cpToggleChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cpSliderChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cpSliderDragEnd: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cpSliderDragStart: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        colorPickerOpen: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        colorPickerClose: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        colorPickerCancel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        colorPickerSelect: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        colorPickerChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        cpPresetColorsChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        handleClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click',] }],
        handleFocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['focus',] }],
        handleInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['input', ['$event'],] }]
    };
    return ColorPickerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColorPickerModule = /** @class */ (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                    exports: [ColorPickerDirective],
                    providers: [ColorPickerService],
                    declarations: [ColorPickerComponent, ColorPickerDirective, TextDirective, SliderDirective],
                    entryComponents: [ColorPickerComponent]
                },] }
    ];
    return ColorPickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=ngx-color-picker.es5.js.map


/***/ }),

/***/ "./src/components/dynamic-form-field/dynamic-form-field.component.css":
/*!****************************************************************************!*\
  !*** ./src/components/dynamic-form-field/dynamic-form-field.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field{\r\n    width: 100%;\r\n}"

/***/ }),

/***/ "./src/components/dynamic-form-field/dynamic-form-field.component.html":
/*!*****************************************************************************!*\
  !*** ./src/components/dynamic-form-field/dynamic-form-field.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let field of fields\">\r\n  <div [ngSwitch]=\"field.type\">\r\n    <mat-form-field *ngSwitchCase=\"'text'\">\r\n      <input type=\"text\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n      <input *ngIf=\"field.subtype && field.subtype=='color'\" type=\"text\" matInput [(colorPicker)]=\"field['value']\" >\r\n    </mat-form-field>\r\n    <mat-form-field *ngSwitchCase=\"'number'\">\r\n      <input type=\"number\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n    </mat-form-field>\r\n\r\n    <!-- <div *ngSwitchCase=\"'textarea'\" class=\"myEditor\">\r\n    <quill-editor [modules]='field.textEditorModule' [style]=\"{height: '150px'}\" [placeholder]=\"field['label']+'...'\" dir=\"rtl\"\r\n      [(ngModel)]=\"field['value']\">\r\n    </quill-editor>\r\n  </div> -->\r\n    <div *ngSwitchCase=\"'textarea'\" class=\"myEditor\">\r\n      <textarea [(ngModel)]=\"field['value']\" matInput placeholder=\"{{field.label}}\"></textarea>\r\n    </div>\r\n\r\n    <mat-select *ngSwitchCase=\"'select'\" placeholder=\"{{field.label}}\" [(ngModel)]=\"field['value']\">\r\n      <mat-option *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n        {{op.label}}\r\n      </mat-option>\r\n    </mat-select>\r\n    <dp-date-picker *ngSwitchCase=\"'date'\" dir=\"rtl\" [(ngModel)]=\"field['value']\" theme=\"dp-material\" mode=\"day\" placeholder=\"{{field.label}}\"\r\n      class=\"datePicker\">\r\n    </dp-date-picker>\r\n\r\n    <mat-radio-group *ngSwitchCase=\"'radio-group'\" class=\"example-radio-group\" [(ngModel)]=\"field['value']\">\r\n      {{field.label}}:\r\n      <mat-radio-button class=\"example-radio-button\" *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n        {{op.label}}\r\n      </mat-radio-button>\r\n    </mat-radio-group>\r\n\r\n    <div *ngSwitchCase=\"'checkbox'\">\r\n      {{field.label}}:\r\n      <mat-checkbox *ngFor=\"let op of field.values\" class=\"example-margin\" [(ngModel)]=\"op['selected']\">{{op.label}}</mat-checkbox>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/components/dynamic-form-field/dynamic-form-field.component.ts":
/*!***************************************************************************!*\
  !*** ./src/components/dynamic-form-field/dynamic-form-field.component.ts ***!
  \***************************************************************************/
/*! exports provided: DynamicFormFieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicFormFieldComponent", function() { return DynamicFormFieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DynamicFormFieldComponent = /** @class */ (function () {
    function DynamicFormFieldComponent() {
        this.fieldsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DynamicFormFieldComponent.prototype.ngOnInit = function () {
    };
    DynamicFormFieldComponent.prototype.ngDoCheck = function () {
        this.fieldsChange.emit(this.fields);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], DynamicFormFieldComponent.prototype, "fields", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], DynamicFormFieldComponent.prototype, "fieldsChange", void 0);
    DynamicFormFieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-dynamic-form-field',
            template: __webpack_require__(/*! ./dynamic-form-field.component.html */ "./src/components/dynamic-form-field/dynamic-form-field.component.html"),
            styles: [__webpack_require__(/*! ./dynamic-form-field.component.css */ "./src/components/dynamic-form-field/dynamic-form-field.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DynamicFormFieldComponent);
    return DynamicFormFieldComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/calk-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/mobile-app/pages/calk/calk-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: CalkRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalkRoutingModule", function() { return CalkRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _index_index_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index/index.component */ "./src/mobile-app/pages/calk/index/index.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _index_index_component__WEBPACK_IMPORTED_MODULE_2__["IndexComponent"]
    }
];
var CalkRoutingModule = /** @class */ (function () {
    function CalkRoutingModule() {
    }
    CalkRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CalkRoutingModule);
    return CalkRoutingModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/calk.module.ts":
/*!**************************************************!*\
  !*** ./src/mobile-app/pages/calk/calk.module.ts ***!
  \**************************************************/
/*! exports provided: CalkModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalkModule", function() { return CalkModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _calk_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calk-routing.module */ "./src/mobile-app/pages/calk/calk-routing.module.ts");
/* harmony import */ var src_mobile_app_pages_calk_index_index_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/mobile-app/pages/calk/index/index.component */ "./src/mobile-app/pages/calk/index/index.component.ts");
/* harmony import */ var src_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/pipes/pipes.module */ "./src/pipes/pipes.module.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var angular_font_awesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-font-awesome */ "./node_modules/angular-font-awesome/dist/angular-font-awesome.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _components_layers_layers_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/layers/layers.component */ "./src/mobile-app/pages/calk/components/layers/layers.component.ts");
/* harmony import */ var _components_tree_layers_tree_layers_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/tree-layers/tree-layers.component */ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.ts");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
/* harmony import */ var _components_add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/add-layer/add-layer.component */ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.ts");
/* harmony import */ var _components_modify_feature_modify_feature_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/modify-feature/modify-feature.component */ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.ts");
/* harmony import */ var _components_features_features_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/features/features.component */ "./src/mobile-app/pages/calk/components/features/features.component.ts");
/* harmony import */ var _components_dynamic_form_field_dynamic_form_field_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../components/dynamic-form-field/dynamic-form-field.component */ "./src/components/dynamic-form-field/dynamic-form-field.component.ts");
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-quill */ "./node_modules/ngx-quill/fesm5/ngx-quill.js");
/* harmony import */ var ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-jalali-date-picker */ "./node_modules/ng2-jalali-date-picker/ng2-jalali-date-picker.es5.js");
/* harmony import */ var _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/nav-bar/nav-bar.component */ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.ts");
/* harmony import */ var ngx_color_picker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-color-picker */ "./node_modules/ngx-color-picker/dist/ngx-color-picker.es5.js");
/* harmony import */ var _components_popups_unit_unit_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/popups/unit/unit.component */ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var CalkModule = /** @class */ (function () {
    function CalkModule() {
    }
    CalkModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], angular_tree_component__WEBPACK_IMPORTED_MODULE_10__["TreeModule"],
                _calk_routing_module__WEBPACK_IMPORTED_MODULE_2__["CalkRoutingModule"], src_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_4__["PipesModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSidenavModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_6__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"], ngx_quill__WEBPACK_IMPORTED_MODULE_15__["QuillModule"], ng2_jalali_date_picker__WEBPACK_IMPORTED_MODULE_16__["DpDatePickerModule"], ngx_color_picker__WEBPACK_IMPORTED_MODULE_18__["ColorPickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                angular_font_awesome__WEBPACK_IMPORTED_MODULE_6__["AngularFontAwesomeModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatExpansionModule"], _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatMenuModule"]
            ],
            entryComponents: [
                _components_add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_11__["AddLayerComponent"], _components_popups_unit_unit_component__WEBPACK_IMPORTED_MODULE_19__["UnitComponent"]
            ],
            declarations: [
                src_mobile_app_pages_calk_index_index_component__WEBPACK_IMPORTED_MODULE_3__["IndexComponent"], _components_tree_layers_tree_layers_component__WEBPACK_IMPORTED_MODULE_9__["TreeLayersComponent"], _components_layers_layers_component__WEBPACK_IMPORTED_MODULE_8__["LayersComponent"],
                _components_add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_11__["AddLayerComponent"], _components_modify_feature_modify_feature_component__WEBPACK_IMPORTED_MODULE_12__["ModifyFeatureComponent"], _components_features_features_component__WEBPACK_IMPORTED_MODULE_13__["FeaturesComponent"],
                _components_dynamic_form_field_dynamic_form_field_component__WEBPACK_IMPORTED_MODULE_14__["DynamicFormFieldComponent"], _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_17__["NavBarComponent"],
                _components_tree_layers_tree_layers_component__WEBPACK_IMPORTED_MODULE_9__["TreeLayersComponent"],
                _components_layers_layers_component__WEBPACK_IMPORTED_MODULE_8__["LayersComponent"],
                _components_add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_11__["AddLayerComponent"],
                _components_modify_feature_modify_feature_component__WEBPACK_IMPORTED_MODULE_12__["ModifyFeatureComponent"],
                _components_features_features_component__WEBPACK_IMPORTED_MODULE_13__["FeaturesComponent"],
                _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_17__["NavBarComponent"],
                _components_popups_unit_unit_component__WEBPACK_IMPORTED_MODULE_19__["UnitComponent"]
            ]
        })
    ], CalkModule);
    return CalkModule;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.css":
/*!********************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/add-layer/add-layer.component.css ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "::ng-deep.cdk-overlay-pane{\r\n    height: auto !important;\r\n  }\r\n::ng-deep.mat-dialog-container{\r\n    padding: 0px;\r\n  }"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.html":
/*!*********************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/add-layer/add-layer.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n    <mat-card-title>\r\n      افزودن \r\n      {{layerTypeTxt}}\r\n      جدید\r\n    </mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <input [(ngModel)]=\"layerName\" placeholder=\"نام  {{layerTypeTxt}}\">\r\n  </mat-card-content>\r\n  <mat-card-actions>\r\n      <button mat-button (click)=\"onAddLayer()\" [disabled]=\"!layerName\">\r\n          <fa name=\"fas fa-plus\"></fa>\r\n          افزودن\r\n      </button>\r\n  </mat-card-actions>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/add-layer/add-layer.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AddLayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddLayerComponent", function() { return AddLayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
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


var AddLayerComponent = /** @class */ (function () {
    function AddLayerComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.layerTypeTxt = "لایه";
    }
    AddLayerComponent.prototype.ngOnInit = function () {
        if (this.data == 'groupLayer')
            this.layerTypeTxt = "گروه";
    };
    AddLayerComponent.prototype.onAddLayer = function () {
        this.dialogRef.close(this.layerName);
    };
    AddLayerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-add-layer',
            template: __webpack_require__(/*! ./add-layer.component.html */ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.html"),
            styles: [__webpack_require__(/*! ./add-layer.component.css */ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], AddLayerComponent);
    return AddLayerComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/features/features.component.css":
/*!******************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/features/features.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-sidenav-container{\r\n    height: 100%;\r\n}\r\n.nav-bar {\r\n    /*position: absolute;*/\r\n    bottom: 0;\r\n    width: 100%;\r\n    background-color: #eee;\r\n  }\r\n.mat-tab-link {\r\n    color: black;\r\n  }\r\n.example-container {\r\n    width: 100%;\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n  }\r\nmat-sidenav {\r\n    /* width: 15%; */\r\n    direction: rtl;\r\n    background-color: rgba(0, 0, 0, 0.45);\r\n    z-index: 3;\r\n    position: absolute;\r\n  \r\n  }\r\nfa {\r\n    float: left;\r\n    padding: 1%;\r\n    color: orange;\r\n  }\r\n/*\r\n  mat-sidenav-content {\r\n  } */\r\nmat-list-item {\r\n    cursor: pointer;\r\n    direction: ltr;\r\n  }\r\n.containers {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1999;\r\n  }\r\n.containers > * {\r\n    width: 100%;\r\n  }\r\nmat-chip.leftChips {\r\n    border-top-right-radius: 24px !important;\r\n    border-bottom-right-radius: 24px !important;\r\n    border-bottom-left-radius: 24px !important;\r\n    background-color: #eee !important;\r\n    color: black !important;\r\n  }\r\n.mat-standard-chip {\r\n    border-radius: 0px;\r\n  }\r\nmat-chip.rightChips {\r\n    border-top-left-radius: 24px !important;\r\n    border-bottom-right-radius: 24px !important;\r\n    border-bottom-left-radius: 24px !important;\r\n    background-color: #dcf8c6 !important;\r\n  }\r\n.button {\r\n    direction: ltr !important;\r\n    overflow-y: auto;\r\n  }\r\n.contactLabel {\r\n    /* padding: 1%; */\r\n    padding: 1%;\r\n    \r\n  }\r\n.label {\r\n    padding-left: 20px;\r\n    color: white;\r\n    font-size: 12px;\r\n    display: block;\r\n    cursor: pointer;\r\n  }\r\n.userDetails {\r\n    white-space: nowrap;\r\n  }\r\n.userDetailsss {\r\n    display: block;\r\n  }\r\n.input {\r\n    /* min-width: 150px!important;\r\n    max-width: 500px!important; */\r\n    width: 92% !important;\r\n    border: 0;\r\n    padding: 10px;\r\n  }\r\n.input-full-width {\r\n    width: 100% !important;\r\n  }\r\n.leftChips {\r\n    direction: rtl;\r\n    padding: 0 10px;\r\n  \r\n  }\r\n.rightChips {\r\n    color: black !important;\r\n    padding: 0 10px;\r\n  }\r\n.sendBotton {\r\n    width: 5% !important;\r\n    float: right;\r\n  \r\n  }\r\n.sidNavTitle {\r\n    background: orange;\r\n  }\r\n.toggle {\r\n    color: black\r\n  }\r\n.leftMenuButton {\r\n    position: absolute;\r\n    z-index: 19000;\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n.showBarsToggle{\r\n    position: absolute;\r\n    z-index: 19000;\r\n    left: 50px;\r\n    top: 0;\r\n  }\r\n.position {\r\n    font-size: 12px;\r\n    color: yellow;\r\n    white-space: nowrap;\r\n  }\r\n.mat-expansion-panel-spacing {\r\n    margin: 0;\r\n    background: transparent;\r\n  }\r\n.mat-expansion-panel {\r\n    background: transparent;\r\n  }\r\n.mat-expansion-panel-header-title {\r\n    color: #fff;\r\n  }\r\n.mat-expansion-indicator {\r\n    color: orange !important;\r\n  }\r\n.mat-chip.mat-standard-chip {\r\n    background-color: inherit\r\n  }\r\n.mat-tab-link {\r\n    color: white;\r\n  }\r\n.example-container {\r\n    width: 100%;\r\n    /* margin: 10px; */\r\n    /* border: 1px solid #555; */\r\n    position: fixed;\r\n    left: 0;\r\n    top: 0;\r\n    bottom: 0;\r\n  }\r\n.custom-mouse-position {\r\n  \r\n  }\r\nmat-sidenav {\r\n    /* width: 85vw !important;\r\n    min-width: 200px !important;\r\n    max-width: 300px !important; */\r\n    /*direction: rtl;*/\r\n  }\r\n.label {\r\n    padding-right: 10px;\r\n  }\r\nnav {\r\n    /*direction: rtl !important;*/\r\n  }\r\n.map {\r\n    position: fixed;\r\n    top: 45px;\r\n    bottom: 0px;\r\n    right: 0;\r\n    left: 0;\r\n  }\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n    height: 45px;\r\n    display: block;\r\n  }\r\n.mat-button {\r\n    padding-top: 2px;\r\n  }\r\n.mat-menu-content {\r\n    padding-top: 0px;\r\n    padding-bottom: 0px;\r\n  }\r\nbutton.mat-menu-item {\r\n    width: 100%;\r\n    height: 100%;\r\n    text-align: center;\r\n  }\r\n.menu-header {\r\n    text-align: center;\r\n    padding-top: 20px;\r\n    padding-bottom: 20px;\r\n  }\r\n.activeLayer {\r\n    background-color: #e9e3ff;\r\n  }\r\n.layerButton {\r\n    outline: 0px dotted;\r\n    outline: 0px auto -webkit-focus-ring-color;\r\n  }\r\n.toolbar {\r\n    /*background-color: rgba(0, 0, 0, 0.7) !important;*/\r\n    background-color: #161a21;\r\n    z-index: 11;\r\n    color: orange;\r\n    position: absolute;\r\n    padding-right: 3.5%;\r\n    padding-top: 0.5%;\r\n    /* margin-right: 1.5% */\r\n  }\r\ndp-date-picker.dp-material .dp-picker-input{\r\n    width: 0 !important;\r\n  }\r\n.iBtn{\r\n    color:white;\r\n    font-size:18px;\r\n  }\r\n.summery{\r\n    position: absolute;\r\n  }\r\n.titleCard{\r\n    position: static;\r\n    background-color: #6c757d;\r\n    color: #f8f9fa;\r\n  \r\n  }\r\n.titleBar{\r\n    text-align: center;\r\n    font-weight: bold;\r\n  \r\n  }\r\n.rightDrawerbutton{\r\n    position: fixed;\r\n    right: 60px;\r\n    z-index: inherit;\r\n    /* top:50px;\r\n    z-index: inherit; */\r\n  }\r\n.saveBtn{\r\n    cursor: pointer;\r\n    /* right :100 px; */\r\n  }\r\n.active-feature-type{\r\n  background-color:#ddd;\r\n }\r\n.dis{\r\n  background-color: #000000de; \r\n }\r\n.dis fa{\r\ncolor: #495057;\r\n }\r\n.dis .label{\r\n  color: #495057 !important;\r\n }\r\n.jangafzarBtn{\r\n   color: #fff;\r\n }"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/features/features.component.html":
/*!*******************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/features/features.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-list role=\"list\">\r\n  <mat-list-item class=\"sidNavTitle\">\r\n    <!-- <fa name=\"fas fa-align-justify\" size=\"1x\" (click)=\"drawer.toggle()\" class=\"toggle\"></fa> -->\r\n    <span class=\"label\">کالک</span>\r\n  </mat-list-item>\r\n  <mat-list-item role=\"listitem\"  *ngFor=\"let link of leftList\" (click)=\"draw(link)\" [ngClass]=\"{'active-feature-type': link.id == activeFeatureType, 'dis': !activeLayer}\">\r\n    <i class=\"{{link.icon}} jangafzarBtn \" size=\"1x\"></i>\r\n    <!-- <span class=\"link.icon\"></span> -->\r\n    <span class=\"label\">{{link.translate}}</span>\r\n\r\n    <mat-divider>\r\n    </mat-divider>\r\n  </mat-list-item>\r\n</mat-list>\r\n\r\n<!-- <button *ngIf=\"activeFeature && activeFeature.getGeometry().getType()!='Point'\" (click)=\"calkService.modifyFeature(select,activeFeature)\">حالت مداد</button> -->\r\n<!-- <button (click)=\"freeMode()\">حالت دست</button>\r\n<button (click)=\"selectMode()\">حالت پوینتر</button> -->\r\n<!-- <button (click)=\"removeModify()\">حالت عادی</button> -->\r\n<!-- <button (click)=\"featureMovement()\">حالت جابجایی</button> -->"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/features/features.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/features/features.component.ts ***!
  \*****************************************************************************/
/*! exports provided: FeaturesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesComponent", function() { return FeaturesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var _services_common_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../services/common/common.service */ "./src/services/common/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _popups_unit_unit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../popups/unit/unit.component */ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FeaturesComponent = /** @class */ (function () {
    function FeaturesComponent(calkService, mapService, commonService, dialog) {
        this.calkService = calkService;
        this.mapService = mapService;
        this.commonService = commonService;
        this.dialog = dialog;
        this.drawInteractionsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.activeFeatureChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.calkFeatureChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.leftList = [];
    }
    FeaturesComponent.prototype.ngOnInit = function () {
        this.calkService.initializeInteractions();
        this.calkService.pointerMode();
        this.getFeaturesType();
    };
    FeaturesComponent.prototype.getFeaturesType = function () {
        var _this = this;
        this.calkService.getAllFeatureTypes().subscribe(function (response) {
            console.log('getAllFeatureTypes', response);
            _this.leftList = response;
        });
    };
    FeaturesComponent.prototype.draw = function (link) {
        this.calkService.pointerMode();
        this.activeFeatureType = link.id;
        this.calkService.removeInteractions(this.drawInteractions);
        this.calkFeatureChange.emit(link.icon);
        if (this.activeLayer) {
            if (link.name == "LimitLine") {
                var myLayer = this.activeLayer;
                this.drawInteractions = this.calkService.smoothFeature(this.activeLayer, false);
                this.smoothDrawEvent(link, myLayer);
            }
            else {
                this.drawInteractions = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_3__["default"]({
                    source: this.activeLayer.getSource(),
                    type: link.type
                });
                this.commonDrawEvent(link);
            }
        }
        this.mapService.getMap().addInteraction(this.drawInteractions);
    };
    FeaturesComponent.prototype.smoothDrawEvent = function (link, myLayer) {
        var that = this;
        this.drawInteractions.on('drawstart', function (event) {
            //فیچر جدید را نمایش میدهد
            console.log('awdawd new features |||||||||||||', myLayer);
            var features = myLayer.getSource().getFeatures();
            var length = features.length;
            var feature = features[length - 1];
            feature.set('status', 'add');
            // debugger
            console.log('%%%%%%%%%%%%%%%%%%%', link.name);
            feature.set('name', link.name);
            feature.set('translate', link.translate);
            feature.set('value', link.jsonValue);
            console.log('ooooooo', event.feature);
            // console.log('that.activeFeature ',that.activeLayer);
            that.drawInteractionsChange.emit(that.drawInteractions);
            that.activeFeature = undefined;
        });
        this.drawInteractions.on('drawend', function (event) {
            that.calkService.removeInteractions(that.drawInteractions);
        });
    };
    FeaturesComponent.prototype.commonDrawEvent = function (link) {
        var that = this;
        this.drawInteractions.on('drawstart', function (event) {
            console.log('@@@**************', link);
            // console.log('evvent',event);
            event.feature.set('name', link.name);
            event.feature.set('translate', link.translate);
            that.activeFeature = undefined;
        });
        this.drawInteractions.on('drawend', function (event) {
            //فیچر جدید را نمایش میدهد
            console.log('awdawd new features |||||||||||||', event.feature);
            event.feature.set('status', 'add');
            event.feature.set('value', link.jsonValue);
            that.drawInteractionsChange.emit(that.drawInteractions);
            that.calkService.removeInteractions(that.drawInteractions);
            if (link.name != "Polygon" && link.name != "LineString" && link.name != "Point") {
                var dialogRef = that.dialog.open(_popups_unit_unit_component__WEBPACK_IMPORTED_MODULE_6__["UnitComponent"], {
                    data: link,
                    width: '20%',
                });
                dialogRef.afterClosed().subscribe(function (returnedData) {
                    returnedData.forEach(function (field) {
                        if (field.type == "checkbox-group" && field.label == "یگان") {
                            field.values.forEach(function (op) {
                                if (field.value == op.value) {
                                    event.feature.set('valueForSaveThisFeature', op);
                                    op.selected = true;
                                    event.feature.set('size', op.unit_size);
                                    event.feature.set('type', op.unit_type);
                                    event.feature.set('label', op.label);
                                }
                            });
                        }
                        if (field.type == "checkbox-group" && field.label == "خودی/دشمن") {
                            field.values.forEach(function (eachSelectedOption) {
                                if (field.value == eachSelectedOption.value) {
                                    eachSelectedOption.selected = true;
                                    event.feature.set('featureColor', eachSelectedOption.color);
                                }
                            });
                        }
                    });
                    console.log('selectedUnit', returnedData);
                    console.log(' that.event', event);
                });
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "activeLayer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "drawInteractions", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "drawInteractionsChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "activeFeature", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "activeFeatureChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "select", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "selectChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "calkFeature", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FeaturesComponent.prototype, "calkFeatureChange", void 0);
    FeaturesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-features',
            template: __webpack_require__(/*! ./features.component.html */ "./src/mobile-app/pages/calk/components/features/features.component.html"),
            styles: [__webpack_require__(/*! ./features.component.css */ "./src/mobile-app/pages/calk/components/features/features.component.css")]
        }),
        __metadata("design:paramtypes", [src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_1__["CalkService"],
            fava_map__WEBPACK_IMPORTED_MODULE_2__["FavaMap"],
            _services_common_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]])
    ], FeaturesComponent);
    return FeaturesComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/layers/layers.component.css":
/*!**************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/layers/layers.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".calk-map {\r\n  position: absolute;\r\n  top: 35px;\r\n  bottom: 0px;\r\n  right: 0;\r\n  left: 0;\r\n}\r\n\r\n#scale-line-box{\r\n  top: 43px;\r\n  left: 42px;\r\n  border-bottom: 5px #ffa500 dashed;\r\n  text-align: left !important;\r\n  border-top-left-radius: 8px;\r\n  border-top-right-radius: 8px;\r\n\r\n}\r\n\r\n#mouse-position{\r\n  bottom: 72px;\r\n  left: 5px;\r\n  padding-right: 5px;\r\n  padding-left: 5px;\r\n  border-radius: 8px;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/layers/layers.component.html":
/*!***************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/layers/layers.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"calk-map\" class=\"calk-map\"></div>\r\n<div id=\"mouse-position\" class=\"mouse-position calk-control\"></div>\r\n<div id=\"scale-line-box\" class=\"scale-line-box calk-control\"></div>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/layers/layers.component.ts":
/*!*************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/layers/layers.component.ts ***!
  \*************************************************************************/
/*! exports provided: LayersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayersComponent", function() { return LayersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/View */ "./node_modules/ol/View.js");
/* harmony import */ var fava_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! fava-layer */ "./node_modules/fava-layer/fesm5/fava-layer.js");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map */ "./node_modules/ol/Map.js");
/* harmony import */ var ol_style_fill__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/style/fill */ "./node_modules/ol/style/fill.js");
/* harmony import */ var ol_style_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/style/style */ "./node_modules/ol/style/style.js");
/* harmony import */ var ol_style_stroke__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/style/stroke */ "./node_modules/ol/style/stroke.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/style/Circle */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var ol_control_MousePosition__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/control/MousePosition */ "./node_modules/ol/control/MousePosition.js");
/* harmony import */ var ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/control/ScaleLine */ "./node_modules/ol/control/ScaleLine.js");
/* harmony import */ var ol_control_ZoomSlider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/control/ZoomSlider */ "./node_modules/ol/control/ZoomSlider.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var getStyle = function (feature) {
    return new ol_style_style__WEBPACK_IMPORTED_MODULE_8__["default"]({
        stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_9__["default"]({
            color: feature.values_.color,
            width: 3
        }),
        fill: new ol_style_fill__WEBPACK_IMPORTED_MODULE_7__["default"]({
            color: feature.values_.color,
        }),
        image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_10__["default"]({
            radius: 5,
            fill: new ol_style_fill__WEBPACK_IMPORTED_MODULE_7__["default"]({
                color: feature.values_.color,
            })
        })
    });
};
var vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_4__["default"]({
    source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_5__["default"]({
        wrapX: false
    }),
    style: getStyle,
    layerss: 'salam',
    zIndex: 100000,
});
var LayersComponent = /** @class */ (function () {
    function LayersComponent(injector, mapService, calkService) {
        this.injector = injector;
        this.mapService = mapService;
        this.calkService = calkService;
        this.vectorLayersChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.leftList = [];
        this.label = 'کالک';
    }
    LayersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var refreshMap = function () {
            _this.mapService.setTarget('');
            _this.mapService.setTarget('calk-map');
        };
        this.mapService.getMap().on('change:view', refreshMap);
        var myMap = new ol_Map__WEBPACK_IMPORTED_MODULE_6__["default"]({
            target: 'calk-map'
        });
        this.mapService.setMap(myMap);
        this.initializeMap();
        refreshMap();
        this.addMousePosition();
        this.addScaleLine();
        this.addZoomSlider();
    };
    LayersComponent.prototype.initializeMap = function () {
        var _this = this;
        this.favaLayer = new fava_layer__WEBPACK_IMPORTED_MODULE_3__["FavaLayer"](this.mapService, this.injector);
        this.favaLayer.run("./assets/2ndTileLayer.json").subscribe(function () {
            var view = new ol_View__WEBPACK_IMPORTED_MODULE_2__["default"]({
                center: [0, 0],
                zoom: 3,
                minZoom: 2,
                maxZoom: 11
            });
            _this.mapService.getMap().setView(view);
        });
    };
    LayersComponent.prototype.getStyle = function (feature) {
        return new ol_style_style__WEBPACK_IMPORTED_MODULE_8__["default"]({
            stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_9__["default"]({
                color: feature.values_.color,
                width: 3
            }),
            fill: new ol_style_fill__WEBPACK_IMPORTED_MODULE_7__["default"]({
                color: feature.values_.color,
            }),
            image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_10__["default"]({
                radius: 5,
                fill: new ol_style_fill__WEBPACK_IMPORTED_MODULE_7__["default"]({
                    color: feature.values_.color,
                })
            })
        });
    };
    LayersComponent.prototype.addMousePosition = function () {
        var mousePositionCtrl = new ol_control_MousePosition__WEBPACK_IMPORTED_MODULE_12__["default"]({
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: 'mouse-position',
            undefinedHTML: '&nbsp;'
        });
        this.mapService.getMap().addControl(mousePositionCtrl);
    };
    LayersComponent.prototype.addScaleLine = function () {
        var scaleLineCtrl = new ol_control_ScaleLine__WEBPACK_IMPORTED_MODULE_13__["default"]({
            target: 'scale-line-box',
            className: 'scale-line-box',
        });
        this.mapService.getMap().addControl(scaleLineCtrl);
    };
    LayersComponent.prototype.addZoomSlider = function () {
        var myFunc = function (e) {
            var s = document.getElementsByClassName('ol-zoomslider-thumb ol-unselectable');
            s[0].innerHTML = e.map.getView().getZoom().toFixed();
        };
        var zoomSliderCtrl = new ol_control_ZoomSlider__WEBPACK_IMPORTED_MODULE_14__["default"]();
        this.mapService.getMap().addControl(zoomSliderCtrl);
        this.mapService.getMap().on('moveend', myFunc);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], LayersComponent.prototype, "vectorLayers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], LayersComponent.prototype, "vectorLayersChange", void 0);
    LayersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-layers',
            template: __webpack_require__(/*! ./layers.component.html */ "./src/mobile-app/pages/calk/components/layers/layers.component.html"),
            styles: [__webpack_require__(/*! ./layers.component.css */ "./src/mobile-app/pages/calk/components/layers/layers.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            fava_map__WEBPACK_IMPORTED_MODULE_1__["FavaMap"],
            src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_11__["CalkService"]])
    ], LayersComponent);
    return LayersComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.css":
/*!******************************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.css ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".modify-feature{\r\n    display: block;\r\n    background: #fff;\r\n    height: 100%;\r\n    position: relative;\r\n}\r\n.panel-content{\r\n    padding: 10px;\r\n    padding-top: 45px;\r\n    overflow: auto;\r\n    height: 100%;\r\n}\r\n.panel-header{\r\n    background: #ffa500;\r\n    color: #fff;\r\n    padding: 10px;\r\n    position: absolute;\r\n    width: 100%;\r\n    right: 0;\r\n    top: 0;\r\n    z-index: 9;\r\n}"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.html":
/*!*******************************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.html ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modify-feature\">\r\n    <div class=\"panel-header\">\r\n        خصوصیات {{featureType}}\r\n\r\n        <button style=\"float: left\" class=\"small-btn remove-btn\" mat-button \r\n        (click)=\"onRemoveFeature()\" \r\n        [disabled]=\"!activeFeature\">\r\n            <fa name=\"fas fa-remove\"></fa>\r\n        </button>\r\n    </div>\r\n    <div class=\"panel-content\">\r\n        <mobile-app-dynamic-form-field [(fields)]=\"featureProperties\">\r\n\r\n        </mobile-app-dynamic-form-field>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.ts":
/*!*****************************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: ModifyFeatureComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModifyFeatureComponent", function() { return ModifyFeatureComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/components/confirm-dialog/confirm-dialog.component */ "./src/components/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/calk/calk.service */ "./src/services/calk/calk.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ModifyFeatureComponent = /** @class */ (function () {
    function ModifyFeatureComponent(dialog, calkService) {
        this.dialog = dialog;
        this.calkService = calkService;
        this.activeFeatureChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ModifyFeatureComponent.prototype.ngOnInit = function () {
    };
    ModifyFeatureComponent.prototype.ngDoCheck = function () {
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
    };
    ModifyFeatureComponent.prototype.ngOnChanges = function (changes) {
        if (this.activeFeature && this.activeFeature.get('value')) {
            var type = this.activeFeature.getGeometry().getType();
            if (type == 'Point')
                this.featureType = 'نقطه';
            else if (type == 'LineString')
                this.featureType = 'خط';
            else if (type == 'Polygon')
                this.featureType = 'چند ضلعی';
            this.featureType = this.activeFeature.get('translate');
            this.featureProperties = this.activeFeature.get('value');
            this.oldFeatureProps = this.activeFeature.get('value');
        }
        else {
            this.featureProperties = null;
            this.featureType = '';
        }
    };
    ModifyFeatureComponent.prototype.onRemoveFeature = function () {
        var _this = this;
        var dialogRef = this.dialog.open(src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__["ConfirmDialogComponent"], {
            data: {
                Dialog: 'آیا مطمین هستید؟',
            }
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data == 1) {
                _this.activeFeature.set('status', 'delete');
                _this.activeFeature = null;
                _this.featureProperties = null;
                _this.featureType = '';
                _this.calkService.handMode();
                _this.calkService.pointerMode();
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ModifyFeatureComponent.prototype, "activeFeature", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], ModifyFeatureComponent.prototype, "activeFeatureChange", void 0);
    ModifyFeatureComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-modify-feature',
            template: __webpack_require__(/*! ./modify-feature.component.html */ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.html"),
            styles: [__webpack_require__(/*! ./modify-feature.component.css */ "./src/mobile-app/pages/calk/components/modify-feature/modify-feature.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"],
            _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__["CalkService"]])
    ], ModifyFeatureComponent);
    return ModifyFeatureComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.css":
/*!****************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-toolbar.mat-primary {\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  z-index: 10;\r\n  padding: 30px;\r\n}\r\n.container{\r\n  background-color: rgba(0, 0, 0, 0.66)!important;\r\n}\r\n.mat-toolbar-row, .mat-toolbar-single-row {\r\n  height: 35px;\r\n  display: block;\r\n  padding-right: 40px;\r\n  padding-left: 50px;\r\n  background-color: #161a21;\r\n  color: rgb(255, 165, 0);\r\n  padding-top: 4px;\r\n}\r\n.saveBtn{\r\n  font-size: 20px;\r\n  color: rgb(255, 165, 0);\r\n  cursor: pointer;\r\n}\r\n.general-tools-btn{\r\n  margin: auto 15px auto;\r\n}\r\n.general-tools-btn .measure-menu{\r\n  margin: auto 6px auto;\r\n}\r\n.measure-selected{\r\n  font-size: 14px;\r\n}\r\n.enable{\r\n  color: #d0271b !important;\r\n }\r\n::ng-deep.tooltip {\r\n  position: relative;\r\n  background: rgba(0, 0, 0, 0.5);\r\n  border-radius: 4px;\r\n  color: white;\r\n  padding: 4px 8px;\r\n  opacity: 0.7;\r\n  white-space: nowrap;\r\n}\r\n::ng-deep.tooltip-measure {\r\n  opacity: 1;\r\n  font-weight: bold;\r\n}\r\n::ng-deep.tooltip-static {\r\n  background-color: rgb(255, 165, 0);\r\n  color: black;\r\n  border: 1px solid white;\r\n}\r\n::ng-deep.tooltip-measure:before,\r\n::ng-deep.tooltip-static:before {\r\n  border-top: 6px solid rgba(0, 0, 0, 0.5);\r\n  border-right: 6px solid transparent;\r\n  border-left: 6px solid transparent;\r\n  content: \"\";\r\n  position: absolute;\r\n  bottom: -6px;\r\n  margin-left: -7px;\r\n  left: 50%;\r\n}\r\n::ng-deep.tooltip-static:before {\r\n  border-top-color: rgb(255, 165, 0);\r\n}\r\n::ng-deep.cdk-overlay-connected-position-bounding-box{\r\n  direction: ltr;\r\n}\r\n.edit-feature-btn{\r\n  background-color: rgba(254,255,203,0);\r\n  border: 0;\r\n}\r\nbutton.mat-menu-item:focus{\r\n   outline: 0;\r\n   outline: 0;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.html":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\r\n  <!-- دکمه سیو -->\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-floppy-o saveBtn\" (click)=\"saveFeatures()\"></i>\r\n  </span>\r\n  <!-- حالت مداد -->\r\n  <span class=\" general-tools-btn\">\r\n    <button class=\"edit-feature-btn\" [disabled]=\"!calkService.canModify\" (click)=\"calkService.modifyFeature()\">\r\n      <i class=\"fa fa-pencil saveBtn\" [ngClass]=\"{'enable': calkService.modifyStatus}\"></i>\r\n    </button>\r\n  </span>\r\n  <!-- حالت دست -->\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-hand-paper-o saveBtn\" (click)=\"calkService.handMode(this.pointer,this.modify,this.select)\"\r\n       [ngClass]=\"{'enable': calkService.handStatus}\"></i>\r\n  </span>\r\n  <!-- حالت پوینتر -->\r\n  <span class=\" general-tools-btn\" [ngClass]=\"{'enable': calkService.pointerStatus}\">\r\n    <i class=\"fa fa-mouse-pointer \" (click)=\"calkService.pointerMode()\"></i>\r\n  </span>\r\n\r\n  <!--<span class=\" general-tools-btn\">-->\r\n    <!--<i class=\"fa fa-eye show-bars-toggle\" size=\"1x\" (click)=\"showBarsToggle()\"></i>-->\r\n  <!--</span>-->\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-th-large show-bars-toggle\" [ngClass]=\"gratFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"graticuleToggle()\"></i>\r\n  </span>\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-search show-bars-toggle\" [ngClass]=\" dragBoxFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"zoomToBox()\"></i>\r\n  </span>\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-crosshairs show-bars-toggle\" [ngClass]=\" dragBoxFlag ? '':''\" size=\"1x\"\r\n       (click)=\"zoomToCoordinate()\"></i>\r\n  </span>\r\n\r\n  \r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"fa fa-edit show-bars-toggle\" [ngClass]=\" measureFlag ? 'enable':''\" size=\"1x\"\r\n       (click)=\"toggleMeasure()\"></i>\r\n  <span [matMenuTriggerFor]=\"menu\" class=\"measure-menu\">\r\n    <i class=\"fa show-bars-toggle measure-selected\" [ngClass]=\"measureType == 'LineString' ? 'fa-line-chart' : 'fa-crop'\" size=\"1x\"></i>\r\n  </span>\r\n  <mat-menu #menu=\"matMenu\">\r\n    <button mat-menu-item (click)=\"changeMeasureType('LineString')\"\r\n            [ngClass]=\"measureType == 'LineString' ? 'enable' : ''\">\r\n      <i  class=\"fa fa-line-chart show-bars-toggle\" size=\"1x\" ></i>\r\n      <span>خط</span>\r\n    </button>\r\n    <button mat-menu-item (click)=\"changeMeasureType('Polygon')\"\r\n            [ngClass]=\"measureType == 'Polygon' ? 'enable' : ''\">\r\n      <i  class=\"fa fa-crop show-bars-toggle\" size=\"1x\" ></i>\r\n      <span>شکل</span>\r\n    </button>\r\n  </mat-menu>\r\n</span>\r\n\r\n\r\n  <span class=\" general-tools-btn\">\r\n    <i class=\"{{calkFeature}} jangafzarBtn \" size=\"1x\"></i>\r\n</span>\r\n\r\n  \r\n</mat-toolbar>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.ts":
/*!***************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.ts ***!
  \***************************************************************************/
/*! exports provided: NavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavBarComponent", function() { return NavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_config_style_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../services/config-style.service */ "./src/services/config-style.service.ts");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var ol_graticule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/graticule */ "./node_modules/ol/graticule.js");
/* harmony import */ var ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/stroke */ "./node_modules/ol/style/stroke.js");
/* harmony import */ var ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/interaction/Draw */ "./node_modules/ol/interaction/Draw.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/proj */ "./node_modules/ol/proj.js");
/* harmony import */ var ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/geom/Polygon */ "./node_modules/ol/geom/Polygon.js");
/* harmony import */ var ol_geom_LineString__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/geom/LineString */ "./node_modules/ol/geom/LineString.js");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/style/Fill */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/style/Style */ "./node_modules/ol/style/Style.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/style/Circle */ "./node_modules/ol/style/Circle.js");
/* harmony import */ var ol_Observable_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/Observable.js */ "./node_modules/ol/Observable.js");
/* harmony import */ var ol_sphere_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/sphere.js */ "./node_modules/ol/sphere.js");
/* harmony import */ var ol_layer_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ol/layer.js */ "./node_modules/ol/layer.js");
/* harmony import */ var ol_source_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ol/source.js */ "./node_modules/ol/source.js");
/* harmony import */ var ol_Overlay_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ol/Overlay.js */ "./node_modules/ol/Overlay.js");
/* harmony import */ var _components_coordinate_dialog_coordinate_dialog_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../components/coordinate-dialog/coordinate-dialog.component */ "./src/components/coordinate-dialog/coordinate-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var NavBarComponent = /** @class */ (function () {
    function NavBarComponent(configStyleService, mapService, calkService, dialog) {
        this.configStyleService = configStyleService;
        this.mapService = mapService;
        this.calkService = calkService;
        this.dialog = dialog;
        this.drawInteractionsChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.vectorLayersChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.activeFeatureChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.selectedModeChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.calkFeatureChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
    NavBarComponent.prototype.ngOnInit = function () {
    };
    NavBarComponent.prototype.showBarsToggle = function () {
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
    };
    NavBarComponent.prototype.saveFeatures = function () {
        this.calkService.saveFeatures(this.drawInteractions, this.vectorLayers);
    };
    NavBarComponent.prototype.graticuleToggle = function () {
        if (this.gratFlag === true) {
            this.gratFlag = false;
            this.mapService.getMap().removeControl(this.graticule);
        }
        else {
            this.gratFlag = true;
            this.mapService.getMap().addControl(this.graticule);
        }
    };
    NavBarComponent.prototype.zoomToBox = function () {
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
    NavBarComponent.prototype.zoomToCoordinate = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_components_coordinate_dialog_coordinate_dialog_component__WEBPACK_IMPORTED_MODULE_19__["CoordinateDialogComponent"], {
            data: {},
            width: "40%",
            height: "auto"
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                _this.mapService.getMap().getView().animate({ zoom: data.zoom }, { center: ol_proj__WEBPACK_IMPORTED_MODULE_8__["fromLonLat"]([data.lon, data.lat]) });
            }
        });
    };
    NavBarComponent.prototype.addMeasureLayer = function () {
        var map = this.mapService.getMap();
        this.measureSource = new ol_source_js__WEBPACK_IMPORTED_MODULE_17__["Vector"]();
        this.measureLayer = new ol_layer_js__WEBPACK_IMPORTED_MODULE_16__["Vector"]({
            source: this.measureSource,
            style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_12__["default"]({
                fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_13__["default"]({
                    radius: 7,
                    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
                        color: '#ffcc33'
                    })
                })
            })
        });
        map.addLayer(this.measureLayer);
    };
    NavBarComponent.prototype.initMeasureTool = function () {
        this.addMeasureLayer();
        // map.getViewport().addEventListener('mouseout', function () {
        //   that.helpTooltipElement.classList.add('hidden');
        // });
        this.addInteraction(this.measureType);
    };
    NavBarComponent.prototype.createHelpTooltip = function () {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new ol_Overlay_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.mapService.getMap().addOverlay(this.helpTooltip);
    };
    NavBarComponent.prototype.createMeasureTooltip = function () {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        this.measureTooltip = new ol_Overlay_js__WEBPACK_IMPORTED_MODULE_18__["default"]({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.mapService.getMap().addOverlay(this.measureTooltip);
        this.overLays.push(this.measureTooltip);
    };
    NavBarComponent.prototype.formatLength = function (line) {
        var length = Object(ol_sphere_js__WEBPACK_IMPORTED_MODULE_15__["getLength"])(line);
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
    NavBarComponent.prototype.formatArea = function (polygon) {
        var area = Object(ol_sphere_js__WEBPACK_IMPORTED_MODULE_15__["getArea"])(polygon);
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
    NavBarComponent.prototype.addInteraction = function (type) {
        var that = this;
        that.measureDraw = new ol_interaction_Draw__WEBPACK_IMPORTED_MODULE_6__["default"]({
            source: that.measureSource,
            type: type,
            style: new ol_style_Style__WEBPACK_IMPORTED_MODULE_12__["default"]({
                fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol_style_Circle__WEBPACK_IMPORTED_MODULE_13__["default"]({
                    radius: 5,
                    stroke: new ol_style_stroke__WEBPACK_IMPORTED_MODULE_5__["default"]({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_11__["default"]({
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
                if (geom instanceof ol_geom_Polygon__WEBPACK_IMPORTED_MODULE_9__["default"]) {
                    output = that.formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                }
                else if (geom instanceof ol_geom_LineString__WEBPACK_IMPORTED_MODULE_10__["default"]) {
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
            Object(ol_Observable_js__WEBPACK_IMPORTED_MODULE_14__["unByKey"])(listener);
        }, this);
    };
    NavBarComponent.prototype.toggleMeasure = function () {
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
    NavBarComponent.prototype.changeMeasureType = function (type) {
        this.measureType = type;
        if (this.measureFlag) {
            this.mapService.getMap().removeInteraction(this.measureDraw);
            this.addInteraction(type);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "drawInteractions", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "drawInteractionsChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "vectorLayers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "vectorLayersChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "select", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "selectChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "activeFeature", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "activeFeatureChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "selectedMode", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "selectedModeChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "calkFeature", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], NavBarComponent.prototype, "calkFeatureChange", void 0);
    NavBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-nav-bar',
            template: __webpack_require__(/*! ./nav-bar.component.html */ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.html"),
            styles: [__webpack_require__(/*! ./nav-bar.component.css */ "./src/mobile-app/pages/calk/components/nav-bar/nav-bar.component.css")]
        }),
        __metadata("design:paramtypes", [_services_config_style_service__WEBPACK_IMPORTED_MODULE_1__["ConfigStyleService"],
            fava_map__WEBPACK_IMPORTED_MODULE_2__["FavaMap"],
            _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_3__["CalkService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialog"]])
    ], NavBarComponent);
    return NavBarComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.css":
/*!*****************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/popups/unit/unit.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.html":
/*!******************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/popups/unit/unit.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <i class=\"fa fa-window-close \" size=\"3x\" mat-raised-button (click)=\"cancel()\">\r\n\r\n  &nbsp;</i>\r\n<p >المان جدید</p>\r\n<mat-divider></mat-divider>\r\n\r\n<div class=\"row\">\r\n<mat-form-field> \r\n  \r\n<mat-select placeholder=\"یگان\" [(value)]=\"selectedUnit\">\r\n  <mat-option *ngFor=\"let unit of listOfUnits\" [value]=\"unit\">\r\n    {{unit.name}}\r\n  </mat-option>\r\n</mat-select>\r\n</mat-form-field>\r\n</div>\r\n<div class=\"row\">\r\n<i class=\"fa fa-check \" size=\"2x\" (click)=\"onClose()\"> </i>\r\n</div> -->\r\n\r\n<i class=\"fa fa-window-close \" size=\"3x\" mat-raised-button (click)=\"cancel()\">\r\n  &nbsp;</i>\r\n<p>المان جدید</p>\r\n<mat-divider></mat-divider>\r\n<div *ngFor=\"let field of fields\">\r\n  <div [ngSwitch]=\"field.type\">\r\n    <!-- <mat-form-field *ngSwitchCase=\"'text'\">\r\n      <input type=\"text\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n      <input *ngIf=\"field.subtype && field.subtype=='color'\" type=\"text\" matInput [(colorPicker)]=\"field['value']\">\r\n    </mat-form-field> -->\r\n    <!-- <mat-form-field *ngSwitchCase=\"'number'\">\r\n      <input type=\"number\" matInput placeholder=\"{{field.label}}\" value=\"Sushi\" [(ngModel)]=\"field['value']\">\r\n    </mat-form-field> -->\r\n\r\n    <!-- <div *ngSwitchCase=\"'textarea'\" class=\"myEditor\">\r\n    <quill-editor [modules]='field.textEditorModule' [style]=\"{height: '150px'}\" [placeholder]=\"field['label']+'...'\" dir=\"rtl\"\r\n      [(ngModel)]=\"field['value']\">\r\n    </quill-editor>\r\n  </div> -->\r\n    <!-- <div *ngSwitchCase=\"'textarea'\" class=\"myEditor\">\r\n      <textarea [(ngModel)]=\"field['value']\" matInput placeholder=\"{{field.label}}\"></textarea>\r\n    </div> -->\r\n\r\n    <mat-select *ngSwitchCase=\"'checkbox-group'\" placeholder=\"{{field.label}}\" [(ngModel)]=\"field['value']\">\r\n      <mat-option *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n        {{op.label}}\r\n      </mat-option>\r\n    </mat-select>\r\n    <mat-divider></mat-divider>\r\n\r\n    <!-- <dp-date-picker *ngSwitchCase=\"'date'\" dir=\"rtl\" [(ngModel)]=\"field['value']\" theme=\"dp-material\" mode=\"day\" placeholder=\"{{field.label}}\"\r\n      class=\"datePicker\">\r\n    </dp-date-picker> -->\r\n\r\n    <!-- <mat-radio-group *ngSwitchCase=\"'radio-group'\" class=\"example-radio-group\" [(ngModel)]=\"field['value']\">\r\n      {{field.label}}:\r\n      <mat-radio-button class=\"example-radio-button\" *ngFor=\"let op of field.values\" [value]=\"op.value\">\r\n        {{op.label}}\r\n      </mat-radio-button>\r\n    </mat-radio-group> -->\r\n\r\n    <!-- <div *ngSwitchCase=\"'checkbox'\">\r\n      {{field.label}}:\r\n      <mat-checkbox *ngFor=\"let op of field.values\" class=\"example-margin\" [(ngModel)]=\"op['selected']\">{{op.label}}</mat-checkbox>\r\n    </div> -->\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <i class=\"fa fa-check \" size=\"2x\" (click)=\"onClose()\"> </i>\r\n</div>"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.ts":
/*!****************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/popups/unit/unit.component.ts ***!
  \****************************************************************************/
/*! exports provided: UnitComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnitComponent", function() { return UnitComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../services/calk/calk.service */ "./src/services/calk/calk.service.ts");
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



var UnitComponent = /** @class */ (function () {
    function UnitComponent(calkService, dialogRef, link) {
        this.calkService = calkService;
        this.dialogRef = dialogRef;
        this.link = link;
        this.fields = link.jsonValue;
        console.log("confirm when open dialog", this.fields);
    }
    UnitComponent.prototype.ngOnInit = function () {
        // this.getAllUnit();
    };
    UnitComponent.prototype.getAllUnit = function () {
        // this.calkService.getAllUnit().subscribe(
        //   (response) => {
        //     console.log("getAllUnit", response)
        //     this.listOfUnits = response
        //   }
        // )
    };
    UnitComponent.prototype.onClose = function () {
        console.log('fields', this.fields);
        this.dialogRef.close(this.fields);
    };
    UnitComponent.prototype.selectUnit = function (op) {
        op.forEach(function (element) {
        });
        op.selected = true;
        console.log('op', op);
    };
    UnitComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-unit',
            template: __webpack_require__(/*! ./unit.component.html */ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.html"),
            styles: [__webpack_require__(/*! ./unit.component.css */ "./src/mobile-app/pages/calk/components/popups/unit/unit.component.css")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__["CalkService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], UnitComponent);
    return UnitComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.css":
/*!************************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tree-layers{\r\n    color: orange;\r\n    height: calc(100% - 53px);\r\n}\r\n.layer-context-menu{\r\n    background: #fff;\r\n    padding: 5px 10px;\r\n}\r\n.layer-label{\r\n    color: #fff;\r\n}\r\n.layer-label.calk fa{\r\n    color: #dc3545;\r\n}\r\n.layer-label.groupLayer fa{\r\n    color: #abe000;\r\n    font-size: 14px;\r\n}\r\n.layer-label.layer fa{\r\n    color: orange;\r\n}"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.html":
/*!*************************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"tree-layers\">\r\n  <div class=\"layer-context-menu\">\r\n    <button class=\"small-btn \" mat-button (click)=\"onAddNode('layer')\" [disabled]=\"!activeNode || (activeNode.data && activeNode.data.dtype == 'layer')\">\r\n      <fa name=\"fas fa-plus\"></fa>\r\n      <fa name=\"fas fa-database\"></fa>\r\n    </button>\r\n    <button class=\"small-btn \" mat-button (click)=\"onAddNode('groupLayer')\" [disabled]=\"!activeNode || (activeNode.data && activeNode.data.dtype == 'layer')\">\r\n      <fa name=\"fas fa-plus\"></fa>\r\n      <fa name=\"fas fa-object-group\"></fa>\r\n    </button>\r\n    <button class=\"small-btn remove-btn\" mat-button \r\n    (click)=\"onRemoveNode()\" [disabled]=\"!activeNode || (activeNode.data && activeNode.data.dtype == 'calk')\">\r\n      <fa name=\"fas fa-remove\"></fa>\r\n    </button>\r\n  </div>\r\n  <tree-root class=\"fackur-checkbox\" #tree [nodes]=\"layers\" \r\n  [options]=\"options\" \r\n  (activate)=\"activateLayer($event)\" (deactivate)=\"deactivateLayer($event)\"\r\n  (select)=\"checkLayer($event)\" (deselect)=\"uncheckLayer($event)\">\r\n    <ng-template #treeNodeTemplate let-node let-index=\"index\">\r\n      <div class=\"layer-label\" [ngClass]=\"node.data.dtype? node.data.dtype:''\">\r\n          <fa *ngIf=\"node.data.dtype == 'calk'\" name=\"fas fa-folder-open\"></fa>\r\n          <fa *ngIf=\"node.data.dtype == 'groupLayer'\" name=\"fas fa-object-group\"></fa>\r\n          <fa *ngIf=\"node.data.dtype == 'layer'\" name=\"fas fa-database\"></fa>\r\n          <span> {{node.data.name}} </span>\r\n      </div>\r\n    </ng-template>\r\n  </tree-root>\r\n</div>"

/***/ }),

/***/ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.ts ***!
  \***********************************************************************************/
/*! exports provided: TreeLayersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TreeLayersComponent", function() { return TreeLayersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
/* harmony import */ var src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../add-layer/add-layer.component */ "./src/mobile-app/pages/calk/components/add-layer/add-layer.component.ts");
/* harmony import */ var src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/components/confirm-dialog/confirm-dialog.component */ "./src/components/confirm-dialog/confirm-dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var actionMapping = {
    mouse: {
        dblClick: angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_EXPANDED,
    }
};
var TreeLayersComponent = /** @class */ (function () {
    //public layers;
    function TreeLayersComponent(calkService, dialog) {
        this.calkService = calkService;
        this.dialog = dialog;
        this.activeLayerChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.vectorLayersChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.options = {
            rtl: true,
            useCheckbox: true,
            isExpandedField: 'expanded',
            animateExpand: true,
            animateSpeed: 30,
            animateAcceleration: 1.2,
            useVirtualScroll: true,
            actionMapping: actionMapping
        };
    }
    TreeLayersComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.tree.treeModel.expandAll();
        }, 0);
    };
    TreeLayersComponent.prototype.returnLayerById = function (rootLayer, layerId) {
        var _this = this;
        if (rootLayer.id == layerId)
            return rootLayer;
        if (rootLayer.children) {
            rootLayer.children.forEach(function (element) {
                return _this.returnLayerById(element, layerId);
            });
        }
        return null;
    };
    TreeLayersComponent.prototype.removeLayerById = function (parent, layerIdToRemove) {
        var that = this;
        parent.children = parent.children
            .filter(function (ch) { return ch.id != layerIdToRemove; })
            .map(function (ch) { return that.removeLayerById(ch, layerIdToRemove); });
        return parent;
    };
    TreeLayersComponent.prototype.onRemoveNode = function () {
        var _this = this;
        var dialogRef = this.dialog.open(src_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmDialogComponent"], {
            data: {
                Dialog: 'با حذف لایه، تمایی زیرلایه ها و المان های آن ها حذف خواهند شد! آیا مطمینید؟',
            }
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data == 1) {
                _this.calkService.removeLayer(_this.activeNode.data.id).subscribe(function (res) {
                    _this.activeLayer = null;
                    _this.vectorLayersVisibility(_this.activeNode.data, false);
                    _this.removeLayerById(_this.layers[0], _this.activeNode.data.id);
                    _this.tree.treeModel.update();
                });
            }
        });
    };
    TreeLayersComponent.prototype.onAddNode = function (type) {
        var _this = this;
        var dialogRef = this.dialog.open(_add_layer_add_layer_component__WEBPACK_IMPORTED_MODULE_4__["AddLayerComponent"], {
            data: type
        });
        dialogRef.afterClosed().subscribe(function (data) {
            if (data) {
                var newLayer = {
                    "dtype": type,
                    "name": data,
                    "parent": {
                        "id": _this.activeNode.data.id
                    }
                };
                _this.calkService.addLayer(newLayer).subscribe(function (res) {
                    if (!_this.activeNode.data.children)
                        _this.activeNode.data.children = [];
                    _this.activeNode.data.children.push(res);
                    _this.tree.treeModel.update();
                    _this.tree.treeModel.expandAll();
                });
            }
        });
    };
    TreeLayersComponent.prototype.activateLayer = function (e) {
        var _this = this;
        this.vectorLayers.forEach(function (vectorLayer) {
            if (vectorLayer.get('layerId') == e.node.data.id) {
                // vectorLayer.setVisible(!vectorLayer.getVisible());
                _this.activeLayer = vectorLayer;
                _this.activeLayerChange.emit(_this.activeLayer);
            }
        });
        this.activeNode = e.node;
    };
    TreeLayersComponent.prototype.deactivateLayer = function (e) {
        this.activeLayer = null;
        this.activeLayerChange.emit(this.activeLayer);
        this.activeNode = null;
    };
    TreeLayersComponent.prototype.checkLayer = function (e) {
        this.vectorLayersVisibility(e.node.data, true);
        console.log(e);
    };
    TreeLayersComponent.prototype.uncheckLayer = function (e) {
        this.vectorLayersVisibility(e.node.data, false);
    };
    TreeLayersComponent.prototype.vectorLayersVisibility = function (rootLayer, flag) {
        var that = this;
        this.vectorLayers.forEach(function (vectorLayer) {
            if (vectorLayer.get('layerId') == rootLayer.id) {
                vectorLayer.setVisible(flag);
            }
        });
        rootLayer.children.forEach(function (ch) {
            that.vectorLayersVisibility(ch, flag);
        });
        return true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "vectorLayers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "activeLayer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "layers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "activeLayerChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "vectorLayersChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('tree'),
        __metadata("design:type", Object)
    ], TreeLayersComponent.prototype, "tree", void 0);
    TreeLayersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'mobile-app-tree-layers',
            template: __webpack_require__(/*! ./tree-layers.component.html */ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.html"),
            styles: [__webpack_require__(/*! ./tree-layers.component.css */ "./src/mobile-app/pages/calk/components/tree-layers/tree-layers.component.css")]
        }),
        __metadata("design:paramtypes", [src_services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__["CalkService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], TreeLayersComponent);
    return TreeLayersComponent;
}());



/***/ }),

/***/ "./src/mobile-app/pages/calk/index/index.component.css":
/*!*************************************************************!*\
  !*** ./src/mobile-app/pages/calk/index/index.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-sidenav-container {\r\n  height: 100%;\r\n}\r\n\r\n.nav-bar {\r\n  /*position: absolute;*/\r\n  bottom: 0;\r\n  width: 100%;\r\n  background-color: #eee;\r\n}\r\n\r\n.mat-tab-link {\r\n  color: black;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\nmat-sidenav {\r\n  /* width: 15%; */\r\n  direction: rtl;\r\n  background-color: rgba(0, 0, 0, 0.45);\r\n  z-index: 3;\r\n  position: absolute;\r\n\r\n\r\n}\r\n\r\n.leftSideNav {\r\n  width: 150px !important;\r\n  box-shadow: #0000006b +8px 0px 20px\r\n}\r\n\r\n.rightSideNav {\r\n  width: 200px !important;\r\n  box-shadow: #0000006b -8px 0px 20px\r\n}\r\n\r\nfa {\r\n  float: left;\r\n  padding: 1%;\r\n  color: orange;\r\n}\r\n\r\n/*\r\nmat-sidenav-content {\r\n} */\r\n\r\nmat-list-item {\r\n  cursor: pointer;\r\n  direction: ltr;\r\n}\r\n\r\n.containers {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  z-index: 1999;\r\n}\r\n\r\n.containers > * {\r\n  width: 100%;\r\n}\r\n\r\nmat-chip.leftChips {\r\n  border-top-right-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #eee !important;\r\n  color: black !important;\r\n}\r\n\r\n.mat-standard-chip {\r\n  border-radius: 0px;\r\n}\r\n\r\nmat-chip.rightChips {\r\n  border-top-left-radius: 24px !important;\r\n  border-bottom-right-radius: 24px !important;\r\n  border-bottom-left-radius: 24px !important;\r\n  background-color: #dcf8c6 !important;\r\n}\r\n\r\n.button {\r\n  direction: ltr !important;\r\n  overflow-y: auto;\r\n}\r\n\r\n.contactLabel {\r\n  /* padding: 1%; */\r\n  padding: 1%;\r\n\r\n}\r\n\r\n.label {\r\n  padding-left: 20px;\r\n  color: white;\r\n  font-size: 12px;\r\n  display: block;\r\n  cursor: pointer;\r\n}\r\n\r\n.userDetails {\r\n  white-space: nowrap;\r\n}\r\n\r\n.userDetailsss {\r\n  display: block;\r\n}\r\n\r\n.input {\r\n  /* min-width: 150px!important;\r\n  max-width: 500px!important; */\r\n  width: 92% !important;\r\n  border: 0;\r\n  padding: 10px;\r\n}\r\n\r\n.input-full-width {\r\n  width: 100% !important;\r\n}\r\n\r\n.leftChips {\r\n  direction: rtl;\r\n  padding: 0 10px;\r\n\r\n}\r\n\r\n.rightChips {\r\n  color: black !important;\r\n  padding: 0 10px;\r\n}\r\n\r\n.sendBotton {\r\n  width: 5% !important;\r\n  float: right;\r\n\r\n}\r\n\r\n.sidNavTitle {\r\n  background: orange;\r\n}\r\n\r\n.toggle {\r\n  color: black\r\n}\r\n\r\n.leftMenuButton {\r\n  position: absolute;\r\n  z-index: 19000;\r\n  left: 0;\r\n  top: 0;\r\n}\r\n\r\n.showBarsToggle {\r\n  position: absolute;\r\n  z-index: 19000;\r\n  left: 50px;\r\n  top: 0;\r\n}\r\n\r\n.position {\r\n  font-size: 12px;\r\n  color: yellow;\r\n  white-space: nowrap;\r\n}\r\n\r\n.mat-expansion-panel-spacing {\r\n  margin: 0;\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel {\r\n  background: transparent;\r\n}\r\n\r\n.mat-expansion-panel-header-title {\r\n  color: #fff;\r\n}\r\n\r\n.mat-expansion-indicator {\r\n  color: orange !important;\r\n}\r\n\r\n.mat-chip.mat-standard-chip {\r\n  background-color: inherit\r\n}\r\n\r\n.mat-tab-link {\r\n  color: white;\r\n}\r\n\r\n.example-container {\r\n  width: 100%;\r\n  /* margin: 10px; */\r\n  /* border: 1px solid #555; */\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n\r\n.custom-mouse-position {\r\n\r\n}\r\n\r\nmat-sidenav {\r\n  width: 25vw !important;\r\n}\r\n\r\n.label {\r\n  padding-right: 10px;\r\n}\r\n\r\nnav {\r\n  /*direction: rtl !important;*/\r\n}\r\n\r\n.map {\r\n  position: fixed;\r\n  top: 35px;\r\n  bottom: 0px;\r\n  right: 0;\r\n  left: 0;\r\n}\r\n\r\n.mat-button {\r\n  padding-top: 2px;\r\n}\r\n\r\n.mat-menu-content {\r\n  padding-top: 0px;\r\n  padding-bottom: 0px;\r\n}\r\n\r\nbutton.mat-menu-item {\r\n  width: 100%;\r\n  height: 100%;\r\n  text-align: center;\r\n}\r\n\r\n.menu-header {\r\n  text-align: center;\r\n  padding-top: 20px;\r\n  padding-bottom: 20px;\r\n}\r\n\r\n.activeLayer {\r\n  background-color: #e9e3ff;\r\n}\r\n\r\n.layerButton {\r\n  outline: 0px dotted;\r\n  outline: 0px auto -webkit-focus-ring-color;\r\n}\r\n\r\n.toolbar {\r\n  /*background-color: rgba(0, 0, 0, 0.7) !important;*/\r\n  background-color: #161a21;\r\n  z-index: 11;\r\n  color: orange;\r\n  position: absolute;\r\n  padding-right: 3.5%;\r\n  padding-top: 0.5%;\r\n  /* margin-right: 1.5% */\r\n}\r\n\r\ndp-date-picker.dp-material .dp-picker-input {\r\n  width: 0 !important;\r\n}\r\n\r\n.iBtn {\r\n  color: white;\r\n  font-size: 18px;\r\n}\r\n\r\n.summery {\r\n  position: absolute;\r\n}\r\n\r\n.titleCard {\r\n  position: static;\r\n  background-color: #6c757d;\r\n  color: #f8f9fa;\r\n\r\n}\r\n\r\n.titleBar {\r\n  text-align: center;\r\n  font-weight: bold;\r\n\r\n}\r\n\r\n.rightDrawerbutton {\r\n  position: absolute;\r\n  top: 50px;\r\n  z-index: inherit;\r\n  /* top:50px;\r\n  z-index: inherit; */\r\n}\r\n\r\n.saveBtn {\r\n  cursor: pointer;\r\n  /* right :100 px; */\r\n}\r\n\r\nmobile-app-tree-layers {\r\n  height: 40%;\r\n  display: block;\r\n  margin-top: 50px;\r\n  background: #4b4b4b;\r\n}\r\n\r\nmobile-app-modify-feature {\r\n  height: calc(60% - 115px);\r\n  display: block;\r\n}\r\n\r\n.left-drawer-button {\r\n  position: relative;\r\n  z-index: 5000;\r\n}\r\n\r\n.enable{\r\n  color: #d0271b !important;\r\n}\r\n\r\n#drag-right-box{\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  background-color: rgba(255, 165, 0, 0);\r\n  padding: 6px;\r\n  z-index: 500;\r\n}\r\n\r\n#drag-left-box{\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n  background-color: rgba(255, 165, 0, 0);\r\n  padding: 6px;\r\n  z-index: 500;\r\n}\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/index/index.component.html":
/*!**************************************************************!*\
  !*** ./src/mobile-app/pages/calk/index/index.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"example-container\"\r\n                       autosize\r\n>\r\n  <mat-sidenav-content>\r\n    <fa class=\"button left-drawer-button\" size=\"2x\"\r\n        (click)=\"drawer.toggle()\"\r\n        [name]=\"drawer.opened ? 'fas fa-angle-double-left' : 'fas fa-angle-double-right'\"\r\n        [ngClass]=\"drawer.opened ? 'enable':''\"\r\n    ></fa>\r\n\r\n    <fa class=\"rightDrawerbutton\"\r\n        size=\"2x\" (click)=\"rightDrawer.toggle()\"\r\n        [name]=\"rightDrawer.opened ? 'fas fa-angle-double-right' : 'fas fa-angle-double-left'\"\r\n        [ngClass]=\"rightDrawer.opened ? 'enable':''\"></fa>\r\n\r\n    <mobile-app-nav-bar\r\n      [(drawInteractions)]=\"drawInteractions\"\r\n      [(vectorLayers)]=\"vectorLayers\"\r\n      [(select)]=\"select\"\r\n      [(activeFeature)]=\"activeFeature\"\r\n      [(selectedMode)]=\"selectedMode\"\r\n      [(calkFeature)]=\"calkFeature\"\r\n    ></mobile-app-nav-bar>\r\n    <mobile-app-layers [(vectorLayers)]=\"vectorLayers\"></mobile-app-layers>\r\n  </mat-sidenav-content>\r\n\r\n\r\n  <!-- منو سمت راست(لایه ها) -->\r\n  <mat-sidenav opened=true id=\"right-side-nav\"\r\n               #rightDrawer mode=\"side\" class=\"rightSideNav\">\r\n    <mobile-app-tree-layers\r\n      *ngIf=\"vectorLayers.length > 0\"\r\n      [(vectorLayers)]=\"vectorLayers\"\r\n      [(activeLayer)]=\"activeLayer\"\r\n      [layers]=\"treeLayers\"></mobile-app-tree-layers>\r\n    <mobile-app-modify-feature\r\n      [(activeFeature)]=\"activeFeature\">\r\n\r\n    </mobile-app-modify-feature>\r\n    <div id=\"drag-right-box\" #dragRightBox></div>\r\n  </mat-sidenav>\r\n\r\n  <!-- منوسمت چپ -->\r\n  <mat-sidenav opened=true id=\"left-side-nav\"\r\n               position=\"end\" #drawer mode=\"side\" class=\"leftSideNav\">\r\n    <mobile-app-features\r\n      [(drawInteractions)]=\"drawInteractions\"\r\n      [(activeFeature)]=\"activeFeature\"\r\n      [(select)]=\"select\"\r\n      [(activeLayer)]=\"activeLayer\"\r\n      [(calkFeature)]=\"calkFeature\">\r\n    </mobile-app-features>\r\n    <div id=\"drag-left-box\" #dragLeftBox></div>\r\n  </mat-sidenav>\r\n\r\n</mat-sidenav-container>\r\n"

/***/ }),

/***/ "./src/mobile-app/pages/calk/index/index.component.ts":
/*!************************************************************!*\
  !*** ./src/mobile-app/pages/calk/index/index.component.ts ***!
  \************************************************************/
/*! exports provided: IndexComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexComponent", function() { return IndexComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fava-map */ "./node_modules/fava-map/dist/index.js");
/* harmony import */ var fava_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fava_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/calk/calk.service */ "./src/services/calk/calk.service.ts");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/layer/Vector */ "./node_modules/ol/layer/Vector.js");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/source/Vector */ "./node_modules/ol/source/Vector.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_config_style_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../services/config-style.service */ "./src/services/config-style.service.ts");
/* harmony import */ var ol_interaction_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/interaction.js */ "./node_modules/ol/interaction.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// const vectorLayer = new VectorLayer({
//   source: new VectorSource({
//     wrapX: false
//   }),
//   // style:this.calkService.Style,
//   layerss: 'salam',
//   zIndex: 100000,
// })
var IndexComponent = /** @class */ (function () {
    function IndexComponent(injector, mapService, calkService, configStyleService) {
        this.injector = injector;
        this.mapService = mapService;
        this.calkService = calkService;
        this.configStyleService = configStyleService;
        this.select = new ol_interaction_js__WEBPACK_IMPORTED_MODULE_7__["Select"]({
            wrapX: false
        });
        this.drawedFeatures = [];
        this.vectorLayers = [];
        this.rightMenuItems = [];
        this.leftList = [];
        this.label = 'کالک';
        this.test = 'fas fa-align-justify';
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initLayers();
        this.calkService.activeFeatureCahnge.subscribe(function (data) {
            _this.activeFeature = _this.calkService.activeFeature;
        });
        this.updateMapSize();
        this.draggableMenu('right-side-nav', this.dragRightBox, '-');
        this.draggableMenu('left-side-nav', this.dragLeftBox, '+');
    };
    IndexComponent.prototype.initLayers = function () {
        var _this = this;
        this.calkService.getCalkPositionLayers().subscribe(function (response) {
            _this.treeLayers = [response[0]];
            //res[0]
            // this.rightMenuItems = response;
            response.forEach(function (element) {
                console.log('tree', element);
                if (element.dtype == 'layer') {
                    var vectorLayer = new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_3__["default"]({
                        source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_4__["default"](),
                        style: _this.calkService.style,
                        layerId: element.id,
                        zIndex: 100000,
                        visible: false
                    });
                    _this.mapService.addLayer(vectorLayer);
                    _this.vectorLayers.push(vectorLayer);
                    _this.calkService.refreshLayerFeatures(vectorLayer);
                }
            });
            console.log('this.vectorLayersWhenFill', _this.vectorLayers);
        });
    };
    IndexComponent.prototype.ngOnDestroy = function () {
        this.calkService.removeInteractions(this.drawInteractions);
        this.removeAllFeatures();
        this.calkService.handMode();
        // this.configStyleService.showNavBar.next();
    };
    IndexComponent.prototype.removeAllFeatures = function () {
        var sub = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.vectorLayers.forEach(function (eachVectorLayer) {
            var eachVectorLayerFeatures = eachVectorLayer.getSource().getFeatures();
            eachVectorLayerFeatures.forEach(function (eachFeature) {
                eachVectorLayer.getSource().removeFeature(eachFeature);
            });
        });
        sub.next();
        return sub;
    };
    //////// layers ///////////      
    IndexComponent.prototype.removeAllLayers = function () {
        var _this = this;
        this.mapService.getMap().getLayers().forEach(function (element) {
            _this.mapService.getMap().removeLayer(element);
        });
        this.vectorLayers = [];
    };
    IndexComponent.prototype.modifyFeatures = function () {
        // this.calkService.removeInteractions(select)
    };
    IndexComponent.prototype.updateMapSize = function () {
        var _this = this;
        this.leftSideNav.openedChange.subscribe(function () {
            _this.mapService.getMap().updateSize();
        });
        this.rightSideNav.openedChange.subscribe(function () {
            _this.mapService.getMap().updateSize();
        });
    };
    IndexComponent.prototype.draggableMenu = function (elementId, dragBox, side) {
        var that = this;
        var style = document.getElementById(elementId).style;
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
        var dragByTouch = function (evt) {
            var dif = evt.view.outerWidth - evt.touches[0].clientX;
            dif = (dif < 0 ? -dif : dif) / evt.view.outerWidth * 100;
            if (side == '+') {
                dif = 100 - dif;
            }
            if (dif > 10 && dif < 50)
                style.setProperty('width', dif + '%', 'important');
        };
        var ResetMenuStates = function () {
            setTimeout(function () {
                that.mapService.getMap().updateSize();
                style.setProperty('box-shadow', '#0000006b ' + side + '8px 0px 20px');
            }, 200);
        };
        dragBox['nativeElement'].addEventListener('touchmove', dragByTouch);
        dragBox['nativeElement'].addEventListener('touchend', ResetMenuStates);
        dragBox['nativeElement'].addEventListener('touchstart', function (evt) {
            style.setProperty('box-shadow', side + '8px 0px 20px #4c442c');
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('rightDrawer'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSidenav"])
    ], IndexComponent.prototype, "rightSideNav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('drawer'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSidenav"])
    ], IndexComponent.prototype, "leftSideNav", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dragRightBox'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSidenav"])
    ], IndexComponent.prototype, "dragRightBox", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('dragLeftBox'),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_8__["MatSidenav"])
    ], IndexComponent.prototype, "dragLeftBox", void 0);
    IndexComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-index',
            template: __webpack_require__(/*! ./index.component.html */ "./src/mobile-app/pages/calk/index/index.component.html"),
            styles: [__webpack_require__(/*! ./index.component.css */ "./src/mobile-app/pages/calk/index/index.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            fava_map__WEBPACK_IMPORTED_MODULE_1__["FavaMap"],
            _services_calk_calk_service__WEBPACK_IMPORTED_MODULE_2__["CalkService"],
            _services_config_style_service__WEBPACK_IMPORTED_MODULE_6__["ConfigStyleService"]])
    ], IndexComponent);
    return IndexComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-calk-calk-module.js.map