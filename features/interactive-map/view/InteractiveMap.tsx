import { StyleSheet, Text, View } from 'react-native';
import {getShopsWithinBoundary, getShopsWithinRadius} from '../services/shopLocationsService';
import {useRef, useState} from "react";

import { ShopMarker } from '@/features/interactive-map/model/shopMarker';
import {Camera, MapView, MarkerView} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {
    GeoPoint,
    ViewportBoundary
} from "@/features/interactive-map/model/geoTypes";
import {formatLocations} from "@/features/interactive-map/utils/formatLocations";
import {getDistance} from "geolib";

export default function InteractiveMap() {
    const [boundary, setBoundary] = useState<ViewportBoundary>();
    const [markers, setMarkers] = useState<ShopMarker[]>([]);
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);
    const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};

    const updateBoundary = async () => {
        if(!mapRef.current) throw new Error("Kartet er ikke ferdig lastet inn");

        const response = await mapRef.current.getVisibleBounds();
        const data = response.flat();
        const results: ViewportBoundary = {
            neLng: data[0],
            neLat: data[1],
            swLng: data[2],
            swLat: data[3],
        }
        setBoundary(results);
        return results;
    }

    const getViewportCenter = async (): Promise<GeoPoint> => {

        if(!mapRef.current) throw new Error("Kartet er ikke ferdig lastet inn");

        const [centerLng, centerLat] = await mapRef.current.getCenter();

        return {
            lng: centerLng,
            lat: centerLat,
        }
    }

    const calculateViewportRadius = async (
        boundary: ViewportBoundary,
        padding: number = 1.2,
        viewportCenter?: GeoPoint | null,
    ): Promise<number> => {

        viewportCenter = viewportCenter ?? await getViewportCenter()
        const northEastCorner: GeoPoint = { lng: boundary.neLng, lat: boundary.neLat };

        return getDistance(viewportCenter, northEastCorner) * padding;
    }

    const getShopMarkers = async (
        center?: GeoPoint | null,
        radius?: number | null
    ) => {
        const boundaryResponse = await updateBoundary();
        if(!boundaryResponse) {
            throw new Error("Kunne ikke finne boundary");
        }

        center = center ?? await getViewportCenter();
        radius = radius ?? await calculateViewportRadius(boundaryResponse);
        console.log(center, "center");
        console.log(radius, "radius");

        const markersResponse = await getShopsWithinRadius(center, radius);
        if(!markersResponse) {
            throw new Error("Kunne ikke laste inn markeder.");
        }

        return formatLocations(markersResponse);
    }

    const getInitialMarkers = async () => {
        try {
            const markers = await getShopMarkers(FALLBACK_LOCATION, 10);
            setMarkers(markers);
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil: ", error);
        }
    }

    const handleRegionChange = async () => {
        try {
            const markers = await getShopMarkers();
            setMarkers(markers);
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil: ", error);
        }

         // const centerLocation = await mapRef.current.getCenter();
    }

    return (
        <MapView
            ref={mapRef}
            style={ styles.map }
            onDidFinishLoadingMap={getInitialMarkers}
            onRegionDidChange={handleRegionChange}
            regionDidChangeDebounceTime={1000}
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