import {Models, Query} from "react-native-appwrite";
import {tablesDB} from "@/services/appwrite";
import {shopLocation, shopLocationData} from "@/features/interactive-map/model/shopLocationData";
import {boundaryToPolygonArray, GeoPoint, ViewportBoundary} from "@/features/interactive-map/model/geoTypes";
import {shopArea} from "@/features/interactive-map/model/shopAreaData";

export type shopLocationRow = Models.Row & shopLocation;
export type shopAreaRow = Models.Row & shopArea;

export const fetchShopsWithinBoundary = async (
    boundary: ViewportBoundary,
    responseLimit: number
): Promise<shopLocationRow[]> => {
    const appwritePolygon = boundaryToPolygonArray(boundary);
    console.log(appwritePolygon, "polygon");

    const response = await tablesDB.listRows<shopLocationRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "markets",
        queries: [
            Query.select(["marketId", "name", "description", "primaryCategory", "isActive", "featuredImage", "location"]),
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
): Promise<shopLocationRow[]> => {



    const response = await tablesDB.listRows<shopLocationRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "markets",
        queries: [
            Query.select(["marketId", "name", "description", "primaryCategory", "isActive", "featuredImage", "location"]),
            Query.distanceLessThan("location", Object.values(center), radiusMeter),
            Query.limit(responseLimit)
        ]
    });

    return validateLocations(response);
}


const validateLocations = (shopLocations:  Models.RowList<shopLocationRow>) => {
    const validatedResponse: shopLocationRow[] = [];

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

