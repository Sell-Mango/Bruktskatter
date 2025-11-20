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
            <Pressable onPress={logout} style={{padding: 5, backgroundColor: '#1F1D1E', width:'50%'}}>
                <Text style={{color: "#fff", textAlign: "center"}}>Logout</Text>
            </Pressable>
            <Link href={'/'} style={{padding: 5, backgroundColor: '#1F1D1E', width:'50%'}}>
                <Text style={{color: "#fff", textAlign: "center"}}>Back to welcome screen</Text>
            </Link>
        </>
    )
}