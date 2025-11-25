import {databases, tablesDB} from "."
import {Models, Query} from "react-native-appwrite"
import {APPWRITE_CONSTANT, APPWRITE_DATABASE_CONSTANT} from "@/shared/config/appwriteConstants";
import {shopLocation} from "@/features/interactive-map/model/shopLocationData";

export const getUsers = async (): Promise<Models.DocumentList<Models.DefaultDocument>> => {
    const response = await databases.listDocuments(
        "68ed19470037b74c8558",
        "user"
    );
    return response
}

export const getShop = async (rowID:string) => {
    const response = await tablesDB.getRow<Models.Row & shopLocation>(
        {
            databaseId: APPWRITE_CONSTANT.DATABASE_ID,
            tableId: APPWRITE_DATABASE_CONSTANT.MARKETS_ID,
            rowId: rowID,
            queries: [Query.select(["*"])],
        }
    )
    return response
}