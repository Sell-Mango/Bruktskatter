import {tablesDB} from "@/services/appwrite";
import {Models, Query} from "react-native-appwrite";
import {userProfile, userProfileData} from "@/shared/types/userProfileData";

export type userProfileRow = Models.Row & userProfile;

export const fetchUserProfile = async (
    userId: string
) => {

    const response =  await tablesDB.listRows<userProfileRow>({
        databaseId: "68ed19470037b74c8558",
        tableId: "user",
        queries: [
            Query.select(["*"]),
            Query.equal("authId", userId)
        ]
    });

    return validateUserProfile(response);
}

const validateUserProfile = (userProfile: Models.RowList<userProfileRow>)=> {
    if (userProfile.total !== 1) {
        return null;
    }
    const results = userProfileData.safeParse(userProfile.rows[0]);
    if(!results.success) {
        console.log("could not validate user profile: ", results.error);
        return null;
    }

    return userProfile.rows[0];
}