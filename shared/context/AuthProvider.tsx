import {User} from "@/services/appwrite/types"
import {getUser, loginAndGetUser, logout, register} from "@/services/appwrite/Auth"
import {createContext, ReactNode, use, useCallback, useContext, useEffect, useState} from "react";
import {loginData} from "@/features/authentication/model/loginData";
import {registerData} from "@/features/authentication/model/registerData";
import {router} from "expo-router";
import {AuthFailure, AuthResponse, ERROR_MESSAGES} from "@/shared/utils/auth/validationMessages";
import {
    emptyRegisterErrors,
    registerValidationErrors,
    validateRegistration
} from "@/shared/utils/auth/registerValidation";

type AuthContextType = {
    user: User|null;
    login: (loginCredentials:loginData)=>Promise<void>;
    logout: () => Promise<void>;
    register: (registrationCredentials:registerData) => Promise<void>;
    authError: AuthFailure[]|null;
    registerError: registerValidationErrors;
    isLoading: boolean;
    isLoggedIn: boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async ()=> {},
    logout: async ()=> {},
    register: async (): Promise<void> => {},
    authError: null,
    registerError: emptyRegisterErrors,
    isLoading: false,
    isLoggedIn: false,
    isLoaded: false,
})

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<registerValidationErrors>(emptyRegisterErrors);
    const [authError, setAuthError] = useState<AuthFailure[] | null>(null);

    const resetLoading = useCallback(() => {
        setLoading(false);
        setIsLoaded(true);
    }, [])

    const setLoadings = useCallback(()=>{
        setLoading(true);
        setIsLoaded(false);
    }, [])

    useEffect(() => {
        const fetchUserdata = async () => {
            setLoading(true);
            const response = await getUser()
            setUser(response.success ? response.data : null)
            resetLoading()
        }
        fetchUserdata();
    }, [])

    const loginUser = async ({email, password}:loginData):Promise<void> => {
        setLoadings()
        const response = await loginAndGetUser(email, password);
        setUser(response.success ? response.data: null)
        resetLoading()
    }

    const logoutUser = async () => {
        setLoadings()
        await logout()
        setUser(null)
        resetLoading()
    }

    const registerUser = async (registerData:registerData) => {
        const {email, password} = registerData
        setRegisterError(validateRegistration(registerData))
        if(registerError.containsErrors){
            return
        }
        setLoadings()
        const response = await register(email, password);
        router.replace("/login")
        resetLoading()
    }

    return (
        <AuthContext.Provider value={{
            user,
            login: loginUser,
            logout: logoutUser,
            register: registerUser,
            authError: authError,
            registerError: registerError,
            isLoading: loading,
            isLoaded,
            isLoggedIn: (user !== null),
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = use(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}