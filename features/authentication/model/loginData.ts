import {z} from "zod";

export const LoginDataSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export type loginData = z.infer<typeof LoginDataSchema>;