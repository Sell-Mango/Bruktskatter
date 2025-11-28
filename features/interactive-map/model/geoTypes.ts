export interface GeoPoint{
    lng: number;
    lat: number;
}

export type ViewportBoundary = {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

export type ViewportMeasure = {
    center: GeoPoint;
    radius: number;
    zoom: number;
}

export type RectangleCoordinates = {
    southWest: GeoPoint;
    northWest: GeoPoint;
    northEast: GeoPoint;
    southEast: GeoPoint;
}

export const boundaryToRectangleCoordinates = (
    { neLng, neLat, swLng, swLat }: ViewportBoundary
): RectangleCoordinates => {

    return {
        southWest: { lng: swLng, lat: swLat },
        northWest: { lng: neLng, lat: swLat },
        northEast: { lng: neLng, lat: neLat },
        southEast: { lng: swLng, lat: neLat },
    }
}

export const boundaryToPolygonArray = (
    { neLng, neLat, swLng, swLat }: ViewportBoundary): number[][] => {
    return [
        [swLng, swLat],
        [neLng, swLat],
        [neLng, neLat],
        [swLng, neLat],
        [swLng, swLat],
    ]
}