import {z} from "zod";

export const LoginDataSchema = z.object({
    email: z.email("Dette feltet må være en gyldig epost adresse"),
    password: z.string("Dette feltet kan ikke være tomt"),
})

export type loginData = z.infer<typeof LoginDataSchema>;

export type loginErrors = {
    email: string|null;
    password: string|null;
}