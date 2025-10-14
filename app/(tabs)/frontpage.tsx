import {Pressable, Text, View} from "react-native";
import {Link} from "expo-router";
import InteractiveMap from "@/features/interactive-map/InteractiveMap";

export default function frontpage() {
    return (
        <>
            <View>
                <InteractiveMap/>
            </View>
            <Link href="/">
                <Text>to Start</Text>
            </Link>
        </>
    )
}