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
import {useInteractiveMaps} from "@/features/interactive-map/hooks/useInteractiveMaps";

const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};
const ZOOM_SHOPS_VISIBLE = 11;
const FETCH_DISTANCE_THRESHOLD = 0.4;

export default function InteractiveMap() {

    const { mapRef, actions, markers, boundary } = useInteractiveMaps();

    const getInitialMarkers = async () => {
        try {
            await actions.getShopMarkers();
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil: ", error);
        }
    }

    const handleRegionChange = async () => {
        try {
            await actions.getShopMarkers();
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