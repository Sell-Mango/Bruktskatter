import { StyleSheet, Text, View } from 'react-native';
import { getShops } from './services/interactiveMapService';
import { Suspense, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import type { Region } from 'react-native-maps';
import { ShopMarker } from './types/shopMarker';


export default function InteractiveMap() {

    const [markers, setMarkers] = useState<ShopMarker[]>([]);

        useEffect(() => {
          const fetchMarkers = async () => {
            const locations = await getShops();
            
            const formattedLocations = locations.documents.map((marker) => ({
              id: marker.$id, latitude: marker.location[0], longitude: marker.location[1], latitudeDelta: 0.05, longitudeDelta: 0.05, name: marker.name
            }));
            setMarkers(formattedLocations);
          }
          fetchMarkers();
        }
        ,[])
    
        const INITREGION: Region = {
          latitude: 59.22071885211767,
          longitude: 10.93723126724585, 
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }

    return (
        <Suspense fallback={<Text>Laster...</Text>}>
                <MapView 
                    style={styles.map} 
                    provider={PROVIDER_GOOGLE} 
                    initialRegion={INITREGION}
                    showsUserLocation 
                    showsMyLocationButton
                >
                    {markers.map((marker, index) => (
                    <Marker key={marker.id} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} title={marker.name} />
                    ))}
            </MapView>
        </Suspense>

    )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});