import {AuthFailure, AuthResponse, ERROR_MESSAGES, SUCCESS_MESSAGES} from "@/shared/utils/auth/validationMessages";
import {registerData} from "@/features/authentication/model/registerData";

export type registerValidationErrors = {
    containsErrors: boolean;
    email: string|null;
    password: string|null;
    passwordConfirmed: string|null;
    acceptedTerms: string|null;
}

export const emptyRegisterErrors = {
    containsErrors: false,
    email: null,
    password: null,
    passwordConfirmed: null,
    acceptedTerms: null,
}

export const validateRegistration = (registerData:registerData):registerValidationErrors => {
    const { email, password, passwordConfirm } = registerData;
    const errors:registerValidationErrors = emptyRegisterErrors
    if (password !== passwordConfirm){
        errors.passwordConfirmed = ERROR_MESSAGES.PASSWORD_CONFIRMATION
        errors.containsErrors = true
    }
    return errors
}