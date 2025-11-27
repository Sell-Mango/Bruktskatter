import {z} from "zod";


export const shopLocationData = z.object({
    marketId: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    primaryCategory: z.string().nullable(),
    isActive: z.boolean(),
    featuredImage: z.string().nullable(),
    location: z.tuple([z.number(), z.number()]),
    adress: z.string().nullable(),
    postal: z.string().nullable(),
});

export type ShopLocationData = z.infer<typeof shopLocationData>;