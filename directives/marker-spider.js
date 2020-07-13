import { Directive, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { InfoWindowManager, MarkerManager } from '@agm/core';
import { SpiderManager } from '../services/managers/spider-manager';
/**
 * AgmMarkerSpider spiderfies map marker if they are near together
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker-spider>
 *        <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        </agm-marker>
 *        <agm-marker [latitude]="lat2" [longitude]="lng2" [label]="'N'">
 *        </agm-marker>
 *      </agm-marker-spider>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMarkerSpider = /** @class */ (function () {
    function AgmMarkerSpider(_spiderManager, _ngZone) {
        this._spiderManager = _spiderManager;
        this._ngZone = _ngZone;
        /**
         * Triggers when a marker is formatted, can be used to style the icon
         */
        this.format = new EventEmitter();
        /**
         * Triggers when markers are spiderfied (expanded)
         */
        this.spiderfy = new EventEmitter();
        /**
         * Triggers when markers are unspiderfied (collapsed)
         */
        this.unspiderfy = new EventEmitter();
    }
    /** @internal */
    AgmMarkerSpider.prototype.ngOnDestroy = function () {
        this._spiderManager.clearMarkers();
    };
    /** @internal */
    AgmMarkerSpider.prototype.ngOnChanges = function (changes) {
        if (changes['legColors']) {
            this._spiderManager.setLegColors(this);
        }
        if (changes['markersWontMove']) {
            this._spiderManager.setMarkersWontMove(this);
        }
        if (changes['markersWontHide']) {
            this._spiderManager.setMarkersWontHide(this);
        }
        if (changes['basicFormatEvents']) {
            this._spiderManager.setBasicFormatEvents(this);
        }
        if (changes['keepSpiderfied']) {
            this._spiderManager.setKeepSpiderfied(this);
        }
        if (changes['ignoreMapClick']) {
            this._spiderManager.setIgnoreMapClick(this);
        }
        if (changes['nearbyDistance']) {
            this._spiderManager.setNearbyDistance(this);
        }
        if (changes['circleSpiralSwitchover']) {
            this._spiderManager.setCircleSpiralSwitchover(this);
        }
        if (changes['circleFootSeparation']) {
            this._spiderManager.setCircleFootSeparation(this);
        }
        if (changes['circleStartAngle']) {
            this._spiderManager.setCircleStartAngle(this);
        }
        if (changes['spiralFootSeparation']) {
            this._spiderManager.setSpiralFootSeparation(this);
        }
        if (changes['spiralLengthStart']) {
            this._spiderManager.setSpiralLengthStart(this);
        }
        if (changes['spiralLengthFactor']) {
            this._spiderManager.setSpiralLengthFactor(this);
        }
        if (changes['legWeight']) {
            this._spiderManager.setLegWeight(this);
        }
    };
    /** @internal */
    AgmMarkerSpider.prototype.ngOnInit = function () {
        var _this = this;
        this._spiderManager.init({
            markersWontMove: this.markersWontMove,
            markersWontHide: this.markersWontHide,
            basicFormatEvents: this.basicFormatEvents,
            keepSpiderfied: this.keepSpiderfied,
            ignoreMapClick: this.ignoreMapClick,
            nearbyDistance: this.nearbyDistance,
            circleSpiralSwitchover: this.circleSpiralSwitchover,
            circleFootSeparation: this.circleFootSeparation,
            circleStartAngle: this.circleStartAngle,
            spiralFootSeparation: this.spiralFootSeparation,
            spiralLengthStart: this.spiralLengthStart,
            spiralLengthFactor: this.spiralLengthFactor,
            legWeight: this.legWeight,
        });
        this._spiderManager.instance.then(function (spiderfier) {
            spiderfier.addListener('format', function (marker, status) { return _this._ngZone.run(function () { return _this.format.emit({
                marker: marker,
                status: status,
                spiderfier: spiderfier
            }); }); });
            spiderfier.addListener('spiderfy', function (changedMarkers, unchangedMarkers) { return _this._ngZone.run(function () { return _this.spiderfy.emit({
                changedMarkers: changedMarkers,
                unchangedMarkers: unchangedMarkers,
                spiderfier: spiderfier
            }); }); });
            spiderfier.addListener('unspiderfy', function (changedMarkers, unchangedMarkers) { return _this._ngZone.run(function () { return _this.unspiderfy.emit({
                changedMarkers: changedMarkers,
                unchangedMarkers: unchangedMarkers,
                spiderfier: spiderfier
            }); }); });
        });
    };
    AgmMarkerSpider.decorators = [
        { type: Directive, args: [{
                    selector: 'agm-marker-spider',
                    providers: [
                        SpiderManager,
                        { provide: MarkerManager, useExisting: SpiderManager },
                        InfoWindowManager,
                    ]
                },] },
    ];
    /** @nocollapse */
    AgmMarkerSpider.ctorParameters = function () { return [
        { type: SpiderManager },
        { type: NgZone }
    ]; };
    AgmMarkerSpider.propDecorators = {
        legColors: [{ type: Input }],
        markersWontMove: [{ type: Input }],
        markersWontHide: [{ type: Input }],
        basicFormatEvents: [{ type: Input }],
        keepSpiderfied: [{ type: Input }],
        ignoreMapClick: [{ type: Input }],
        nearbyDistance: [{ type: Input }],
        circleSpiralSwitchover: [{ type: Input }],
        circleFootSeparation: [{ type: Input }],
        circleStartAngle: [{ type: Input }],
        spiralFootSeparation: [{ type: Input }],
        spiralLengthStart: [{ type: Input }],
        spiralLengthFactor: [{ type: Input }],
        legWeight: [{ type: Input }],
        format: [{ type: Output }],
        spiderfy: [{ type: Output }],
        unspiderfy: [{ type: Output }]
    };
    return AgmMarkerSpider;
}());
export { AgmMarkerSpider };
//# sourceMappingURL=marker-spider.js.map