import { Text } from 'react-native';
import LoginForm from "@/features/authentication/view/LoginForm";
import AuthenticationLayout from "@/features/authentication/view/AuthenticationLayout";

export default function Login() {
    return <AuthenticationLayout heading={"Logg inn"}><LoginForm/></AuthenticationLayout>
}