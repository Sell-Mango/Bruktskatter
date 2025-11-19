import { Text } from "react-native";
import AuthenticationLayout from "@/features/authentication/view/AuthenticationLayout";
import ForgotPasswordForm from "@/features/authentication/view/ForgotPasswordForm";

export default function ForgotPassword() {
    return <AuthenticationLayout heading={"Glemt passord"}><ForgotPasswordForm/></AuthenticationLayout>
}