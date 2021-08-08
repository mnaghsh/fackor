"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var login_guard_1 = require("./login.guard");
describe('LoginGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [login_guard_1.LoginGuard]
        });
    });
    it('should ...', testing_1.inject([login_guard_1.LoginGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=login.guard.spec.js.map