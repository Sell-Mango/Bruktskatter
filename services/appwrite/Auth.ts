import {type AppwriteException} from "react-native-appwrite";
import {Failure, Success} from "@/services/appwrite/types";

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

export {handleError, handleResponse}