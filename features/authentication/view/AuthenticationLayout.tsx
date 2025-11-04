import {StyleSheet, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png";
import { Image } from "expo-image"
import LoginForm from "@/features/authentication/view/LoginForm";
import {ReactNode} from "react";

export default function AuthenticationLayout({children, heading}: {children: ReactNode, heading: string}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading={heading} type={"h1"}/>
            {children}
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