import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { AgmMarkerSpider } from './directives/marker-spider';
var AgmMarkerSpiderModule = /** @class */ (function () {
    function AgmMarkerSpiderModule() {
    }
    AgmMarkerSpiderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [AgmCoreModule],
                    declarations: [AgmMarkerSpider],
                    exports: [AgmMarkerSpider]
                },] },
    ];
    return AgmMarkerSpiderModule;
}());
export { AgmMarkerSpiderModule };
//# sourceMappingURL=marker-spider.module.js.map