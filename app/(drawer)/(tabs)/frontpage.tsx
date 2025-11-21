import {View} from "react-native";
import InteractiveMap from "@/features/interactive-map/view/InteractiveMap";
import ShopList from "@/features/shopListView/view/ShopList";

export default function frontpage() {
    return (
        <>
            <View style={{flex: 1,backgroundColor: '#F6F6E9'}}>
                <ShopList/>
            </View>
        </>
    )
}