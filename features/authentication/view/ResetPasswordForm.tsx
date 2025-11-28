import CustomTextInput from "@/shared/components/CustomTextInput";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {
    changePasswordData, ChangePasswordDataSchema, changePasswordError,
} from "@/features/authentication/model/forgotPasswordData";
import {useAuth} from "@/shared/context/AuthProvider";
import FormErrorText from "@/features/authentication/view/FormErrorText";
import {View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import CustomPress from "@/shared/components/CustomPress";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";
import {containerStyles} from "@/shared/stylesheets";

export default function ResetPasswordForm() {
    const {changePassword} = useAuth()
    const {handleChange, handleSubmit, errors, addMultipleToFormData} = useHandleForms<changePasswordData, changePasswordError>(ChangePasswordDataSchema, changePassword)
    const {userId, secret} = useLocalSearchParams<{userId?:string, secret?:string}>()

    useEffect(() => {
        if (userId && secret) {
            addMultipleToFormData({"userId": userId, "secret": secret})
        }
    },[userId, secret])

    return (
        <View style={containerStyles.flexContainer}>
            <CustomTextInput<changePasswordData> label={"Skriv inn ett nytt passord"} secure={true} required={true} changeAction={handleChange} actionKey={"password"}/>
            <FormErrorText errorText={errors.password}/>
            <CustomTextInput<changePasswordData> label={"Gjenta passordet"} secure={true} required={true} changeAction={handleChange} actionKey={"passwordConfirm"}/>
            <FormErrorText errorText={errors.passwordConfirm}/>
            <CustomPress pressAction={handleSubmit}><HeadingText heading={"Bytt passord"} type={"h2"} color={"#fff"}/></CustomPress>
        </View>
    )
}