"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var messages_service_1 = require("./messages.service");
describe('MessagesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [messages_service_1.MessagesService]
        });
    });
    it('should be created', testing_1.inject([messages_service_1.MessagesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=messages.service.spec.js.map