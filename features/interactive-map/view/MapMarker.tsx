import {Text, View} from "react-native";
import {mapStyles} from "@/shared/stylesheets";
import {Icons} from "@/shared/components/Icons";
import {ShopMarker} from "@/features/interactive-map/model/shopMarker";
import {MarkerView} from "@maplibre/maplibre-react-native";

export type MapMarkerProps = Pick<ShopMarker, 'name' | 'longitude'| 'latitude'  | 'category'>;

export default function MapMarker({ name, latitude, longitude, category }: MapMarkerProps) {

    return (
        <MarkerView
            coordinate={[longitude, latitude]}
            anchor={{ x: 1, y: 1 }}
        >
            <View
                collapsable={false}
                style={mapStyles.marker}
            >

            <Text
                style={{
                    fontSize: 12,
                    marginRight: 0,
                    flexShrink: 1
                }}
                numberOfLines={2}
            >
                {name}
            </Text>
                <Icons.marker.default size={40} />
            </View>
        </MarkerView>

    )
}