import {z} from "zod"

const daySchema = z.object({
    open: z.string(),
    close: z.string(),
}).nullable();

export const openingHoursSchema = z.preprocess((value) => {
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch(e) {
            console.error(e);
            return null;
        }
    }
    return value;} ,z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
}))

export const shopMetaSchema = z.object({
    openingHours: openingHoursSchema.nullable(),
    rating: z.string().nullable(),
})

export const marketMetaSchema = z.object({
    dateFrom: z.preprocess((value) => {
        if (typeof value === "string") {
            return new Date(value)
        }
        return value;
    }, z.date()),
    dateTo: z.preprocess((value) => {
        if (typeof value === "string") {
            return new Date(value)
        }
        return value;
    }, z.date()).nullable(),
}).nullable()

export const shopDetailsData = z.object({
    $id: z.string(),
    name: z.string(),
    adress: z.string().nullable(),
    description: z.string().nullable(),
    featuredImage: z.string().nullable(),
    imageGallery: z.array(z.string()).nullable(),
    location: z.tuple([z.number(), z.number()]),
    marketTypes: z.object({
        marketId: z.number(),
        marketType: z.string(),
    }),
    marketMeta: marketMetaSchema,
    shopMeta: shopMetaSchema.nullable(),
    primaryCategory: z.string().nullable(),
})

export type ShopDetails = z.infer<typeof shopDetailsData>