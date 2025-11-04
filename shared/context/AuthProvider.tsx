import {User} from "@/services/appwrite/types"
import {getUser} from "@/services/appwrite/Auth"
import {createContext, ReactNode, use, useCallback, useContext, useEffect, useState} from "react";

type AuthContextType = {
    user: User|null;
    isLoading: boolean;
    isLoggedIn: boolean;
    isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: false,
    isLoggedIn: false,
    isLoaded: false,
})

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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

    return (
        <AuthContext.Provider value={{
            user,
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