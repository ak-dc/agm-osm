var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Injectable, NgZone, SkipSelf } from '@angular/core';
import { OverlappingMarkerSpiderfier } from 'ts-overlapping-marker-spiderfier';
import { GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
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
            var spider = new OverlappingMarkerSpiderfier(map, options);
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
            return Promise.all(markers.map(function (marker) { return _this._markerManager.deleteMarker(marker); })).then(function () { });
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
        { type: Injectable },
    ];
    /** @nocollapse */
    SpiderManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone },
        { type: MarkerManager, decorators: [{ type: SkipSelf }] }
    ]; };
    return SpiderManager;
}(MarkerManager));
export { SpiderManager };
//# sourceMappingURL=spider-manager.js.map