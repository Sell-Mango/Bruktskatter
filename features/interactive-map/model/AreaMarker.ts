import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

export interface AreaMarker {
    id: string;
    name: string;
    markerCount: number;
    location: GeoPoint;
}