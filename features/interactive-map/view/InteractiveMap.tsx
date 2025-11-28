import {Camera, MapView, MarkerView, RegionPayload, UserLocation} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {buttonStyles, mapStyles} from "@/shared/stylesheets";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {useInteractiveMaps} from "@/features/interactive-map/hooks/useInteractiveMaps";
import MapMarker from "@/features/interactive-map/view/MapMarker";
import {useUserLocation} from "@/shared/context/UserLocationProvider";
import {Icons} from "@/shared/components/Icons";
import CustomPress from "@/shared/components/CustomPress";
import {useZoomControl} from "@/features/interactive-map/hooks/useZoomControl";

import MarkerCallout from "@/features/shopPreviewCallout/view/MarkerCallout";
import {Fragment} from "react";

const FALLBACK_LOCATION: GeoPoint = {lng: 10.9339, lat: 59.2203};

export default function InteractiveMap() {

    const { refs, actions, markers, areaMarkers, selectedMarker } = useInteractiveMaps();
    const { getCurrentLocation, location } = useUserLocation();
    const { currentZoom, updateZoom, ZOOM_LEVELS } = useZoomControl();

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

        const zoom = await actions.getZoom();
        updateZoom(zoom);

        if (zoom >= ZOOM_LEVELS.AREA) {
            await actions.getShopMarkers()
            const loc = await getCurrentLocation();
        }
        else {
            const resp = await actions.getAreaMarkers();
            console.log(resp);
        }

    }

    const handleGPSPress = async () => {
        if (!location) {
            return;
        }
        actions.setCameraMarkerPosition(location);
    }

    return (
        <>
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
                    <Fragment key={marker.id}>
                        <MapMarker
                            id={marker.id}
                            name={marker.name}
                            longitude={marker.longitude}
                            latitude={marker.latitude}
                            category={marker.category}
                            handleMarkerPress={actions.handleMarkerPress}
                        />

                        {selectedMarker === marker.id && (
                            <MarkerCallout
                                marker={marker}
                                onCloseButtonPress={actions.handleCloseButtonPress}
                            />
                        )}
                    </Fragment>
                ))
            )}
        </MapView>
        <CustomPress style={buttonStyles.gpsBtn} pressAction={() => handleGPSPress()} >
            <Icons.gps size={40} />
        </CustomPress>
    </>
    )
}

