import { StyleSheet, Text, View } from 'react-native';
import { getShops } from '../services/interactiveMapService';
import { Suspense, useEffect, useState } from "react";

import { ShopMarker } from '../types/shopMarker';
import {MapView} from "@maplibre/maplibre-react-native";
import customStyle from "../../../assets/mapstyles/bruktskatter-mapstyle-bright.json";


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

    return (
        <MapView
            style={{ flex: 1 }}
            mapStyle={customStyle}
        />

       /* <Suspense fallback={<Text>Laster...</Text>}>

        </Suspense> */

    )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
});