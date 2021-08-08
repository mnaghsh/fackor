"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var local_storage_service_1 = require("./local-storage.service");
describe('LocalStorageService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [local_storage_service_1.LocalStorageService]
        });
    });
    it('should be created', testing_1.inject([local_storage_service_1.LocalStorageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=local-storage.service.spec.js.map