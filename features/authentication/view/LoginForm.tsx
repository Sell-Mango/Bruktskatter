import CustomTextInput from "@/shared/components/CustomTextInput";
import {StyleSheet, Text, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import {Image} from "expo-image";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png";
import CustomPress from "@/shared/components/CustomPress";
import {Link} from "expo-router";
import LinkText from "@/shared/components/LinkText";

export default function LoginForm() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading={"Logg inn"} type={"h1"}/>
            <CustomTextInput label={"Epost"}/>
            <CustomTextInput label={"Passord"} secure={true}/>
            <Link href={"forgot-password"}>
                <LinkText text={"Glemt passord?"}/>
            </Link>
            <CustomPress><HeadingText heading={"Logg inn"} type={"h2"} color={"#fff"}/></CustomPress>
            <Link href={"register"}>
                <LinkText text={"Ikke medlem? Lag ny bruker"}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 30
    },
    image: {
        width: '50%',
        height: '20%',
        backgroundColor: 'transparent',
    }
})