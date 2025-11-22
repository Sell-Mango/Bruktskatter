import { Text, View } from 'react-native';

import {Camera, MapView, MarkerView} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {mapStyles} from "@/shared/stylesheets";
import {
    GeoPoint,
} from "@/features/interactive-map/model/geoTypes";
import {useInteractiveMaps} from "@/features/interactive-map/hooks/useInteractiveMaps";
import {Icons} from "@/shared/components/Icons";
import MapMarker from "@/features/interactive-map/view/MapMarker";

const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};

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
            style={ mapStyles.map }
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
                    <MapMarker
                        key={marker.id}
                        name={marker.name}
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        category={marker.category}
                    />
                ))
            )}

        </MapView>
    )
}