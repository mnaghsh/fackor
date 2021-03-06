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
var rxjs_1 = require("rxjs");
var AccessibleService = /** @class */ (function () {
    function AccessibleService() {
    }
    AccessibleService.prototype.showConfirm = function () {
        var sub = new rxjs_1.Subject();
        // console.log('rr')
        // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        //   data: {
        //     Dialog: "حذف انجام شود؟",
        //     type: "reports"
        //   },
        // })
        // dialogRef.afterClosed().subscribe(
        //   (data) => {
        //     if (data == 1) {
        //       this.confirmOfDelete = 1;
        //       sub.next(this.confirmOfDelete);
        //       console.log('dataa', data)
        //     }
        //   }
        // )
        return sub;
    };
    AccessibleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], AccessibleService);
    return AccessibleService;
}());
exports.AccessibleService = AccessibleService;
//# sourceMappingURL=accessible.service.js.map