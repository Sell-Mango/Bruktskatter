import CustomTextInput from "@/shared/components/CustomTextInput";
import {StyleSheet, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import {Image} from "expo-image";
import Appicon from "@assets/Appicon_alternative_bruktskatter.png";

export default function LoginForm() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={Appicon} contentFit={"scale-down"}/>
            <HeadingText heading={"Logg inn"} type={"h1"}/>
            <CustomTextInput label={"Epost"}/>
            <CustomTextInput label={"Passord"} secure={true}/>
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