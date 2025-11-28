import {z} from "zod";

export interface ShopLocation {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    category?: string | null,
    featuredImage?: string | null,
    adress?: string | null,
    postal?: string | null,
}