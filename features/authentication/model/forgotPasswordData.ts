import {z} from "zod";

export const ForgotPasswordDataSchema = z.object({
    email: z.email("Dette feltet må være en gyldig epost adresse"),
})

export type forgotPasswordData = z.infer<typeof ForgotPasswordDataSchema>;

export type forgotPasswordErrors = {
    email: string|null;
}