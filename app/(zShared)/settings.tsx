import {Text, View} from "react-native";
import { useSafeAreaInsets} from "react-native-safe-area-context";

export default function settings(){
    const safeArea = useSafeAreaInsets();
    return (
        <View style={{marginTop: safeArea.top, marginBottom: safeArea.bottom, marginLeft: safeArea.left, marginRight: safeArea.right}}>
            <Text>Dette er en settings</Text>
        </View>

    )
}