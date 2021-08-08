"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var mission_guard_1 = require("./mission.guard");
describe('MissionGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [mission_guard_1.MissionGuard]
        });
    });
    it('should ...', testing_1.inject([mission_guard_1.MissionGuard], function (guard) {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=mission.guard.spec.js.map