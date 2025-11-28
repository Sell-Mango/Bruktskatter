import {Alert, Text, View} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import {Checkbox} from "expo-checkbox";
import {useState} from "react";
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
import {containerStyles, formStyles} from "@/shared/stylesheets";

export default function RegisterForm() {
    const {register, registerError} = useAuth()
    const [isChecked, setChecked] = useState<boolean>(false);
    const {handleChange, handleSubmit, errors, resetErrors} = useHandleForms<registerData, registerError>(RegisterDataSchema, register)
    //TODO: move to own ts
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
        <View style={containerStyles.flexContainer}>
            <CustomTextInput<registerData> label={"Din epost"} secure={false} required={true} changeAction={handleChange} actionKey={"email"}/>
            <FormErrorText errorText={errors.email}/>
            <CustomTextInput<registerData> label={"Passord"} secure={true} required={true} changeAction={handleChange} actionKey={"password"}/>
            <FormErrorText errorText={errors.password}/>
            <CustomTextInput<registerData> label={"Gjenta passord"} secure={true} required={true} changeAction={handleChange} actionKey={"passwordConfirm"}/>
            <FormErrorText errorText={errors.passwordConfirm}/>
            {
                //TODO: Make custom checkbox component
            }
            <View style={formStyles.checkbox}>
                <Checkbox value={!isChecked} onValueChange={(e):void=>{setChecked((prev)=>!prev);handleChange("acceptedTerms", isChecked);}}/>
                <Text>For å lage bruker må du akseptere vilkår {<RequiredStar/>}</Text>
            </View>
            <FormErrorText errorText={errors.acceptedTerms}/>
            <CustomPress pressAction={handleSubmit}><HeadingText heading={"Fortsett"} type={"h2"} color={"#fff"}/></CustomPress>
            <Link href={"reset-password"}>
                <LinkText text={"Allerede medlem? Logg inn"}/>
            </Link>
        </View>
    )
}