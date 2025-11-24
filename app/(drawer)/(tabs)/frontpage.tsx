import {View} from "react-native";
import InteractiveMap from "@/features/interactive-map/view/InteractiveMap";
import ShopList from "@/features/shopListView/view/ShopList";
import FloatingButton from "@/features/shopListView/view/FloatingButton";
import {useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function frontpage() {
    const [mapView, setMapView] = useState<boolean>(true)
    return (
        <>
            <View style={{flex: 1,backgroundColor: '#F6F6E9'}}>
                {
                    mapView ? <InteractiveMap/> : <ShopList/>
                }
                <FloatingButton mapView={mapView} setMapView={setMapView}/>
            </View>
        </>
    )
}