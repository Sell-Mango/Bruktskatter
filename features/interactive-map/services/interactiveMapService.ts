import { databases, tablesDB } from "../../../services/appwrite";
import {Models, Query} from "react-native-appwrite"

const DB_ID = "68ed19470037b74c8558";

export const getShops = async(): Promise< Models.RowList<Models.DefaultRow>> => {
    const response = await tablesDB.listRows({
        databaseId: DB_ID,
        tableId: "markets",
        queries: [Query.select(["*"])]
    });

    return response;
}

export const getShopsInView = async (
    center: [number, number],
    radius: number
) => {
    const response = await tablesDB.listRows({
       databaseId: DB_ID,
        tableId: "markets",
        queries: [
            Query.select(["*"]),
            Query.distanceLessThan("location", center, radius),
            Query.limit(100)
        ]
    });
    return response;
}