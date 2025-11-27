import {type Models} from "react-native-appwrite";

export type Success<T> = {
    success: true,
    data: T
}

export type Failure = {
    success: false,
    error: string
}

export type Result<T> = Success<T> | Failure

export type User = Models.User<Models.Preferences>

export type Session = Models.Session

