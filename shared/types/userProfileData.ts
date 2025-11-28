import {z} from "zod";


export const userProfileData = z.object({
    username: z.string(),
    email: z.string(),
    fullName: z.string().nullable(),
    role: z.string().nullable(),
    bio: z.string().nullable(),
    defaultLocation: z.tuple([z.number(), z.number()]).nullable(),
    profilePicture: z.string().nullable(),
    authId: z.string(),
});

export type userProfile = z.infer<typeof userProfileData>;