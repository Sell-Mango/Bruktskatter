import {StyleSheet, Text, View} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {Checkbox} from "expo-checkbox";
import {useState} from "react";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import LinkText from "@/shared/components/LinkText";
import {Link} from "expo-router";
import RequieredStar from "@/shared/components/RequieredStar";

export default function RegisterForm() {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <CustomTextInput label={"Din epost"} secure={false} required={true}/>
            <CustomTextInput label={"Passord"} secure={true} required={true}/>
            <CustomTextInput label={"Gjenta passord"} secure={true} required={true}/>
            <View style={styles.checkbox}>
                <Checkbox value={isChecked} onValueChange={setChecked}/>
                <Text>For å lage bruker må du akseptere vilkår {<RequieredStar/>}</Text>
            </View>
            <CustomPress><HeadingText heading={"Fortsett"} type={"h2"} color={"#fff"}/></CustomPress>
            <Link href={"login"}>
                <LinkText text={"Allerede medlem? Logg inn"}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    container:{
        display: "flex",
        gap: 10
    }
})