import {Models, Query} from "react-native-appwrite";
import {tablesDB} from "@/services/appwrite";
import {ShopLocationData, shopLocationData} from "@/features/interactive-map/model/shopLocationData";
import {boundaryToPolygonArray, GeoPoint, ViewportBoundary} from "@/features/interactive-map/model/geoTypes";
import {shopArea} from "@/features/interactive-map/model/shopAreaData";

export type ShopLocationRow = Models.Row & ShopLocationData;
export type ShopAreaRow = Models.Row & shopArea;

export const fetchShopsWithinBoundary = async (
    boundary: ViewportBoundary,
    responseLimit: number
): Promise<ShopLocationRow[]> => {
    const appwritePolygon = boundaryToPolygonArray(boundary);

    const response = await tablesDB.listRows<ShopLocationRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "markets",
        queries: [
            Query.select(["marketId", "name", "adress", "description", "primaryCategory", "isActive", "featuredImage", "location","marketTypes.*", "marketMeta.*", "shopMeta.*"]),
            Query.intersects("location", appwritePolygon),
            Query.limit(responseLimit)
        ]
    });

    return validateLocations(response);
}


export const fetchShopsWithinRadius = async (
    center: GeoPoint,
    radiusMeter: number,
    responseLimit: number
): Promise<ShopLocationRow[]> => {



    const response = await tablesDB.listRows<ShopLocationRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "markets",
        queries: [
            Query.select(["marketId", "name", "adress", "postal", "description", "primaryCategory", "isActive", "featuredImage", "location", "marketTypes.*", "marketMeta.*", "shopMeta.*"]),
            Query.distanceLessThan("location", Object.values(center), radiusMeter),
            Query.limit(responseLimit)
        ]
    });

    return validateLocations(response);
}

const validateLocations = (shopLocations:  Models.RowList<ShopLocationRow>) => {
    const validatedResponse: ShopLocationRow[] = [];

    for (const row of shopLocations.rows) {
        const results = shopLocationData.safeParse(row);
        if (!results.success) {
            console.log("Could validate fetched markets, response: ", results.error);
        }
        else {
            validatedResponse.push(row)
        }
    }
    return validatedResponse;
}

