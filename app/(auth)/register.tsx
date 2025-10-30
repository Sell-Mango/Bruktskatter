import { Text } from 'react-native';
import RegisterForm from "@/features/authentication/view/RegisterForm";
import AuthenticationLayout from "@/features/authentication/view/AuthenticationLayout";

export default function Register() {
    return <AuthenticationLayout heading={"Ny bruker"}><RegisterForm/></AuthenticationLayout>
}