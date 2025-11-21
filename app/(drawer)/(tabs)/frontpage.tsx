import {View} from "react-native";
import InteractiveMap from "@/features/interactive-map/view/InteractiveMap";

export default function frontpage() {
    return (
        <>
            <View style={{flex: 1}}>
                <InteractiveMap/>
            </View>
        </>
    )
}