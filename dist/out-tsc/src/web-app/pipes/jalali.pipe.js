"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var moment = require("moment-jalali");
var JalaliPipe = /** @class */ (function () {
    function JalaliPipe() {
    }
    JalaliPipe.prototype.transform = function (value, args) {
        var MomentDate = moment(value);
        // return MomentDate.locale('fa').format('jYYYY/jM/jD');
        return MomentDate.locale('fa').format('jYY/jM/jD h:m:s');
    };
    JalaliPipe = __decorate([
        core_1.Pipe({
            name: 'jalali'
        })
    ], JalaliPipe);
    return JalaliPipe;
}());
exports.JalaliPipe = JalaliPipe;
//# sourceMappingURL=jalali.pipe.js.map