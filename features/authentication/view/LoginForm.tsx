import CustomTextInput from "@/shared/components/CustomTextInput";
import {StyleSheet, Text, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import CustomPress from "@/shared/components/CustomPress";
import {Link} from "expo-router";
import LinkText from "@/shared/components/LinkText";

export default function LoginForm() {
    return (
        <View>
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