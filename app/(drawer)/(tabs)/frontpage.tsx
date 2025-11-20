import {Pressable, Text, View} from "react-native";
import {Link} from "expo-router";
import InteractiveMap from "@/features/interactive-map/view/InteractiveMap";
import {useAuth} from "@/shared/context/AuthProvider";

export default function frontpage() {
    const {logout} = useAuth()

    return (
        <>
            <View style={{flex: 1}}>
                <InteractiveMap/>
            </View>
        </>
    )
}