import { EventEmitter, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SpiderManager } from '../services/managers/spider-manager';
import { FormatEvent, LegColorOptions, SpiderfyEvent, SpiderOptions } from '../services/google-spider-types';
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
export declare class AgmMarkerSpider implements OnDestroy, OnChanges, OnInit, SpiderOptions {
    private _spiderManager;
    private _ngZone;
    /**
     * The colors of the legs
     */
    legColors: LegColorOptions;
    /**
     * Disable listening for marker move events (in case markers won't be dragged/moved)
     */
    markersWontMove: boolean;
    /**
     * Disable listening for visibility events (in case markers won't be hidden)
     */
    markersWontHide: boolean;
    /**
     * Disable the OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE event
     */
    basicFormatEvents: boolean;
    /**
     * Do not unspiderify the markers when one of them is clicked
     */
    keepSpiderfied: boolean;
    /**
     * Do not unspiderify when the map is clicked
     */
    ignoreMapClick: boolean;
    /**
     * The pixel radius within which a marker is considered overlapping
     */
    nearbyDistance: number;
    /**
     * The amount of markers before the spiderfier switches to spiral mode
     */
    circleSpiralSwitchover: number;
    /**
     * The distance for the spiderfied markers from the center (circle mode)
     */
    circleFootSeparation: number;
    /**
     * The starting angle for the spiderfied markers (circle mode)
     */
    circleStartAngle: number;
    /**
     * The distance for the spiderfied markers from the center (spiral mode)
     */
    spiralFootSeparation: number;
    /**
     * The distance between the spiderfied markers from the first to the second (spiral mode)
     */
    spiralLengthStart: number;
    /**
     * The increment to the distance for each consecutive marker (spiral mode)
     */
    spiralLengthFactor: number;
    /**
     * The thickness of the marker lines
     */
    legWeight: number;
    /**
     * Triggers when a marker is formatted, can be used to style the icon
     */
    format: EventEmitter<FormatEvent>;
    /**
     * Triggers when markers are spiderfied (expanded)
     */
    spiderfy: EventEmitter<SpiderfyEvent>;
    /**
     * Triggers when markers are unspiderfied (collapsed)
     */
    unspiderfy: EventEmitter<SpiderfyEvent>;
    constructor(_spiderManager: SpiderManager, _ngZone: NgZone);
    /** @internal */
    ngOnDestroy(): void;
    /** @internal */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnInit(): void;
}
