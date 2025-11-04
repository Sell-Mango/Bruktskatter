import {StyleSheet, Text, View} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {Checkbox} from "expo-checkbox";
import {useEffect, useState} from "react";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import LinkText from "@/shared/components/LinkText";
import {Link} from "expo-router";
import RequiredStar from "@/shared/components/RequieredStar";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {registerData, RegisterDataSchema} from "@/features/authentication/model/registerData";
import {useAuth} from "@/shared/context/AuthProvider";

export default function RegisterForm() {
    const {register} = useAuth()
    const [isChecked, setChecked] = useState<boolean>(false);
    const {handleChange, handleSubmit} = useHandleForms<registerData>(RegisterDataSchema, register)

    return (
        <View style={styles.container}>
            <CustomTextInput<registerData> label={"Din epost"} secure={false} required={true} changeAction={handleChange} actionKey={"email"}/>
            <CustomTextInput<registerData> label={"Passord"} secure={true} required={true} changeAction={handleChange} actionKey={"password"}/>
            <CustomTextInput<registerData> label={"Gjenta passord"} secure={true} required={true} changeAction={handleChange} actionKey={"passwordConfirm"}/>
            //TODO: Make custom checkbox component
            <View style={styles.checkbox}>
                <Checkbox value={isChecked} onValueChange={(e):void=>{setChecked((prev)=>!prev); handleChange("acceptedTerms", isChecked)}}/>
                <Text>For å lage bruker må du akseptere vilkår {<RequiredStar/>}</Text>
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