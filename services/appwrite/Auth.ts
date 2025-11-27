import {AppwriteException, ID, type Models} from "react-native-appwrite";
import {Failure, Result, Session, Success, User} from "@/services/appwrite/types";
import {account} from "@/services/appwrite/index";
import {APPWRITE_REDIRECT_LINKS} from "@/shared/config/appwriteConstants";
type Token = Models.Token;

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

const login = async (email: string, password: string):Promise<Result<Session>> =>{
    try{
        const response = await account.createEmailPasswordSession({
            email: email,
            password: password,
        })
        return handleResponse(response)
    }
    catch(err){
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

const loginAndGetUser = async (email:string,password:string):Promise<Result<User>> => {
    const loginResponse = await login(email,password)
    if(!loginResponse.success){
        return loginResponse
    }
    return getUser()
}

const logout = async ():Promise<Result<{}>> => {
    try{
        const response = await account.deleteSession({sessionId:'current'})
        return handleResponse(response)
    }
    catch(err){
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

const register = async (email:string,password:string):Promise<Result<User>> => {
    try{
        const response = await account.create({
            userId: ID.unique(),
            email: email,
            password: password
        })
        return handleResponse(response)
    }
    catch(err){
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

const requestPasswordReset = async (email:string):Promise<Result<Token>> =>{
    try {
        const response = await account.createRecovery({email:email, url: APPWRITE_REDIRECT_LINKS.RESET_PASSWORD});
        return handleResponse(response)
    }
    catch(err){
        console.log(err)
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

const requestPasswordChange = async (userId:string, secret:string, password:string):Promise<Result<Token>> => {
    try{
        const response = await account.updateRecovery({
            userId: userId,
            secret: secret,
            password: password,
        })
        console.log("recovery response",response)
        return handleResponse(response)
    }
    catch(err){
        console.log(err)
        if(err instanceof AppwriteException){
            return handleError(err);
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

export {handleError, handleResponse, getUser, login, loginAndGetUser, logout, register, requestPasswordReset, requestPasswordChange}