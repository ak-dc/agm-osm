(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('ts-overlapping-marker-spiderfier'), require('@agm/core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'ts-overlapping-marker-spiderfier', '@agm/core'], factory) :
    (factory((global.ngmaps = global.ngmaps || {}, global.ngmaps.spiderfier = {}),global.ng.core,global.OMS,global.ngmaps.core));
}(this, (function (exports,core,tsOverlappingMarkerSpiderfier,core$1) { 'use strict';

    var __extends = (window && window.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var SpiderManager = /** @class */ (function (_super) {
        __extends(SpiderManager, _super);
        function SpiderManager(_mapsWrapper, _zone, _markerManager) {
            var _this = _super.call(this, _mapsWrapper, _zone, _markerManager) || this;
            _this._mapsWrapper = _mapsWrapper;
            _this._zone = _zone;
            _this._markerManager = _markerManager;
            _this._spiderInstance = new Promise(function (resolver) {
                _this._resolver = resolver;
            });
            return _this;
        }
        Object.defineProperty(SpiderManager.prototype, "instance", {
            get: function () {
                return this._spiderInstance;
            },
            enumerable: true,
            configurable: true
        });
        SpiderManager.prototype.init = function (options) {
            var _this = this;
            this._mapsWrapper.getNativeMap().then(function (map) {
                var spider = new tsOverlappingMarkerSpiderfier.OverlappingMarkerSpiderfier(map, options);
                _this._resolver(spider);
            });
        };
        SpiderManager.prototype.addMarker = function (marker) {
            this._markerManager.addMarker(marker, false);
            var markerPromise = this._markerManager.getNativeMarker(marker);
            this._markers.set(marker, markerPromise);
            Promise.all([
                this._spiderInstance,
                markerPromise,
            ]).then(function (_a) {
                var spider = _a[0], nativeMarker = _a[1];
                spider.addMarker(nativeMarker);
            });
        };
        SpiderManager.prototype.deleteMarker = function (marker) {
            var _this = this;
            return Promise.all([
                this._spiderInstance,
                this._markerManager.getNativeMarker(marker),
            ]).then(function (_a) {
                var spider = _a[0], nativeMarker = _a[1];
                if (_this._markers.has(marker)) {
                    spider.removeMarker(nativeMarker);
                    _this._markers.delete(marker);
                    return _this._markerManager.deleteMarker(marker);
                }
            });
        };
        SpiderManager.prototype.clearMarkers = function () {
            var _this = this;
            return this._spiderInstance.then(function (spider) {
                spider.removeAllMarkers();
                var markers = Array.from(_this._markers.keys());
                _this._markers.clear();
                return _this._markerManager.deleteMarkers(markers);
            });
        };
        SpiderManager.prototype.setLegColors = function (c) {
            this._spiderInstance.then(function (spider) {
                if (c.legColors) {
                    if (typeof c.legColors.usual === 'object') {
                        Object.assign(spider.legColors.usual, c.legColors.usual);
                    }
                    if (typeof c.legColors.highlighted === 'object') {
                        Object.assign(spider.legColors.highlighted, c.legColors.highlighted);
                    }
                }
            });
        };
        SpiderManager.prototype.setMarkersWontMove = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.markersWontMove = typeof c.markersWontMove !== 'undefined' ? c.markersWontMove : false;
            });
        };
        SpiderManager.prototype.setMarkersWontHide = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.markersWontHide = typeof c.markersWontHide !== 'undefined' ? c.markersWontHide : false;
            });
        };
        SpiderManager.prototype.setBasicFormatEvents = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.basicFormatEvents = typeof c.basicFormatEvents !== 'undefined' ? c.basicFormatEvents : false;
            });
        };
        SpiderManager.prototype.setKeepSpiderfied = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.keepSpiderfied = typeof c.keepSpiderfied !== 'undefined' ? c.keepSpiderfied : false;
            });
        };
        SpiderManager.prototype.setIgnoreMapClick = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.ignoreMapClick = typeof c.ignoreMapClick !== 'undefined' ? c.ignoreMapClick : false;
            });
        };
        SpiderManager.prototype.setNearbyDistance = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.nearbyDistance = typeof c.nearbyDistance === 'number' ? c.nearbyDistance : 20;
            });
        };
        SpiderManager.prototype.setCircleSpiralSwitchover = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.circleSpiralSwitchover = typeof c.circleSpiralSwitchover === 'number' ? c.circleSpiralSwitchover : 9;
            });
        };
        SpiderManager.prototype.setCircleFootSeparation = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.circleFootSeparation = typeof c.circleSpiralSwitchover === 'number' ? c.circleFootSeparation : 23;
            });
        };
        SpiderManager.prototype.setCircleStartAngle = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.circleStartAngle = typeof c.circleSpiralSwitchover === 'number' ? c.circleStartAngle : Math.PI / 6;
            });
        };
        SpiderManager.prototype.setSpiralFootSeparation = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.spiralFootSeparation = typeof c.circleSpiralSwitchover === 'number' ? c.spiralFootSeparation : 26;
            });
        };
        SpiderManager.prototype.setSpiralLengthStart = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.spiralLengthStart = typeof c.circleSpiralSwitchover === 'number' ? c.spiralLengthStart : 11;
            });
        };
        SpiderManager.prototype.setSpiralLengthFactor = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.spiralLengthFactor = typeof c.circleSpiralSwitchover === 'number' ? c.spiralLengthFactor : 4;
            });
        };
        SpiderManager.prototype.setLegWeight = function (c) {
            this._spiderInstance.then(function (spider) {
                spider.legWeight = typeof c.circleSpiralSwitchover === 'number' ? c.legWeight : 1;
            });
        };
        SpiderManager.prototype.createEventObservable = function (eventName, marker) {
            // Override the default "click" event with "spider_click"
            if (eventName === 'click') {
                eventName = 'spider_click';
            }
            return _super.prototype.createEventObservable.call(this, eventName, marker);
        };
        SpiderManager.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        SpiderManager.ctorParameters = function () { return [
            { type: core$1.GoogleMapsAPIWrapper },
            { type: core.NgZone },
            { type: core$1.MarkerManager, decorators: [{ type: core.SkipSelf }] }
        ]; };
        return SpiderManager;
    }(core$1.MarkerManager));

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
            this.format = new core.EventEmitter();
            /**
             * Triggers when markers are spiderfied (expanded)
             */
            this.spiderfy = new core.EventEmitter();
            /**
             * Triggers when markers are unspiderfied (collapsed)
             */
            this.unspiderfy = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        selector: 'agm-marker-spider',
                        providers: [
                            SpiderManager,
                            { provide: core$1.MarkerManager, useExisting: SpiderManager },
                            core$1.InfoWindowManager,
                        ]
                    },] },
        ];
        /** @nocollapse */
        AgmMarkerSpider.ctorParameters = function () { return [
            { type: SpiderManager },
            { type: core.NgZone }
        ]; };
        AgmMarkerSpider.propDecorators = {
            legColors: [{ type: core.Input }],
            markersWontMove: [{ type: core.Input }],
            markersWontHide: [{ type: core.Input }],
            basicFormatEvents: [{ type: core.Input }],
            keepSpiderfied: [{ type: core.Input }],
            ignoreMapClick: [{ type: core.Input }],
            nearbyDistance: [{ type: core.Input }],
            circleSpiralSwitchover: [{ type: core.Input }],
            circleFootSeparation: [{ type: core.Input }],
            circleStartAngle: [{ type: core.Input }],
            spiralFootSeparation: [{ type: core.Input }],
            spiralLengthStart: [{ type: core.Input }],
            spiralLengthFactor: [{ type: core.Input }],
            legWeight: [{ type: core.Input }],
            format: [{ type: core.Output }],
            spiderfy: [{ type: core.Output }],
            unspiderfy: [{ type: core.Output }]
        };
        return AgmMarkerSpider;
    }());

    var AgmMarkerSpiderModule = /** @class */ (function () {
        function AgmMarkerSpiderModule() {
        }
        AgmMarkerSpiderModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [core$1.AgmCoreModule],
                        declarations: [AgmMarkerSpider],
                        exports: [AgmMarkerSpider]
                    },] },
        ];
        return AgmMarkerSpiderModule;
    }());

    // main modules

    exports.AgmMarkerSpiderModule = AgmMarkerSpiderModule;
    exports.AgmMarkerSpider = AgmMarkerSpider;
    exports.SpiderManager = SpiderManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
