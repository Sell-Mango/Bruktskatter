import AuthenticationLayout from "@/features/authentication/view/AuthenticationLayout";
import ResetPasswordForm from "@/features/authentication/view/ResetPasswordForm";

export default function ResetPassword(){
    return(
        <AuthenticationLayout heading={"Sett ditt nye passord"}><ResetPasswordForm/></AuthenticationLayout>
    )
}