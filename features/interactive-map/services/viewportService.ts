import {GeoPoint, ViewportBoundary} from "@/features/interactive-map/model/geoTypes";
import {CameraRef, MapViewRef} from "@maplibre/maplibre-react-native";
import {getDistance} from "geolib";

export const getCurrentBoundary = async (mapRef:  React.RefObject<MapViewRef | null>): Promise<ViewportBoundary | null> => {

    if(!mapRef.current) return null;

    const response = await mapRef.current.getVisibleBounds();
    const data = response.flat();

    return {
        neLng: data[0],
        neLat: data[1],
        swLng: data[2],
        swLat: data[3],
    };
}

export const getCurrentViewportCenter = async (mapRef:  React.RefObject<MapViewRef | null>): Promise<GeoPoint | null> => {

    if(!mapRef.current) return null;

    const [centerLng, centerLat] = await mapRef.current.getCenter();

    return {
        lng: centerLng,
        lat: centerLat,
    }
}

export const calculateViewportRadius = (
    boundary: ViewportBoundary,
    center: GeoPoint,
    padding: number = 1.1,
): number => {

    const northEastCorner: GeoPoint = { lng: boundary.neLng, lat: boundary.neLat };

    return getDistance(center, northEastCorner) * padding;
}


export const syncCameraToCurrentCenter = async (
    mapRef:  React.RefObject<MapViewRef | null>,
    cameraRef: React.RefObject<CameraRef | null>,
    centerCoordinates?: GeoPoint
) => {

    if (!mapRef.current || !cameraRef.current) return;
    const locationResponse = centerCoordinates ?? await getCurrentViewportCenter(mapRef);
    if (!locationResponse) {
        return;
    }
    const { lng, lat } = locationResponse
    const currentZoom = await mapRef.current.getZoom();

    cameraRef.current.setCamera({
        centerCoordinate: [lng, lat],
        zoomLevel: currentZoom,
        animationDuration: 0,
        stops: [
            { pitch: 45, animationDuration: 200 },
            { heading: 180, animationDuration: 300 },
        ],
    });
};