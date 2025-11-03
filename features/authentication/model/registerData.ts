import {z} from "zod"

export const RegisterDataSchema = z.object({
    email: z.email(),
    password: z.string(),
    passwordConfirm: z.string(),
    acceptedTerms: z.boolean(),
})

export type registerData = z.infer<typeof RegisterDataSchema>