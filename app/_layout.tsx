import { Stack } from "expo-router"
import AuthProvider, {useAuth} from "@/shared/context/AuthProvider";
import {useContext} from "react";

export default function RootLayout() {
    const {isLoggedIn} = useAuth();

    return (
        <AuthProvider>
            <Stack screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name="index" options={{title: ""}}/>
                <Stack.Screen name="(auth)" options={{title: ""}} />
                <Stack.Screen name="(drawer)" options={{headerShown: false}} />
            </Stack>
        </AuthProvider>
    )
}