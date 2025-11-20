import { StyleSheet, Text, View } from 'react-native';
import {getShopsWithinBoundary, getShopsWithinRadius} from '../services/shopLocationsService';
import {useRef, useState} from "react";

import { ShopMarker } from '@/features/interactive-map/model/shopMarker';
import {Camera, MapView, MarkerView} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {
    GeoPoint,
    ViewportBoundary, ViewportMeasure
} from "@/features/interactive-map/model/geoTypes";
import {formatLocations} from "@/features/interactive-map/utils/formatLocations";
import {getDistance} from "geolib";

const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};
const ZOOM_SHOPS_VISIBLE = 11;
const FETCH_DISTANCE_THRESHOLD = 0.4;

export default function InteractiveMap() {
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);

    const [boundary, setBoundary] = useState<ViewportBoundary | null>(null);
    const [markers, setMarkers] = useState<ShopMarker[]>([]);
    const [previousMeasures, setPreviousMeasures] = useState<ViewportMeasure | null>(null);

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
        padding: number = 1.2,
    ): number => {

        const northEastCorner: GeoPoint = { lng: boundary.neLng, lat: boundary.neLat };

        return getDistance(center, northEastCorner) * padding;
    }

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
    }

    const getShopMarkers = async () => {
        if(!mapRef.current) throw new Error("Kartet er ikke oppdatere boundary");

        const boundary = await getCurrentBoundary();

        const zoom = await mapRef.current.getZoom();
        const center = await getCurrentViewportCenter();
        const radius = calculateViewportRadius(boundary, center);

        const currentMeasures: ViewportMeasure = {
            zoom: zoom,
            center: center,
            radius: radius
        }

        if (!shouldGetShops(currentMeasures, previousMeasures)) {
            console.log("No change")
            setBoundary(boundary);
            return;
        }
        console.log("changing...")

        const rows = await getShopsWithinRadius(center, radius);
        if(!rows) {
            throw new Error("Kunne ikke laste inn markeder.");
        }

        const formatRows = formatLocations(rows);

        setBoundary(boundary);
        setMarkers(formatRows);
        setPreviousMeasures(currentMeasures);
    }

    const getInitialMarkers = async () => {
        try {
            await getShopMarkers();
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil: ", error);
        }
    }

    const handleRegionChange = async () => {
        try {
            await getShopMarkers();
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil: ", error);
        }
    }

    return (
        <MapView
            ref={mapRef}
            style={ styles.map }
            onDidFinishLoadingMap={getInitialMarkers}
            onRegionDidChange={handleRegionChange}
            regionDidChangeDebounceTime={600}
            mapStyle={customStyle}
            attributionEnabled={true}
        >
            <Camera
                defaultSettings={{
                    centerCoordinate: Object.values(FALLBACK_LOCATION),
                    zoomLevel: 12
                }}
            />

            {markers.length > 0 && (
                markers.map((marker) => (
                    <MarkerView
                        key={marker.id}
                        coordinate={[marker.longitude, marker.latitude]}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <View
                            style={styles.marker}
                        >
                            <Text style={{ fontSize: 10, fontWeight: 600, color: "#000000" }}>{marker.name}</Text>
                        </View>

                    </MarkerView>
                ))
            )}

        </MapView>
    )
}

const styles = StyleSheet.create({
  map: {
      flex: 1,
    width: '100%',
    height: '100%'
  },
  marker: {
      alignSelf: 'flex-start',
      padding: 6,
      borderRadius: 12,
      backgroundColor: "#ffffff",
      borderWidth: 1,
  }
});