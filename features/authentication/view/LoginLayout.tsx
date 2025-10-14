import {StyleSheet, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png";
import { Image } from "expo-image"
import LoginForm from "@/features/authentication/view/LoginForm";

export default function LoginLayout() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading={"Logg inn"} type={"h1"}/>
            <LoginForm/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    image: {
        width: '50%',
        height: '20%',
        backgroundColor: 'transparent',
    }
})