import { databases } from "../../../services/appwrite";
import { Models } from "react-native-appwrite"

export const getShops = async(): Promise<Models.DocumentList<Models.DefaultDocument>> => {
    const response = await databases.listDocuments(
        "68ed19470037b74c8558",
        "markets",
    );
    return response;
}