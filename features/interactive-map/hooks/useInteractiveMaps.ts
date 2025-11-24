import {useRef, useState} from "react";
import {GeoPoint, ViewportBoundary, ViewportMeasure} from "@/features/interactive-map/model/geoTypes";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {getDistance} from "geolib";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {formatLocations} from "@/features/interactive-map/utils/formatLocations";
import {CameraRef, MapView} from "@maplibre/maplibre-react-native";

const ZOOM_SHOPS_VISIBLE = 11;
const FETCH_DISTANCE_THRESHOLD = 0.2;

export const useInteractiveMaps = () => {
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);
    const cameraRef = useRef<CameraRef | null>(null);

    const [boundary, setBoundary] = useState<ViewportBoundary | null>(null);
    const [markers, setMarkers] = useState<ShopLocation[]>([]);
    const [previousMeasures, setPreviousMeasures] = useState<ViewportMeasure | null>(null);


    const shouldGetShops = (
        currentFetch: ViewportMeasure,
        previousFetch: ViewportMeasure | null
    ): boolean => {
        const { center, zoom } = currentFetch;

        if (zoom < ZOOM_SHOPS_VISIBLE) {
            return false;
        }
        if (!previousFetch) {
            return true;
        }
        const movedDistance = getDistance(center, previousFetch.center);

        return movedDistance > previousFetch.radius * FETCH_DISTANCE_THRESHOLD;
    };


    const syncCameraToCurrentCenter = async (centerCoordinates?: GeoPoint) => {
        if (!mapRef.current || !cameraRef.current) return;

        const { lng, lat } = centerCoordinates ?? await getCurrentViewportCenter();
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

    const getCurrentBoundary = async () => {
        if(!mapRef.current) throw new Error("Kunne ikke oppdatere boundary");

        const response = await mapRef.current.getVisibleBounds();
        const data = response.flat();
        const results: ViewportBoundary = {
            neLng: data[0],
            neLat: data[1],
            swLng: data[2],
            swLat: data[3],
        }

        return results;
    }

    const getCurrentViewportCenter = async (): Promise<GeoPoint> => {

        if(!mapRef.current) throw new Error("Kartet er ikke ferdig lastet inn");

        const [centerLng, centerLat] = await mapRef.current.getCenter();

        return {
            lng: centerLng,
            lat: centerLat,
        }
    }

    const calculateViewportRadius = (
        boundary: ViewportBoundary,
        center: GeoPoint,
        padding: number = 1.1,
    ): number => {

        const northEastCorner: GeoPoint = { lng: boundary.neLng, lat: boundary.neLat };

        return getDistance(center, northEastCorner) * padding;
    }



    const getShopMarkers = async () => {
        if(!mapRef.current) throw new Error("Kartet er ikke oppdatere boundary");

        const boundary = await getCurrentBoundary();
        const zoom = await mapRef.current.getZoom();
        const center = await getCurrentViewportCenter();
        const radius = calculateViewportRadius(boundary, center);

        const currentMeasures: ViewportMeasure = {
            zoom,
            center,
            radius,
        };

        if (!shouldGetShops(currentMeasures, previousMeasures)) {
            console.log("No change");
            return;
        }

        const rows = await getShopsWithinRadius(center, radius);
        if(!rows) {
            throw new Error("Kunne ikke laste inn markeder.");
        }

        const formatRows = formatLocations(rows);

        await syncCameraToCurrentCenter();

        setBoundary(boundary);
        setMarkers(formatRows);
        setPreviousMeasures(currentMeasures);
    };


    const setCameraMarkerPosition = ({lng, lat}: GeoPoint) => {

        if(!cameraRef.current) {
            throw new Error("Kartet er ikke oppdatere boundary");
        }

        cameraRef.current?.setCamera({
            centerCoordinate: [lng + 0.0005, lat + 0.001],
            zoomLevel: 15,
            animationMode: "flyTo",
            animationDuration: 1400,
        });
    };

    const refs = {
        mapRef,
        cameraRef,
    }

    const actions = {
        getShopMarkers,
        shouldGetShops,
        getCurrentBoundary,
        setCameraMarkerPosition,
    };

    return {
        refs,
        actions,
        boundary,
        previousMeasures,
        markers,
    };
}