import { databases } from "."
import { Models } from "react-native-appwrite"

export const getUsers = async (): Promise<Models.DocumentList<Models.DefaultDocument>> => {
    const response = await databases.listDocuments(
        "68ed19470037b74c8558",
        "user"
    );
    return response
}