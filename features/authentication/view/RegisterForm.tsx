import {Alert, StyleSheet, Text, View} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {Checkbox} from "expo-checkbox";
import {useEffect, useState} from "react";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import LinkText from "@/shared/components/LinkText";
import {Link} from "expo-router";
import RequiredStar from "@/shared/components/RequiredStar";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {registerData, RegisterDataSchema, registerError} from "@/features/authentication/model/registerData";
import {useAuth} from "@/shared/context/AuthProvider";
import FormErrorText from "@/features/authentication/view/FormErrorText";
import useConfirmBeforeLeaving from "@/shared/hooks/useConfirmBeforeLeaving";

export default function RegisterForm() {
    const {register, registerError} = useAuth()
    const [isChecked, setChecked] = useState<boolean>(false);
    const {handleChange, handleSubmit, errors, resetErrors} = useHandleForms<registerData, registerError>(RegisterDataSchema, register)
    useConfirmBeforeLeaving((proceed)=>{
        Alert.alert("Fjern endringer", "Er du sikker?", [
            {
                text: "Nei", style: "cancel",
            },
            {
                text: "Ja", onPress: ()=>{resetErrors();proceed()},
            }
        ])
    })

    return (
        <View style={styles.container}>
            <CustomTextInput<registerData> label={"Din epost"} secure={false} required={true} changeAction={handleChange} actionKey={"email"}/>
            <FormErrorText errorText={errors.email}/>
            <CustomTextInput<registerData> label={"Passord"} secure={true} required={true} changeAction={handleChange} actionKey={"password"}/>
            <FormErrorText errorText={errors.password}/>
            <CustomTextInput<registerData> label={"Gjenta passord"} secure={true} required={true} changeAction={handleChange} actionKey={"passwordConfirm"}/>
            <FormErrorText errorText={errors.passwordConfirm}/>
            {
                //TODO: Make custom checkbox component
            }
            <View style={styles.checkbox}>
                <Checkbox value={!isChecked} onValueChange={(e):void=>{setChecked((prev)=>!prev);handleChange("acceptedTerms", isChecked);}}/>
                <Text>For å lage bruker må du akseptere vilkår {<RequiredStar/>}</Text>
            </View>
            <FormErrorText errorText={errors.acceptedTerms}/>
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