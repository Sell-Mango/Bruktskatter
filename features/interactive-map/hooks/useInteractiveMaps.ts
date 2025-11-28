import {useRef, useState} from "react";
import {GeoPoint, ViewportBoundary, ViewportMeasure} from "@/features/interactive-map/model/geoTypes";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {getDistance} from "geolib";
import {GestureResponderEvent} from "react-native";
import {getShopsWithinRadius} from "@/features/interactive-map/services/shopLocationsService";
import {formatLocations} from "@/features/interactive-map/utils/formatLocations";
import {CameraRef, MapView} from "@maplibre/maplibre-react-native";
import {
    calculateViewportRadius,
    getCurrentBoundary,
    getCurrentViewportCenter, syncCameraToCurrentCenter
} from "@/features/interactive-map/services/viewportService";
import {AreaMarker} from "@/features/interactive-map/model/AreaMarker";
import {getClustersOfShops} from "@/features/interactive-map/services/shopAreaService";

const ZOOM_SHOPS_VISIBLE = 12;
const FETCH_DISTANCE_THRESHOLD = 0.2;

export const useInteractiveMaps = () => {
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);
    const cameraRef = useRef<CameraRef | null>(null);

    const [boundary, setBoundary] = useState<ViewportBoundary | null>(null);
    const [areaMarkers, setAreaMarkers] = useState<AreaMarker[]>([]);
    const [markers, setMarkers] = useState<ShopLocation[]>([]);
    const [previousMeasures, setPreviousMeasures] = useState<ViewportMeasure | null>(null);
    const [selectedMarker, setSelectedMarker] = useState<number | null>(null);


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

        const response = await getClustersOfShops(center, radius, 50);
        if(!response) {
            return
        }

        await syncCameraToCurrentCenter(mapRef, cameraRef);
        setAreaMarkers(response);
        return response;
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

    const setCameraMarkerPosition = ({lng, lat}: GeoPoint) => {

        if(!cameraRef.current) {
            throw new Error("Kartet er ikke oppdatere boundary");
        }

        cameraRef.current?.setCamera({
            centerCoordinate: [lng, lat],
            zoomLevel: 15,
            padding: {
                paddingTop: 300,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
            },
            animationMode: "flyTo",
            animationDuration: 1200,
        });
    };

    const handleMarkerPress = (
        event: GestureResponderEvent,
        markerId: number | null,
        position: GeoPoint,
    ) => {
        setCameraMarkerPosition(position);

        setTimeout(() => {
            setSelectedMarker(markerId)
        }, 1200)
    }

    const handleCloseButtonPress = () => {
        setSelectedMarker(null);
    }

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
        handleMarkerPress,
        handleCloseButtonPress,
    };

    return {
        refs,
        actions,
        boundary,
        previousMeasures,
        areaMarkers,
        markers,
        selectedMarker,
    };
}