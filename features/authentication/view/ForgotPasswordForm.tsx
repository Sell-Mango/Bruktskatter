import {StyleSheet, View, Text} from "react-native";
import CustomTextInput from "@/shared/components/CustomTextInput";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {forgotPasswordData, forgotPasswordErrors, ForgotPasswordDataSchema} from "@/features/authentication/model/forgotPasswordData";
import {useAuth} from "@/shared/context/AuthProvider";
import CustomPress from "@/shared/components/CustomPress";
import HeadingText from "@/shared/components/HeadingText";
import FormErrorText from "@/features/authentication/view/FormErrorText";

export default function ForgotPasswordForm(){
    const {recoverPassword} = useAuth()
    const {handleChange, handleSubmit, errors} = useHandleForms<forgotPasswordData, forgotPasswordErrors>(ForgotPasswordDataSchema, recoverPassword)

    return(
        <View style={styles.container}>
            <CustomTextInput actionKey={"email"} changeAction={handleChange} required={true} label={"Epost adresse"}/>
            <FormErrorText errorText={errors.email}/>
            <Text>Vi sender deg en epost med instruksjoner</Text>
            <CustomPress pressAction={handleSubmit}><HeadingText heading={"Send epost"} type={"h2"} color={"#fff"}/></CustomPress>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        gap: 10
    }
})