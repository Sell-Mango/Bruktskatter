import { StyleSheet, Text, View } from 'react-native';
import {getShops, getShopsInView} from '../services/interactiveMapService';
import {Suspense, useEffect, useRef, useState} from "react";

import { ShopMarker } from '../types/shopMarker';
import {Camera, MapView, MarkerView} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";
import {MapBounds} from "@/features/interactive-map/types/MapBounds";


export default function InteractiveMap() {
    const [mapBounds, setMapBounds] = useState<MapBounds | null>(null);

    const [markers, setMarkers] = useState<ShopMarker[]>([]);
    const mapRef = useRef<React.ComponentRef<typeof MapView> | null>(null);
    const FALLBACK_LOCATION: [number, number] = [10.9339, 59.2203];

    const fetchMarkers = async (center: [number, number], number: number) => {
        const locations = await getShopsInView(center, number);
        console.log(locations);

        const formattedLocations: ShopMarker[] = locations.rows.map((marker) => ({
            id: marker.$id, latitude: marker.location[0], longitude: marker.location[1], name: marker.name
        }));
        setMarkers(formattedLocations);
    }

    useEffect(() => {
          fetchMarkers(FALLBACK_LOCATION, 2500);
        }
        ,[])

    const handleRegionChange = async () => {
            if(!mapRef.current) return;
            /*const bounds = await mapRef.current.getVisibleBounds();
            const boundsData = bounds.flat();
            const newBounds: MapBounds = {
                minLat: boundsData[0],
                maxLat: boundsData[1],
                minLng: boundsData[2],
                maxLng: boundsData[3],
            }
            console.log(bounds);
            setMapBounds(newBounds);
            */
             const centerLocation = await mapRef.current.getCenter();
             fetchMarkers([centerLocation[1], centerLocation[0]], 2500);

    }

    return (
        <MapView
            ref={mapRef}
            style={ styles.map }
            onRegionDidChange={handleRegionChange}
            regionDidChangeDebounceTime={1000}
            mapStyle={customStyle}
            attributionEnabled={true}
        >
            <Camera
                defaultSettings={{
                    centerCoordinate: FALLBACK_LOCATION,
                    zoomLevel: 11
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