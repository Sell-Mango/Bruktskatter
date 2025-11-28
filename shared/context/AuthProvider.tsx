import {User} from "@/services/appwrite/types"
import {
    getUser,
    loginAndGetUser,
    logout,
    register,
    requestPasswordChange,
    requestPasswordReset
} from "@/services/appwrite/Auth"
import {createContext, ReactNode, use, useCallback, useEffect, useState} from "react";
import {loginData} from "@/features/authentication/model/loginData";
import {registerData} from "@/features/authentication/model/registerData";
import {router} from "expo-router";
import {
    emptyRegisterErrors,
    registerValidationErrors,
} from "@/shared/utils/auth/registerValidation";
import {
    changePasswordData,
    forgotPasswordData,
} from "@/features/authentication/model/forgotPasswordData";
import {userProfile} from "@/shared/types/userProfileData";
import {fetchUserProfile} from "@/shared/repositories/userProfileRepository";

type AuthContextType = {
    user: User|null;
    profile: userProfile | null;
    login: (loginCredentials:loginData)=>Promise<void>;
    logout: () => Promise<void>;
    register: (registrationCredentials:registerData) => Promise<void>;
    recoverPassword: (forgotPasswordData:forgotPasswordData) => Promise<void>;
    changePassword: (changePasswordData:changePasswordData) => Promise<void>;
    authError: string|null;
    registerError: registerValidationErrors;
    isLoading: boolean;
    isLoggedIn: boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    login: async ()=> {},
    logout: async ()=> {},
    register: async (): Promise<void> => {},
    recoverPassword: async (): Promise<void> => {},
    changePassword: async (): Promise<void> => {},
    authError: null,
    registerError: emptyRegisterErrors,
    isLoading: false,
    isLoggedIn: false,
    isLoaded: false,
})

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<userProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<registerValidationErrors>(emptyRegisterErrors);
    const [authError, setAuthError] = useState<string | null>(null);

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

            if (response.success && response.data) {
                const responseProfile = await getUserProfile(response.data.$id);
                setProfile(responseProfile);
            }
            resetLoading()
        }
        fetchUserdata();
    }, [])

    const loginUser = async ({email, password}:loginData):Promise<void> => {
        setAuthError(null);
        setLoadings()
        const response = await loginAndGetUser(email, password);
        setUser(response.success ? response.data: null)
        if (!response.success) {
            setAuthError("Brukernavn eller passord er feil")
        }

        resetLoading()
    }

    const logoutUser = async () => {
        setLoadings()
        await logout()
        setUser(null)
        router.replace("/")
        resetLoading()
    }

    const registerUser = async (registerData:registerData) => {
        const {email, password} = registerData
        setLoadings()
        const response = await register(email, password);
        router.replace("/login")
        resetLoading()
    }

    const createPasswordRecovery = async (forgotPasswordData:forgotPasswordData) => {
        const {email} = forgotPasswordData
        setAuthError(null);
        setLoadings()
        const response = await requestPasswordReset(email)
        if (response.success) {
            console.log("Check your mail")
            return
        }
        setAuthError("Noe gikk galt, prøv igjen")
        resetLoading()
    }

    const changePassword = async (changePasswordData:changePasswordData) => {
        const {userId, secret, password} = changePasswordData
        setAuthError(null);
        setLoadings()
        const response = await requestPasswordChange(userId, secret, password);
        if (response.success) {
            router.replace("login")
        }
        setAuthError("Noe gikk galt")
        resetLoading()
    }

    const getUserProfile = async (userId: string):Promise<userProfile | null> => {

        try {
            const response = await fetchUserProfile(userId);

            if(!response) {
                console.log("Kunne ikke laste inn brukerdata");
            }
            return response;
        }
        catch (error) {
            console.log("Kunne ikke laste inn brukerdata, melding: ", error);
            return null;
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            login: loginUser,
            logout: logoutUser,
            register: registerUser,
            recoverPassword: createPasswordRecovery,
            changePassword: changePassword,
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