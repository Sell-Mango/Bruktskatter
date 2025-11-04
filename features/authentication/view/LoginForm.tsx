import CustomTextInput from "@/shared/components/CustomTextInput";
import {StyleSheet, Text, View} from "react-native";
import HeadingText from "@/shared/components/HeadingText";
import CustomPress from "@/shared/components/CustomPress";
import {Link} from "expo-router";
import LinkText from "@/shared/components/LinkText";
import useHandleForms from "@/shared/hooks/useHandleForms";
import {loginData, LoginDataSchema, loginErrors} from "@/features/authentication/model/loginData";
import {useAuth} from "@/shared/context/AuthProvider";
import FormErrorText from "@/features/authentication/view/FormErrorText";

export default function LoginForm() {
    const {login, authError} = useAuth()
    const {handleChange, handleSubmit, errors} = useHandleForms<loginData, loginErrors>(LoginDataSchema, login)

    return (
        <View style={styles.container}>
            <CustomTextInput label={"Epost"} actionKey={"email"} changeAction={handleChange}/>
            <FormErrorText errorText={errors.email}/>
            <CustomTextInput label={"Passord"} secure={true} actionKey={"password"} changeAction={handleChange}/>
            <FormErrorText errorText={errors.password}/>
            <Link href={"forgot-password"}>
                <LinkText text={"Glemt passord?"}/>
            </Link>
            <FormErrorText errorText={authError}/>
            <CustomPress pressAction={handleSubmit}><HeadingText heading={"Logg inn"} type={"h2"} color={"#fff"}/></CustomPress>
            <Link href={"register"}>
                <LinkText text={"Ikke medlem? Lag ny bruker"}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        gap: 10
    }
})