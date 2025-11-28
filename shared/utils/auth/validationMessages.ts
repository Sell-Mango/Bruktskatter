export type AuthFailure = {
    message: string;
    field: string;
}

export type AuthResponse = {
    failed: boolean;
    failures: AuthFailure[]|null;
}

export const ERROR_MESSAGES = {
    PASSWORD_CONFIRMATION:'Passord samsvarer ikke med gjenta passord',

}

export const SUCCESS_MESSAGES = {
    REGISTRATION_VALIDATED: 'Registrering validert',
    REGISTRATION_COMPLETE: 'Registrering fulført, sender deg til login',
}