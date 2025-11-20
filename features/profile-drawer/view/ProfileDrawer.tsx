import {Pressable, StyleSheet, Text, View} from "react-native";
import {type DrawerContentComponentProps} from "@react-navigation/drawer"
import HeadingText from "@/shared/components/HeadingText";
import {Link, router} from "expo-router";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png"
import {Image} from "expo-image";
import {useAuth} from "@/shared/context/AuthProvider";

export default function ProfileDrawer(props: DrawerContentComponentProps) {
    const {navigation} = props;
    const {logout, isLoggedIn} = useAuth();
    return (
        <View style={styles.container}>
            <HeadingText heading={"Profil"} type={"h2"} />
            <Link href="profile" style={styles.imagePress}>
                <Image style={styles.image} source={Appicon} contentFit={"fill"}/>
            </Link>
            {isLoggedIn ? (
                <Pressable onPress={logout} style={[styles.button, {backgroundColor: '#1F1D1E'}]}>
                    <HeadingText heading={"Logg ut"} type={"h3"} color={"#fff"}/>
                </Pressable>
            ):(
                <>
                    <Link style={{...styles.button, backgroundColor: "#1F1D1E"}} href="register">
                        <HeadingText heading={"Bli medlem"} type={"h3"} color={"#fff"}/>
                    </Link>
                    <Link style={{...styles.button, ...styles.buttonBoarder}} href="login">
                        <HeadingText heading={"Logg inn"} type={"h3"} color={"#1F1D1E"}/>
                    </Link>
                </>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap: 2,
        padding: 30,
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderRadius: 300,
    },
    imagePress: {
        width: 175,
        height: 175,
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
})