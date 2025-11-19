import {z} from "zod";

export const ForgotPasswordDataSchema = z.object({
    email: z.email("Dette feltet må være en gyldig epost adresse"),
})

export const ChangePasswordDataSchema = z.object({
    password: z.string("Feltet kan ikke være tomt").min(8, "Passordet må minst være 8 tegn langt").regex(/[A-Z]/,"Passordet må minimum inneholde en stor bokstav"),
    passwordConfirm: z.string("Feltet kan ikke være tomt"),
    userId: z.string(),
    secret: z.string(),
}).superRefine((data, ctx) => {
    if(data.password !== data.passwordConfirm) {
        ctx.addIssue({
            path: ["passwordConfirm"],
            code: z.ZodIssueCode.custom,
            message: "Passord samsvarer ikke"
        })
    }
})

export type forgotPasswordData = z.infer<typeof ForgotPasswordDataSchema>;

export type changePasswordData = z.infer<typeof ChangePasswordDataSchema>;

export type changePasswordError = {
    password: string|null;
    passwordConfirm: string|null;
}

export type forgotPasswordErrors = {
    email: string|null;
}