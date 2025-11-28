import {z} from "zod";

export const SearchDataSchema = z.object({
    keyword: z.string("Minimum tre bokstaver for å søke.").min(3),
})

export type searchData = z.infer<typeof SearchDataSchema>;

export type searchError = {
    keyword: string | null;
}