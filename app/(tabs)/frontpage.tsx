import {Pressable, Text, View} from "react-native";
import {Link} from "expo-router";
import InteractiveMap from "@/features/interactive-map/InteractiveMap";

export default function frontpage() {
    return (
        <>
            <View style={{flex: 1}}>
                <InteractiveMap/>
            </View>
            <Link href="/" style={{padding: 5, backgroundColor: '#1F1D1E', width:'50%'}}>
                <Text style={{color: "#fff", textAlign: "center"}}>Back to welcome screen</Text>
            </Link>
        </>
    )
}