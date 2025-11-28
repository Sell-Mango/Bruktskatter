import {databases, tablesDB} from "."
import {Models, Query} from "react-native-appwrite"
import {APPWRITE_CONSTANT, APPWRITE_DATABASE_CONSTANT} from "@/shared/config/appwriteConstants";
import {ShopDetails} from "@/features/shopDetails/model/shopDetailsData";

export const getShopDetails = async (rowID:string) => {
    const response = await tablesDB.getRow<Models.Row & ShopDetails>(
        {
            databaseId: APPWRITE_CONSTANT.DATABASE_ID,
            tableId: APPWRITE_DATABASE_CONSTANT.MARKETS_ID,
            rowId: rowID,
            queries: [Query.select([
                "$id",
                "name",
                "adress",
                "description",
                "featuredImage",
                "imageGallery",
                "location",
                "marketTypes.*",
                "marketMeta.*",
                "shopMeta.*",
                "primaryCategory",
            ])],
        }
    )
    return response
}