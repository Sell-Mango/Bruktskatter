import {GestureResponderEvent, Text, View} from "react-native";
import {mapStyles} from "@/shared/stylesheets";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {MarkerView} from "@maplibre/maplibre-react-native";
import MapMarkerIcon from "@/features/interactive-map/view/MapMarkerIcon";
import {GeoPoint} from "@/features/interactive-map/model/geoTypes";

export type MapMarkerProps =
    Pick<ShopLocation, 'name' | 'longitude'| 'latitude'  | 'category'> & {
    setCameraPosition: (coordinates: GeoPoint) => void,
};

export default function MapMarker({
                                      name,
                                      latitude,
                                      longitude,
                                      category = "default",
                                        setCameraPosition
}: MapMarkerProps) {

    const handleMarkerPress = (
        event: GestureResponderEvent
    ) => {
        setCameraPosition({lng: longitude, lat: latitude});
    }

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            anchor={{ x: 0.12, y: 1 }}
            allowOverlap={false}
            onTouchEnd={(event) => handleMarkerPress(event)}
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