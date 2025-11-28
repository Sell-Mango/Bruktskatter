import {useRef, useState} from "react";
import {GeoPoint, ViewportBoundary, ViewportMeasure} from "@/features/interactive-map/model/geoTypes";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {getDistance} from "geolib";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {formatLocations} from "@/features/interactive-map/utils/formatLocations";
import {CameraRef, MapView} from "@maplibre/maplibre-react-native";
import {
    calculateViewportRadius,
    getCurrentBoundary,
    getCurrentViewportCenter, syncCameraToCurrentCenter
} from "@/features/interactive-map/services/viewportService";
import {fetchShopMarkersArea} from "@/features/interactive-map/repository/shopLocationsRepository";
import {AreaMarker} from "@/features/interactive-map/model/AreaMarker";

const ZOOM_SHOPS_VISIBLE = 12;
const FETCH_DISTANCE_THRESHOLD = 0.2;

export const useInteractiveMaps = () => {
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);
    const cameraRef = useRef<CameraRef | null>(null);

    const [boundary, setBoundary] = useState<ViewportBoundary | null>(null);
    const [areaMarkers, setAreaMarkers] = useState<AreaMarker[]>([]);
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

    const getZoom = async () => {
        return mapRef.current?.getZoom() || ZOOM_SHOPS_VISIBLE;
    }

    const getAreaMarkers = async () => {

        const boundary = await getCurrentBoundary(mapRef)
        const center = await getCurrentViewportCenter(mapRef);
        if (!boundary || !center) {
            return;
        }

        const radius = calculateViewportRadius(boundary, center);

        await fetchShopMarkersArea(center, radius, 50);
    }


    const getShopMarkers = async () => {
        if(!mapRef.current) throw new Error("Kartet er ikke oppdatere boundary");

        const boundary = await getCurrentBoundary(mapRef);
        const zoom = await mapRef.current.getZoom();
        const center = await getCurrentViewportCenter(mapRef);

        if (!boundary || !center) {
            return;
        }
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
            return
        }

        const formatRows = formatLocations(rows);

        await syncCameraToCurrentCenter(mapRef, cameraRef);

        setBoundary(boundary);
        setMarkers(formatRows);
        setPreviousMeasures(currentMeasures);
    };


    const setCameraMarkerPosition = ({lng, lat}: GeoPoint, lngPadding = 0.0005, latPadding = 0.001) => {

        if(!cameraRef.current) {
            throw new Error("Kartet er ikke oppdatere boundary");
        }

        cameraRef.current?.setCamera({
            centerCoordinate: [lng + lngPadding, lat + latPadding],
            zoomLevel: 15,
            animationMode: "flyTo",
            animationDuration: 1200,
        });
    };

    const refs = {
        mapRef,
        cameraRef,
    }

    const actions = {
        getZoom,
        getShopMarkers,
        getAreaMarkers,
        shouldGetShops,
        getCurrentBoundary,
        getCurrentViewportCenter,
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