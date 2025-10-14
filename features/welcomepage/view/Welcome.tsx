import {Text, View, StyleSheet} from "react-native";
import {Link} from "expo-router";
import HeadingText from "@/shared/components/HeadingText";
import {Image} from "expo-image";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png"
import LinkText from "@/shared/components/LinkText";

export default function Welcome() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading="Bruktskatter" type="h1" />
            <Text>Oppdag bruktmarkeder i nærheten</Text>
            <Link style={{...styles.button, backgroundColor: "#1F1D1E"}} href="register">
                <HeadingText heading={"Bli medlem"} type={"h3"} color={"#fff"}/>
            </Link>
            <Link style={{...styles.button, ...styles.buttonBoarder}} href="login">
                <HeadingText heading={"Logg inn"} type={"h3"} color={"#1F1D1E"}/>
            </Link>
            <Link style={styles.button} href="frontpage">
                <LinkText text={"Hopp over innlogging"}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 30,
    },
    button: {
        borderRadius: 34,
        padding: 19,
        margin: 10,
        width: 300,
        textAlign: 'center',
    },
    buttonBoarder:{
        borderColor: '#1F1D1E',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    image: {
        width: '50%',
        height: '20%',
        backgroundColor: 'transparent',
    }
});