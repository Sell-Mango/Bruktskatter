import { StyleSheet, Text, View } from 'react-native';
import { getShops } from '../services/interactiveMapService';
import { Suspense, useEffect, useState } from "react";

import { ShopMarker } from '../types/shopMarker';
import {Camera, MapView, MarkerView, PointAnnotation} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";


export default function InteractiveMap() {

    const [markers, setMarkers] = useState<ShopMarker[]>([]);
    const FALLBACK_LOCATION: [number, number] = [10.9339, 59.2203];

        useEffect(() => {
          const fetchMarkers = async () => {
            const locations = await getShops();
            
            const formattedLocations = locations.documents.map((marker) => ({
              id: marker.$id, latitude: marker.location[0], longitude: marker.location[1], name: marker.name
            }));
            setMarkers(formattedLocations);
          }
          fetchMarkers();
        }
        ,[])

    return (
        <MapView
            style={ styles.map }
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

       /* <Suspense fallback={<Text>Laster...</Text>}>

        </Suspense> */

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