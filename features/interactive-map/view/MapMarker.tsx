import {Text, View} from "react-native";
import {mapStyles} from "@/shared/stylesheets";
import {ShopLocation} from "@/features/interactive-map/model/shopLocation";
import {MarkerView} from "@maplibre/maplibre-react-native";
import MapMarkerIcon from "@/features/interactive-map/view/MapMarkerIcon";

export type MapMarkerProps = Pick<ShopLocation, 'name' | 'longitude'| 'latitude'  | 'category'>;

export default function MapMarker({
                                      name,
                                      latitude,
                                      longitude,
                                      category = "default"
}: MapMarkerProps) {

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            anchor={{ x: 0.12, y: 1 }}
        >
            <View
                collapsable={false}
                style={mapStyles.marker}
            >
                <MapMarkerIcon
                    category={category}
                />
                <Text
                    style={{
                        fontSize: 12,
                        marginRight: 0,
                        flexShrink: 1,
                        maxWidth: 60,
                    }}
                >
                    {name}
                </Text>
            </View>
        </MarkerView>

    )
}