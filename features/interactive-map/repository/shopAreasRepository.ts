import {GeoPoint} from "@/features/interactive-map/model/geoTypes";
import {tablesDB} from "@/services/appwrite";
import {Models, Query} from "react-native-appwrite";
import {ShopAreaRow} from "@/features/interactive-map/repository/shopLocationsRepository";
import {shopAreaData} from "@/features/interactive-map/model/shopAreaData";


export const fetchShopMarkersArea = async (
    center: GeoPoint,
    radiusMeter: number,
    responseLimit: number
): Promise<ShopAreaRow[]> => {

    const response = await tablesDB.listRows<ShopAreaRow>({
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


const validateAreas = (shopAreas:  Models.RowList<ShopAreaRow>) => {
    const validatedResponse: ShopAreaRow[] = [];

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