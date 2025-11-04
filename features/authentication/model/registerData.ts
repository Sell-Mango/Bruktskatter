import {z} from "zod"

export const RegisterDataSchema = z.object({
    email: z.email("Fyll inn en gyldig epost adresse"),
    password: z.string("Feltet kan ikke være tomt").min(8, "Passordet må minst være 8 tegn langt").regex(/[A-Z]/,"Passordet må minimum inneholde en stor bokstav"),
    passwordConfirm: z.string("Feltet kan ikke være tomt"),
    acceptedTerms: z.boolean("Vilkårene må aksepteres for å kunne registrere deg"),
}).superRefine((data, ctx) => {
    if(data.password !== data.passwordConfirm) {
        ctx.addIssue({
            path: ["passwordConfirm"],
            code: z.ZodIssueCode.custom,
            message: "Passord samsvarer ikke"
        })
    }
    if (!data.acceptedTerms){
        ctx.addIssue({
            path: ["acceptedTerms"],
            code: z.ZodIssueCode.custom,
            message: "Du må akseptere våre vilkår for å kunne registrere deg"
        })
    }
})

export type registerData = z.infer<typeof RegisterDataSchema>

export type registerError = {
    email: string|null,
    password: string|null,
    passwordConfirm: string|null,
    acceptedTerms: string|null,
}