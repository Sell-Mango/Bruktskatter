import {z} from "zod";


export const shopLocationData = z.object({
    marketId: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    primaryCategory: z.string(),
    isActive: z.boolean(),
    featuredImage: z.string().nullable(),
    location: z.tuple([z.number(), z.number()])
});

export type shopLocation = z.infer<typeof shopLocationData>;