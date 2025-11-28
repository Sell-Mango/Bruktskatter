import {z} from "zod";
import {marketMetaSchema, shopMetaSchema} from "@/features/shopDetails/model/shopDetailsData";


export const shopLocationData = z.object({
    marketId: z.number(),
    name: z.string(),
    adress: z.string().nullable(),
    description: z.string().nullable(),
    primaryCategory: z.string().nullable(),
    isActive: z.boolean(),
    featuredImage: z.string().nullable(),
    location: z.tuple([z.number(), z.number()]),
    marketTypes: z.object({
        marketId: z.number(),
        marketType: z.string(),
    }),
    marketMeta: marketMetaSchema,
    shopMeta: shopMetaSchema.nullable(),
});

export type shopLocation = z.infer<typeof shopLocationData>;