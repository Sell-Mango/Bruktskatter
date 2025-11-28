import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {tablesDB} from "@/services/appwrite";
import {Models, Query} from "react-native-appwrite";
import {shopAreaRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import {shopAreaData} from "@/features/interactive-map/model/shopAreaData";


export const fetchShopMarkersArea = async (
    center: GeoPoint,
    radiusMeter: number,
    responseLimit: number
): Promise<shopAreaRow[]> => {

    const response = await tablesDB.listRows<shopAreaRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "markets",
        queries: [
            Query.select(["areas.*"]),
            Query.distanceLessThan("location", Object.values(center), radiusMeter),
            Query.limit(responseLimit)
        ]
    });

    return validateAreas(response);
}


const validateAreas = (shopAreas:  Models.RowList<shopAreaRow>) => {
    const validatedResponse: shopAreaRow[] = [];

    for (const row of shopAreas.rows) {
        const results = shopAreaData.safeParse(row);
        if (!results.success) {
            console.log("Could validate fetched markets, response: ", results.error);
        }
        else {
            validatedResponse.push(row)
        }
    }
    return validatedResponse;
}