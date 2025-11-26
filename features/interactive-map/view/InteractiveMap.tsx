import {Camera, MapView, RegionPayload, UserLocation} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {mapStyles} from "@/shared/stylesheets";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {useInteractiveMaps} from "@/features/interactive-map/hooks/useInteractiveMaps";
import MapMarker from "@/features/interactive-map/view/MapMarker";
import {useUserLocation} from "@/shared/context/UserLocationProvider";
import {Text, View} from "react-native";
import {Icons} from "@/shared/components/Icons";

const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};

export default function InteractiveMap() {

    const { refs, actions, markers } = useInteractiveMaps();
    const { getCurrentLocation } = useUserLocation();

    const getInitialMarkers = async () => {
        try {
            await actions.getShopMarkers();
        }
        catch (error) {
            console.error("Kunne ikke laste inn markeder, feil line 23: inteactiveMap.tsx: ", error);
        }
    }

    const handleRegionChange = async (event: GeoJSON.Feature<GeoJSON.Point, RegionPayload>) => {

        if (!refs.mapRef.current) return;

        try {
            await actions.getShopMarkers();
            const loc =  await getCurrentLocation();
            console.log(loc);
        } catch (error) {
            return
        }
    };

    return (
        <MapView
            ref={refs.mapRef}
            style={ mapStyles.map }
            onDidFinishLoadingMap={getInitialMarkers}
            onRegionDidChange={handleRegionChange}
            regionDidChangeDebounceTime={600}
            mapStyle={customStyle}
            attributionEnabled={true}
        >
            <Camera
                ref={refs.cameraRef}
                defaultSettings={{
                    centerCoordinate: Object.values(FALLBACK_LOCATION),
                    zoomLevel: 12
                }}
                followUserLocation={false}
            />
            <UserLocation
                renderMode={"normal"}
                androidRenderMode={"normal"}
            />

            {markers.length > 0 && (
                markers.map((marker) => (
                    <MapMarker
                        key={marker.id}
                        name={marker.name}
                        longitude={marker.longitude}
                        latitude={marker.latitude}
                        category={marker.category}
                        setCameraPosition={actions.setCameraMarkerPosition}
                    />
                ))
            )}
        </MapView>
    )
}