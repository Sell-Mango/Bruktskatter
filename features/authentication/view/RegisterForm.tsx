import {StyleSheet, Text, View} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {Checkbox} from "expo-checkbox";
import {useEffect, useState} from "react";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import LinkText from "@/shared/components/LinkText";
import {Link} from "expo-router";
import RequieredStar from "@/shared/components/RequieredStar";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {registerData} from "@/features/authentication/model/registerData";

export default function RegisterForm() {
    const [isChecked, setChecked] = useState(false);
    const {handleChange, handleSubmit} = useHandleForms<registerData>()

    useEffect(() => {
        handleChange("acceptedTerms", isChecked)
    }, [isChecked]);

    const test = (key:string, value:string):void => {console.log(key, value);};
    return (
        <View style={styles.container}>
            <CustomTextInput label={"Din epost"} secure={false} required={true} changeAction={handleChange} actionKey={"email"}/>
            <CustomTextInput label={"Passord"} secure={true} required={true} changeAction={handleChange} actionKey={"password"}/>
            <CustomTextInput label={"Gjenta passord"} secure={true} required={true} changeAction={test} actionKey={"second"}/>
            <View style={styles.checkbox}>
                <Checkbox value={isChecked} onValueChange={setChecked}/>
                <Text>For å lage bruker må du akseptere vilkår {<RequieredStar/>}</Text>
            </View>
            <CustomPress pressAction={handleSubmit}><HeadingText heading={"Fortsett"} type={"h2"} color={"#fff"}/></CustomPress>
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