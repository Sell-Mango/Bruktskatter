import {GestureResponderEvent, Text, View} from "react-native";
import {mapStyles} from "@/shared/stylesheets";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {MarkerView} from "@maplibre/maplibre-react-native";
import MapMarkerIcon from "@/features/interactive-map/view/MapMarkerIcon";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

export type MapMarkerProps =
    Pick<ShopLocation, 'id' | 'name' | 'longitude'| 'latitude'  | 'category'> & {
    handleMarkerPress: (
        event: GestureResponderEvent,
        markerId: number | null,
        coordinates: GeoPoint
    ) => void,
};

export default function MapMarker({
                                      id,
                                      name,
                                      latitude,
                                      longitude,
                                      category = "default",
                                      handleMarkerPress,


}: MapMarkerProps) {

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            anchor={{ x: 0.12, y: 1 }}
            allowOverlap={false}
            onTouchEnd={(event) => handleMarkerPress(event, id, {lng: longitude, lat: latitude})}
        >
            <View
                collapsable={false}
                style={mapStyles.marker}
            >
                <MapMarkerIcon
                    category={category}
                />
                <Text
                    style={mapStyles.markerText}
                    textBreakStrategy={"balanced"}
                >
                    {name}
                </Text>
            </View>
        </MarkerView>
    )
}