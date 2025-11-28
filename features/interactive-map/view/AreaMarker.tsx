import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {MarkerView} from "@maplibre/maplibre-react-native";
import {StyleSheet, Text, View} from "react-native";
import {globalStyles} from "@/shared/stylesheets";

export interface AreaMarkerProps {
    areaName: string;
    location: GeoPoint;
    markersCount: number;
    onPress: () => void;
}


export default function AreaMarker({
    areaName,
    location,
    markersCount,
    onPress,
                                       }: AreaMarkerProps) {

    return (
        <MarkerView
            coordinate={[location.lng, location.lat]}
            anchor={{x: 0.5, y: 0.5 }}
            onTouchEnd={onPress}
        >
            <View style={styles.areaMarker} >
                <Text style={styles.areaMarkerText}>{markersCount}</Text>
            </View>
        </MarkerView>
    );
}


const styles = StyleSheet.create({
    areaMarker: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: globalStyles.themeColors.primaryDark22,
    },
    areaMarkerText: {
      color: globalStyles.themeColors.background,
      fontSize: 18,
      fontWeight: "bold",
    }
})


