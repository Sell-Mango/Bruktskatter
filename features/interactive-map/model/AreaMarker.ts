import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

export interface AreaMarker {
    id: string;
    name: string;
    count: number;
    location: GeoPoint;
}