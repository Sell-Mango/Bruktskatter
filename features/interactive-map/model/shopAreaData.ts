import {z} from "zod";

const areas = z.object({
    $id: z.string(),
    name: z.string(),
    slug: z.string(),
    area: z.array(z.array(z.array(z.number()))),
})

const areasSchema = z.preprocess((value) => {
    if (typeof value === "string"){
        try {
            return JSON.parse(value);
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }
    return value;
}, areas.nullable())

export const shopAreaData = z.object({
    $id: z.string(),
    areas: areasSchema
});

export type shopArea = z.infer<typeof shopAreaData>;