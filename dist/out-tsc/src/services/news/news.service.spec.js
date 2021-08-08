"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var news_service_1 = require("./news.service");
describe('NewsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [news_service_1.NewsService]
        });
    });
    it('should be created', testing_1.inject([news_service_1.NewsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=news.service.spec.js.map