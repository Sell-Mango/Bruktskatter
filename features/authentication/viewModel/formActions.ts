import {registerData} from "@/features/authentication/model/registerData";
import {account} from "@/services/appwrite";
import {ID} from "react-native-appwrite"
import {handleError, handleResponse} from "@/services/appwrite/Auth";
import {router} from "expo-router";

export const registerNewUser = async (data:registerData) => {
    try{
        const response = handleResponse(await account.create({
            userId: ID.unique(),
            email: data.email,
            password: data.password
        }))
        console.log("registerNewUser",response)
        if(response.success)
        {
            router.replace("login")
        }
    }
    catch(err){
        console.error(err)
        handleError(err)
    }
}