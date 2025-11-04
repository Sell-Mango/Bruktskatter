import {AppwriteException} from "react-native-appwrite";
import {Failure, Result, Success, User} from "@/services/appwrite/types";
import {account} from "@/services/appwrite/index";

const handleError = (error: AppwriteException):Failure => {
    switch (error.code) {
        case 401:
            return {success: false, error: "Invalid Credentials"};
        case 404:
            return {success: false, error: "Not Found"};
        case 409:
            return {success: false, error: "Email already exists"};
        default:
            return {success: false, error: "An unknown error occurred"};
    }
}

const handleResponse = <T>(response:T):Success<T> => {
    return {success: true, data: response};
}

const getUser = async ():Promise<Result<User>> => {
    try{
        const response = await account.get()
        return handleResponse(response)
    }
    catch(err){
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

export {handleError, handleResponse, getUser}