"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var mission_service_1 = require("./mission.service");
describe('MissionService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [mission_service_1.MissionService]
        });
    });
    it('should be created', testing_1.inject([mission_service_1.MissionService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=mission.service.spec.js.map